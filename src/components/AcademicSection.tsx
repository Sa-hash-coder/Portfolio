import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AcademicSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cgpaNumberRef = useRef<HTMLSpanElement>(null)
  const sem1Ref = useRef<HTMLSpanElement>(null)
  const sem2Ref = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation scrubbed on scroll
      const cgpaObj = { val: 0 }
      const sem1Obj = { val: 0 }
      const sem2Obj = { val: 0 }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      })

      tl.to(cgpaObj, {
        val: 9.81,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (cgpaNumberRef.current) {
            cgpaNumberRef.current.textContent = cgpaObj.val.toFixed(2)
          }
        },
      }, 0)
      .to(sem1Obj, {
        val: 9.71,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (sem1Ref.current) {
            sem1Ref.current.textContent = sem1Obj.val.toFixed(2)
          }
        },
      }, 0.2)
      .to(sem2Obj, {
        val: 9.91,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (sem2Ref.current) {
            sem2Ref.current.textContent = sem2Obj.val.toFixed(2)
          }
        },
      }, 0.3)
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 0.981, duration: 1.8, ease: "power3.out", transformOrigin: "left center" }, 0.1)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between p-5 sm:p-8 md:p-16 border-t border-[#151412]/15 bg-[#EEEAE3] overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-wrap justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#151412]/60 border-b border-[#151412]/15 pb-3 sm:pb-4 gap-2">
        <span>[02] Academic Foundation</span>
        <span>Bennett University · B.Tech CSE</span>
      </div>

      {/* Main Metric Focus */}
      <div className="my-auto py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Huge CGPA Display */}
        <div className="lg:col-span-7">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#151412]/50 block mb-2 sm:mb-4">
            Cumulative Grade Point Average
          </span>
          <div className="flex items-baseline gap-2 sm:gap-4 font-['Instrument_Serif'] text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-none tracking-tight">
            <span ref={cgpaNumberRef} className="font-normal tabular-nums">0.00</span>
            <span className="text-2xl sm:text-4xl md:text-5xl text-[#151412]/40 italic font-normal">/ 10.0</span>
          </div>

          {/* Precision Meter Bar */}
          <div className="w-full h-1.5 bg-[#151412]/10 mt-4 sm:mt-6 relative overflow-hidden rounded-full">
            <div 
              ref={barRef} 
              className="absolute inset-y-0 left-0 bg-[#151412] w-full"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#151412]/50 mt-2 sm:mt-3 font-mono">
            <span>0.00 Base</span>
            <span className="font-semibold text-[#151412]/70">9.81 Milestone</span>
            <span>10.0 Perfect</span>
          </div>
        </div>

        {/* Right Column: Breakdown Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
          <div className="p-5 sm:p-8 border border-[#151412]/15 bg-[#151412]/[0.02] backdrop-blur-sm transition-all hover:border-[#151412]/40">
            <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-widest text-[#151412]/60 mb-2 sm:mb-3">
              <span>Semester 01</span>
              <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 bg-[#151412]/10 rounded">SGPA</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span ref={sem1Ref} className="font-['Instrument_Serif'] text-4xl sm:text-5xl md:text-6xl tabular-nums">0.00</span>
              <span className="text-[11px] sm:text-xs text-[#151412]/50 font-light text-right">Foundation &amp; Core Sciences</span>
            </div>
          </div>

          <div className="p-5 sm:p-8 border border-[#151412]/15 bg-[#151412]/[0.02] backdrop-blur-sm transition-all hover:border-[#151412]/40">
            <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-widest text-[#151412]/60 mb-2 sm:mb-3">
              <span>Semester 02</span>
              <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 bg-[#151412] text-[#EEEAE3] rounded font-semibold">SGPA 9.91</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span ref={sem2Ref} className="font-['Instrument_Serif'] text-4xl sm:text-5xl md:text-6xl tabular-nums">0.00</span>
              <span className="text-[11px] sm:text-xs text-[#151412]/50 font-light text-right">Advanced Computing &amp; Systems</span>
            </div>
          </div>

          <div className="text-[11px] sm:text-xs text-[#151412]/70 leading-relaxed font-light pl-2 border-l border-[#151412]/30 mt-1 sm:mt-2">
            Maintaining top-tier academic rigor in Computer Science Engineering at Bennett University, Greater Noida, India.
          </div>
        </div>
      </div>

      {/* Section Footer */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#151412]/50 border-t border-[#151412]/15 pt-3 sm:pt-4">
        <span>Second Year CSE</span>
        <span>Consistent Performance</span>
      </div>
    </section>
  )
}
