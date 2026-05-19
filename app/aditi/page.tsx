import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { getAditiContent } from "@/lib/aditi-content";
import type { AditiWorkItem } from "@/types/aditi-content";

type TimelineMedia = {
  image: string;
  fit?: "cover" | "contain";
  position?: string;
  imageClass?: string;
};

const fallbackMedia: TimelineMedia = {
  image: "/aditi/headshot.jpg",
  position: "object-[center_42%]"
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAditiContent();

  return {
    title: content.metadata.title,
    description: content.metadata.description
  };
}

export default async function AditiPage() {
  const content = await getAditiContent();
  const linkedin = content.links.find((link) => link.label.toLowerCase() === "linkedin");
  const email = content.links.find((link) => link.href.startsWith("mailto:"));

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#171717]">
      <header className="sticky top-0 z-40 border-b border-[#e4dfd6] bg-[#fbfaf7]/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-7 py-4 md:px-8">
          <Link href="/aditi" className="flex items-center gap-2.5">
            <span className="h-5 w-[3px] bg-[#8f1d21]" />
            <span className="font-serif text-[20px] italic leading-none text-[#171717]">Aditi</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {content.nav.map((item, index) => (
              <a
                key={item.href}
                className={`relative text-sm transition-colors ${index === 0 ? "text-[#171717]" : "text-[#6f6b64] hover:text-[#171717]"}`}
                href={item.href}
              >
                {item.label}
                {index === 0 ? <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[#8f1d21]" /> : null}
              </a>
            ))}
            {linkedin ? (
              <a
                className="text-sm text-[#6f6b64] transition-colors hover:text-[#8f1d21]"
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
          </nav>
          <a
            aria-label="Email Aditi"
            href={email?.href ?? "mailto:athreya3@purdue.edu"}
            className="text-[#6f6b64] transition-colors hover:text-[#8f1d21]"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-[760px] px-5 pb-24 pt-16 md:px-6 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d877d]">{content.sectionTitles.workKicker}</p>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#171717]">
          {content.sectionTitles.workTitle}
        </h1>
        <p className="mt-5 max-w-[560px] font-serif text-[clamp(1.05rem,1.8vw,1.3rem)] italic leading-snug text-[#6f6b64]">
          {content.hero.intro}
        </p>

        <Timeline id="work" items={content.professionalWork} />

        <section id="involvement" className="scroll-mt-[80px] pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d877d]">{content.sectionTitles.involvementKicker}</p>
          <h2 className="mt-4 text-[clamp(1.6rem,4vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
            {content.sectionTitles.involvementTitle}
          </h2>
          <p className="mt-4 max-w-[560px] font-serif text-[1.05rem] italic leading-snug text-[#6f6b64]">
            {content.sectionTitles.galleryIntro}
          </p>
          <Timeline items={content.involvements} />
        </section>

        <section id="about" className="scroll-mt-[80px] pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8d877d]">{content.sectionTitles.aboutKicker}</p>
          <h2 className="mt-4 text-[clamp(1.6rem,4vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
            {content.sectionTitles.aboutTitle}
          </h2>
          <div className="mt-7 space-y-4">
            <p className="text-[15px] leading-[1.75] text-[#2b2925]">{content.hero.blurb.trim()}</p>
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-[1.75] text-[#2b2925]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[#e4dfd6] pt-8">
          <p className="text-[15px] leading-[1.75] text-[#2b2925]">
            {content.about.highlight}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {content.links.map((link) => (
              <SmartLink key={link.label} href={link.href}>
                {link.label}
              </SmartLink>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function Timeline({ id, items }: { id?: string; items: AditiWorkItem[] }) {
  return (
    <ol id={id} className="mt-14">
      {items.map((item) => (
        <TimelineItem key={item.organization} item={item} />
      ))}
    </ol>
  );
}

function TimelineItem({ item }: { item: AditiWorkItem }) {
  const media: TimelineMedia = {
    image: item.image || fallbackMedia.image,
    position: item.imagePosition || fallbackMedia.position,
    imageClass: item.imageClass
  };
  const description = item.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const bullets = description.length > 1 ? description : splitSentences(item.body);

  return (
    <li className="relative scroll-mt-[80px] border-t border-[#e4dfd6] py-8 last:border-b">
      <div className="grid grid-cols-[44px_1fr] gap-5 md:grid-cols-[56px_1fr] md:gap-7">
        <div className="relative flex flex-none items-start pt-0.5">
          <div className="relative h-11 w-11 overflow-hidden rounded-md bg-[#f0ede7] md:h-12 md:w-12">
            <img
              alt={item.organization}
              src={media.image}
              className={`h-full w-full ${media.fit === "contain" ? "object-contain p-1.5" : "object-cover"} ${media.position ?? "object-center"} ${media.imageClass ?? ""}`}
            />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-[19px] font-medium leading-tight tracking-[-0.01em] text-[#171717] md:text-[21px]">
              {item.role}
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8d877d]">
              {item.period || "Team"}
            </span>
          </div>
          <p className="mt-1 text-[14.5px] text-[#6f6b64]">{item.organization}</p>
          <ul className="mt-4 space-y-2.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="relative pl-5 text-[15px] leading-[1.65] text-[#2b2925]">
                <span className="absolute left-0 top-[12px] h-px w-3 bg-[#c4beb4]" />
                {bullet}
              </li>
            ))}
          </ul>
          {item.href ? (
            <SmartLink href={item.href} className="mt-4">
              View link
            </SmartLink>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function splitSentences(text: string) {
  const trimmed = text.trim();

  if (!trimmed) return [];

  const parts = trimmed.match(/[^.!?]+[.!?]+/g);
  return parts && parts.length > 1 ? parts.map((part) => part.trim()) : [trimmed];
}

function SmartLink({
  href,
  className = "",
  children
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith("/");
  const classes = `inline-flex items-center gap-1.5 text-sm font-medium text-[#8f1d21] ${className}`;
  const content = (
    <>
      {children}
      <ArrowUpRight className="size-3.5" />
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"} className={classes}>
      {content}
    </a>
  );
}
