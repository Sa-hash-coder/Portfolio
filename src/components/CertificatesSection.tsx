import React from "react"
import BookshelfCoverFlip from "./BookshelfCoverFlip"

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
  const [selectedCert, setSelectedCert] = React.useState<Certificate | null>(null)

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

  return (
    <section className="relative min-h-screen py-20 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#EEEAE3] border-t border-[#151412]/15 overflow-hidden">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#151412]/15 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#151412]/50">
                [04] Certified Distinctions
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#151412]/30" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#151412]/60">
                Accredited Library
              </span>
            </div>
            <h2 className="font-['Instrument_Serif'] text-4xl sm:text-5xl md:text-6xl text-[#151412] tracking-tight leading-[1.05]">
              Certificates &amp; Specializations
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#151412]/70 leading-relaxed font-light">
            A three-dimensional curated archive of verified technical accreditations. Hover over any volume to open its cover, or browse the edition ledger below.
          </p>
        </div>

        {/* ── 3D Interactive Bookshelf Stage ── */}
        <div className="relative mt-8 bg-[#E9E4DC]/50 rounded-2xl border border-[#151412]/10 overflow-hidden shadow-[inset_0_2px_12px_rgba(21,20,18,0.04)]">
          {/* Subtle Stage Top Badge */}
          <div className="absolute top-4 left-6 z-10 flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#151412]/40 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#151412]/50">
              Interactive 3D Bookshelf · Auto-Cycles On Idle
            </span>
          </div>

          <div className="absolute top-4 right-6 z-10 hidden sm:flex items-center gap-2 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#151412]/40">
              Hover to Flip Cover · 5 Editions
            </span>
          </div>

          {/* Bookshelf Component */}
          <div className="w-full h-[460px] sm:h-[500px] md:h-[540px]">
            <BookshelfCoverFlip
              books={shelfBooks}
              size={420}
              spineWidth={14}
              speed={48}
              background="transparent"
              advanced={{
                floorColor: "#151412",
                floorOpacity: 16,
                gap: 3,
                hover: 55,
                openMs: 540,
                closeMs: 650,
                holdMs: 2800,
                idleMs: 2600,
                autoPlay: true,
                shadowOpacity: 50,
              }}
            />
          </div>

          {/* Bookshelf Base Trim */}
          <div className="px-6 py-3 border-t border-[#151412]/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#151412]/60 bg-[#EEEAE3]/80">
            <div className="flex items-center gap-4">
              <span>✦ All 5 Volumes Verified</span>
              <span className="hidden sm:inline text-[#151412]/30">|</span>
              <span className="hidden sm:inline">Bennett University CSE Track</span>
            </div>
            <div className="text-[#151412]/50">
              Interactive Physics &amp; Dynamic 3D Bezier Curves
            </div>
          </div>
        </div>

        {/* ── Certificate Ledger Cards ── */}
        <div className="mt-14">
          <div className="flex items-center justify-between border-b border-[#151412]/15 pb-3 mb-6">
            <h3 className="font-['Instrument_Serif'] text-2xl text-[#151412] italic">
              Verification Ledger &amp; Core Competencies
            </h3>
            <span className="text-xs font-mono uppercase tracking-widest text-[#151412]/40">
              5 of 5 Accredited
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert, idx) => (
              <div
                key={cert.credentialId}
                onClick={() => setSelectedCert(selectedCert?.credentialId === cert.credentialId ? null : cert)}
                className="group p-6 bg-[#EEEAE3] hover:bg-[#E9E4DC] border border-[#151412]/15 hover:border-[#151412]/40 rounded-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
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
                      0{idx + 1} / {cert.issueDate}
                    </span>
                  </div>

                  <h4 className="font-['Instrument_Serif'] text-2xl text-[#151412] leading-snug group-hover:underline decoration-1 underline-offset-4">
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
    </section>
  )
}
