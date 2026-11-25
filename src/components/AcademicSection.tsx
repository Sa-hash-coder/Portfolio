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
        <span>[02] Academic Foundation &amp; Pedigree</span>
        <span>Bennett University · B.Tech CSE (AI) · Expected 2029</span>
      </div>

      {/* Main Metric Focus */}
      <div className="my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Huge CGPA Display */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#151412]/50 font-mono">
              Bennett University · 1st Year Cumulative GPA
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-[#151412] text-[#EEEAE3]">
              Ranked Top Tier
            </span>
          </div>
          <div className="flex items-baseline gap-2 sm:gap-4 font-['Instrument_Serif'] text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none tracking-tight">
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
            <span className="font-semibold text-[#151412]/70">9.81 Distinction</span>
            <span>10.0 Perfect</span>
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-5 border border-[#151412]/15 rounded-xl bg-[#151412]/[0.015]">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#151412] font-semibold mb-1">
              Curriculum &amp; Artificial Intelligence Track
            </h4>
            <p className="text-xs text-[#151412]/70 leading-relaxed font-light">
              Pursuing a Bachelor of Technology in Computer Science with Specialization in Artificial Intelligence (Degree Expected: 2029). Bridging algorithmic data structures, discrete mathematics, and neural paradigms.
            </p>
          </div>
        </div>

        {/* Right Column: Breakdown Cards & Schooling Record */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
          {/* University Semesters */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 sm:p-5 border border-[#151412]/15 bg-[#151412]/[0.02] rounded-xl transition-all hover:border-[#151412]/40">
              <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-widest text-[#151412]/60 mb-1">
                <span>Semester 01</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#151412]/10 rounded">SGPA</span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span ref={sem1Ref} className="font-['Instrument_Serif'] text-3xl sm:text-4xl tabular-nums">0.00</span>
                <span className="text-[10px] text-[#151412]/50 font-mono">/ 10.0</span>
              </div>
              <p className="text-[10px] text-[#151412]/60 font-light mt-1">Foundation &amp; Core Sciences</p>
            </div>

            <div className="p-4 sm:p-5 border border-[#151412]/15 bg-[#151412]/[0.02] rounded-xl transition-all hover:border-[#151412]/40">
              <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-widest text-[#151412]/60 mb-1">
                <span>Semester 02</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#151412] text-[#EEEAE3] rounded font-semibold">Top SGPA</span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span ref={sem2Ref} className="font-['Instrument_Serif'] text-3xl sm:text-4xl tabular-nums">0.00</span>
                <span className="text-[10px] text-[#151412]/50 font-mono">/ 10.0</span>
              </div>
              <p className="text-[10px] text-[#151412]/60 font-light mt-1">Computing &amp; Data Structures</p>
            </div>
          </div>

          {/* Schooling Foundation: Army Public School, Hempur */}
          <div className="p-4 sm:p-6 border border-[#151412]/15 bg-[#151412]/[0.02] rounded-xl transition-all hover:border-[#151412]/40">
            <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-wider text-[#151412]/60 mb-2">
              <span className="font-mono">Army Public School · Hempur</span>
              <span className="px-2 py-0.5 bg-[#151412]/10 rounded text-[9px] font-mono font-medium">CBSE Board</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#151412]/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#151412]/50 font-mono block">Class XII (Senior Secondary)</span>
                <div className="font-['Instrument_Serif'] text-3xl sm:text-4xl text-[#151412] leading-tight mt-0.5">
                  94.4<span className="text-xl sm:text-2xl text-[#151412]/40 font-sans">%</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-medium">CBSE Distinction</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#151412]/50 font-mono block">Class X (Secondary)</span>
                <div className="font-['Instrument_Serif'] text-3xl sm:text-4xl text-[#151412] leading-tight mt-0.5">
                  95.2<span className="text-xl sm:text-2xl text-[#151412]/40 font-sans">%</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-medium">CBSE Distinction</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#151412]/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#151412]/60">
              <span>Leadership: Head Boy (APS Hempur)</span>
              <span className="text-emerald-700 font-medium">Honors</span>
            </div>
          </div>

          <div className="text-[11px] sm:text-xs text-[#151412]/70 leading-relaxed font-light pl-2 border-l border-[#151412]/30">
            A consistent record of analytical rigor: combining top CBSE board performance with university-level distinction at Bennett University.
          </div>
        </div>
      </div>

      {/* Section Footer */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#151412]/50 border-t border-[#151412]/15 pt-3 sm:pt-4">
        <span>B.Tech CSE (AI Track) · Expected 2029</span>
        <span>Lifelong Academic Consistency</span>
      </div>
    </section>
  )
}
