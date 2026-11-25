import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BookshelfCoverFlip from "./BookshelfCoverFlip"

gsap.registerPlugin(ScrollTrigger)

interface Certificate {
  title: string
  subtitle: string
  issuer: string
  issueDate: string
  credentialId: string
  label: string
  spineColor: string
  textColor: string
  coverColor: string
  monogram: string
  artVariant: number
  skills: string[]
}

const CERTIFICATES: Certificate[] = [
  {
    title: "Deep Learning & Neural Architectures",
    subtitle: "DeepLearning.AI · Distinction",
    issuer: "DeepLearning.AI",
    issueDate: "2025",
    credentialId: "DL-NEURAL-8849",
    label: "AI / ML",
    spineColor: "#161B22",
    textColor: "#F0F6FC",
    coverColor: "#1B222E",
    monogram: "AI",
    artVariant: 0,
    skills: ["Deep Neural Networks", "Transformers", "PyTorch", "Computer Vision", "Backpropagation"],
  },
  {
    title: "Full-Stack Software Architecture",
    subtitle: "Meta · Professional Certification",
    issuer: "Meta",
    issueDate: "2025",
    credentialId: "META-FS-4921",
    label: "ENGINEERING",
    spineColor: "#24201C",
    textColor: "#F5EBE1",
    coverColor: "#2C2621",
    monogram: "FS",
    artVariant: 1,
    skills: ["React & Next.js", "TypeScript", "REST & GraphQL APIs", "Distributed Systems", "SQL / NoSQL"],
  },
  {
    title: "Algorithms & Computational Complexity",
    subtitle: "Stanford Online · Advanced DSA",
    issuer: "Stanford Online",
    issueDate: "2024",
    credentialId: "STAN-DSA-1082",
    label: "ALGORITHMS",
    spineColor: "#3A1F18",
    textColor: "#FBF7F0",
    coverColor: "#45251C",
    monogram: "DSA",
    artVariant: 2,
    skills: ["Dynamic Programming", "Graph Theory", "Asymptotic Analysis", "Divide & Conquer", "Greedy Proofs"],
  },
  {
    title: "Data Science & Statistical Inference",
    subtitle: "IBM Professional · Specialization",
    issuer: "IBM",
    issueDate: "2024",
    credentialId: "IBM-DS-7734",
    label: "DATA SCIENCE",
    spineColor: "#162820",
    textColor: "#EAF5EF",
    coverColor: "#1C3228",
    monogram: "DS",
    artVariant: 3,
    skills: ["Predictive Modeling", "Exploratory Data Analysis", "Hypothesis Testing", "Pandas & NumPy", "Data Visualization"],
  },
  {
    title: "Blockchain & Cryptographic Consensus",
    subtitle: "ConsenSys · Web3 Protocol Design",
    issuer: "ConsenSys",
    issueDate: "2024",
    credentialId: "CS-WEB3-3051",
    label: "BLOCKCHAIN",
    spineColor: "#281D30",
    textColor: "#F7EEFC",
    coverColor: "#32233C",
    monogram: "BC",
    artVariant: 4,
    skills: ["Smart Contracts", "Cryptographic Hashing", "Consensus Mechanisms", "Solidity", "Decentralized State"],
  },
]

export default function CertificatesSection() {
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [activeBookIndex, setActiveBookIndex] = useState(0)

  // Map to the bookshelf book format expected by BookshelfCoverFlip
  const shelfBooks = CERTIFICATES.map((cert) => ({
    title: cert.title,
    subtitle: cert.subtitle,
    label: cert.label,
    spineColor: cert.spineColor,
    textColor: cert.textColor,
    coverColor: cert.coverColor,
    monogram: cert.monogram,
    artVariant: cert.artVariant,
  }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: "+=2200",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress
          // 5 books: 0, 1, 2, 3, 4
          const idx = Math.min(
            CERTIFICATES.length - 1,
            Math.max(0, Math.floor(p * CERTIFICATES.length))
          )
          setActiveBookIndex(idx)
        },
      })
    }, pinContainerRef)

    return () => ctx.revert()
  }, [])

  const currentCert = CERTIFICATES[activeBookIndex] || CERTIFICATES[0]

  return (
    <div className="relative bg-[#EEEAE3] border-t border-[#151412]/15">
      {/* ── Pinned Scroll Stage (Each book opens progressively as you scroll) ── */}
      <div 
        ref={pinContainerRef}
        className="relative h-screen max-h-screen flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#EEEAE3]"
      >
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#151412]/15 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#151412]/50">
                  [04] Certified Distinctions
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#151412]/30" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#151412]/70">
                  Scroll-Driven 3D Shelf
                </span>
              </div>
              <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl text-[#151412] tracking-tight leading-none">
                Certificates &amp; Specializations
              </h2>
            </div>

            {/* Scroll Indicator & Progress Segment */}
            <div className="flex flex-col sm:items-end gap-1.5">
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#151412]/70">
                <span className="animate-pulse">↓</span>
                <span className="uppercase tracking-widest font-semibold">
                  Scroll to view each book ({activeBookIndex + 1}/5)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {CERTIFICATES.map((c, i) => (
                  <div
                    key={c.credentialId}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      i === activeBookIndex
                        ? "w-8 bg-[#151412]"
                        : "w-2 bg-[#151412]/20"
                    }`}
                    title={c.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Bookshelf Viewport (Driven by activeBook prop from scroll) */}
        <div className="my-auto w-full max-w-7xl mx-auto">
          <div className="relative bg-[#E9E4DC]/50 rounded-2xl border border-[#151412]/10 overflow-hidden shadow-[inset_0_2px_12px_rgba(21,20,18,0.04)]">
            {/* Top Stage Tag */}
            <div className="absolute top-3 left-4 sm:left-6 z-10 flex items-center gap-2 pointer-events-none">
              <span 
                className="w-2 h-2 rounded-full transition-colors duration-300" 
                style={{ backgroundColor: currentCert.coverColor }}
              />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#151412]/60 truncate max-w-[280px] sm:max-w-none">
                Volume 0{activeBookIndex + 1}: {currentCert.title}
              </span>
            </div>

            {/* Bookshelf Component (Zero timing, scroll driven) */}
            <div className="w-full h-[320px] sm:h-[380px] md:h-[440px]">
              <BookshelfCoverFlip
                books={shelfBooks}
                activeBook={activeBookIndex}
                disablePointer={true}
                size={400}
                spineWidth={14}
                speed={65}
                background="transparent"
                advanced={{
                  floorColor: "#151412",
                  floorOpacity: 16,
                  gap: 3,
                  hover: 50,
                  openMs: 480,
                  closeMs: 580,
                  autoPlay: false,
                  shadowOpacity: 50,
                }}
              />
            </div>

            {/* Bottom Trim Bar with Active Certificate Metadata */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[#151412]/10 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#151412]/70 bg-[#EEEAE3]/90 gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <span 
                  className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${currentCert.coverColor}18`,
                    color: currentCert.coverColor,
                  }}
                >
                  {currentCert.label}
                </span>
                <span className="font-semibold text-[#151412] truncate max-w-[200px] sm:max-w-none">
                  {currentCert.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#151412]/60">
                <span className="hidden sm:inline">ID: {currentCert.credentialId}</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Status Bar */}
        <div className="max-w-7xl mx-auto w-full pt-3 border-t border-[#151412]/15 flex flex-wrap justify-between items-center text-[10px] sm:text-xs font-mono text-[#151412]/50 gap-2">
          <span>Continuous Scroll Archive · Bennett University</span>
          <span>Scroll down to advance volumes or view ledger ↓</span>
        </div>
      </div>

      {/* ── Complete Verification Ledger (Below the pinned scroll experience) ── */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-[#151412]/15">
        <div className="flex items-center justify-between border-b border-[#151412]/15 pb-4 mb-8">
          <div>
            <h3 className="font-['Instrument_Serif'] text-2xl sm:text-3xl text-[#151412]">
              Complete Accredited Ledger &amp; Competencies
            </h3>
            <p className="text-xs text-[#151412]/60 font-mono mt-1">
              Full specification of verified credentials across all 5 disciplines.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#151412]/40 hidden sm:inline">
            5 of 5 Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={cert.credentialId}
              className={`p-6 bg-[#EEEAE3] border rounded-xl transition-all duration-300 flex flex-col justify-between ${
                idx === activeBookIndex
                  ? "border-[#151412] shadow-md bg-[#E9E4DC]"
                  : "border-[#151412]/15 hover:border-[#151412]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border"
                    style={{ 
                      backgroundColor: `${cert.coverColor}15`, 
                      borderColor: `${cert.coverColor}30`,
                      color: cert.coverColor 
                    }}
                  >
                    {cert.label}
                  </span>
                  <span className="text-xs font-mono text-[#151412]/40">
                    Volume 0{idx + 1}
                  </span>
                </div>

                <h4 className="font-['Instrument_Serif'] text-2xl text-[#151412] leading-snug">
                  {cert.title}
                </h4>
                <p className="mt-1 text-xs text-[#151412]/70 font-mono">
                  {cert.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#151412]/10">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-[#151412]/5 text-[10px] text-[#151412]/75 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#151412]/50">
                  <span>ID: {cert.credentialId}</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    Verified
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Academic Standing Summary Card */}
          <div className="p-6 bg-[#151412] text-[#EEEAE3] rounded-xl flex flex-col justify-between border border-[#151412]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#EEEAE3]/60 block mb-2">
                Cumulative Rigor
              </span>
              <h4 className="font-['Instrument_Serif'] text-3xl italic text-[#EEEAE3] leading-tight">
                Academic &amp; Practical Synchrony
              </h4>
              <p className="mt-3 text-xs text-[#EEEAE3]/70 font-light leading-relaxed">
                These certifications complement the academic benchmark of a <strong>9.81 CGPA</strong> at Bennett University, grounding theoretical computer science in industry-standard frameworks.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEEAE3]/20 flex items-center justify-between text-xs font-mono">
              <span className="text-[#EEEAE3]/60">Ranked Top Tier</span>
              <span className="px-2.5 py-1 bg-[#EEEAE3]/10 border border-[#EEEAE3]/20 rounded text-[#EEEAE3]">
                B.Tech CSE · 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
