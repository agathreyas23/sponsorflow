import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Camera, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Aditi Athreyas",
  description:
    "Aditi Athreyas is a Purdue student studying Economics and Industrial Engineering, working across consulting, operations, data, outreach, and student-led products."
};

const sections = [
  { label: "Work", href: "#work" },
  { label: "Involvement", href: "#involvement" },
  { label: "Recognition", href: "#recognition" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" }
];

const links = [
  { label: "Email", href: "mailto:athreya3@purdue.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditiathreyas" },
  { label: "SponsorFlow", href: "https://sponsorflow-tau.vercel.app/aditi" },
  { label: "GitHub", href: "https://github.com/agathreyas23/sponsorflow" }
];

const professionalWork = [
  {
    organization: "Scope Consulting",
    role: "Strategy & Technical Consultant",
    title: "Consulting work and company treks",
    body: "Worked on student consulting projects and joined professional treks with exposure to teams at Deloitte and Accenture.",
    href: "https://www.linkedin.com/company/scope-consulting-je"
  },
  {
    organization: "SponsorFlow",
    role: "Builder",
    title: "Sponsorship outreach product",
    body: "Built a tool for student organizers to find sponsor leads, track outreach, and draft emails for events that need funding.",
    href: "/"
  },
  {
    organization: "Beats by Dre",
    role: "Marketing & Consumer Insights Extern",
    title: "Gen Z consumer research",
    body: "Synthesized survey responses and competitor research into pricing, positioning, and brand recommendations."
  },
  {
    organization: "Operations + dashboards",
    role: "Documentation, surveys, and workflow design",
    title: "Team systems",
    body: "Built spreadsheets, survey trackers, documentation, and simple operating systems for consulting projects and student organizations."
  }
];

const involvements = [
  {
    organization: "Purdue Momentum",
    role: "VP External Affairs",
    body: "Led external engagement for a 70+ member organization and helped direct Convergence, a 120+ participant case competition.",
    href: "https://www.linkedin.com/company/purdue-momentum"
  },
  {
    organization: "180 Degrees Consulting",
    role: "Professional Development + Consulting",
    body: "Supported professional development programming, documentation, survey dashboards, and workshop engagement for a consulting community.",
    href: "https://www.180dc.org"
  },
  {
    organization: "Purdue Thandava",
    role: "Hospitality + Liaison Work",
    body: "Managed hospitality, liaison work, and event operations for a cultural organization built around dance and community."
  },
  {
    organization: "Clean Water New Jersey",
    role: "Co-Founder & VP Operations",
    body: "Helped lead PFAS testing and sustainability outreach, including team operations, programming, and community-facing project work."
  }
];

const recognition = [
  "2nd Place, IU-Indy Inter-Collegiate Manufacturing & Supply Chain Case Competition",
  "Strategy Summit Case Competition Finalist, 180 Degrees Consulting Purdue",
  "Excellence in Engineering, West Windsor-Plainsboro High School North",
  "PURCE Economics Scholar",
  "Goldman Sachs Possibilities Summit 2026"
];

const photoStories = [
  {
    title: "Scope trek: Deloitte and Accenture",
    meta: "Scope Consulting",
    body: "A consulting trek with visits and conversations around professional services work.",
    image: "/aditi/homestead-team.jpg",
    position: "object-[center_62%]"
  },
  {
    title: "Scope case team",
    meta: "Consulting + strategy",
    body: "Team case work, research, and recommendation-building.",
    image: "/aditi/scope-case-team.jpg",
    position: "object-center"
  },
  {
    title: "Purdue Thandava",
    meta: "Culture + community",
    body: "Hospitality, liaison work, and event operations.",
    image: "/aditi/thandava-board.jpg",
    position: "object-center"
  },
  {
    title: "Homestead",
    meta: "Team + competition",
    body: "A case competition team photo from a business and strategy setting.",
    image: "/aditi/homestead-case-team.jpg",
    position: "object-center",
    imageClass: "rotate-90 scale-[1.38]"
  }
];

export default function AditiPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#f5efe4] text-[#15120e]"
      style={{ fontFamily: '"Aptos", "Inter", "Helvetica Neue", Arial, sans-serif' }}
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d7c9b4] bg-[#f5efe4]/95 backdrop-blur">
        <nav className="flex h-14 items-center justify-between px-5 text-sm md:px-8">
          <Link href="/aditi" className="flex items-center gap-3 text-base font-semibold">
            <span className="h-5 w-1 bg-[#8f1d21]" />
            Aditi Athreyas
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {sections.map((section) => (
              <a key={section.href} href={section.href} className="text-[#3d342b] transition hover:text-[#8f1d21]">
                {section.label}
              </a>
            ))}
          </div>
          <a href="mailto:athreya3@purdue.edu" className="inline-flex items-center gap-2 text-[#3d342b] hover:text-[#8f1d21]">
            <Mail className="size-4" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </nav>
      </header>

      <section className="px-5 pb-14 pt-24 md:px-8 md:pb-18 md:pt-32">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_0.78fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase text-[#7f7365]">Purdue / Economics & Industrial Engineering</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">Aditi Athreyas</h1>
            <p className="mt-4 max-w-xl text-2xl leading-9 text-[#3d342b] md:text-3xl">
              “Ambition is most useful in motion.”
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f5142] md:text-lg">
              I study Economics & Industrial Engineering at Purdue and work across consulting, student organizations, operations, and product projects.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {links.map((link) => (
                <SmartLink key={link.label} href={link.href} variant="button">
                  {link.label}
                </SmartLink>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="aspect-[4/3] overflow-hidden border border-[#cbbda8] bg-[#d8c8b4]">
              <img
                src="/aditi/headshot.jpg"
                alt="Aditi Athreyas"
                className="h-full w-full object-cover object-[center_42%]"
              />
            </div>
            <p className="border-l border-[#8f1d21] pl-5 text-sm leading-7 text-[#5f5142]">
              Hi everyone, I&apos;m Aditi Athreyas and I&apos;m currently a student studying Economics and Industrial Engineering at Purdue University.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7c9b4] px-5 py-5 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 text-sm text-[#5f5142] md:grid-cols-4">
          <p>Purdue University</p>
          <p>Economics & Industrial Engineering</p>
          <p>Consulting + operations</p>
          <p>Student-led products</p>
        </div>
      </section>

      <section id="work" className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionIntro kicker="Professional Work" title="Work I can point to." />
          <div className="mt-9 divide-y divide-[#d7c9b4] border-y border-[#d7c9b4]">
            {professionalWork.map((item) => (
              <RowItem
                key={item.organization}
                eyebrow={item.organization}
                title={item.title}
                role={item.role}
                href={item.href}
              >
                {item.body}
              </RowItem>
            ))}
          </div>
        </div>
      </section>

      <section id="involvement" className="border-t border-[#d7c9b4] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <SectionIntro kicker="Involvement" title="Organizations and teams." />
          <div className="divide-y divide-[#d7c9b4] border-y border-[#d7c9b4]">
            {involvements.map((item) => (
              <RowItem
                key={item.organization}
                eyebrow={item.organization}
                title={item.role}
                href={item.href}
              >
                {item.body}
              </RowItem>
            ))}
          </div>
        </div>
      </section>

      <section id="recognition" className="border-y border-[#d7c9b4] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <SectionIntro kicker="Recognition" title="Selected recognition." />
          <div className="divide-y divide-[#d7c9b4] border-y border-[#d7c9b4]">
            {recognition.map((item) => (
              <p key={item} className="py-4 text-sm leading-7 text-[#5f5142]">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro kicker="Gallery" title="A few real moments." />
            <p className="max-w-sm text-sm leading-7 text-[#5f5142]">
              Photos from consulting, competitions, and campus organizations.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {photoStories.map((item) => (
              <figure key={item.title} className="group">
                <div className="aspect-[16/10] overflow-hidden border border-[#cbbda8] bg-[#ded2bf]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full object-cover ${item.position} transition duration-500 group-hover:scale-[1.02] ${item.imageClass ?? ""}`}
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

      <section id="about" className="border-y border-[#d7c9b4] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <SectionIntro kicker="About" title="A little more context." />
          <div className="space-y-5 text-sm leading-7 text-[#5f5142]">
            <p>
              I like work that sits between people and systems: learning what a team is trying to do, finding the bottleneck, and building the structure that helps everyone move with more confidence.
            </p>
            <p>
              Right now, that shows up through consulting projects, student organizations, sponsorship tooling, case competitions, community work, and data-backed storytelling.
            </p>
            <p className="border-l border-[#8f1d21] pl-5 text-lg font-semibold leading-8 text-[#3d342b]">
              I care about work that is organized, useful, and grounded in real people.
            </p>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-4 px-5 py-8 text-sm text-[#5f5142] md:flex-row md:items-center md:justify-between md:px-8">
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
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function RowItem({
  eyebrow,
  title,
  role,
  href,
  children
}: {
  eyebrow: string;
  title: string;
  role?: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <article className="grid gap-4 py-6 md:grid-cols-[0.42fr_1fr]">
      <div>
        <p className="text-xs font-semibold uppercase text-[#8a7f70]">{eyebrow}</p>
        <h3 className="mt-2 text-xl font-semibold text-[#15120e]">{title}</h3>
        {role ? <p className="mt-1 text-sm text-[#8f1d21]">{role}</p> : null}
      </div>
      <div>
        <p className="text-sm leading-7 text-[#5f5142]">{children}</p>
        {href ? (
          <SmartLink href={href} className="mt-3">
            View link
          </SmartLink>
        ) : null}
      </div>
    </article>
  );
}

function SmartLink({
  href,
  className = "",
  variant = "text",
  children
}: {
  href: string;
  className?: string;
  variant?: "text" | "button";
  children: ReactNode;
}) {
  const content = (
    <>
      {children}
      <ArrowUpRight className="size-3.5" />
    </>
  );
  const classes =
    variant === "button"
      ? `inline-flex items-center gap-2 border border-[#cbbda8] px-3 py-2 text-sm transition hover:border-[#8f1d21] hover:text-[#8f1d21] ${className}`
      : `inline-flex items-center gap-2 text-sm font-medium text-[#8f1d21] ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {content}
    </a>
  );
}
