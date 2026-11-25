import { useEffect, useRef, useState } from "react"
import Masthead from "./components/Masthead"
import HeroSection from "./components/HeroSection"
import AcademicSection from "./components/AcademicSection"
import SpecializationsSection from "./components/SpecializationsSection"
import CertificatesSection from "./components/CertificatesSection"
import { type ClayRobotRef } from "./components/ClayRobot"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const robotRef = useRef<ClayRobotRef | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleLoaderComplete = () => {
    setIsLoaded(true)
    // Robot drops in from above right at this moment!
    robotRef.current?.triggerDrop()
  }

  const navigateToSection = (targetId: string) => {
    robotRef.current?.triggerWave(1)
    lenisRef.current?.scrollTo(`#${targetId}`, { offset: 0, duration: 1.4 })
  }

  return (
    <div className="relative w-full min-h-screen bg-[#EEEAE3] text-[#151412] selection:bg-[#151412] selection:text-[#EEEAE3]">
      {/* 1. Masthead Reveal (pinned at top layer z-50, folds away directly to main website) */}
      <Masthead
        text="WELCOME"
        minTime={3}
        onComplete={handleLoaderComplete}
      />

      {/* 2. Main Website (Directly under loader, no intermediate shutter/button) */}
      <main className="relative">
        {/* Section [01]: Hero Profile with Clay Robot level with name */}
        <HeroSection 
          robotRef={robotRef}
          isLoaded={isLoaded}
          onNavigate={navigateToSection}
          onExploreClick={() => navigateToSection("academics")}
        />

        {/* Section [02]: Academic Foundation (9.81 CGPA animated scrub) */}
        <div id="academics">
          <AcademicSection />
        </div>

        {/* Section [03]: Technical Domains (Horizontal pinned track) */}
        <div id="specializations">
          <SpecializationsSection />
        </div>

        {/* Section [04]: Certified Distinctions (3D Bookshelf Cover Flip) */}
        <div id="certificates">
          <CertificatesSection />
        </div>

        {/* Section [05]: Next Chapter Prompt */}
        <section className="min-h-[45vh] sm:min-h-[50vh] flex flex-col justify-between p-5 sm:p-12 md:p-16 border-t border-[#151412]/15 bg-[#EEEAE3] overflow-hidden">
          <div className="my-auto py-8 sm:py-12 text-center max-w-2xl mx-auto">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#151412]/50 block mb-3 sm:mb-4">
              Continuous Scroll Sequence
            </span>
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-6xl italic leading-tight text-[#151412]">
              "Merging analytical rigor with software craftsmanship."
            </h2>
            <div className="mt-6 sm:mt-8 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  robotRef.current?.triggerWave(1)
                  lenisRef.current?.scrollTo(0, { duration: 1.5 })
                }}
                className="px-4 py-2 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] transition-all rounded-full text-[10px] sm:text-xs uppercase tracking-widest cursor-pointer font-medium active:scale-95"
              >
                ↑ Return to top &amp; greet companion
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#151412]/50 border-t border-[#151412]/15 pt-3 sm:pt-4 gap-2">
            <span>Saurabh Tewari · 2026</span>
            <span>Bennett University CSE</span>
          </div>
        </section>
      </main>
    </div>
  )
}
