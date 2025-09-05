import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronUp, MapPin } from "lucide-react";


// ---
// Aneesh Kandalgaonkar – Responsive Portfolio (React + TypeScript + Tailwind + Framer Motion)
// Single-file component suitable for quick preview. For production, drop into a Vite/Next.js project with Tailwind.
// Theme: black→red gradient, white headings with black border, smooth transitions, photo placeholder.
// ---

// Reusable fade-in on view animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = typeof sections[number]["id"];

// Util: heading with white text and black stroke
const Heading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2
      className="text-3xl sm:text-4xl font-extrabold tracking-tight"
      style={{ color: "#fff", WebkitTextStroke: "1px #000" }}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm sm:text-base text-neutral-200/80 mt-2 max-w-3xl">{subtitle}</p>
    )}
  </div>
);

// Util: glassy card
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={`rounded-2xl shadow-xl border border-white/10 bg-white/5 backdrop-blur-md ${className ?? ""}`}>
    {children}
  </div>
);

// Active section tracking for nav highlight
function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset;
      const curr = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return { id, top: 0 };
          return { id, top: el.offsetTop };
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top)
        .reduce((acc, it) => (scrollY >= it.top ? it.id : acc), ids[0]);
      setActive(curr);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);
  return active;
}

// Data (from resume)
const DATA = {
  name: "Aneesh Kandalgaonkar",
  title: "Data Analytics & AI Engineer",
  summary:
    "Graduate student in Data Analytics at Dublin City University with practical experience across AI, machine learning, and full-stack development. Skilled at transforming data into actionable insights and building scalable, user-focused solutions. Driven by a passion for solving complex problems, optimizing performance, and delivering technology that creates real-world impact.",
  location: "Dublin, Ireland",
  phone: "+353 894148591",
  email: "aneeshkandal.work@gmail.com",
  linkedin: "https://linkedin.com/in/aneeshkandal",
  github: "https://github.com/aneeshkandal",
  // If you have a hosted PDF, replace with its URL
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,

  education: [
    {
      school: "Dublin City University",
      place: "Dublin, Ireland",
      degree: "Master's in Computing, Data Analytics",
      period: "Sep 2024 – Sep 2025",
    },
    {
      school: "MES IMCC",
      place: "Pune, Maharashtra, India",
      degree: "Master of Computer Application (MCA)",
      period: "Jun 2022 – Apr 2024",
    },
  ],

  skills: {
    programming:
      ["Java (Core/Advanced)", "Python", "JavaScript", "TypeScript", "React", "Android", "AWS", "OpenAI", "Firebase", "REST APIs", "Machine Learning", "Data Analytics", "Excel", "Tableau", "SQL", "Statistical Analysis"],
    libraries:
      ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "OpenCV", "Git", "Docker", "NLTK", "spaCy", "HuggingFace"],
    architectures: ["CNN", "YOLO", "Transformers (BERT, LSTM)", "RAFT"],
    soft: [
      "Problem Solving",
      "Critical Thinking",
      "Communication",
      "Storytelling with Data",
      "Cross‑functional Collaboration",
      "Attention to Detail",
      "Team Leadership",
      "Accountability",
      "Customer Service Orientation",
      "Organizational Skills",
      "Conflict Resolution",
      "Adaptability",
      "Time Management",
    ],
  },

  experience: [
    {
      role: "Operations Shift Lead — Outbound/Inbound Associate (Part‑time)",
      company: "Shuppa OOFT Limited",
      place: "Dublin, Ireland",
      period: "Jan 2025 – Present",
      bullets: [
        "Managed end‑to‑end shift operations including order dispatch, inventory control, and fleet coordination to meet tight delivery timelines.",
        "Supervised inbound/outbound logistics and optimized warehouse workflows for accurate stock handling and timely receipt of goods.",
        "Handled customer interactions via live chat, resolved service issues, processed returns, and prepped next‑day inbounds.",
      ],
    },
    {
      role: "Software Developer & Data Analyst (Intern)",
      company: "Demos Foundation",
      place: "Maharashtra, India",
      period: "Dec 2023 – Jul 2024",
      bullets: [
        "Designed and optimized Postman & MongoDB APIs for secure data extraction and management.",
        "Enhanced API performance, reliability, and security via testing & debugging; collaborated cross‑functionally to meet milestones.",
        "Produced detailed API documentation covering endpoints and usage guidance.",
      ],
    },
    {
      role: "Software Developer & Data Analyst (Intern)",
      company: "Kovid BioAnalytics",
      place: "Maharashtra, India",
      period: "Apr 2023 – Sep 2023",
      bullets: [
        "Developed software solutions with Python, AWS, and OpenAI across the full SDLC from requirements to deployment.",
        "Assisted with data interpretation for decision‑making; contributed ideas to improve project outcomes.",
        "Practical exposure to cloud computing and machine learning pipelines.",
      ],
    },
  ],

  projects: [
    {
      name: "Self‑Learning Chatbot",
      description:
        "Menu‑driven customer‑support chatbot with quick‑reply options and escalation to human agents; learns from query‑response history to improve accuracy.",
      links: [{ label: "Repo", href: "https://github.com/aneeshkandal/chatbot" }],
      tags: ["NLP", "Retrieval", "FreshChat", "Python"],
    },
    {
      name: "Blinkit Sales Analyzer",
      description:
        "Data cleaning, EDA, and time‑series forecasting with Python (pandas, statsmodels). Interactive Tableau dashboards for KPIs and seasonality.",
      links: [{ label: "Repo", href: "https://github.com/aneeshkandal/blinkit_sales_data_prediction" }],
      tags: ["Time Series", "Tableau", "Pandas"],
    },
    {
      name: "Fake News Detection Model",
      description:
        "Custom PyTorch datasets for 100k+ political news images & text; trained CNN and transformer models from scratch.",
      links: [{ label: "Repo", href: "https://github.com/aneeshkandal/fake_news_detection" }],
      tags: ["PyTorch", "Transformers", "Multimodal"],
    },
    {
      name: "AI‑Driven Data Analysis & Dev",
      description:
        "Full‑stack solutions for AI‑powered insights; AWS & OpenAI to enhance performance; data analysis for business decisions.",
      tags: ["Full‑stack", "AWS", "OpenAI"],
    },
  ],
} as const;

// Skill chip with hover reveal
const SkillChip: React.FC<{ text: string }> = ({ text }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur-sm transition-shadow hover:shadow-md hover:shadow-black/30"
  >
    {text}
  </motion.span>
);

const AnchorLink: React.FC<{ href: string; active?: boolean; children: React.ReactNode }> = ({ href, active, children }) => (
  <a
    href={href}
    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active ? "bg-white text-black" : "text-white/80 hover:text-white hover:bg-white/10"
    }`}
  >
    {children}
  </a>
);

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    <a href={DATA.github} target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition">
      <Github className="h-5 w-5" />
    </a>
    <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition">
      <Linkedin className="h-5 w-5" />
    </a>
    <a href={`mailto:${DATA.email}`} className="text-white/90 hover:text-white transition">
      <Mail className="h-5 w-5" />
    </a>
    <a href={`tel:${DATA.phone.replace(/\s/g, "")}`} className="text-white/90 hover:text-white transition">
      <Phone className="h-5 w-5" />
    </a>
  </div>
);

const NavBar: React.FC<{ active: SectionId }> = ({ active }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
    <nav className="flex gap-2 rounded-full border border-white/20 bg-black/40 px-2 py-2 backdrop-blur-xl shadow-lg shadow-black/30">
      {sections.map((s) => (
        <AnchorLink key={s.id} href={`#${s.id}`} active={active === s.id}>
          {s.label}
        </AnchorLink>
      ))}
    </nav>
  </div>
);

const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 rounded-full border border-white/20 bg-black/60 p-3 backdrop-blur-md transition-all ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <ChevronUp className="h-5 w-5 text-white" />
    </button>
  );
};

// Hero image placeholder
const PhotoPlaceholder = () => (
  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/40">
    <img
      src={`${import.meta.env.BASE_URL}me.jpg`}   // ✅ works locally and on /Portfolio/
      alt="Aneesh Kandalgaonkar"
      className="w-full h-full object-cover"
      loading="eager"
      decoding="sync"
    />
  </div>
);

const Section: React.FC<React.PropsWithChildren<{ id: SectionId; className?: string }>> = ({ id, className, children }) => (
  <section id={id} className={`scroll-mt-28 ${className ?? ""}`}>{children}</section>
);

const TimelineItem: React.FC<{
  title: string;
  subtitle: string;
  right: string;
  bullets?: ReadonlyArray<string>;
}> = ({ title, subtitle, right, bullets }) => (
  <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
    className="relative pl-6 border-l-2 border-white/15 pb-8 last:pb-0">
    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white/90 shadow" />
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
      <h3 className="text-lg font-semibold text-white" style={{ WebkitTextStroke: "0.5px #000" }}>{title}</h3>
      <span className="text-xs sm:text-sm text-white/70">{right}</span>
    </div>
    <p className="text-white/80 text-sm mt-1">{subtitle}</p>
    {bullets && (
      <ul className="list-disc pl-5 mt-3 space-y-1 text-sm text-white/90 ">
        {bullets.map((b, i) => (
          <li key={i} className="marker:text-white/60">{b}</li>
        ))}
      </ul>
    )}
  </motion.div>
);

const GradientDivider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent my-12" />
);

const App: React.FC = () => {
  const active = useScrollSpy(sections.map((s) => s.id));
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ensure smooth scroll behavior
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-white selection:bg-white/20"
      style={{
        background:
          "radial-gradient(1200px 600px at 120% -10%, rgba(255,255,255,0.08), rgba(0,0,0,0)), " +
          "radial-gradient(800px 400px at -10% 110%, rgba(255,255,255,0.06), rgba(0,0,0,0)), " +
          "linear-gradient(135deg, #0a0a0a 0%, #1e3a8a 60%, #1e40af 100%)", // black → midnight blue
      }}


    >
      <NavBar active={active as SectionId} />

      {/* HERO */}
      <Section id="home" className="pt-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-[1.2fr_.8fr] items-center gap-10 py-12"
          >
            <div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="h-4 w-4" /> {DATA.location}
              </div>
              <h1
                className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight"
                style={{ color: "#fff", WebkitTextStroke: "1px #000" }}
              >
                {DATA.name}
              </h1>
              <p className="mt-3 text-lg text-white/90">{DATA.title}</p>
              <p className="mt-4 text-white/85 max-w-2xl">{DATA.summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={DATA.resumeUrl}
                  download="Aneesh_Kandalgaonkar_Resume.pdf"
                  className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Contact Me
                </a>
                <SocialLinks />
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <PhotoPlaceholder />
            </div>
          </motion.div>
        </div>
      </Section>

      <GradientDivider />

      {/* ABOUT */}
      <Section id="about" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Heading title="About" subtitle="I enjoy transforming complex data into clear decisions and evolving ideas into reliable, production-ready solutions. Currently pursuing a Master’s in Data Analytics at Dublin City University, I focus on building machine learning–driven applications and robust backend systems that blend technical depth with real-world usability." />
          <Card className="p-6">
            <p className="text-white/90 leading-relaxed">
              With a background in software development, data analytics, and machine learning, I bring hands-on experience from internships and part-time roles where I managed operations and built data-driven solutions. I excel in fast-paced environments, take ownership of projects end-to-end, and place strong emphasis on usability, performance, and maintainability in everything I build.
            </p>
          </Card>
        </div>
      </Section>

      <GradientDivider />

      {/* EDUCATION */}
      <Section id="education" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Heading title="Education" />
          <div className="grid gap-6">
            {DATA.education.map((ed, i) => (
              <Card key={i} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h3 className="text-xl font-semibold" style={{ WebkitTextStroke: "0.5px #000" }}>{ed.school}</h3>
                  <span className="text-sm text-white/70">{ed.period}</span>
                </div>
                <p className="text-white/90 mt-1">{ed.degree}</p>
                <p className="text-white/70 text-sm mt-1">{ed.place}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <GradientDivider />

      {/* SKILLS */}
      <Section id="skills" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Heading title="Skills" subtitle="Hover over the chips — everything stays visible and aligned, with smooth micro‑interactions." />
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ WebkitTextStroke: "0.5px #000" }}>Programming & Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.programming.map((s) => (
                  <SkillChip key={s} text={s} />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ WebkitTextStroke: "0.5px #000" }}>Libraries & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.libraries.map((s) => (
                  <SkillChip key={s} text={s} />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ WebkitTextStroke: "0.5px #000" }}>ML Architectures</h4>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.architectures.map((s) => (
                  <SkillChip key={s} text={s} />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ WebkitTextStroke: "0.5px #000" }}>Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.soft.map((s) => (
                  <SkillChip key={s} text={s} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <GradientDivider />

      {/* EXPERIENCE */}
      <Section id="experience" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Heading title="Experience" />
          <div className="grid gap-8">
            {DATA.experience.map((e, i) => (
              <Card key={i} className="p-6">
                <TimelineItem
                  title={`${e.role} · ${e.company}`}
                  subtitle={`${e.place}`}
                  right={e.period}
                  bullets={e.bullets ?? []}
                />
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <GradientDivider />

      {/* PROJECTS */}
      <Section id="projects" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Heading title="Projects" subtitle="A selection of recent work. Click through where available." />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {DATA.projects.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-lg font-semibold" style={{ WebkitTextStroke: "0.5px #000" }}>{p.name}</h3>
                  <p className="text-sm text-white/90 mt-2 min-h-[56px]">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  {("links" in p) && p.links && (
                      <div className="mt-4">
                        {p.links.map((l, j) => (
                          <a
                            key={j}
                            href={l.href}
                            className="inline-flex items-center gap-1 text-sm underline decoration-white/40 underline-offset-4 hover:decoration-white"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {l.label} <ExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    )}

                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <GradientDivider />

      {/* CONTACT */}
      <Section id="contact" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Heading title="Contact" subtitle="Happy to connect for roles, collaborations, or just a chat about data, ML, and product." />
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-2 text-white/90">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" href={`mailto:${DATA.email}`}>{DATA.email}</a></div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${DATA.phone.replace(/\s/g, "")}`}>{DATA.phone}</a></div>
                  <div className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" target="_blank" rel="noreferrer" href={DATA.linkedin}>LinkedIn</a></div>
                  <div className="flex items-center gap-2"><Github className="h-4 w-4" /> <a className="underline decoration-white/30 underline-offset-4 hover:decoration-white" target="_blank" rel="noreferrer" href={DATA.github}>GitHub</a></div>
                </div>
                <p className="mt-4 text-sm text-white/80">I usually respond within a day.</p>
              </div>
              <form
                action="https://formspree.io/f/mjkepqpw"
                method="POST"
                className="space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none placeholder-white/60 focus:bg-white/15"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Your email"
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none placeholder-white/60 focus:bg-white/15"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message"
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 outline-none placeholder-white/60 focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Send Message
                </button>
              </form>

            </div>
          </Card>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10/20">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {DATA.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={DATA.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={`mailto:${DATA.email}`} className="hover:text-white">Email</a>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default App;
