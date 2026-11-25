import { useEffect } from "react"

export interface CertificateItem {
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
  detailedNarrative?: {
    overview: string
    problemSolved: string
    architecture: string
    keyHighlights: string[]
    metrics: string
  }
}

interface BookReaderModalProps {
  isOpen: boolean
  bookIndex: number
  books: CertificateItem[]
  onClose: () => void
  onSelectBook: (index: number) => void
}

const EXTENDED_DETAILS: Record<number, {
  overview: string
  problemSolved: string
  architecture: string
  keyHighlights: string[]
  metrics: string
  quote: string
}> = {
  0: {
    overview:
      "ForeSite is an AI-powered industrial intelligence platform designed to actively predict and mitigate workplace accidents before they occur. It processes unstructured incident logs, sensor inputs, and safety reports to evaluate workplace risk severity.",
    problemSolved:
      "Traditional industrial facilities rely on manual, retrospective hazard logging that leaves safety critical reports buried in spreadsheets for days. ForeSite automates immediate semantic risk scoring.",
    architecture:
      "Built with Python and Sentence Transformers for high-dimensional semantic embeddings, coupled with an XGBoost gradient boosting classifier for risk severity scoring and MongoDB Atlas for document persistence.",
    keyHighlights: [
      "NLP-based risk classification and semantic prioritization of industrial incident reports.",
      "Vector embeddings using Sentence Transformers for deep semantic context parsing.",
      "XGBoost classification models tuned for high-precision hazard categorization.",
      "MongoDB document store modeling safety checklists and triage states.",
    ],
    metrics: "Secured Rank 25 Nationwide at BUSIH Hackathon 2026 with Team ForeSite.",
    quote: "Transforming reactive hazard logging into proactive, real-time industrial safety intelligence.",
  },
  1: {
    overview:
      "Terraverify is a specialized environmental intelligence and audit verification platform built to assess ecological datasets, carbon metrics, and environmental sustainability claims against transparent computational benchmarks.",
    problemSolved:
      "Greenwashing and unreliable sensor calibration often compromise ecological compliance reporting. Terraverify establishes an automated heuristic audit pipeline to detect anomalies in environmental claims.",
    architecture:
      "Engineered with a Python analytical backend, Scikit-learn validation models, lightweight Flask microservices for data interchange, and pandas/NumPy pipelines for continuous statistical verification.",
    keyHighlights: [
      "Automated verification algorithms detecting outliers and distortions in sustainability metrics.",
      "Scikit-learn statistical pipelines evaluating sensor telemetry and emissions records.",
      "Lightweight Python Flask REST micro-services delivering rapid verification audit scores.",
      "Clear, tamper-evident audit ledger reporting ecological integrity.",
    ],
    metrics: "Production-grade predictive heuristic pipeline for ecological audit datasets.",
    quote: "Grounding environmental accountability and sustainability claims in empirical computation.",
  },
  2: {
    overview:
      "Findify is a dedicated university campus platform built to solve the persistent operational challenge of lost and misplaced student items, streamlining discovery, image verification, and secure item reclamation.",
    problemSolved:
      "Campus lost-and-found systems frequently depend on disjointed WhatsApp groups or notice boards, resulting in low recovery rates. Findify establishes an organized, central university clearinghouse.",
    architecture:
      "Crafted with modern HTML5, clean CSS/Tailwind layouts, and reactive JavaScript (ES6+), integrated seamlessly with Google Firebase Realtime Database and Firestore for instantaneous cloud data synchronization.",
    keyHighlights: [
      "Real-time event discovery with instant synchronization powered by Google Firebase.",
      "User authentication and claim verification workflows to safeguard recovered property.",
      "Categorized filtering by location, item classification, and recovery timestamp.",
      "Mobile-optimized responsive interface tailored for fast campus-wide student usage.",
    ],
    metrics: "Campus-wide student platform streamlining item discovery and secure retrieval.",
    quote: "Solving daily university friction through clean interface design and instantaneous cloud persistence.",
  },
  3: {
    overview:
      "An intensive academic program within the School of Computer Science Engineering at Bennett University, focusing on Artificial Intelligence, Neural Paradigms, Discrete Mathematics, and High-Performance Systems.",
    problemSolved:
      "Bridging pure theoretical computer science with applied machine learning engineering, mastering algorithmic proof methods, discrete graph formulations, and modern neural architectures.",
    architecture:
      "Comprehensive curriculum spanning C++ object-oriented discipline, Python scientific frameworks (NumPy, pandas, Scikit-learn), asymptotic computational complexity, and modern AI engineering.",
    keyHighlights: [
      "Deep grounding in C++ memory management, pointers, and object-oriented architectures.",
      "Rigorous mastery of data structures: Segment Trees, Heaps, Graph traversals, and Dynamic Programming.",
      "Artificial Intelligence track curriculum emphasizing deep learning and neural models.",
      "Executive technical engagement as Vice Chairperson of the Indian Blockchain Fraternity.",
    ],
    metrics: "Top-Tier University Academic Distinction · B.Tech CSE (AI Specialization · 2029).",
    quote: "Developing the mathematical and algorithmic rigor essential for next-generation intelligence systems.",
  },
  4: {
    overview:
      "Nationwide competitive hackathon achievement at the Bennett University Student Innovation Hackathon (BUSIH 2026), where Team ForeSite designed, built, and defended an end-to-end industrial hazard prediction engine.",
    problemSolved:
      "Rapidly conceptualizing, training, and deploying a functional AI safety architecture under extreme 24-48 hour hackathon time constraints while maintaining system robustness and high predictive accuracy.",
    architecture:
      "Fast-paced sprint integrating Python NLP models, Sentence Transformers, XGBoost classification, and live MongoDB persistence, presented to a panel of senior faculty and industry engineering judges.",
    keyHighlights: [
      "Secured Rank 25 among competitive nationwide engineering teams.",
      "Engineered real-time NLP classification models for industrial incident telemetry.",
      "Delivered high-stakes technical architecture pitch and live prototype demonstration.",
      "Collaborative teamwork under pressure, demonstrating technical agility and leadership.",
    ],
    metrics: "Rank 25 Nationwide distinction · Bennett University Student Innovation Hack 2026.",
    quote: "Demonstrating rapid prototyping, high-pressure execution, and collaborative engineering excellence.",
  },
}

export default function BookReaderModal({
  isOpen,
  bookIndex,
  books,
  onClose,
  onSelectBook,
}: BookReaderModalProps) {
  const currentBook = books[bookIndex] || books[0]
  const details = EXTENDED_DETAILS[bookIndex] || EXTENDED_DETAILS[0]

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") {
        onSelectBook((bookIndex - 1 + books.length) % books.length)
      }
      if (e.key === "ArrowRight") {
        onSelectBook((bookIndex + 1) % books.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, bookIndex, books.length, onClose, onSelectBook])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#151412]/80 backdrop-blur-md animate-fadeIn"
      style={{ isolation: "isolate" }}
    >
      {/* ── Main Floating Open-Book Shell ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] bg-[#FAF7F0] text-[#151412] rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.65),0_15px_35px_rgba(0,0,0,0.35)] border border-[#151412]/20 flex flex-col overflow-hidden animate-scaleUp"
      >
        {/* Top Control Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#151412]/15 bg-[#EEEAE3] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className="w-3 h-3 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: currentBook.coverColor }}
            />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#151412]/80 truncate">
              Volume 0{bookIndex + 1} of 0{books.length}: {currentBook.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Volume Navigator Dots */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              {books.map((b, i) => (
                <button
                  key={b.credentialId}
                  type="button"
                  onClick={() => onSelectBook(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === bookIndex ? "w-6 bg-[#151412]" : "w-2 bg-[#151412]/25 hover:bg-[#151412]/50"
                  }`}
                  title={b.title}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-md bg-[#151412]/10 hover:bg-[#151412] hover:text-[#EEEAE3] transition-all text-[11px] font-mono tracking-wider cursor-pointer"
            >
              ✕ ESC
            </button>
          </div>
        </div>

        {/* ── The Two-Page Open Book Spread ── */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 relative bg-[#FAF7F0]">
          {/* Subtle center spine seam shadow on medium+ screens */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 pointer-events-none z-10 bg-gradient-to-r from-transparent via-[#151412]/[0.08] to-transparent" />

          {/* ════ LEFT PAGE: Cover Plate, Monogram & Registry Identity ════ */}
          <div className="md:col-span-5 p-5 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#151412]/15 bg-[#F6F2E9]/80 relative">
            {/* Red Bookmark Ribbon */}
            <div className="absolute top-0 right-6 w-5 h-8 bg-amber-700/80 shadow-md rounded-b flex items-end justify-center pb-1">
              <span className="text-[8px] text-white/90 font-mono">✦</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${currentBook.coverColor}18`,
                    color: currentBook.coverColor,
                  }}
                >
                  {currentBook.label}
                </span>
                <span className="text-[10px] font-mono text-[#151412]/50">
                  Vol. 0{bookIndex + 1}
                </span>
              </div>

              {/* Hardcover Mini Plate Replica */}
              <div
                className="w-full rounded-xl p-5 sm:p-6 shadow-md mb-6 relative overflow-hidden transition-colors duration-300"
                style={{
                  backgroundColor: currentBook.coverColor,
                  color: currentBook.textColor,
                }}
              >
                <div className="absolute top-3 right-3 text-2xl font-['Instrument_Serif'] italic opacity-40">
                  {currentBook.monogram}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-60 block mb-1">
                  Curated Folio Edition
                </span>
                <h3 className="font-['Instrument_Serif'] text-2xl sm:text-3xl leading-tight">
                  {currentBook.title}
                </h3>
                <p className="mt-1 text-xs opacity-75 font-mono">
                  {currentBook.subtitle}
                </p>

                <div className="mt-6 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] font-mono opacity-70">
                  <span>ID: {currentBook.credentialId}</span>
                  <span>Bennett Univ</span>
                </div>
              </div>

              {/* Quote from the Architecture */}
              <div className="p-4 rounded-xl bg-[#151412]/[0.03] border border-[#151412]/10 mb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#151412]/40 block mb-1">
                  Guiding Philosophy
                </span>
                <p className="font-['Instrument_Serif'] text-base sm:text-lg italic text-[#151412] leading-snug">
                  "{details.quote}"
                </p>
              </div>

              {/* Registry Specifications */}
              <div className="space-y-1.5 text-xs font-mono text-[#151412]/70 pt-2">
                <div className="flex justify-between py-1 border-b border-[#151412]/10">
                  <span className="text-[#151412]/50">Author:</span>
                  <span className="font-medium text-[#151412]">Saurabh Tewari</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#151412]/10">
                  <span className="text-[#151412]/50">Issuer / Track:</span>
                  <span className="font-medium text-[#151412]">{currentBook.issuer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#151412]/10">
                  <span className="text-[#151412]/50">Status:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    Verified Archive
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 text-[10px] font-mono text-[#151412]/40 flex items-center justify-between">
              <span>Folio Page 01 · Reference</span>
              <span>Bennett CSE Archive</span>
            </div>
          </div>

          {/* ════ RIGHT PAGE: Architectural Narrative & Technical Specs ════ */}
          <div className="md:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col justify-between bg-[#FAF7F0]">
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#151412]/50 pb-2 border-b border-[#151412]/15 mb-4">
                <span className="uppercase tracking-[0.2em]">Chapter Specification &amp; Analysis</span>
                <span>Page 02</span>
              </div>

              {/* Title & Overview */}
              <h2 className="font-['Instrument_Serif'] text-2xl sm:text-3xl md:text-4xl text-[#151412] leading-tight">
                {currentBook.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#151412]/80 leading-relaxed font-light">
                {details.overview}
              </p>

              {/* Problem Solved */}
              <div className="mt-5">
                <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#151412] mb-1">
                  Problem &amp; Motivation:
                </h4>
                <p className="text-xs text-[#151412]/75 leading-relaxed font-light">
                  {details.problemSolved}
                </p>
              </div>

              {/* Architecture & Engineering Approach */}
              <div className="mt-5">
                <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#151412] mb-1">
                  System Architecture &amp; Execution:
                </h4>
                <p className="text-xs text-[#151412]/75 leading-relaxed font-light">
                  {details.architecture}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="mt-5">
                <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#151412] mb-2">
                  Engineering Highlights &amp; Capabilities:
                </h4>
                <div className="space-y-1.5">
                  {details.keyHighlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2 text-xs text-[#151412]/80 font-light">
                      <span className="text-amber-800 text-sm leading-none mt-0.5">✦</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="mt-6">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#151412]/50 mb-2">
                  Applied Tech Stack &amp; Libraries:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentBook.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-full bg-[#151412]/5 border border-[#151412]/15 text-[11px] font-mono text-[#151412]/85 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Navigation */}
            <div className="mt-8 pt-4 border-t border-[#151412]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-emerald-800 font-medium">
                Distinction: {details.metrics}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectBook((bookIndex - 1 + books.length) % books.length)}
                  className="px-3 py-1 border border-[#151412]/20 hover:border-[#151412] rounded-full text-xs font-mono uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => onSelectBook((bookIndex + 1) % books.length)}
                  className="px-3 py-1 border border-[#151412]/20 hover:border-[#151412] bg-[#151412] text-[#EEEAE3] rounded-full text-xs font-mono uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
                >
                  Next Volume →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
