import { useState, useEffect, useRef } from "react"
import { type CertificateItem } from "./BookReaderModal"
import { CoverArt, lum } from "./BookshelfCoverFlip"

interface Physical3DBookViewerProps {
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
  specs: { label: string; value: string }[]
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
    specs: [
      { label: "Platform Type", value: "Industrial Safety & Predictive AI" },
      { label: "Core Model", value: "Sentence Transformers + XGBoost" },
      { label: "Database", value: "MongoDB Atlas Document Store" },
      { label: "Competition", value: "BUSIH Hackathon 2026 (Rank 25)" },
    ],
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
    specs: [
      { label: "Platform Type", value: "Climate Intelligence & Ecological Audit" },
      { label: "Backend", value: "Python 3 & Flask Microservices" },
      { label: "Analytics", value: "Scikit-Learn, Pandas & NumPy" },
      { label: "Registry", value: "Verified Computational Pipeline" },
    ],
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
    specs: [
      { label: "Platform Type", value: "Campus Real-Time Web Application" },
      { label: "Frontend", value: "JavaScript (ES6+) & Tailwind CSS" },
      { label: "Cloud Services", value: "Firebase Realtime DB & Auth" },
      { label: "Target Ecosystem", value: "Bennett University Student Community" },
    ],
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
    specs: [
      { label: "Institution", value: "Bennett University, Greater Noida" },
      { label: "Program", value: "B.Tech Computer Science Engineering" },
      { label: "Specialization", value: "Artificial Intelligence" },
      { label: "Graduation", value: "Class of 2029" },
    ],
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
    specs: [
      { label: "Hackathon", value: "BUSIH Hackathon 2026" },
      { label: "Standing", value: "Rank 25 Nationwide" },
      { label: "Project", value: "ForeSite: Safety & Risk AI" },
      { label: "Team", value: "Team ForeSite" },
    ],
  },
}

export default function Physical3DBookViewer({
  isOpen,
  bookIndex,
  books,
  onClose,
  onSelectBook,
}: Physical3DBookViewerProps) {
  const currentBook = books[bookIndex] || books[0]
  const details = EXTENDED_DETAILS[bookIndex] || EXTENDED_DETAILS[0]

  // Animation Stage sequence:
  // 0: Lifting out of shelf (starts at shelf plane, glides up to center)
  // 1: Center stage reached, front cover swings open (-180deg)
  // 2: Page 1 leaf turns over (-180deg)
  // 3: Settled onto full 2-page detailed chapter spread
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0)
  const [activeSpreadPage, setActiveSpreadPage] = useState<1 | 2>(1)
  const [isClosing, setIsClosing] = useState(false)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  // Orchestrate the physical book opening sequence
  useEffect(() => {
    if (!isOpen) {
      setStage(0)
      setActiveSpreadPage(1)
      setIsClosing(false)
      clearTimers()
      return
    }

    setIsClosing(false)
    setStage(0)
    setActiveSpreadPage(1)

    // Step 0 -> Step 1: Smoothly elevate book from shelf plane to center focal point
    const t0 = window.setTimeout(() => {
      setStage(1) // Front cover begins opening
    }, 550)

    // Step 1 -> Step 2: Cover has opened, now turn the first interior page leaf
    const t1 = window.setTimeout(() => {
      setStage(2) // Leaf 1 begins turning
    }, 1300)

    // Step 2 -> Step 3: Leaf has turned, settle on the open architectural spread
    const t2 = window.setTimeout(() => {
      setStage(3)
    }, 1950)

    timers.current = [t0, t1, t2]

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") {
        if (activeSpreadPage === 2) {
          setActiveSpreadPage(1)
        } else {
          onSelectBook((bookIndex - 1 + books.length) % books.length)
        }
      }
      if (e.key === "ArrowRight") {
        if (activeSpreadPage === 1) {
          setActiveSpreadPage(2)
        } else {
          onSelectBook((bookIndex + 1) % books.length)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      clearTimers()
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, bookIndex])

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    clearTimers()

    // Smooth reverse sequence:
    // 1. Fold interior leaf back
    setStage(1)
    setTimeout(() => {
      // 2. Swing cover shut
      setStage(0)
      setTimeout(() => {
        // 3. Complete glide back to shelf and unmount
        onClose()
      }, 500)
    }, 450)
  }

  if (!isOpen) return null

  // Book color and cover art settings (identical to shelf!)
  const isLightCover = lum(currentBook.coverColor) > 0.55
  const ink = isLightCover
    ? ["#FBF6EA", "#A99C86", "#4A4136"]
    : ["#D2D0CC", "#8E949D", "#2F3442"]
  const artVariant = currentBook.artVariant ?? (bookIndex % 4)

  // 3D Rotation Angles
  const isCoverOpen = stage >= 1
  const isLeaf1Turned = stage >= 2
  const isLeaf2Turned = activeSpreadPage === 2

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-6 transition-all duration-500 ease-out select-none ${
        isClosing ? "bg-black/0 opacity-0 pointer-events-none" : "bg-[#0A0908]/85 backdrop-blur-md opacity-100"
      }`}
      style={{ perspective: "2200px" }}
    >
      {/* ── Top Bar: Navigation & Status ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl flex items-center justify-between gap-4 py-2 px-4 rounded-full bg-[#1A1815]/95 border border-[#EEEAE3]/15 text-[#EEEAE3] shadow-xl shrink-0 z-30 transition-all duration-500 ${
          stage === 0 ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: currentBook.coverColor }}
          />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#EEEAE3]/80 truncate">
            Volume 0{bookIndex + 1}: {currentBook.title}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[#EEEAE3]/60">
          <span className="text-amber-400">✦</span>
          <span>
            {stage === 0
              ? "Lifting out of shelf..."
              : stage < 3
              ? "Opening hardcover & turning pages..."
              : "Physical 3D Open Folio"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Volume Switchers */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {books.map((b, i) => (
              <button
                key={b.credentialId}
                type="button"
                onClick={() => onSelectBook(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === bookIndex ? "w-6 bg-[#EEEAE3]" : "w-2 bg-[#EEEAE3]/25 hover:bg-[#EEEAE3]/50"
                }`}
                title={b.title}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="px-3.5 py-1 rounded-full bg-[#EEEAE3]/15 hover:bg-[#EEEAE3] hover:text-[#151412] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border border-[#EEEAE3]/20"
          >
            Return to Shelf ✕
          </button>
        </div>
      </div>

      {/* ── Center: 3D Physical Book Lift-Out & Open Stage ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full flex items-center justify-center py-4 relative"
        style={{ perspective: "2200px" }}
      >
        {/* ── 3D BOOK ENSEMBLE ── */}
        <div
          className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stage === 0 || isClosing
              ? "translate-y-[150px] scale-[0.62] rotate-x-[14deg] rotate-y-[-6deg] opacity-95"
              : "translate-y-0 scale-100 rotate-x-[0deg] rotate-y-[0deg] opacity-100"
          }`}
          style={{
            transformStyle: "preserve-3d",
            width: "min(94vw, 840px)",
            height: "min(72vh, 520px)",
          }}
        >
          {/* 3D Realistic Contact Shadow underneath book */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-16 rounded-[100%] pointer-events-none transition-all duration-700 blur-xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, transparent 75%)",
              opacity: stage > 0 && !isClosing ? 0.95 : 0.5,
              transform: stage > 0 && !isClosing ? "scale(1.05)" : "scale(0.7)",
            }}
          />

          {/* ════ LEFT HALF: Stationary Back Cover & Inside Left Spread ════ */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full rounded-l-2xl overflow-hidden border border-[#151412]/25 shadow-[inset_0_2px_15px_rgba(0,0,0,0.15),-20px_20px_45px_rgba(0,0,0,0.55)] transition-all duration-500"
            style={{
              backgroundColor: isCoverOpen ? "#F4EFE6" : currentBook.coverColor,
              transformOrigin: "right center",
            }}
          >
            {isCoverOpen ? (
              /* Inside Left Folio Page Spread */
              <div className="w-full h-full p-4 sm:p-7 md:p-9 flex flex-col justify-between text-[#151412] relative bg-gradient-to-r from-[#ECE4D5] via-[#F4EFE6] to-[#FBF8F2]">
                {/* Book spine crease shadow on the right edge */}
                <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-black/20 via-black/5 to-transparent" />

                {/* Top Folio Header */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#151412]/15 text-[9px] sm:text-[10px] font-mono text-[#151412]/60">
                    <span className="uppercase tracking-[0.2em]">Volume 0{bookIndex + 1} · Architectural Folio</span>
                    <span>Plate A</span>
                  </div>

                  {/* Title & Classification */}
                  <div className="mt-4">
                    <span
                      className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-semibold uppercase tracking-wider inline-block mb-1.5"
                      style={{
                        backgroundColor: `${currentBook.coverColor}18`,
                        color: currentBook.coverColor,
                      }}
                    >
                      {currentBook.label}
                    </span>
                    <h2 className="font-['Instrument_Serif'] text-xl sm:text-3xl md:text-4xl text-[#151412] leading-tight tracking-tight">
                      {currentBook.title}
                    </h2>
                    <p className="text-[10px] sm:text-xs font-mono text-[#151412]/65 mt-0.5">
                      {currentBook.subtitle}
                    </p>
                  </div>

                  {/* Overview Paragraph */}
                  <div className="mt-4 sm:mt-5 text-[11px] sm:text-xs text-[#151412]/80 leading-relaxed font-light">
                    {details.overview}
                  </div>

                  {/* Problem Statement Box */}
                  <div className="mt-4 p-3 rounded-xl bg-[#151412]/[0.03] border border-[#151412]/10">
                    <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#151412]/50 block mb-1">
                      Problem Solved:
                    </span>
                    <p className="text-[10px] sm:text-[11px] text-[#151412]/75 leading-relaxed font-light">
                      {details.problemSolved}
                    </p>
                  </div>
                </div>

                {/* Bottom Specifications Bar */}
                <div className="pt-3 border-t border-[#151412]/15 grid grid-cols-2 gap-2 text-[9px] sm:text-[10px] font-mono text-[#151412]/60">
                  <div>
                    <span className="text-[#151412]/40 block">Author:</span>
                    <span className="font-semibold text-[#151412]">Saurabh Tewari</span>
                  </div>
                  <div>
                    <span className="text-[#151412]/40 block">Registry:</span>
                    <span className="text-emerald-700 font-medium">Verified Folio</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Back of closed book while lifting */
              <div
                className="w-full h-full flex flex-col justify-between p-6"
                style={{ color: currentBook.textColor }}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">
                  Saurabh Tewari · CSE Archive
                </div>
                <div className="my-auto text-center font-['Instrument_Serif'] text-4xl italic opacity-35">
                  {currentBook.monogram}
                </div>
                <div className="text-[10px] font-mono text-right opacity-40">
                  Bennett University
                </div>
              </div>
            )}
          </div>

          {/* ════ RIGHT HALF: Stationary Base Page / Inside Right Spread ════ */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full rounded-r-2xl overflow-hidden border border-[#151412]/25 shadow-[inset_0_2px_15px_rgba(0,0,0,0.1),20px_20px_45px_rgba(0,0,0,0.55)] bg-gradient-to-l from-[#ECE4D5] via-[#F4EFE6] to-[#FBF8F2]"
            style={{ transformOrigin: "left center" }}
          >
            {/* Book spine crease shadow on the left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10" />

            {/* Simulated Paper Edge Stack (mimics depth of 200 pages on right) */}
            <div
              className="absolute right-0 top-0 bottom-0 w-2.5 pointer-events-none border-l border-amber-900/10"
              style={{
                background: "repeating-linear-gradient(to right, #E8DFCE 0px, #E8DFCE 1px, #D8CEBC 1px, #D8CEBC 2px)",
              }}
            />

            {/* Right Spread Content */}
            <div className="w-full h-full p-4 sm:p-7 md:p-9 flex flex-col justify-between text-[#151412] relative pr-6 sm:pr-8">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#151412]/15 text-[9px] sm:text-[10px] font-mono text-[#151412]/60">
                  <span className="uppercase tracking-[0.2em]">Engineering Specification &amp; Stack</span>
                  <span>Plate B</span>
                </div>

                {/* Architecture Narrative */}
                <div className="mt-4">
                  <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#151412] mb-1">
                    System Architecture &amp; Methodology:
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#151412]/80 leading-relaxed font-light">
                    {details.architecture}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="mt-4 sm:mt-5">
                  <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#151412] mb-2">
                    Key Innovations &amp; Directives:
                  </h4>
                  <div className="space-y-1.5">
                    {details.keyHighlights.slice(0, 3).map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2 text-[10px] sm:text-[11px] text-[#151412]/75 font-light">
                        <span className="text-amber-800 text-xs shrink-0 mt-0.5">✦</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applied Technologies */}
                <div className="mt-4 sm:mt-5">
                  <h4 className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-[#151412]/50 mb-1.5">
                    Applied Frameworks &amp; Tooling:
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {currentBook.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full bg-[#151412]/5 border border-[#151412]/15 text-[9px] sm:text-[10px] font-mono text-[#151412]/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Distinction Tag */}
              <div className="pt-3 border-t border-[#151412]/15 flex items-center justify-between text-[9px] sm:text-[10px] font-mono">
                <span className="text-emerald-800 font-medium truncate max-w-[220px] sm:max-w-none">
                  {details.metrics}
                </span>
                <span className="text-[#151412]/40">ID: {currentBook.credentialId}</span>
              </div>
            </div>
          </div>

          {/* ════ FLIPPABLE LEAF 1: Animated Turning Page ════ */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full transition-transform duration-700 ease-in-out pointer-events-none"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform: isLeaf1Turned ? "rotateY(-180deg)" : "rotateY(0deg)",
              zIndex: isLeaf1Turned ? 15 : 28,
            }}
          >
            {/* Front Side of Leaf 1 (seen before turning) */}
            <div
              className="absolute inset-0 rounded-r-2xl p-5 sm:p-8 bg-[#FBF8F1] border-r border-[#151412]/15 shadow-[-5px_0_15px_rgba(0,0,0,0.12)] flex flex-col justify-between text-[#151412]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#151412]/40 block mb-3">
                  Volume Foreword
                </span>
                <h3 className="font-['Instrument_Serif'] text-2xl sm:text-3xl text-[#151412] italic">
                  "{details.quote}"
                </h3>
                <p className="mt-4 text-xs text-[#151412]/75 leading-relaxed font-light">
                  {details.overview}
                </p>
              </div>
              <div className="text-[10px] font-mono text-amber-800 animate-pulse">
                Turning page... 📄
              </div>
            </div>

            {/* Back Side of Leaf 1 (seen after turning over to the left side) */}
            <div
              className="absolute inset-0 rounded-l-2xl p-4 sm:p-7 bg-[#F4EFE6] border-l border-[#151412]/15 shadow-[5px_0_15px_rgba(0,0,0,0.12)] flex flex-col justify-between text-[#151412]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="p-3 bg-[#151412]/[0.02] rounded-xl border border-[#151412]/10">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#151412]/50 block mb-1">
                  Technical Summary
                </span>
                <p className="font-['Instrument_Serif'] text-lg italic text-[#151412]">
                  {currentBook.title}
                </p>
                <p className="mt-1 text-xs text-[#151412]/70 font-mono">
                  {currentBook.subtitle}
                </p>
              </div>
              <div className="text-[9px] font-mono text-[#151412]/40">
                Page turned · Bennett CSE Archive
              </div>
            </div>
          </div>

          {/* ════ FLIPPABLE LEAF 2: Second Interactive Page ════ */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full transition-transform duration-700 ease-in-out pointer-events-none"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform: isLeaf2Turned ? "rotateY(-180deg)" : "rotateY(0deg)",
              zIndex: isLeaf2Turned ? 18 : 22,
            }}
          >
            {/* Front Side of Leaf 2 */}
            <div
              className="absolute inset-0 rounded-r-2xl p-5 sm:p-8 bg-[#FAF6EE] border-r border-[#151412]/15 shadow-[-4px_0_12px_rgba(0,0,0,0.08)] flex flex-col justify-between text-[#151412]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#151412]/40 block mb-2">
                  System Architecture
                </span>
                <h4 className="font-['Instrument_Serif'] text-xl sm:text-2xl text-[#151412]">
                  Core Architecture &amp; Methodology
                </h4>
                <p className="mt-2 text-xs text-[#151412]/75 leading-relaxed font-light">
                  {details.architecture}
                </p>
              </div>
              <div className="text-[9px] font-mono text-[#151412]/50">
                Leaf 02 · Click 'Flip to Specs' to view
              </div>
            </div>

            {/* Back Side of Leaf 2 */}
            <div
              className="absolute inset-0 rounded-l-2xl p-4 sm:p-7 bg-[#F4EFE6] border-l border-[#151412]/15 shadow-[4px_0_12px_rgba(0,0,0,0.08)] flex flex-col justify-between text-[#151412]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#151412]/50 block mb-1">
                  Specifications
                </span>
                <div className="space-y-1.5 text-[10px] font-mono text-[#151412]/75">
                  {details.specs.map((sp) => (
                    <div key={sp.label} className="flex justify-between py-0.5 border-b border-[#151412]/10">
                      <span className="text-[#151412]/50">{sp.label}:</span>
                      <span className="font-medium text-[#151412]">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[9px] font-mono text-[#151412]/40">
                Specification Chapter
              </div>
            </div>
          </div>

          {/* ════ HARDCOVER FRONT COVER: Swings Open with IDENTICAL Artwork! ════ */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full transition-transform duration-700 ease-in-out cursor-pointer pointer-events-auto"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform: isCoverOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
              zIndex: isCoverOpen ? 10 : 30,
            }}
          >
            {/* ── OUTSIDE FRONT COVER: 100% IDENTICAL to the book on the shelf! ── */}
            <div
              className="absolute inset-0 rounded-r-2xl overflow-hidden shadow-[20px_20px_50px_rgba(0,0,0,0.65)] border-r-2 border-t border-b border-black/30 flex flex-col justify-between"
              style={{
                backgroundColor: currentBook.coverColor,
                color: currentBook.textColor,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Left spine vertical strip with vertical title (matching shelf!) */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 border-r border-white/15 flex items-start justify-center pt-5 overflow-hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              >
                <span
                  style={{
                    writingMode: "vertical-rl",
                    fontFamily: "Georgia, serif",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    opacity: 0.85,
                  }}
                  className="whitespace-nowrap"
                >
                  {currentBook.title}
                </span>
              </div>

              {/* Exact CoverArt SVG (Figure with hat, Eagle, Globe, Compass, etc.) */}
              <div className="absolute left-9 sm:left-10 right-4 top-4 sm:top-5 h-[48%] flex items-center justify-center">
                <div className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[145px] md:h-[145px]">
                  <CoverArt
                    variant={artVariant}
                    ink={ink}
                    star="#D9A55A"
                    bg={currentBook.coverColor}
                    uid={`reader-art-${bookIndex}`}
                  />
                </div>
              </div>

              {/* Text Area (Kicker Label, Title, Subtitle matching shelf layout!) */}
              <div className="absolute left-10 sm:left-12 right-4 bottom-5 sm:bottom-6">
                {currentBook.label && (
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium opacity-85 mb-1.5">
                    {currentBook.label}
                  </div>
                )}
                <h3 className="font-['Instrument_Serif'] text-xl sm:text-2xl md:text-3xl leading-[1.08] text-white">
                  {currentBook.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-[11px] font-mono opacity-80">
                  <span className="w-4 h-[1px] bg-current inline-block" />
                  <span className="truncate">{currentBook.subtitle}</span>
                </div>
              </div>

              {/* Gilded right edge accent */}
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20" />
            </div>

            {/* ── INSIDE FRONT COVER (Visible after cover swings open to the left) ── */}
            <div
              className="absolute inset-0 rounded-l-2xl p-5 sm:p-8 bg-[#EFE8DA] flex flex-col justify-between text-[#151412] border-l-2 border-t border-b border-[#151412]/20 shadow-[inset_-5px_0_15px_rgba(0,0,0,0.1)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#151412]/50 block mb-2">
                  Ex Libris
                </span>
                <div className="p-4 rounded-xl border border-dashed border-[#151412]/25 bg-[#FAF7F0] text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#151412]/60 block">
                    Curated Technical Volume
                  </span>
                  <h4 className="font-['Instrument_Serif'] text-xl sm:text-2xl mt-1 text-[#151412]">
                    Saurabh Tewari
                  </h4>
                  <p className="text-[10px] font-mono text-[#151412]/50 mt-0.5">
                    Bennett University · Computer Science
                  </p>
                </div>
              </div>

              <div className="text-[9px] font-mono text-[#151412]/40 text-center">
                Hardcover Leaf Opening Sequence
              </div>
            </div>
          </div>

          {/* ════ BOOK SPINE 3D FOLD (Center Crease) ════ */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5 pointer-events-none z-40"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.35) 100%)",
            }}
          >
            {/* Hanging Silk Ribbon Bookmark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-14 bg-amber-700/85 rounded-b shadow-md flex items-end justify-center pb-1">
              <span className="text-[8px] text-white/90">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Controls: Interactive Page Turning & Volume Navigation ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-3xl flex flex-wrap items-center justify-between gap-3 py-2.5 px-5 rounded-2xl bg-[#1A1815]/95 border border-[#EEEAE3]/15 text-[#EEEAE3] shadow-xl shrink-0 z-30 transition-all duration-500 ${
          stage === 0 ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectBook((bookIndex - 1 + books.length) % books.length)}
            className="px-3 py-1 rounded-full border border-[#EEEAE3]/20 hover:border-[#EEEAE3] text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            title="Previous volume"
          >
            ← Vol 0{((bookIndex - 1 + books.length) % books.length) + 1}
          </button>
          <button
            type="button"
            onClick={() => onSelectBook((bookIndex + 1) % books.length)}
            className="px-3 py-1 rounded-full border border-[#EEEAE3]/20 hover:border-[#EEEAE3] text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            title="Next volume"
          >
            Vol 0{((bookIndex + 1) % books.length) + 1} →
          </button>
        </div>

        {/* Interactive 3D Page Turn Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSpreadPage(activeSpreadPage === 1 ? 2 : 1)}
            className="px-3.5 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {activeSpreadPage === 1 ? "Flip to Specs Page 📄 ↗" : "Flip Back to Chapter ↶"}
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-1 rounded-full bg-[#EEEAE3] text-[#151412] hover:bg-white text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
          >
            Slide Back into Shelf ↩
          </button>
        </div>
      </div>
    </div>
  )
}
