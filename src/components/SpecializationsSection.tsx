import CoverflowSlideshow, { type TechSkillSlide } from "./CoverflowSlideshow"

const TECH_PILLARS: TechSkillSlide[] = [
  {
    num: "01",
    title: "Artificial Intelligence & Machine Learning",
    subtitle: "Neural Architectures & Applied AI",
    category: "Core Discipline",
    accentColor: "#5B8FF9",
    desc: "Developing intelligent models, convolutional vision systems, and deep neural architectures that transform complex multi-modal data into actionable intelligence.",
    coreSkills: [
      {
        category: "Frameworks & Engines",
        items: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-Learn", "OpenCV"],
      },
      {
        category: "Architectures & Paradigms",
        items: ["Transformers", "CNNs", "Computer Vision", "NLP", "Backpropagation"],
      },
      {
        category: "Tooling & Environments",
        items: ["Python", "CUDA", "Jupyter", "NumPy", "Model Quantization"],
      },
    ],
    tags: ["Machine Learning", "Neural Networks", "Deep Learning", "Applied AI"],
    metrics: "Deep Learning Specialization · Research Interest",
  },
  {
    num: "02",
    title: "Full-Stack Software Architecture",
    subtitle: "Modern Reactive UI & Scalable Backends",
    category: "Engineering Craft",
    accentColor: "#E5A93C",
    desc: "Architecting end-to-end distributed web applications with fluid client-side interaction, type-safe APIs, resilient relational databases, and microservices.",
    coreSkills: [
      {
        category: "Client & UI Engineering",
        items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "GSAP / Lenis"],
      },
      {
        category: "Server & Persistence",
        items: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "REST & GraphQL"],
      },
      {
        category: "Systems & Delivery",
        items: ["Docker", "WebSockets", "Vite", "Git", "API Security"],
      },
    ],
    tags: ["React", "TypeScript", "Node.js", "Distributed Systems"],
    metrics: "Meta Certified · Production Architecture",
  },
  {
    num: "03",
    title: "Data Structures & Algorithmic Rigor",
    subtitle: "Computational Complexity & Problem Solving",
    category: "Algorithmic Precision",
    accentColor: "#E05A47",
    desc: "Rigorous focus on asymptotic complexity, dynamic programming formulations, optimal graph theory, and high-performance algorithmic execution.",
    coreSkills: [
      {
        category: "Core Languages",
        items: ["C++ (Modern)", "Python 3", "Memory Management", "Pointers & References"],
      },
      {
        category: "Advanced Structures",
        items: ["Segment Trees", "Disjoint Set (DSU)", "Binary Heaps", "Tries", "Balanced BSTs"],
      },
      {
        category: "Paradigms & Complexity",
        items: ["Dynamic Programming", "Graph Traversals (BFS/DFS)", "Greedy Proofs", "O(N log N) Bounds"],
      },
    ],
    tags: ["Algorithm Design", "Time & Space Complexity", "Graphs & Trees", "Problem Solving"],
    metrics: "Advanced DSA · Stanford Track Benchmark",
  },
  {
    num: "04",
    title: "Data Science & Applied Analytics",
    subtitle: "Statistical Inference & Predictive Modeling",
    category: "Data Intelligence",
    accentColor: "#2ECC71",
    desc: "Deriving intelligence from complex datasets through exploratory analysis, feature extraction, hypothesis testing, and statistical predictive modeling.",
    coreSkills: [
      {
        category: "Scientific Computing",
        items: ["Pandas", "NumPy", "SciPy", "SQL Querying", "Feature Engineering"],
      },
      {
        category: "Visualization & Insights",
        items: ["Matplotlib", "Seaborn", "Plotly", "Statistical Testing", "EDA Pipelines"],
      },
      {
        category: "Analytics & Metrics",
        items: ["Regression Analysis", "Classification", "Cluster Analysis", "Correlation Proofs"],
      },
    ],
    tags: ["Statistical Modeling", "Python / Pandas", "Data Visualization", "Feature Engineering"],
    metrics: "IBM Professional · 9.81 Academic CGPA",
  },
  {
    num: "05",
    title: "Blockchain & Consensus Protocols",
    subtitle: "Decentralized Systems & Smart Contracts",
    category: "Web3 Protocols",
    accentColor: "#9B59B6",
    desc: "Investigating decentralized protocols, cryptographic state consensus, EVM smart contract logic, and transparent peer-to-peer transactional ecosystems.",
    coreSkills: [
      {
        category: "Smart Contracts",
        items: ["Solidity", "Hardhat", "Remix IDE", "EVM Internals", "ERC Standards"],
      },
      {
        category: "Decentralized Stack",
        items: ["Ethers.js", "Web3.js", "IPFS", "Metamask SDK", "P2P Networking"],
      },
      {
        category: "Cryptographic Trust",
        items: ["Proof-of-Stake", "Hashing Algorithms", "Merkle Trees", "Digital Signatures"],
      },
    ],
    tags: ["Decentralized Protocols", "Smart Contracts", "Cryptographic Trust", "Web3"],
    metrics: "ConsenSys Track · Decentralized State",
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
