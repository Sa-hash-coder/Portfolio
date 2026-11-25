import { useEffect, useRef, useState } from "react"
import Masthead from "./components/Masthead"
import HeroSection from "./components/HeroSection"
import AcademicSection from "./components/AcademicSection"
import SpecializationsSection from "./components/SpecializationsSection"
import CertificatesSection from "./components/CertificatesSection"
import LeadershipSection from "./components/LeadershipSection"
import ContactSection from "./components/ContactSection"
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
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis
      lenis.destroy()
    }
  }, [])

  const handleLoaderComplete = () => {
    setIsLoaded(true)
    // Robot drops in from above right at this moment!
    robotRef.current?.triggerDrop()
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
  }

  const navigateToSection = (targetId: string) => {
    robotRef.current?.triggerWave(1)
    if (targetId === "top" || targetId === "hero") {
      lenisRef.current?.scrollTo(0, { duration: 1.5 })
    } else {
      lenisRef.current?.scrollTo(`#${targetId}`, { offset: 0, duration: 1.4 })
    }
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
        <div id="hero">
          <HeroSection 
            robotRef={robotRef}
            isLoaded={isLoaded}
            onNavigate={navigateToSection}
            onExploreClick={() => navigateToSection("academics")}
          />
        </div>

        {/* Section [02]: Academic Foundation (9.81 CGPA & Schooling Excellence) */}
        <div id="academics">
          <AcademicSection />
        </div>

        {/* Section [03]: Technical Domains (Interactive 3D Skill Pillars) */}
        <div id="specializations">
          <SpecializationsSection />
        </div>

        {/* Section [04]: Project Folios & Distinctions (3D Bookshelf Cover Flip & Complete Ledger) */}
        <div id="projects">
          <div id="certificates">
            <CertificatesSection />
          </div>
        </div>

        {/* Section [05]: Leadership & Experience (IBF Vice Chairperson & APS Head Boy) */}
        <div id="leadership">
          <LeadershipSection />
        </div>

        {/* Section [06]: Contact & Direct Dispatch */}
        <div id="contact">
          <ContactSection onBackToTop={() => navigateToSection("top")} />
        </div>
      </main>
    </div>
  )
}
