import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Camera, Mail, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Aditi Athreyas",
  description:
    "Aditi Athreyas is a Purdue student studying Economics and Industrial Engineering, working across consulting, operations, data, outreach, and student-led products."
};

const sections = [
  { label: "Work", href: "#work" },
  { label: "Involvement", href: "#involvement" },
  { label: "Proof", href: "#proof" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Add Next", href: "#questions" }
];

const links = [
  { label: "Email", href: "mailto:athreya3@purdue.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditiathreyas" },
  { label: "SponsorFlow", href: "https://sponsorflow-tau.vercel.app/aditi" }
];

const professionalWork = [
  {
    eyebrow: "Scope Consulting",
    title: "Consulting work and company treks",
    role: "Strategy & Technical Consultant",
    body: "Worked on strategy projects and joined professional treks that brought students into conversations with teams at Deloitte and Accenture.",
    href: "https://www.linkedin.com/company/scope-consulting-je",
    color: "bg-[#f2c7bb]"
  },
  {
    eyebrow: "SponsorFlow",
    title: "A sponsorship tool for student orgs",
    role: "Builder",
    body: "Built a product that helps organizers find sponsor leads, understand who to contact, shape the ask, and draft outreach without starting from a blank page.",
    href: "/",
    color: "bg-[#d8e2c7]"
  },
  {
    eyebrow: "Beats by Dre",
    title: "Gen Z consumer research",
    role: "Marketing & Consumer Insights Extern",
    body: "Synthesized survey responses and competitor research into pricing, positioning, and brand recommendations for a Gen Z audience.",
    color: "bg-[#d9d0ba]"
  },
  {
    eyebrow: "Dashboards & Operations",
    title: "A public place for the build",
    role: "GitHub, README, screenshots, and product notes",
    body: "For YC and technical applications, the project should have a clear GitHub repo with screenshots, a live demo link, setup notes, and a short explanation of why it matters.",
    color: "bg-[#c9d8e8]"
  }
];

const involvements = [
  {
    title: "Purdue Momentum",
    role: "VP External Affairs",
    body: "Led external engagement for a 70+ member organization and helped direct Convergence, a 120+ participant case competition.",
    href: "https://www.linkedin.com/company/purdue-momentum"
  },
  {
    title: "180 Degrees Consulting",
    role: "Professional Development + Consulting",
    body: "Supported operations, documentation, survey dashboards, and workshop engagement for a consulting community serving mission-driven organizations.",
    href: "https://www.180dc.org"
  },
  {
    title: "Purdue Thandava",
    role: "Hospitality + Liaison Work",
    body: "Managed hospitality and liaison logistics for large-scale cultural programming with hundreds of participants and a broad executive team."
  },
  {
    title: "Clean Water New Jersey",
    role: "Co-Founder & VP Operations",
    body: "Helped build water-safety outreach around PFAS testing and sustainability. The original website is no longer active, so photos and project artifacts will carry the proof here."
  }
];

const proof = [
  {
    title: "2nd Place",
    body: "IU-Indy Inter-Collegiate Manufacturing & Supply Chain Case Competition, representing Purdue."
  },
  {
    title: "Strategy Summit Case Competition Finalist",
    body: "Competed in the 180 Degrees Consulting Purdue Strategy Summit Case Competition finals."
  },
  {
    title: "Excellence in Engineering",
    body: "Sole recipient at West Windsor-Plainsboro High School North for engineering achievement and service as a teaching assistant."
  },
  {
    title: "Economics Scholar",
    body: "PURCE Economics Scholar, connecting economics coursework with policy, research, and analytical thinking."
  },
  {
    title: "Goldman Sachs Possibilities Summit 2026",
    body: "Professional development program listed on LinkedIn as a license and certification."
  }
];

const photoStories = [
  {
    title: "Scope trek: Deloitte and Accenture",
    meta: "Scope Consulting",
    body: "A professional trek into consulting environments, connecting classroom strategy with the pace and expectations of client-facing work.",
    image: "/aditi/homestead-team.jpg",
    position: "object-[center_62%]"
  },
  {
    title: "Scope case team",
    meta: "Consulting + strategy",
    body: "Case work, team research, and the practice of turning a messy business question into a recommendation.",
    image: "/aditi/scope-case-team.jpg",
    position: "object-center"
  },
  {
    title: "Purdue Thandava",
    meta: "Culture + community",
    body: "Hospitality, liaison work, and event operations for a cultural organization built around dance and community.",
    image: "/aditi/thandava-board.jpg",
    position: "object-center"
  },
  {
    title: "Homestead",
    meta: "Team + competition",
    body: "A case competition and team environment that belongs in the proof layer once we add the exact competition name and result.",
    image: "/aditi/homestead-case-team.jpg",
    position: "object-center",
    imageClass: "rotate-90 scale-[1.38]"
  }
];

const questions = [
  "Send the resume PDF or tell me where it lives locally, and I will add a polished Resume link.",
  "Finish the GitHub account sign-up, then this repo can be pushed publicly for YC and technical applications.",
  "Send the LinkedIn case competition post link if you want that exact post attached to the Homestead or Scope photo.",
  "What are 3 things you want people to remember about you after leaving the page?",
  "Which awards, competitions, internships, or projects are most important, and what dates or measurable outcomes should be attached to them?"
];

export default function AditiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5efe4] text-[#15120e]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d7c9b4] bg-[#f5efe4]/92 backdrop-blur">
        <nav className="flex h-14 items-center justify-between px-5 text-sm md:px-8">
          <Link href="/aditi" className="flex items-center gap-3 text-lg font-semibold">
            <span className="h-6 w-1 bg-[#8f1d21]" />
            Aditi Athreyas
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {sections.map((section) => (
              <a key={section.href} href={section.href} className="transition hover:text-[#8f1d21]">
                {section.label}
              </a>
            ))}
          </div>
          <a href="mailto:athreya3@purdue.edu" className="inline-flex items-center gap-2 hover:text-[#8f1d21]">
            <Mail className="size-4" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </nav>
      </header>

      <section className="px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.08fr_0.92fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-[#7f7365]">
              Purdue / Economics & Industrial Engineering
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] md:text-7xl">
              Making good ideas easier to use.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f5142] md:text-2xl">
              At Purdue, I study Economics & Industrial Engineering and spend my time in consulting, student leadership, operations, and product experiments like SponsorFlow.
            </p>
          </div>
          <div className="grid gap-5 md:mb-2">
            <div className="aspect-[4/3] overflow-hidden border border-[#cbbda8] bg-[#d8c8b4]">
              <img
                src="/aditi/headshot.jpg"
                alt="Aditi Athreyas"
                className="h-full w-full object-cover object-[center_42%]"
              />
            </div>
            <div className="border-l border-[#8f1d21] pl-5">
              <p className="text-sm leading-7 text-[#5f5142]">
                Hi everyone, I&apos;m Aditi Athreyas and I&apos;m currently a student studying Economics and Industrial Engineering at Purdue University.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 border border-[#cbbda8] px-3 py-2 text-sm transition hover:border-[#8f1d21] hover:text-[#8f1d21]"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="border-y border-[#d7c9b4] px-5 py-18 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            kicker="Professional Work"
            title="Research, strategy, products, and the operating details behind them."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {professionalWork.map((item) => (
              <article key={item.title} className={`${item.color} min-h-[330px] border border-[#cbbda8] p-6`}>
                <div className="flex h-full flex-col justify-between gap-10">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#5f5142]">{item.eyebrow}</p>
                    <h3 className="mt-4 max-w-md text-4xl font-semibold leading-none">{item.title}</h3>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.role}</p>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[#3d342b]">{item.body}</p>
                    {item.href ? (
                      <SmartLink href={item.href} className="mt-5">
                        View link
                      </SmartLink>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="involvement" className="px-5 py-18 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro kicker="Involvements" title="Places I lead, organize, consult, and build community." />
          <div className="grid gap-3">
            {involvements.map((item) => (
              <article key={item.title} className="grid gap-4 border-t border-[#d7c9b4] py-6 md:grid-cols-[0.62fr_1fr]">
                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#8f1d21]">{item.role}</p>
                </div>
                <div>
                  <p className="text-sm leading-7 text-[#5f5142]">{item.body}</p>
                  {item.href ? (
                    <SmartLink href={item.href} className="mt-4">
                      Organization link
                    </SmartLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="border-y border-[#d7c9b4] px-5 py-18 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionIntro kicker="Proof" title="Awards, recognitions, and signals worth making easy to verify." />
          <div className="mt-10 grid gap-0 md:grid-cols-5">
            {proof.map((item) => (
              <article key={item.title} className="border-t border-[#d7c9b4] py-5 md:border-l md:border-t-0 md:px-5">
                <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#5f5142]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="border-y border-[#d7c9b4] px-5 py-18 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro
              kicker="Gallery / Creative Archive"
              title="The more human layer: teams, treks, culture, and the projects in motion."
            />
            <p className="max-w-sm text-sm leading-7 text-[#5f5142]">
              Real proof belongs here: the rooms, teams, and moments behind the resume lines.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {photoStories.map((item) => (
              <figure key={item.title} className="group">
                <div className="aspect-[16/10] overflow-hidden border border-[#cbbda8] bg-[#ded2bf]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full object-cover ${item.position} transition duration-500 group-hover:scale-[1.03] ${item.imageClass ?? ""}`}
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Camera className="size-4 text-[#8f1d21]" />
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase text-[#8a7f70]">{item.meta}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5f5142]">{item.body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-18 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionIntro kicker="About Me" title="A strategy-minded builder with an operations brain." />
            <p className="mt-8 max-w-2xl text-2xl font-semibold leading-snug">
              Hi everyone, I&apos;m Aditi Athreyas and I&apos;m currently a student studying Economics and Industrial Engineering at Purdue University.
            </p>
          </div>
          <div className="space-y-5 text-sm leading-7 text-[#5f5142]">
            <p>
              I like work that sits between people and systems: learning what a team is trying to do, finding the messy bottleneck, and building the structure that helps everyone move with more confidence.
            </p>
            <p>
              Right now, that shows up through consulting projects, student organizations, sponsorship tooling, case competitions, community work, and data-backed storytelling.
            </p>
            <div className="border-l border-[#8f1d21] pl-5">
              <p className="text-xl font-semibold leading-snug text-[#3d342b]">
                The thread through all of it is simple: I like making complicated things easier to understand, fund, organize, and use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="bg-[#201a15] px-5 py-18 text-[#f8f1e7] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-[#d8bea8]">
              <Sparkles className="size-4" />
              Add Next
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-none">
              What I need from you to make this feel finished.
            </h2>
          </div>
          <div className="grid gap-0">
            {questions.map((question, index) => (
              <p key={question} className="border-t border-[#6c5543] py-5 text-sm leading-7 text-[#eadccd]">
                <span className="mr-4 text-xs font-semibold text-[#d8bea8]">{String(index + 1).padStart(2, "0")}</span>
                {question}
              </p>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[#d7c9b4] px-5 py-8 text-sm text-[#5f5142] md:flex-row md:items-center md:justify-between md:px-8">
        <p>Aditi Athreyas</p>
        <div className="flex flex-wrap gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="hover:text-[#8f1d21]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

function SectionIntro({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-[#7f7365]">{kicker}</p>
      <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-none md:text-5xl">{title}</h2>
    </div>
  );
}

function SmartLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  const content = (
    <>
      {children}
      <ArrowUpRight className="size-3.5" />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={`inline-flex items-center gap-2 text-sm font-medium text-[#8f1d21] ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium text-[#8f1d21] ${className}`}
    >
      {content}
    </a>
  );
}
