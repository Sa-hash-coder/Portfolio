import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BookshelfCoverFlip from "./BookshelfCoverFlip"
import BookReaderModal from "./BookReaderModal"

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
  description?: string
}

const CERTIFICATES: Certificate[] = [
  {
    title: "ForeSite: Safety & Risk AI",
    subtitle: "Industrial Hazard Detection · Rank 25 BUSIH",
    issuer: "Team ForeSite",
    issueDate: "2026",
    credentialId: "PROJ-FORESITE-26",
    label: "AI SAFETY PLATFORM",
    spineColor: "#141B2B",
    textColor: "#F0F5FA",
    coverColor: "#1A2438",
    monogram: "FS",
    artVariant: 0,
    skills: ["Sentence Transformers", "XGBoost", "NLP Risk Classification", "Python", "MongoDB"],
    description: "Developing an AI-driven platform to identify unsafe workplace conditions and potential hazards. Designed NLP-based risk classification and semantic assessment to prioritize critical industrial safety incident reports.",
  },
  {
    title: "Terraverify: Climate Engine",
    subtitle: "Environmental Verification & Audit Platform",
    issuer: "Environmental Verification",
    issueDate: "2026",
    credentialId: "PROJ-TERRA-02",
    label: "CLIMATE INTELLIGENCE",
    spineColor: "#122419",
    textColor: "#EDF7F1",
    coverColor: "#193323",
    monogram: "TV",
    artVariant: 3,
    skills: ["Environmental Verification", "Scikit-Learn", "Python & Flask", "Data Integrity", "Audit Analytics"],
    description: "Environmental verification and data integrity platform engineered to validate ecological benchmarks, sustainability claims, and sensor audit datasets using robust machine learning heuristics.",
  },
  {
    title: "Findify: Campus Lost & Found",
    subtitle: "University Discovery & Retrieval System",
    issuer: "Bennett Campus Ecosystem",
    issueDate: "2025",
    credentialId: "PROJ-FINDIFY-03",
    label: "REALTIME WEB PLATFORM",
    spineColor: "#301B14",
    textColor: "#FBF3EE",
    coverColor: "#3F231B",
    monogram: "FD",
    artVariant: 2,
    skills: ["JavaScript (ES6+)", "Firebase Realtime DB", "HTML5 & Tailwind CSS", "Cloud Datastore", "Campus UX"],
    description: "Developed a university-focused platform to streamline lost-and-found item reporting, image matching, and discovery. Integrated Google Firebase for real-time data sync and authenticated claiming workflows.",
  },
  {
    title: "Foundational AI & Systems Research",
    subtitle: "Bennett University · School of CSE",
    issuer: "Bennett University",
    issueDate: "2025–2026",
    credentialId: "ACAD-AI-RESEARCH",
    label: "AI FOUNDATIONS",
    spineColor: "#211B29",
    textColor: "#F7F0FB",
    coverColor: "#2B2335",
    monogram: "AI",
    artVariant: 4,
    skills: ["Artificial Intelligence Track", "Deep Learning Foundations", "Data Structures", "Discrete Mathematics", "Systems Architecture"],
    description: "Advanced coursework and core research in Artificial Intelligence, Neural Systems, and Computational Mathematics within the School of Computer Science Engineering at Bennett University.",
  },
  {
    title: "BUSIH Hackathon Distinction",
    subtitle: "National Level Innovation Showcase · Rank 25",
    issuer: "BUSIH 2026 Council",
    issueDate: "2026",
    credentialId: "ACHV-BUSIH-25",
    label: "COMPETITIVE HACK",
    spineColor: "#2A1E14",
    textColor: "#FDF6EE",
    coverColor: "#372719",
    monogram: "25",
    artVariant: 1,
    skills: ["Rank 25 Nationwide", "Rapid AI Prototyping", "NLP Risk Modeling", "Technical Pitch", "System Architecture"],
    description: "Secured Rank 25 nationwide at the competitive Bennett University Student Innovation Hackathon (BUSIH 2026) with Team ForeSite, presenting real-time industrial hazard prediction.",
  },
]

export default function CertificatesSection() {
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const [activeBookIndex, setActiveBookIndex] = useState(0)
  const [selectedBookIndex, setSelectedBookIndex] = useState(0)
  const [isReaderOpen, setIsReaderOpen] = useState(false)
  const lastIndexRef = useRef(-1)

  const handleOpenReader = (index: number) => {
    setSelectedBookIndex(index)
    setIsReaderOpen(true)
  }

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
      const isMobile = window.innerWidth < 768

      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: () => (isMobile ? "+=1100" : "+=2000"),
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const idx = Math.min(
            CERTIFICATES.length - 1,
            Math.max(0, Math.floor(self.progress * CERTIFICATES.length))
          )
          // Only update state when the volume index actually changes
          if (idx !== lastIndexRef.current) {
            lastIndexRef.current = idx
            setActiveBookIndex(idx)
          }
        },
      })
      ScrollTrigger.refresh()
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
                  [04] Project Folios &amp; Distinctions
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#151412]/30" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#151412]/70">
                  Scroll-Driven 3D Shelf
                </span>
              </div>
              <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl text-[#151412] tracking-tight leading-none">
                Curated Project Folios &amp; Accreditations
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
                  <button
                    key={c.credentialId}
                    type="button"
                    onClick={() => setActiveBookIndex(i)}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      i === activeBookIndex
                        ? "w-8 bg-[#151412]"
                        : "w-2 bg-[#151412]/20 hover:bg-[#151412]/40"
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

            {/* Bookshelf Component (Zero timing, scroll driven, click to read folio) */}
            <div className="w-full h-[320px] sm:h-[380px] md:h-[440px]">
              <BookshelfCoverFlip
                books={shelfBooks}
                activeBook={activeBookIndex}
                onBookClick={handleOpenReader}
                disablePointer={true}
                size={380}
                spineWidth={14}
                speed={75}
                background="transparent"
                advanced={{
                  floorColor: "#151412",
                  floorOpacity: 16,
                  gap: 3,
                  hover: 50,
                  openMs: 380,
                  closeMs: 440,
                  autoPlay: false,
                  shadowOpacity: 45,
                }}
              />
            </div>

            {/* Floating Quick Action: Click to open book reader spread */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={() => handleOpenReader(activeBookIndex)}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-[#151412] text-[#EEEAE3] rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#EEEAE3]/25"
                title={`Open Volume 0${activeBookIndex + 1} Interactive Folio`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-medium truncate">Click book to float &amp; open reader ↗</span>
              </button>
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#151412]/15 pb-4 mb-8 gap-2">
          <div>
            <h3 className="font-['Instrument_Serif'] text-2xl sm:text-3xl text-[#151412]">
              Complete Project Ledger &amp; Proven Competencies
            </h3>
            <p className="text-xs text-[#151412]/60 font-mono mt-1">
              Full specification of verified projects, competitive distinctions, and engineering benchmarks.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#151412]/50">
            5 Curated Volumes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={cert.credentialId}
              onClick={() => setActiveBookIndex(idx)}
              className={`p-6 bg-[#EEEAE3] border rounded-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#151412]/40">
                      Volume 0{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenReader(idx)
                      }}
                      className="px-2.5 py-0.5 rounded bg-[#151412] text-[#EEEAE3] hover:bg-black text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      Read Folio ↗
                    </button>
                  </div>
                </div>

                <h4 className="font-['Instrument_Serif'] text-2xl text-[#151412] leading-snug">
                  {cert.title}
                </h4>
                <p className="mt-1 text-xs text-[#151412]/70 font-mono font-medium">
                  {cert.subtitle}
                </p>

                {cert.description && (
                  <p className="mt-3 text-xs text-[#151412]/75 leading-relaxed font-light">
                    {cert.description}
                  </p>
                )}
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
                    Verified Archive
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Academic & Engineering Standing Summary Card */}
          <div className="p-6 bg-[#151412] text-[#EEEAE3] rounded-xl flex flex-col justify-between border border-[#151412]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#EEEAE3]/60 block mb-2">
                Engineering Synthesis
              </span>
              <h4 className="font-['Instrument_Serif'] text-3xl italic text-[#EEEAE3] leading-tight">
                Analytical Rigor &amp; Practical Execution
              </h4>
              <p className="mt-3 text-xs text-[#EEEAE3]/70 font-light leading-relaxed">
                Bridging university academic excellence in Artificial Intelligence with production-ready AI/ML pipelines (<strong>ForeSite</strong>), environmental platforms (<strong>Terraverify</strong>), and community executive leadership at the <strong>Indian Blockchain Fraternity</strong>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEEAE3]/20 flex items-center justify-between text-xs font-mono">
              <span className="text-[#EEEAE3]/60">Greater Noida, India</span>
              <span className="px-2.5 py-1 bg-[#EEEAE3]/10 border border-[#EEEAE3]/20 rounded text-[#EEEAE3]">
                B.Tech CSE (AI) · 2029
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating 3D Open-Book Reader Modal */}
      <BookReaderModal
        isOpen={isReaderOpen}
        bookIndex={selectedBookIndex}
        books={CERTIFICATES}
        onClose={() => setIsReaderOpen(false)}
        onSelectBook={(idx) => {
          setSelectedBookIndex(idx)
          setActiveBookIndex(idx)
        }}
      />
    </div>
  )
}
