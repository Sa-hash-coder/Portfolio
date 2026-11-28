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
      className="relative min-h-screen flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-16 bg-[#EEEAE3] overflow-hidden"
    >
      {/* ── UP: Top Bar & Context Metadata ── */}
      <div>
        <header className="hero-stagger flex flex-wrap justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] border-b border-[#151412]/15 pb-3 sm:pb-4 gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-medium text-[#151412] truncate">Greater Noida, Uttar Pradesh, India</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-[#151412]/70 font-mono text-[10px] sm:text-[11px]">
            <span>Bennett University</span>
            <span className="px-2 py-0.5 bg-[#151412]/5 border border-[#151412]/15 rounded text-[#151412] font-semibold">
              B.Tech CSE (AI)
            </span>
          </div>
        </header>

        {/* Category Pill & Contact Chips */}
        <div className="hero-stagger flex flex-wrap justify-between items-center gap-2 mt-4 sm:mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#151412]/5 border border-[#151412]/10 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#151412]/70 font-medium">
              Artificial Intelligence Undergraduate · 2025–2029
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono text-[#151412]/60">
            <a 
              href="mailto:saurabhtewari377@gmail.com" 
              className="hover:text-[#151412] hover:underline transition-colors"
            >
              saurabhtewari377@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ── CENTER: Name in Level with the Robot (SAURABH · ROBOT · TEWARI) ── */}
      <div className="my-auto py-2 sm:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-1 sm:gap-2 lg:gap-4">
          
          {/* LEFT: First Name "SAURABH" (ALL CAPS) */}
          <div className="flex-1 text-center lg:text-left select-none w-full">
            <h1 
              onClick={handleNameClick}
              className="hero-stagger font-['Instrument_Serif'] text-5xl sm:text-7xl md:text-8xl lg:text-[7.6rem] xl:text-[9.2rem] leading-none tracking-tight uppercase cursor-pointer group active:scale-[0.99] transition-transform"
              title="pat!"
            >
              <span className="inline-block transition-colors group-hover:text-black">
                SAURABH
              </span>
            </h1>
            <p className="hero-stagger text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#151412]/50 mt-1.5 sm:mt-3 font-mono">
              AI / ML &amp; Software
            </p>
          </div>

          {/* CENTER: Uncaged Clay Robot (level with name, full shadow clearance, restricted path) */}
          <div 
            className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[390px] h-[220px] sm:h-[280px] md:h-[340px] lg:h-[370px] flex items-center justify-center shrink-0 relative overflow-hidden transition-opacity duration-300 my-1 lg:my-0"
            style={{ opacity: isLoaded ? 1 : 0 }}
          >
            <div 
              onClick={handleNameClick}
              className="w-full h-full cursor-pointer relative group"
              title="pat!"
            >
              <div className="absolute top-2 sm:top-4 inset-x-0 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 bg-[#151412] text-[#EEEAE3] rounded-full shadow-md">
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
          <div className="flex-1 text-center lg:text-right select-none w-full">
            <h1 
              onClick={handleNameClick}
              className="hero-stagger font-['Instrument_Serif'] text-5xl sm:text-7xl md:text-8xl lg:text-[7.6rem] xl:text-[9.2rem] leading-none tracking-tight uppercase cursor-pointer group active:scale-[0.99] transition-transform"
              title="pat!"
            >
              <span className="inline-block transition-colors group-hover:text-black">
                TEWARI
              </span>
              <span className="inline-block ml-1 sm:ml-2 text-xl sm:text-2xl md:text-3xl font-sans not-italic text-[#151412]/30 group-hover:text-[#151412] group-hover:rotate-45 transition-all align-middle">
                ✦
              </span>
            </h1>
            <p className="hero-stagger text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#151412]/50 mt-1.5 sm:mt-3 font-mono">
              Full-Stack Developer
            </p>
          </div>

        </div>
      </div>

      {/* ── BELOW: Positioning, Bio & Section Navigation ── */}
      <div className="z-10">
        <div className="hero-stagger pt-4 sm:pt-6 border-t border-[#151412]/15 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
          
          {/* Statement & Description */}
          <div className="md:col-span-8">
            <p className="text-lg sm:text-xl md:text-2xl font-['Instrument_Serif'] leading-snug text-[#151412]">
              <b>"Ideas are cheap. Building them is the fun part."</b>
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-['Instrument_Serif'] leading-snug text-[#151412]">
              Hey, I'm Saurabh.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-['Instrument_Serif'] leading-snug text-[#151412]">
Currently a Computer Science Undergrad at Bennett University.

I write code, experiment with AI, and build software, sometimes with a plan, or maybe... even without one, just with way... too many open tabs.

Always curious about what's possible.
            </p>
            <p className="mt-1.5 sm:mt-2 text-xs md:text-sm text-[#151412]/75 font-light leading-relaxed max-w-2xl">
              Specializing in Artificial Intelligence with a rigorous computational foundation. Focused on building practical machine learning models, NLP risk systems, environmental verification tools, and campus solutions. Serving as Vice Chairperson at the Indian Blockchain Fraternity.
            </p>

            {/* Direct Jump Navigation Buttons */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#151412]/50 mr-1 font-mono block w-full sm:w-auto">Direct jump:</span>
              <button
                type="button"
                onClick={() => handleNavClick("academics")}
                className="px-3 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [02] Academic Foundation →
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("specializations")}
                className="px-3 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [03] Technical Arsenal →
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("projects")}
                className="px-3 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [04] Project Folios →
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("leadership")}
                className="px-3 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [05] Leadership &amp; Roles →
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="px-3 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer font-medium active:scale-95"
              >
                [06] Contact &amp; Dispatch →
              </button>
            </div>
          </div>

          

        </div>

        {/* Footer Scroll Prompt */}
        <footer className="hero-stagger flex flex-wrap justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] border-t border-[#151412]/15 pt-3 sm:pt-4 mt-4 sm:mt-6 gap-2">
          <span>Portfolio · Index [01]</span>
          <button 
            type="button"
            onClick={() => {
              robotRef.current?.triggerWave(1)
              onExploreClick?.()
            }}
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-60 transition-opacity cursor-pointer uppercase tracking-widest font-medium text-[10px] sm:text-[11px]"
          >
            <span>Scroll down to examine</span>
            <span className="animate-bounce">↓</span>
          </button>
        </footer>
      </div>
    </section>
  )
}
