/**
 * Physical3DBookViewer — Cinematic GSAP-powered book lift-out + page turn
 *
 * Animation sequence (GSAP timeline, no Tailwind class toggling for 3D):
 *   0. Backdrop fades in
 *   1. Book rises from shelf plane (translateZ, rotateX, scale) → center stage
 *   2. Front cover swings open (rotateY 0 → -180) with hinge at left edge
 *   3. Leaf-1 turns (rotateY 0 → -180) showing foreword → content
 *   4. UI chrome slides in (top bar + bottom controls)
 *
 * Close (reverse GSAP timeline, calls onClose() on complete)
 */
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { type CertificateItem } from "./BookReaderModal"
import { CoverArt, lum } from "./BookshelfCoverFlip"

interface Physical3DBookViewerProps {
  isOpen: boolean
  bookIndex: number
  books: CertificateItem[]
  onClose: () => void
  onSelectBook: (index: number) => void
}

/* ─── Extended per-book detail pages ─── */
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
      "Terraverify is a specialized environmental intelligence and audit verification platform built to assess ecological datasets, carbon metrics, and sustainability claims against transparent computational benchmarks.",
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
      "NanoVCS is a custom version control system engineered in Java to replicate core Git internals from the ground up. Designed to explore content-addressable storage, graph-based commit tracking, and custom HTTP serving without relying on third-party backend frameworks, it pairs a CLI tool (init, add, commit, log, branching) with a browser-based repository visualizer.",
    problemSolved:
      "Most developers use Git as a black box without seeing how snapshots, diffs, and commit graphs work under the hood. NanoVCS rebuilds those internals from first principles with an interactive visual inspector.",
    architecture:
      "Java core engine implementing SHA-256 content-addressable object storage and a Directed Acyclic Graph (DAG) commit history with HEAD pointer tracking, paired with a built-in Java HTTP server serving a Tailwind CSS and Vis.js web dashboard.",
    keyHighlights: [
      "Content-Addressable Storage: SHA-256 cryptographic hashing to deduplicate file snapshots and guarantee commit integrity.",
      "DAG Commit & Branch Architecture: Non-linear branching, HEAD pointer tracking, and traversal across commit ancestors.",
      "Line-by-Line Diff Engine: Custom file comparison algorithm computing additions, deletions, and modifications between revisions.",
      "Framework-Free Local Web Dashboard: Built-in Java HTTP server with Tailwind CSS and Vis.js to interactively render the commit DAG and file diffs.",
    ],
    metrics: "Built from first principles in Java · CLI + Framework-Free Web DAG Visualizer.",
    quote: "Replicating core Git internals from first principles — content-addressable storage to live DAG visualization.",
    specs: [
      { label: "System Type", value: "Lightweight Version Control System" },
      { label: "Core Language", value: "Java (Framework-Free)" },
      { label: "Storage & Graph", value: "SHA-256 Object Store + DAG" },
      { label: "Web Visualizer", value: "Java HTTP Server + Tailwind + Vis.js" },
    ],
  },
  4: {
    overview:
      "ForestFireWatch is a software-based wildfire prediction system that uses satellite-based fire observations and historical weather patterns to identify potential wildfire activity. By combining NASA FIRMS and ERA5 meteorological data, it explores how environmental conditions and geographical patterns predict wildfire occurrences.",
    problemSolved:
      "Late wildfire detection leaves emergency responders reacting after fires escalate. ForestFireWatch models meteorological and satellite signals across grid cells to forecast fire risk before ignition.",
    architecture:
      "Python machine learning pipeline ingesting NASA FIRMS fire observations and ERA5 weather variables (temperature, precipitation, wind) with Pandas and NumPy, training Scikit-learn classification models evaluated via classification metrics and visualized with Matplotlib and Seaborn.",
    keyHighlights: [
      "Wildfire Prediction: Machine learning classification models estimating the likelihood of fire occurrence.",
      "Environmental & Geospatial Analysis: Processes temperature, precipitation, and wind across geographical grid cells.",
      "Risk Visualization: Presents fire-risk patterns through heatmaps, graphs, and geographical visualizations.",
      "Model Evaluation & SDG Alignment: Compares ML models using classification metrics; aligned with SDG 13 (Climate Action) & SDG 15 (Life on Land).",
    ],
    metrics: "Machine Learning · Climate Tech · SDG 13 & SDG 15 Aligned.",
    quote: "Predicting tomorrow's fire risk using today's environmental data.",
    specs: [
      { label: "Category", value: "Machine Learning · Environmental AI" },
      { label: "Data Sources", value: "NASA FIRMS & ERA5 Meteorological Data" },
      { label: "ML & Analytics", value: "Python, Scikit-learn, Pandas, NumPy" },
      { label: "SDG Alignment", value: "SDG 13 (Climate Action) · SDG 15 (Life on Land)" },
    ],
  },
}

/* ─── Shared style helpers ─── */
const preserve3d: React.CSSProperties = { transformStyle: "preserve-3d" }
const backfaceHidden: React.CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
}

export default function Physical3DBookViewer({
  isOpen,
  bookIndex,
  books,
  onClose,
  onSelectBook,
}: Physical3DBookViewerProps) {
  /* ── Refs for GSAP targets ── */
  const overlayRef   = useRef<HTMLDivElement>(null)
  const sceneRef     = useRef<HTMLDivElement>(null)   // perspective wrapper
  const bookRef      = useRef<HTMLDivElement>(null)   // the whole book block
  const coverRef     = useRef<HTMLDivElement>(null)   // right-half flap (front cover)
  const leaf1Ref     = useRef<HTMLDivElement>(null)   // first turning leaf
  const topBarRef    = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const shadowRef    = useRef<HTMLDivElement>(null)

  /* ── State only for content visibility after book is open ── */
  const [contentVisible, setContentVisible] = useState(false)
  const [activeSpreadPage, setActiveSpreadPage] = useState<1 | 2>(1)

  const openTl  = useRef<gsap.core.Timeline | null>(null)
  const closeTl = useRef<gsap.core.Timeline | null>(null)
  const isClosingRef = useRef(false)

  /* ════════ OPEN sequence ════════ */
  useEffect(() => {
    if (!isOpen) {
      setContentVisible(false)
      setActiveSpreadPage(1)
      isClosingRef.current = false
      return
    }

    // Kill any stale timeline
    openTl.current?.kill()
    closeTl.current?.kill()
    isClosingRef.current = false
    setContentVisible(false)
    setActiveSpreadPage(1)

    // ── Lock initial positions via GSAP set (zero CSS transition interference) ──
    gsap.set(overlayRef.current,   { opacity: 0 })
    gsap.set(bookRef.current,      {
      transformPerspective: 1800,
      ...preserve3d,
      z: -700,
      y: 220,
      rotateX: 28,
      rotateY: -18,
      scale: 0.38,
      opacity: 0.6,
      willChange: "transform",
    })
    gsap.set(coverRef.current,  { rotateY: 0, transformOrigin: "left center", ...preserve3d })
    gsap.set(leaf1Ref.current,  { rotateY: 0, transformOrigin: "left center", ...preserve3d })
    gsap.set(topBarRef.current,    { opacity: 0, y: -20 })
    gsap.set(bottomBarRef.current, { opacity: 0, y:  20 })
    gsap.set(shadowRef.current,    { opacity: 0, scaleX: 0.5 })

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
    openTl.current = tl

    // 0. Backdrop fades in
    tl.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" })

    // 1. Book rises from shelf — the cinematic lift
    tl.to(bookRef.current, {
      z: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      duration: 0.95,
      ease: "power4.out",
    }, "-=0.1")

    // shadow grows as book lifts
    tl.to(shadowRef.current, { opacity: 1, scaleX: 1, duration: 0.6 }, "<")

    // 2. Brief pause — then front cover swings open
    tl.to(coverRef.current, {
      rotateY: -180,
      duration: 0.75,
      ease: "power2.inOut",
    }, "+=0.08")

    // 3. Leaf 1 turns slightly after cover starts
    tl.to(leaf1Ref.current, {
      rotateY: -180,
      duration: 0.60,
      ease: "power1.inOut",
    }, "-=0.42")

    // 4. UI chrome slides in
    tl.to([topBarRef.current, bottomBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power3.out",
    }, "-=0.35")

    // 5. Reveal inner content
    tl.call(() => setContentVisible(true), [], "-=0.2")

    // keyboard
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") {
        if (activeSpreadPage === 2) setActiveSpreadPage(1)
        else onSelectBook((bookIndex - 1 + books.length) % books.length)
      }
      if (e.key === "ArrowRight") {
        if (activeSpreadPage === 1) setActiveSpreadPage(2)
        else onSelectBook((bookIndex + 1) % books.length)
      }
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    return () => {
      tl.kill()
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, bookIndex])

  /* ════════ CLOSE sequence ════════ */
  const handleClose = () => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    openTl.current?.kill()

    const tl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false
        onClose()
      },
    })
    closeTl.current = tl

    // Chrome slides out
    tl.to([bottomBarRef.current, topBarRef.current], {
      opacity: 0,
      y: (i) => (i === 0 ? 20 : -20),
      duration: 0.25,
      stagger: 0.05,
    })

    // Leaf folds back
    tl.to(leaf1Ref.current, {
      rotateY: 0,
      duration: 0.42,
      ease: "power2.in",
    }, "-=0.15")

    // Cover slams shut
    tl.to(coverRef.current, {
      rotateY: 0,
      duration: 0.52,
      ease: "power2.in",
    }, "-=0.28")

    // Book sinks back to shelf plane
    tl.to(bookRef.current, {
      z: -700,
      y: 220,
      rotateX: 28,
      rotateY: -18,
      scale: 0.38,
      opacity: 0,
      duration: 0.65,
      ease: "power3.in",
    }, "-=0.18")

    tl.to(shadowRef.current, { opacity: 0, scaleX: 0.4, duration: 0.4 }, "<")
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2")
  }

  /* ── Leaf 2 (specs page) interactive turn ── */
  const leaf2Ref = useRef<HTMLDivElement>(null)
  const handleFlipSpread = () => {
    const next = activeSpreadPage === 1 ? 2 : 1
    setActiveSpreadPage(next)
    gsap.to(leaf2Ref.current, {
      rotateY: next === 2 ? -180 : 0,
      duration: 0.55,
      ease: "power2.inOut",
    })
  }

  if (!isOpen) return null

  /* ── Book theming ── */
  const currentBook = books[bookIndex] || books[0]
  const details     = EXTENDED_DETAILS[bookIndex] || EXTENDED_DETAILS[0]
  const isLightCover = lum(currentBook.coverColor) > 0.55
  const ink = isLightCover
    ? ["#FBF6EA", "#A99C86", "#4A4136"]
    : ["#D2D0CC", "#8E949D", "#2F3442"]
  const artVariant = currentBook.artVariant ?? (bookIndex % 4)

  return (
    /* ── Backdrop ── */
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px",
        background: "rgba(10,9,8,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        userSelect: "none",
        willChange: "opacity",
      }}
    >
      {/* ── Top Bar ── */}
      <div
        ref={topBarRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "8px 18px",
          borderRadius: 999,
          background: "rgba(26,24,21,0.97)",
          border: "1px solid rgba(238,234,227,0.14)",
          color: "#EEEAE3",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          flexShrink: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
            backgroundColor: currentBook.coverColor,
            boxShadow: `0 0 8px ${currentBook.coverColor}99`,
          }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(238,234,227,0.8)" }}>
            Volume 0{bookIndex + 1}: {currentBook.title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Volume dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {books.map((b, i) => (
              <button
                key={b.credentialId}
                type="button"
                onClick={() => onSelectBook(i)}
                title={b.title}
                style={{
                  height: 8,
                  width: i === bookIndex ? 24 : 8,
                  borderRadius: 999,
                  background: i === bookIndex ? "#EEEAE3" : "rgba(238,234,227,0.22)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleClose}
            style={{
              padding: "4px 14px",
              borderRadius: 999,
              background: "rgba(238,234,227,0.12)",
              border: "1px solid rgba(238,234,227,0.2)",
              color: "#EEEAE3",
              fontFamily: "monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#EEEAE3"; e.currentTarget.style.color = "#151412" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(238,234,227,0.12)"; e.currentTarget.style.color = "#EEEAE3" }}
          >
            Return to Shelf ✕
          </button>
        </div>
      </div>

      {/* ── 3D Scene ── */}
      <div
        ref={sceneRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1800px",
          perspectiveOrigin: "50% 48%",
        }}
      >
        {/* ── Book Block (GSAP animates this) ── */}
        <div
          ref={bookRef}
          style={{
            position: "relative",
            width: "min(94vw, 860px)",
            height: "min(70vh, 530px)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Contact shadow */}
          <div
            ref={shadowRef}
            style={{
              position: "absolute",
              bottom: -36,
              left: "50%",
              transform: "translateX(-50%)",
              width: "78%",
              height: 48,
              borderRadius: "100%",
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 72%)",
              filter: "blur(10px)",
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />

          {/* ══ LEFT HALF: Back cover / open left page ══ */}
          <div
            style={{
              position: "absolute",
              left: 0, top: 0,
              width: "50%", height: "100%",
              borderRadius: "16px 0 0 16px",
              overflow: "hidden",
              border: "1px solid rgba(21,20,18,0.25)",
              boxShadow: "-20px 20px 50px rgba(0,0,0,0.6), inset 0 2px 12px rgba(0,0,0,0.12)",
              backgroundColor: contentVisible ? "#F4EFE6" : currentBook.coverColor,
              transition: "background-color 0.3s",
            }}
          >
            {contentVisible ? (
              /* Inside Left Page */
              <div style={{
                width: "100%", height: "100%",
                padding: "clamp(16px, 3vw, 36px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                color: "#151412",
                background: "linear-gradient(135deg, #ECE4D5 0%, #F4EFE6 50%, #FBF8F2 100%)",
                position: "relative",
              }}>
                {/* Spine crease */}
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 28, background: "linear-gradient(to left, rgba(0,0,0,0.18), rgba(0,0,0,0.04), transparent)", pointerEvents: "none" }} />

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid rgba(21,20,18,0.14)", fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(21,20,18,0.55)" }}>
                    <span>Volume 0{bookIndex + 1} · Folio</span>
                    <span>Plate A</span>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <span style={{
                      display: "inline-block", padding: "2px 8px", borderRadius: 4,
                      backgroundColor: `${currentBook.coverColor}1A`,
                      color: currentBook.coverColor,
                      fontFamily: "monospace", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.18em",
                      marginBottom: 6,
                    }}>{currentBook.label}</span>
                    <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(18px, 2.8vw, 36px)", lineHeight: 1.1, margin: 0 }}>
                      {currentBook.title}
                    </h2>
                    <p style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(21,20,18,0.6)", marginTop: 4 }}>
                      {currentBook.subtitle}
                    </p>
                  </div>
                  <p style={{ marginTop: 14, fontSize: "clamp(9px, 1.1vw, 11px)", lineHeight: 1.65, color: "rgba(21,20,18,0.78)", fontWeight: 300 }}>
                    {details.overview}
                  </p>
                  <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "rgba(21,20,18,0.03)", border: "1px solid rgba(21,20,18,0.1)" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(21,20,18,0.45)", display: "block", marginBottom: 4 }}>Problem Solved:</span>
                    <p style={{ fontSize: "clamp(9px, 1.1vw, 11px)", color: "rgba(21,20,18,0.72)", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
                      {details.problemSolved}
                    </p>
                  </div>
                </div>
                <div style={{ paddingTop: 10, borderTop: "1px solid rgba(21,20,18,0.14)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.55)" }}>
                  <div><span style={{ display: "block", color: "rgba(21,20,18,0.38)" }}>Author:</span><span style={{ fontWeight: 600, color: "#151412" }}>Saurabh Tewari</span></div>
                  <div><span style={{ display: "block", color: "rgba(21,20,18,0.38)" }}>Registry:</span><span style={{ color: "#166534", fontWeight: 500 }}>Verified Folio</span></div>
                </div>
              </div>
            ) : (
              /* Back of closed cover (shown while lifting) */
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24, color: currentBook.textColor }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.4 }}>Saurabh Tewari · CSE Archive</div>
                <div style={{ textAlign: "center", fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 42, fontStyle: "italic", opacity: 0.3 }}>{currentBook.monogram}</div>
                <div style={{ fontFamily: "monospace", fontSize: 9, textAlign: "right", opacity: 0.4 }}>Bennett University</div>
              </div>
            )}
          </div>

          {/* ══ RIGHT HALF: Base page (always visible underneath flaps) ══ */}
          <div style={{
            position: "absolute",
            right: 0, top: 0,
            width: "50%", height: "100%",
            borderRadius: "0 16px 16px 0",
            overflow: "hidden",
            border: "1px solid rgba(21,20,18,0.22)",
            boxShadow: "20px 20px 50px rgba(0,0,0,0.55), inset 0 2px 12px rgba(0,0,0,0.08)",
            background: "linear-gradient(225deg, #ECE4D5 0%, #F4EFE6 55%, #FBF8F2 100%)",
          }}>
            {/* Spine crease left */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 28, background: "linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.04), transparent)", zIndex: 2, pointerEvents: "none" }} />
            {/* Paper stack illusion right */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 10, background: "repeating-linear-gradient(to right, #E8DFCE 0px, #E8DFCE 1px, #D8CEBC 1px, #D8CEBC 2px)", pointerEvents: "none" }} />

            <div style={{ width: "100%", height: "100%", padding: "clamp(14px, 2.5vw, 32px)", paddingRight: "clamp(18px, 3vw, 42px)", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#151412", position: "relative" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid rgba(21,20,18,0.14)", fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(21,20,18,0.5)" }}>
                  <span>Engineering Spec</span>
                  <span>Plate B</span>
                </div>
                <div style={{ marginTop: 14 }}>
                  <h4 style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, color: "#151412", margin: "0 0 4px" }}>System Architecture &amp; Methodology:</h4>
                  <p style={{ fontSize: "clamp(9px, 1.1vw, 11px)", color: "rgba(21,20,18,0.78)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{details.architecture}</p>
                </div>
                <div style={{ marginTop: 14 }}>
                  <h4 style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, color: "#151412", margin: "0 0 8px" }}>Key Innovations:</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {details.keyHighlights.slice(0, 3).map((h) => (
                      <div key={h} style={{ display: "flex", gap: 7, fontSize: "clamp(9px, 1vw, 11px)", color: "rgba(21,20,18,0.72)", fontWeight: 300 }}>
                        <span style={{ color: "#92400e", flexShrink: 0 }}>✦</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {currentBook.skills.map((s) => (
                      <span key={s} style={{ padding: "2px 8px", borderRadius: 999, background: "rgba(21,20,18,0.05)", border: "1px solid rgba(21,20,18,0.14)", fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.78)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 10, borderTop: "1px solid rgba(21,20,18,0.14)", display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 9 }}>
                <span style={{ color: "#166534", fontWeight: 500 }}>{details.metrics}</span>
                <span style={{ color: "rgba(21,20,18,0.38)" }}>ID: {currentBook.credentialId}</span>
              </div>
            </div>
          </div>

          {/* ══ LEAF 1: First turning page (animates via GSAP) ══ */}
          <div
            ref={leaf1Ref}
            style={{
              position: "absolute",
              right: 0, top: 0,
              width: "50%", height: "100%",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: 28,
              pointerEvents: "none",
              willChange: "transform",
            }}
          >
            {/* Front: Foreword */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "0 16px 16px 0",
              padding: "clamp(16px, 2.5vw, 36px)",
              background: "#FBF8F1",
              borderRight: "1px solid rgba(21,20,18,0.14)",
              boxShadow: "-5px 0 18px rgba(0,0,0,0.14)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              color: "#151412",
              ...backfaceHidden,
            }}>
              <div>
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(21,20,18,0.4)", display: "block", marginBottom: 10 }}>Volume Foreword</span>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(16px, 2.2vw, 26px)", fontStyle: "italic", margin: "0 0 12px", lineHeight: 1.3 }}>
                  "{details.quote}"
                </h3>
                <p style={{ fontSize: "clamp(9px, 1.1vw, 11px)", color: "rgba(21,20,18,0.72)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                  {details.overview}
                </p>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "#92400e", display: "flex", alignItems: "center", gap: 5 }}>
                <span>Turning page</span>
                <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>📄</span>
              </div>
            </div>

            {/* Back: Technical summary */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "16px 0 0 16px",
              padding: "clamp(14px, 2vw, 32px)",
              background: "#F4EFE6",
              borderLeft: "1px solid rgba(21,20,18,0.14)",
              boxShadow: "5px 0 18px rgba(0,0,0,0.14)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              color: "#151412",
              ...backfaceHidden,
              transform: "rotateY(180deg)",
            }}>
              <div style={{ padding: 14, background: "rgba(21,20,18,0.02)", borderRadius: 10, border: "1px solid rgba(21,20,18,0.1)" }}>
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(21,20,18,0.45)", display: "block", marginBottom: 4 }}>Technical Summary</span>
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(16px, 2vw, 22px)", fontStyle: "italic", margin: "0 0 4px" }}>{currentBook.title}</p>
                <p style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.6)", margin: 0 }}>{currentBook.subtitle}</p>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.38)" }}>Page turned · Bennett CSE Archive</div>
            </div>
          </div>

          {/* ══ LEAF 2: Interactive specs page ══ */}
          <div
            ref={leaf2Ref}
            style={{
              position: "absolute",
              right: 0, top: 0,
              width: "50%", height: "100%",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: 22,
              pointerEvents: contentVisible ? "auto" : "none",
              willChange: "transform",
            }}
          >
            {/* Front: Architecture */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "0 16px 16px 0",
              padding: "clamp(14px, 2vw, 32px)",
              background: "#FAF6EE",
              borderRight: "1px solid rgba(21,20,18,0.14)",
              boxShadow: "-4px 0 12px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              color: "#151412",
              ...backfaceHidden,
            }}>
              <div>
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(21,20,18,0.38)", display: "block", marginBottom: 6 }}>System Architecture</span>
                <h4 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(16px, 2vw, 24px)", margin: "0 0 10px" }}>Core Architecture &amp; Methodology</h4>
                <p style={{ fontSize: "clamp(9px, 1.1vw, 11px)", color: "rgba(21,20,18,0.72)", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{details.architecture}</p>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.45)" }}>Leaf 02 · tap bottom button to flip to specs</div>
            </div>

            {/* Back: Specs table */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "16px 0 0 16px",
              padding: "clamp(14px, 2vw, 32px)",
              background: "#F4EFE6",
              borderLeft: "1px solid rgba(21,20,18,0.14)",
              boxShadow: "4px 0 12px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              color: "#151412",
              ...backfaceHidden,
              transform: "rotateY(180deg)",
            }}>
              <div>
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(21,20,18,0.45)", display: "block", marginBottom: 10 }}>Specifications</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {details.specs.map((sp) => (
                    <div key={sp.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 5, borderBottom: "1px solid rgba(21,20,18,0.08)", fontFamily: "monospace", fontSize: 10 }}>
                      <span style={{ color: "rgba(21,20,18,0.5)" }}>{sp.label}:</span>
                      <span style={{ fontWeight: 600, color: "#151412" }}>{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.38)" }}>Specification Chapter</div>
            </div>
          </div>

          {/* ══ FRONT COVER: Swings open (GSAP animates coverRef) ══ */}
          <div
            ref={coverRef}
            style={{
              position: "absolute",
              right: 0, top: 0,
              width: "50%", height: "100%",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: 35,
              cursor: "pointer",
              willChange: "transform",
            }}
          >
            {/* Outside Cover — identical to shelf! */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "0 16px 16px 0",
              overflow: "hidden",
              backgroundColor: currentBook.coverColor,
              color: currentBook.textColor,
              boxShadow: "24px 24px 55px rgba(0,0,0,0.7), inset -1px 0 0 rgba(255,255,255,0.1)",
              borderRight: "2px solid rgba(0,0,0,0.3)",
              borderTop: "1px solid rgba(0,0,0,0.25)",
              borderBottom: "1px solid rgba(0,0,0,0.25)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              ...backfaceHidden,
            }}>
              {/* Spine strip left */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 32,
                background: "rgba(0,0,0,0.25)",
                borderRight: "1px solid rgba(255,255,255,0.14)",
                display: "flex", alignItems: "flex-start", justifyContent: "center",
                paddingTop: 18, overflow: "hidden",
              }}>
                <span style={{ writingMode: "vertical-rl", fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.06em", opacity: 0.85, whiteSpace: "nowrap" }}>
                  {currentBook.title}
                </span>
              </div>
              {/* CoverArt (matches shelf 1:1) */}
              <div style={{ position: "absolute", left: 38, right: 14, top: 14, height: "48%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "clamp(90px, 14vw, 148px)", height: "clamp(90px, 14vw, 148px)" }}>
                  <CoverArt
                    variant={artVariant}
                    ink={ink}
                    star="#D9A55A"
                    bg={currentBook.coverColor}
                    uid={`reader-art-${bookIndex}`}
                  />
                </div>
              </div>
              {/* Text block */}
              <div style={{ position: "absolute", left: 42, right: 14, bottom: 20 }}>
                {currentBook.label && (
                  <div style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 500, opacity: 0.85, marginBottom: 5 }}>{currentBook.label}</div>
                )}
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(18px, 2.6vw, 30px)", lineHeight: 1.08, color: "#fff", margin: "0 0 6px" }}>{currentBook.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "monospace", fontSize: 10, opacity: 0.78 }}>
                  <span style={{ width: 16, height: 1, background: "currentColor" }} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentBook.subtitle}</span>
                </div>
              </div>
              {/* Right gilded edge */}
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.18)" }} />
            </div>

            {/* Inside Cover (Ex Libris) */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "16px 0 0 16px",
              padding: "clamp(16px, 2.5vw, 36px)",
              background: "#EFE8DA",
              borderLeft: "2px solid rgba(21,20,18,0.2)",
              borderTop: "1px solid rgba(21,20,18,0.15)",
              borderBottom: "1px solid rgba(21,20,18,0.15)",
              boxShadow: "inset -5px 0 18px rgba(0,0,0,0.1)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              color: "#151412",
              ...backfaceHidden,
              transform: "rotateY(180deg)",
            }}>
              <div>
                <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(21,20,18,0.45)", display: "block", marginBottom: 10 }}>Ex Libris</span>
                <div style={{ padding: 16, borderRadius: 10, border: "1px dashed rgba(21,20,18,0.24)", background: "#FAF7F0", textAlign: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(21,20,18,0.55)", display: "block" }}>Curated Technical Volume</span>
                  <h4 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(18px, 2.2vw, 26px)", margin: "6px 0 2px" }}>Saurabh Tewari</h4>
                  <p style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.45)", margin: 0 }}>Bennett University · Computer Science</p>
                </div>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(21,20,18,0.35)", textAlign: "center" }}>Hardcover Opening Sequence</div>
            </div>
          </div>

          {/* ══ SPINE crease + bookmark ══ */}
          <div style={{
            position: "absolute",
            left: "50%", transform: "translateX(-50%)",
            top: 0, bottom: 0,
            width: 20,
            background: "linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.38) 100%)",
            pointerEvents: "none",
            zIndex: 40,
          }}>
            {/* Silk ribbon bookmark */}
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 10, height: 52,
              background: "linear-gradient(180deg, #92400e 0%, #b45309 100%)",
              borderRadius: "0 0 5px 5px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              paddingBottom: 3,
            }}>
              <span style={{ fontSize: 7, color: "rgba(255,255,255,0.85)" }}>✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Controls ── */}
      <div
        ref={bottomBarRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 760,
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 10,
          padding: "10px 20px",
          borderRadius: 20,
          background: "rgba(26,24,21,0.97)",
          border: "1px solid rgba(238,234,227,0.14)",
          color: "#EEEAE3",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
          flexShrink: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={() => onSelectBook((bookIndex - 1 + books.length) % books.length)}
            style={{ padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(238,234,227,0.2)", background: "transparent", color: "#EEEAE3", fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", cursor: "pointer" }}>
            ← Vol 0{((bookIndex - 1 + books.length) % books.length) + 1}
          </button>
          <button type="button" onClick={() => onSelectBook((bookIndex + 1) % books.length)}
            style={{ padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(238,234,227,0.2)", background: "transparent", color: "#EEEAE3", fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", cursor: "pointer" }}>
            Vol 0{((bookIndex + 1) % books.length) + 1} →
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={handleFlipSpread}
            style={{ padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(251,191,36,0.4)", background: "rgba(251,191,36,0.08)", color: "#fde68a", fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", cursor: "pointer" }}>
            {activeSpreadPage === 1 ? "Flip to Specs 📄" : "Back to Chapter ↶"}
          </button>
          <button type="button" onClick={handleClose}
            style={{ padding: "4px 16px", borderRadius: 999, border: "none", background: "#EEEAE3", color: "#151412", fontFamily: "monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", cursor: "pointer" }}>
            Slide Back ↩
          </button>
        </div>
      </div>
    </div>
  )
}
