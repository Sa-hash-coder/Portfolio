interface LeadershipRole {
  title: string
  organization: string
  location: string
  period: string
  badge: string
  description: string
  bullets: string[]
  tags: string[]
}

const ROLES: LeadershipRole[] = [
  {
    title: "Vice Chairperson",
    organization: "Indian Blockchain Fraternity",
    location: "Bennett University, Greater Noida",
    period: "2026 – 2027",
    badge: "Executive Leadership",
    description:
      "Spearheading strategic planning and technical initiatives across the university's premier Web3 and blockchain organization. Driving student engagement and bridging academic research with industry pioneers.",
    bullets: [
      "Drive executive club governance, cross-functional committee management, and roadmap execution.",
      "Orchestrate hands-on technical workshops, developer hackathons, and decentralized architecture bootcamps.",
      "Lead industry outreach, forging strategic partnerships and mentorship pipelines with Web3 leaders.",
      "Supervise project cohorts building decentralized proof-of-concept systems.",
    ],
    tags: ["Strategic Planning", "Technical Initiatives", "Industry Outreach", "Web3 Ecosystem", "Team Leadership"],
  },
  {
    title: "Head Boy",
    organization: "Army Public School",
    location: "Hempur, Uttarakhand",
    period: "Senior Secondary",
    badge: "Student Council Head",
    description:
      "Elected to lead the entire student council, serving as the primary liaison between the student body and school leadership while upholding academic and disciplinary integrity.",
    bullets: [
      "Led the student council body and represented student perspectives before senior school administration.",
      "Directed major school events, cultural celebrations, academic symposiums, and morning assemblies.",
      "Supervised council sub-committees to cultivate peer mentorship, discipline, and student welfare initiatives.",
      "Maintained top-tier personal academic excellence (94.4% in CBSE Class XII) alongside executive responsibilities.",
    ],
    tags: ["Student Governance", "Public Address", "Event Management", "Peer Mentorship", "School Administration"],
  },
]

export default function LeadershipSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#151412] text-[#EEEAE3] border-t border-[#EEEAE3]/15 overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B5A1FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EEEAE3]/15 pb-6 sm:pb-8 mb-10 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#EEEAE3]/50">
                [05] Experience &amp; Leadership
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EEEAE3]/30" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#EEEAE3]/70">
                Executive &amp; Governance Roles
              </span>
            </div>
            <h2 className="font-['Instrument_Serif'] text-3xl sm:text-5xl md:text-6xl text-[#EEEAE3] tracking-tight leading-none">
              Leadership &amp; Initiative Direction
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#EEEAE3]/70 font-light leading-relaxed">
            Proven record of executive stewardship, cross-functional organization, and student representation across higher education and foundational schooling.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {ROLES.map((role) => (
            <div
              key={role.title + role.organization}
              className="p-6 sm:p-8 rounded-2xl bg-[#1C1A17] border border-[#EEEAE3]/15 hover:border-[#EEEAE3]/35 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EEEAE3]/10">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EEEAE3]/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#EEEAE3] font-medium">
                    {role.badge}
                  </span>
                  <span className="text-xs font-mono text-[#EEEAE3]/50">
                    {role.period}
                  </span>
                </div>

                {/* Role Titles */}
                <h3 className="font-['Instrument_Serif'] text-3xl sm:text-4xl text-[#EEEAE3] group-hover:text-white transition-colors">
                  {role.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-[#EEEAE3]/70">
                  <span className="font-medium text-[#EEEAE3]">{role.organization}</span>
                  <span className="text-[#EEEAE3]/40">·</span>
                  <span className="text-[#EEEAE3]/60">{role.location}</span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#EEEAE3]/75 leading-relaxed font-light">
                  {role.description}
                </p>

                {/* Responsibility Bullets */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#EEEAE3]/40 block">
                    Key Directives &amp; Execution:
                  </span>
                  {role.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2.5 text-xs text-[#EEEAE3]/70 leading-relaxed font-light">
                      <span className="text-[#B5A1FF] text-sm leading-none shrink-0 mt-0.5">✦</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-[#EEEAE3]/10 flex flex-wrap gap-1.5">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[#EEEAE3]/5 text-[10px] font-mono text-[#EEEAE3]/60 border border-[#EEEAE3]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-[#1C1A17]/60 border border-[#EEEAE3]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#EEEAE3]/50 block mb-1">
              Collaborative Ethos
            </span>
            <p className="font-['Instrument_Serif'] text-xl sm:text-2xl text-[#EEEAE3] italic">
              "A proactive learner with leadership experience and a collaborative mindset, eager to contribute to challenging engineering projects."
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1.5 rounded border border-[#EEEAE3]/20 bg-[#EEEAE3]/5 text-[#EEEAE3]/80">
              Technical Initiatives
            </span>
            <span className="px-3 py-1.5 rounded border border-[#EEEAE3]/20 bg-[#EEEAE3]/5 text-[#EEEAE3]/80">
              Community Outreach
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
