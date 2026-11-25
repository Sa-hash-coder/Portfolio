import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
} from "react"

export interface TechSkillSlide {
  num: string
  title: string
  subtitle: string
  desc: string
  category: string
  accentColor: string
  coreSkills: { category: string; items: string[] }[]
  tags: string[]
  metrics?: string
}

export interface CoverflowSlideshowProps {
  slides: TechSkillSlide[]
  cardWidth?: number
  cardHeight?: number
  radius?: number
  tilt?: number
  sideTilt?: number
  gap?: number
  opacity?: number
  transition?: {
    duration?: number
    ease?: string | number[]
    delay?: number
  }
  autoplay?: boolean
  autoplayDirection?: "leftToRight" | "rightToLeft"
  onActiveChange?: (index: number) => void
  style?: CSSProperties
}

const PERSPECTIVE = 1600
const SCALE_STEP = 0.14
const MAX_VISIBLE = 2
const DEPTH = 220

function cssTransition(t?: { duration?: number; ease?: string | number[] }): {
  dur: number
  ease: string
} {
  const dur = t && typeof t.duration === "number" ? t.duration : 0.6
  let ease = "cubic-bezier(0.22, 1, 0.36, 1)"
  const e = t?.ease
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`
  } else if (typeof e === "string") {
    const map: Record<string, string> = {
      linear: "linear",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    }
    ease = map[e] || "ease"
  }
  return { dur, ease }
}

export default function CoverflowSlideshow({
  slides,
  cardWidth = 500,
  cardHeight = 520,
  radius = 16,
  tilt = 14,
  sideTilt = 6,
  gap = 7.5,
  opacity = 50,
  transition,
  autoplay = false,
  autoplayDirection = "rightToLeft",
  onActiveChange,
  style,
}: CoverflowSlideshowProps) {
  const list = slides && slides.length ? slides : []
  const n = list.length
  const loop = true
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)))
  }, [n])

  const moveDur = transition && typeof transition.duration === "number" ? transition.duration : 0.6
  const lockRef = useRef(false)
  const lock = useCallback(() => {
    lockRef.current = true
    window.setTimeout(() => {
      lockRef.current = false
    }, Math.max(50, moveDur * 1000))
  }, [moveDur])

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current || n === 0) return
      lock()
      setActive((a) => {
        const next = (((a + dir) % n) + n) % n
        onActiveChange?.(next)
        return next
      })
    },
    [n, lock, onActiveChange]
  )

  const handleCardClick = useCallback(
    (i: number) => {
      if (lockRef.current || i === active) return
      lock()
      setActive(i)
      onActiveChange?.(i)
    },
    [active, lock, onActiveChange]
  )

  // Autoplay handler
  const delay = transition && typeof transition.delay === "number" ? transition.delay : 4.0
  useEffect(() => {
    if (!autoplay || n < 2) return
    const ms = Math.max(0.3, delay) * 1000
    const dir = autoplayDirection === "leftToRight" ? -1 : 1
    const id = window.setInterval(() => step(dir), ms)
    return () => window.clearInterval(id)
  }, [autoplay, autoplayDirection, delay, n, step])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        step(1)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        step(-1)
      }
    },
    [step]
  )

  const { dur, ease } = cssTransition(transition)
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100

  // Calculate responsive card dimensions
  const [containerWidth, setContainerWidth] = useState(1200)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const updateSize = () => {
      setContainerWidth(el.offsetWidth)
    }
    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const actualCardWidth = Math.min(cardWidth, Math.max(280, containerWidth - 48))
  const actualCardHeight = Math.min(cardHeight, 560)

  const rootStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 560,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    perspective: `${PERSPECTIVE}px`,
    overflow: "hidden",
    outline: "none",
    ...style,
  }

  return (
    <div
      ref={containerRef}
      style={rootStyle}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      className="select-none py-6"
    >
      {/* 3D Preserved Stage */}
      <div
        style={{
          position: "relative",
          width: actualCardWidth,
          height: actualCardHeight,
          transformStyle: "preserve-3d",
        }}
      >
        {list.map((slide, i) => {
          let rel = i - active
          if (loop) {
            if (rel > n / 2) rel -= n
            if (rel < -n / 2) rel += n
          }
          const ax = Math.abs(rel)
          const visible = ax <= MAX_VISIBLE
          const isActive = rel === 0
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP)
          const tx = rel * (gap * 32)
          const tz = -ax * DEPTH
          const ry = -rel * tilt
          const rz = rel * sideTilt

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: actualCardWidth,
            height: actualCardHeight,
            borderRadius: radius,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
            transition: transitionCss,
            opacity: visible ? 1 : 0,
            cursor: isActive ? "default" : "pointer",
            pointerEvents: visible ? "auto" : "none",
            backgroundColor: "#181715",
            boxShadow: isActive
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(238, 234, 227, 0.2)"
              : "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(238, 234, 227, 0.08)",
          }

          return (
            <div
              key={slide.num}
              style={cardStyle}
              onClick={() => handleCardClick(i)}
              aria-label={slide.title}
              aria-hidden={!visible}
              className="group flex flex-col justify-between p-6 sm:p-8 text-[#EEEAE3] transition-colors"
            >
              {/* Card Ambient Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: `radial-gradient(circle at top right, ${slide.accentColor}35 0%, transparent 70%)`,
                }}
              />

              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-[#EEEAE3]/15">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: slide.accentColor }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#EEEAE3]/60">
                      Discipline {slide.num}
                    </span>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                    style={{
                      borderColor: `${slide.accentColor}40`,
                      backgroundColor: `${slide.accentColor}15`,
                      color: "#EEEAE3",
                    }}
                  >
                    {slide.category}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#EEEAE3]/40">
                    {slide.subtitle}
                  </span>
                  <h3 className="font-['Instrument_Serif'] text-2xl sm:text-3xl md:text-4xl leading-tight text-[#EEEAE3] mt-1">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#EEEAE3]/70 leading-relaxed font-light line-clamp-3">
                    {slide.desc}
                  </p>
                </div>
              </div>

              {/* Skills Breakdown Grid (Replaces images with structured skills) */}
              <div className="relative z-10 my-auto py-3 space-y-3">
                {slide.coreSkills.map((section) => (
                  <div key={section.category} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#EEEAE3]/50">
                      <span className="w-1 h-1 rounded-full bg-[#EEEAE3]/30" />
                      <span>{section.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {section.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded bg-[#EEEAE3]/10 hover:bg-[#EEEAE3]/20 border border-[#EEEAE3]/10 text-[11px] font-mono text-[#EEEAE3]/90 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-4 border-t border-[#EEEAE3]/15 flex items-center justify-between text-[11px] font-mono text-[#EEEAE3]/60">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#EEEAE3]/40">Metric:</span>
                  <span className="text-[#EEEAE3]/90">{slide.metrics || "Academic & Applied Core"}</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#EEEAE3]/40">
                  {isActive ? "Active View" : "Click to view"}
                </span>
              </div>

              {/* Dim overlay for non-active 3D cards */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#0F0E0D",
                  opacity: isActive ? 0 : dim,
                  transition: `opacity ${dur}s ${ease}`,
                  pointerEvents: "none",
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Control Bar: Previous / Next & Trackers */}
      <div className="relative z-20 mt-10 flex items-center justify-between w-full max-w-xl px-4 text-xs font-mono">
        <button
          type="button"
          onClick={() => step(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#EEEAE3]/20 hover:border-[#EEEAE3] hover:bg-[#EEEAE3]/10 transition-all text-[#EEEAE3] cursor-pointer active:scale-95"
          aria-label="Previous tech pillar"
        >
          <span>←</span>
          <span className="uppercase tracking-widest text-[11px]">Previous</span>
        </button>

        {/* Pillar Indicator Dots */}
        <div className="flex items-center gap-2">
          {list.map((slide, idx) => (
            <button
              key={slide.num}
              type="button"
              onClick={() => handleCardClick(idx)}
              className={`h-2 transition-all rounded-full cursor-pointer ${
                idx === active
                  ? "w-8 bg-[#EEEAE3]"
                  : "w-2 bg-[#EEEAE3]/30 hover:bg-[#EEEAE3]/60"
              }`}
              aria-label={`Go to pillar ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#EEEAE3]/20 hover:border-[#EEEAE3] hover:bg-[#EEEAE3]/10 transition-all text-[#EEEAE3] cursor-pointer active:scale-95"
          aria-label="Next tech pillar"
        >
          <span className="uppercase tracking-widest text-[11px]">Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}
