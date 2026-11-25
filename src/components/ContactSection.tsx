import { useState } from "react"

interface ContactSectionProps {
  onBackToTop?: () => void
}

export default function ContactSection({ onBackToTop }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-between py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#EEEAE3] border-t border-[#151412]/15 text-[#151412] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#151412]/15 pb-6 sm:pb-8 mb-10 sm:mb-14 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#151412]/50">
                [06] Direct Dispatch &amp; Inquiry
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#151412]/30" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#151412]/70">
                Communications Terminal
              </span>
            </div>
            <h2 className="font-['Instrument_Serif'] text-4xl sm:text-6xl md:text-7xl text-[#151412] tracking-tight leading-[1.05]">
              Let's connect &amp; build.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#151412]/70 leading-relaxed font-light">
            Eager to contribute to challenging software engineering environments, applied AI/ML initiatives, and collaborative technical projects.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Direct Channels */}
          <div className="md:col-span-7 flex flex-col gap-4 sm:gap-5 justify-between">
            {/* Email Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#E9E4DC]/60 border border-[#151412]/15 hover:border-[#151412]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#151412]/50 block mb-1">
                  Primary Email Dispatch
                </span>
                <a
                  href="mailto:saurabhtewari377@gmail.com"
                  className="font-mono text-base sm:text-lg md:text-xl text-[#151412] font-semibold hover:underline"
                >
                  saurabhtewari377@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy("saurabhtewari377@gmail.com", "email")}
                  className="px-3.5 py-1.5 border border-[#151412]/20 hover:border-[#151412] bg-[#151412] text-[#EEEAE3] rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                >
                  {copiedField === "email" ? "Copied! ✓" : "Copy Email"}
                </button>
                <a
                  href="mailto:saurabhtewari377@gmail.com"
                  className="px-3.5 py-1.5 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412]/5 rounded-full text-xs font-mono uppercase tracking-wider transition-all"
                >
                  Write ↗
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#E9E4DC]/40 border border-[#151412]/10 flex items-center justify-between text-xs font-mono text-[#151412]/70">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Greater Noida, Uttar Pradesh, India</span>
              </div>
              <span className="text-[#151412]/40 font-light">Bennett University Campus</span>
            </div>
          </div>

          {/* Right Info Box */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#151412] text-[#EEEAE3] flex flex-col justify-between border border-[#151412]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#EEEAE3]/60 block mb-3">
                Engagement Scope
              </span>
              <h3 className="font-['Instrument_Serif'] text-3xl sm:text-4xl italic text-[#EEEAE3] leading-snug">
                Opportunities &amp; Synergy
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-[#EEEAE3]/75 leading-relaxed font-light">
                Available for engineering internships, research collaborations in applied AI/ML and NLP hazard prediction, and open-source system building.
              </p>

              <div className="mt-6 space-y-2 pt-4 border-t border-[#EEEAE3]/15 text-xs font-mono text-[#EEEAE3]/70">
                <div className="flex justify-between">
                  <span className="text-[#EEEAE3]/50">Affiliation:</span>
                  <span className="text-[#EEEAE3]">Bennett University (B.Tech AI)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#EEEAE3]/50">Focus Area:</span>
                  <span className="text-[#EEEAE3]">Artificial Intelligence &amp; Software</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#EEEAE3]/50">Key Technologies:</span>
                  <span className="text-[#EEEAE3]">Python · C++ · ML · Flask · MongoDB</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#EEEAE3]/15 flex items-center justify-between text-xs font-mono text-[#EEEAE3]/50">
              <span>Status: Active &amp; Exploring</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Open for Collaboration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="max-w-7xl mx-auto w-full pt-12 mt-12 border-t border-[#151412]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-[#151412]/50">
        <div>
          <span>Saurabh Tewari · Computer Science &amp; AI Portfolio · 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Bennett University · Greater Noida</span>
          <button
            type="button"
            onClick={onBackToTop}
            className="px-3 py-1 border border-[#151412]/20 hover:border-[#151412] hover:bg-[#151412] hover:text-[#EEEAE3] rounded transition-all cursor-pointer text-[#151412]"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </section>
  )
}
