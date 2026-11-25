import { useEffect, useRef, type RefObject } from "react"
import ClayRobot, { type ClayRobotRef } from "./ClayRobot"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  robotRef: RefObject<ClayRobotRef | null>
  isLoaded?: boolean
  onNavigate?: (targetId: string) => void
  onExploreClick?: () => void
}

export default function HeroSection({ robotRef, isLoaded = false, onNavigate, onExploreClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const lastWaveScroll = useRef<number>(0)

  useEffect(() => {
    // When rolled down (scrolled down), the robot waves its hand again
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const now = Date.now()
        if (self.direction === 1 && self.progress > 0.06 && self.progress < 0.65) {
          if (now - lastWaveScroll.current > 2200) {
            lastWaveScroll.current = now
            robotRef.current?.triggerWave(1)
          }
        }
      },
      onLeave: () => {
        robotRef.current?.triggerWave(1)
      },
      onEnterBack: () => {
        robotRef.current?.triggerWave(1)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [robotRef])

  const handleNameClick = () => {
    robotRef.current?.triggerHappy()
  }

  const handleNavClick = (targetId: string) => {
    robotRef.current?.triggerHappy()
    onNavigate?.(targetId)
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16 bg-[#EEEAE3] overflow-hidden"
    >
      {/* ── UP: Top Bar & Context Metadata ── */}
      <div>
        <header className="hero-stagger flex flex-wrap justify-between items-center text-xs uppercase tracking-[0.22em] border-b border-[#151412]/15 pb-4 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-medium text-[#151412]">Bennett University, Greater Noida, India</span>
          </div>
          <div className="flex items-center gap-4 text-[#151412]/70 font-mono text-[11px]">
            <span>Second Year · B.Tech CSE</span>
            <span className="px-2 py-0.5 bg-[#151412]/5 border border-[#151412]/15 rounded text-[#151412] font-semibold">
              CGPA 9.81
            </span>
          </div>
        </header>

        {/* Category Pill */}
        <div className="hero-stagger flex justify-between items-center mt-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#151412]/5 border border-[#151412]/10 rounded-full text-[11px] uppercase tracking-[0.2em] text-[#151412]/70 font-medium">
            Computer Science Engineering Student
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#151412]/40 hidden sm:inline font-mono">
            Vol. 01 · 2026
          </span>
        </div>
      </div>

      {/* ── CENTER: Name in Level with the Robot (SAURABH · ROBOT · TEWARI) ── */}
      <div className="my-auto py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">
          
          {/* LEFT: First Name "SAURABH" (ALL CAPS) */}
          <div className="flex-1 text-center lg:text-left select-none">
            <h1 
              onClick={handleNameClick}
              className="hero-stagger font-['Instrument_Serif'] text-7xl sm:text-8xl md:text-9xl lg:text-[7.6rem] xl:text-[9.2rem] leading-none tracking-tight uppercase cursor-pointer group active:scale-[0.99] transition-transform"
              title="pat!"
            >
              <span className="inline-block transition-colors group-hover:text-black">
                SAURABH
              </span>
            </h1>
            <p className="hero-stagger text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#151412]/50 mt-3 font-mono">
              AI / ML & Software
            </p>
          </div>

          {/* CENTER: Uncaged Clay Robot (level with name, full shadow clearance, restricted path) */}
          <div 
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[390px] h-[300px] sm:h-[340px] md:h-[370px] flex items-center justify-center shrink-0 relative overflow-hidden transition-opacity duration-300"
            style={{ opacity: isLoaded ? 1 : 0 }}
          >
            <div 
              onClick={handleNameClick}
              className="w-full h-full cursor-pointer relative group"
              title="pat!"
            >
              <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 bg-[#151412] text-[#EEEAE3] rounded-full shadow-md">
                  pat!
                </span>
              </div>
              <ClayRobot
                ref={robotRef}
                animate={isLoaded}
                delay={0.15}
                scale={88}
                placement={{ x: 0, y: 12, angle: 0, tilt: 0 }}
                walk={true}
                walkSpeed={5}
                walkMargin={3.8}
                wave={true}
                blink={true}
                glance={5}
                response={{
                  track: "page",
                  headTurn: 8,
                  eyeTravel: 7,
                  followSpeed: 6.5,
                  hop: 7,
                }}
                background={{
                  top: "#EEEAE3",
                  bottom: "#EEEAE3",
                  shadow: "#151412",
                  shadowDepth: 20,
                }}
                colors={{
                  clay: "#B5A1FF",
                  visor: "#141528",
                  eyes: "#FFFFFF",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "auto",
                }}
              />
            </div>
          </div>

          {/* RIGHT: Last Name "TEWARI" (ALL CAPS) */}
          <div className="flex-1 text-center lg:text-right select-none">
            <h1 
              onClick={handleNameClick}
              className="hero-stagger font-['Instrument_Serif'] text-7xl sm:text-8xl md:text-9xl lg:text-[7.6rem] xl:text-[9.2rem] leading-none tracking-tight uppercase cursor-pointer group active:scale-[0.99] transition-transform"
              title="pat!"
            >
              <span className="inline-block transition-colors group-hover:text-black">
                TEWARI
              </span>
              <span className="inline-block ml-2 text-2xl md:text-3xl font-sans not-italic text-[#151412]/30 group-hover:text-[#151412] group-hover:rotate-45 transition-all align-middle">
                ✦
              </span>
            </h1>
            <p className="hero-stagger text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#151412]/50 mt-3 font-mono">
              Full-Stack Developer
            </p>
          </div>

        </div>
      </div>

      {/* ── BELOW: Positioning, Bio & Section Navigation ── */}
      <div className="z-10">
        <div className="hero-stagger pt-6 border-t border-[#151412]/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Statement & Description */}
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl font-['Instrument_Serif'] leading-snug text-[#151412]">
              "Computer Science Student <span className="text-[#151412]/30">|</span> AI/ML Enthusiast <span className="text-[#151412]/30">|</span> Full-Stack Developer"
            </p>
            <p className="mt-2 text-xs md:text-sm text-[#151412]/70 font-light leading-relaxed max-w-2xl">
              Second-year B.Tech undergraduate at Bennett University with a 9.81 CGPA foundation. Focused on architecting intelligent algorithms, scalable software systems, and data-driven solutions.
            </p>

            {/* Direct Jump Navigation Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#151412]/50 mr-1 font-mono">Direct jump:</span>
              <button
                type="button"
                onClick={() => handleNavClick("academics")}
                className="px-3.5 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [02] Academic Foundation (9.81 CGPA) →
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("specializations")}
                className="px-3.5 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [03] Technical Domains →
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("certificates")}
                className="px-3.5 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [04] Certifications →
              </button>
            </div>
          </div>

          {/* Quick Metrics on the Right */}
          <div className="md:col-span-4 flex flex-col gap-2 md:items-end text-xs font-mono text-[#151412]/60">
            <div className="px-3.5 py-1.5 border border-[#151412]/15 rounded w-fit bg-[#151412]/[0.02]">
              1st Year CGPA: <strong className="text-[#151412]">9.81 / 10</strong>
            </div>
            <div className="px-3.5 py-1.5 border border-[#151412]/15 rounded w-fit bg-[#151412]/[0.02]">
              Sem 1: <strong>9.71</strong> · Sem 2: <strong>9.91</strong>
            </div>
          </div>

        </div>

        {/* Footer Scroll Prompt */}
        <footer className="hero-stagger flex justify-between items-end text-xs uppercase tracking-[0.25em] border-t border-[#151412]/15 pt-4 mt-6">
          <span>Portfolio 2026 · Index [01]</span>
          <button 
            type="button"
            onClick={() => {
              robotRef.current?.triggerWave(1)
              onExploreClick?.()
            }}
            className="flex items-center gap-2 hover:opacity-60 transition-opacity cursor-pointer uppercase tracking-widest font-medium text-[11px]"
          >
            <span>Scroll down to examine credentials</span>
            <span className="animate-bounce">↓</span>
          </button>
        </footer>
      </div>
    </section>
  )
}
