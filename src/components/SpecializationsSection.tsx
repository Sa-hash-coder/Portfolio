import CoverflowSlideshow, { type TechSkillSlide } from "./CoverflowSlideshow"

const TECH_PILLARS: TechSkillSlide[] = [
  {
    num: "01",
    title: "Machine Learning & NLP Intelligence",
    subtitle: "Sentence Transformers, XGBoost & Predictive Modeling",
    category: "AI Specialization",
    accentColor: "#5B8FF9",
    desc: "Developing intelligent models, semantic embeddings, and predictive algorithms to solve real-world workplace safety hazards and environmental monitoring challenges.",
    coreSkills: [
      {
        category: "Machine Learning & NLP",
        items: ["Sentence Transformers", "XGBoost", "Scikit-Learn", "Semantic Embeddings", "Text Classification"],
      },
      {
        category: "Scientific & Data Stack",
        items: ["Python 3", "NumPy", "Pandas", "Matplotlib", "Predictive Analytics"],
      },
      {
        category: "Tooling & Environments",
        items: ["Jupyter Notebook", "VS Code", "Git / GitHub", "Model Tuning", "Pipeline Engineering"],
      },
    ],
    tags: ["Machine Learning", "Sentence Transformers", "XGBoost", "NLP Risk Classification"],
    metrics: "ForeSite & Terraverify Core · Bennett AI Track",
  },
  {
    num: "02",
    title: "Full-Stack Web & Interface Engineering",
    subtitle: "Responsive UI & Python Flask Micro-Services",
    category: "Web Systems",
    accentColor: "#E5A93C",
    desc: "Architecting responsive, intuitive web experiences using modern HTML5, clean CSS/Tailwind layouts, reactive JavaScript, and lightweight Python Flask backends.",
    coreSkills: [
      {
        category: "Client & UI Engineering",
        items: ["HTML5 & Semantics", "CSS3 / Modern Flex & Grid", "Tailwind CSS", "JavaScript (ES6+)", "Responsive Design"],
      },
      {
        category: "Backend & Micro-Services",
        items: ["Flask (Python)", "RESTful APIs", "HTTP Lifecycle", "JSON Data Interchange", "CORS Configuration"],
      },
      {
        category: "Tooling & Delivery",
        items: ["Git & GitHub", "Vite", "Modern Web Standards", "UI Prototyping", "Mobile Optimization"],
      },
    ],
    tags: ["Tailwind CSS", "JavaScript", "Flask", "Full-Stack Architecture"],
    metrics: "Findify & Modern Web Applications",
  },
  {
    num: "03",
    title: "Core Languages & Computational Rigor",
    subtitle: "High-Performance Systems & Algorithm Design",
    category: "Foundational Systems",
    accentColor: "#E05A47",
    desc: "Deep grounding in object-oriented programming, memory discipline, time-space asymptotic complexity, and high-performance algorithms in C++ and Python.",
    coreSkills: [
      {
        category: "Core Languages",
        items: ["C++ (Modern OOP)", "Python 3", "JavaScript", "Memory & Pointer Concepts", "Type Discipline"],
      },
      {
        category: "Data Structures & Algorithms",
        items: ["Arrays & Matrices", "Linked Lists & Queues", "Trees & Heaps", "Sorting & Searching", "Dynamic Programming"],
      },
      {
        category: "Analytical Methods",
        items: ["Big-O Asymptotic Analysis", "Recursion & Backtracking", "Algorithm Optimization", "Problem Solving Proofs"],
      },
    ],
    tags: ["C++", "Python", "DSA", "Algorithmic Precision"],
    metrics: "Algorithmic Rigor · Bennett AI Track",
  },
  {
    num: "04",
    title: "Cloud Databases & Data Engineering",
    subtitle: "Document Schemas, NoSQL & Realtime Sync",
    category: "Data Systems",
    accentColor: "#2ECC71",
    desc: "Implementing scalable document persistence, real-time reactive data sync, and flexible schemas using MongoDB and Google Firebase.",
    coreSkills: [
      {
        category: "Database Engines",
        items: ["MongoDB (Document Store)", "Firebase Realtime Database", "NoSQL Data Modeling", "Document Indexing"],
      },
      {
        category: "Cloud Services & Auth",
        items: ["Firebase Authentication", "MongoDB Atlas", "CRUD Operations", "Secure Access Rules", "Cloud Data Sync"],
      },
      {
        category: "Data Transformation",
        items: ["Pandas DataFrames", "NumPy Arrays", "JSON Schemas", "Data Normalization", "EDA Workflows"],
      },
    ],
    tags: ["MongoDB", "Firebase", "NoSQL", "Cloud Persistence"],
    metrics: "Findify & ForeSite Backend Foundation",
  },
  {
    num: "05",
    title: "Blockchain Ecosystems & Leadership",
    subtitle: "Decentralized Technologies & Executive Community",
    category: "Web3 & Leadership",
    accentColor: "#9B59B6",
    desc: "Guiding decentralized technology initiatives, strategic industry collaborations, and technical community growth as Vice Chairperson of the Indian Blockchain Fraternity.",
    coreSkills: [
      {
        category: "Blockchain Knowledge",
        items: ["Decentralized Ledgers", "Consensus Fundamentals", "Cryptographic Hashing", "Smart Contract Concepts", "Web3 Protocols"],
      },
      {
        category: "Initiatives & Direction",
        items: ["Technical Workshops", "Hackathon Mentorship", "Industry Outreach", "Strategic Planning", "Community Governance"],
      },
      {
        category: "Leadership Craft",
        items: ["Student Council Leadership", "Executive Management", "Public Address & Assemblies", "Cross-Functional Collaboration"],
      },
    ],
    tags: ["Indian Blockchain Fraternity", "Vice Chairperson", "Decentralized Tech", "Leadership"],
    metrics: "Vice Chairperson (IBF) · Bennett University",
  },
]

export default function SpecializationsSection() {
  return (
    <section className="relative min-h-screen py-14 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#151412] text-[#EEEAE3] overflow-hidden flex flex-col justify-between">
      {/* Top Bar Header */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#EEEAE3]/15 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#EEEAE3]/50">
                [03] Technical Domains
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EEEAE3]/30" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#EEEAE3]/70">
                Curated Tech Pillars
              </span>
            </div>
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-5xl md:text-6xl text-[#EEEAE3] tracking-tight leading-[1.05]">
              Curated Technical Pillars &amp; Skills
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#EEEAE3]/70 leading-relaxed font-light">
            An interactive 3D coverflow showcase of core computational pillars. Swipe on mobile or click cards to inspect the framework proficiencies and applied competencies.
          </p>
        </div>

        {/* 3D Coverflow Stage with Skills replacing images */}
        <div className="mt-6 sm:mt-8">
          <CoverflowSlideshow
            slides={TECH_PILLARS}
            cardWidth={520}
            cardHeight={530}
            radius={18}
            tilt={15}
            sideTilt={6}
            gap={7.8}
            opacity={55}
            autoplay={false}
          />
        </div>
      </div>

      {/* Bottom Context Strip */}
      <div className="max-w-7xl mx-auto w-full pt-6 mt-8 sm:pt-8 sm:mt-12 border-t border-[#EEEAE3]/15 flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-mono text-[#EEEAE3]/40 gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <span>✦ 5 Pillars in Active Practice</span>
          <span className="hidden sm:inline text-[#EEEAE3]/20">|</span>
          <span className="hidden sm:inline">Bennett University B.Tech CSE</span>
        </div>
        <div>
          <span>Swipe left / right or click cards</span>
        </div>
      </div>
    </section>
  )
}
