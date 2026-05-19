import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, HeartHandshake, Mail, Palette, Sparkles } from "lucide-react";
import { getAditiContent } from "@/lib/aditi-content";
import { DeckGallery } from "@/components/portfolio/deck-gallery";
import type { AditiCreativeWork, AditiLink, AditiPhotoStory, AditiWorkItem } from "@/types/aditi-content";

const fallbackQuote = "Build a life that feels as intentional as it looks.";

export const dynamic = "force-dynamic";

const tabs = [
  { label: "Work Experience", href: "#work" },
  { label: "Involvements", href: "#involvements" },
  { label: "Creative", href: "#creative" },
  { label: "Contact Me", href: "#contact" }
];

function getWorkGroups(items: AditiWorkItem[]) {
  const includesAny = (item: AditiWorkItem, words: string[]) => {
    const haystack = `${item.organization} ${item.role} ${item.period}`.toLowerCase();
    return words.some((word) => haystack.includes(word));
  };

  return [
    {
      title: "Consulting",
      eyebrow: "Client + Strategy Work",
      description: "Project-based work with client problems, research, recommendations, and final decks.",
      icon: "work" as const,
      items: items.filter((item) => includesAny(item, ["scope", "180 degrees", "consulting"]))
    },
    {
      title: "Leadership",
      eyebrow: "Teams + Ownership",
      description: "Roles where the main story is organizing people, partnerships, events, and execution.",
      icon: "involvement" as const,
      items: items.filter((item) => includesAny(item, ["momentum", "vp", "external affairs"]))
    },
    {
      title: "Research + Externships",
      eyebrow: "Insights Work",
      description: "Brand, market, and consumer research work that sits outside the consulting bucket.",
      icon: "work" as const,
      items: items.filter((item) => includesAny(item, ["beats", "extern", "mars lab", "research"]))
    }
  ].filter((group) => group.items.length > 0);
}

export default async function HomePage() {
  const content = await getAditiContent();
  const email = content.links.find((link) => link.href.startsWith("mailto:"));
  const linkedin = content.links.find((link) => link.label.toLowerCase() === "linkedin");
  const quote = content.hero.quote || fallbackQuote;
  const workGroups = getWorkGroups(content.professionalWork);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf4ea] text-[#2d2824]">
      <header className="sticky top-0 z-30 border-b border-[#eadfd0] bg-[#fbf4ea]/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl italic text-[#8b4f56]">
            Aditi Athreyas
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="rounded-md px-3 py-2 text-sm text-[#685d55] transition hover:bg-[#f7dce2] hover:text-[#2d2824]"
              >
                {tab.label}
              </a>
            ))}
          </nav>
          <a
            aria-label="Email Aditi"
            href={email?.href ?? "mailto:athreya3@purdue.edu"}
            className="flex size-9 items-center justify-center rounded-md border border-[#e3cbd0] bg-[#fffaf3] text-[#8b4f56] transition hover:bg-[#f7dce2]"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </header>

      <section className="border-b border-[#eadfd0]">
        <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl flex-col items-center px-5 py-10 text-center sm:px-6 md:py-12 lg:px-8">
          <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a6757d]">
              {content.hero.kicker}
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-[clamp(3rem,10vw,7.2rem)] font-normal leading-[0.9] text-[#332722]">
              {content.hero.name}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-[clamp(1.08rem,2vw,1.38rem)] italic leading-[1.55] text-[#6b5b54]">
              {content.hero.intro.trim()}
            </p>
            <blockquote className="mx-auto mt-6 max-w-xl border-y border-[#e8aeb9] px-3 py-3 font-serif text-xl italic leading-snug text-[#8b4f56] sm:text-2xl">
              "{quote}"
            </blockquote>
          </div>

          <div className="relative mt-8 w-full max-w-[280px] sm:max-w-[320px]">
            <div className="absolute -left-5 top-8 h-full w-full border border-[#e8aeb9]" />
            <div className="relative overflow-hidden rounded-md border border-[#e7d7c8] bg-[#fffaf3] p-3 shadow-[0_24px_80px_rgba(139,79,86,0.14)]">
              <Image
                src={content.hero.image}
                alt="Aditi Athreyas"
                width={860}
                height={1040}
                priority
                className="aspect-[4/5] w-full rounded-sm object-cover object-[center_42%]"
              />
            </div>
          </div>

          <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="group flex items-center justify-between rounded-md border border-[#e7d7c8] bg-[#fffaf3]/76 px-4 py-3 text-left text-sm font-medium text-[#3c332e] transition hover:border-[#e8aeb9] hover:bg-[#f7dce2]"
              >
                {tab.label}
                <ArrowUpRight className="size-4 text-[#a6757d] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Section id="work" eyebrow="Work Experience" title="Places I have practiced strategy, operations, and storytelling.">
        <div className="space-y-10">
          {workGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#eadfd0] pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a6757d]">{group.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-3xl font-normal text-[#332722]">{group.title}</h3>
                </div>
                <p className="hidden max-w-sm text-right text-xs leading-5 text-[#766a61] sm:block">{group.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {group.items.map((item) => (
                  <ExperienceCard key={item.organization} item={item} icon={group.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="involvements" eyebrow="Involvements" title="Communities and teams I keep showing up for.">
        <div className="grid gap-4 md:grid-cols-2">
          {content.involvements.map((item) => (
            <ExperienceCard key={item.organization} item={item} icon="involvement" />
          ))}
        </div>
      </Section>

      <Section id="creative" eyebrow="Creative Work" title="Where I practice visual storytelling.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.creativeWork.map((item) => (
            <CreativeCard key={`${item.organization}-${item.title}`} item={item} />
          ))}
        </div>
      </Section>

      <Section id="fun" eyebrow="Human Gallery" title="Work that made it feel human.">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {content.photoStories.slice(0, 4).map((story) => (
              <PhotoStory key={story.title} story={story} />
            ))}
          </div>
          <div className="rounded-md border border-[#e7d7c8] bg-[#fffaf3]/82 p-5">
            <div className="flex items-center gap-2 text-[#8b4f56]">
              <Sparkles className="size-4" />
              <p className="text-sm font-semibold">Selected recognition</p>
            </div>
            <ul className="mt-5 space-y-4">
              {content.recognition.map((item) => (
                <li key={item} className="border-t border-[#eadfd0] pt-4 text-sm leading-6 text-[#544942] first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <section id="contact" className="scroll-mt-24 border-t border-[#eadfd0] bg-[#fff7ef]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a6757d]">Contact Me</p>
            <h2 className="mt-4 font-serif text-5xl font-normal leading-none text-[#332722]">Let's connect.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-[#544942]">
              {content.about.highlight}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {content.links.map((link) => (
                <SmartLink key={link.href} link={link} />
              ))}
            </div>
            {linkedin ? (
              <p className="mt-7 text-sm text-[#766a61]">
                Best place to see the polished professional version:{" "}
                <a className="font-medium text-[#8b4f56] underline-offset-4 hover:underline" href={linkedin.href} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-[#eadfd0]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a6757d]">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,6vw,4.5rem)] font-normal leading-none text-[#332722]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function ExperienceCard({ item, icon }: { item: AditiWorkItem; icon: "work" | "involvement" }) {
  const Icon = icon === "work" ? BriefcaseBusiness : HeartHandshake;
  const hasStructuredDetails =
    Boolean(item.projectHighlights?.length) || Boolean(item.organizationContributions?.length) || Boolean(item.gallery?.length);

  return (
    <article className={`rounded-md border border-[#e7d7c8] bg-[#fffaf3]/82 p-5 transition hover:border-[#e8aeb9] hover:bg-[#fffaf3] ${hasStructuredDetails ? "md:col-span-2" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#f7dce2] text-[#8b4f56]">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a6757d]">{item.period || "Experience"}</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-[#332722]">{item.role}</h3>
          <p className="mt-1 text-sm font-medium text-[#766a61]">{item.organization}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-[#544942]">{item.body}</p>

      {hasStructuredDetails ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
          {item.projectHighlights?.length ? (
            <DetailList title={item.projectHighlightsTitle ?? "Client Projects"} items={item.projectHighlights} />
          ) : null}
          {item.organizationContributions?.length ? (
            <DetailList title={item.organizationContributionsTitle ?? "Creative + Operations"} items={item.organizationContributions} />
          ) : null}
        </div>
      ) : null}

      {item.gallery?.length ? <DeckGallery items={item.gallery} /> : null}

      {item.links?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {item.links.map((link) => (
            <a
              key={link.href}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e3cbd0] px-3 py-2 text-sm font-semibold text-[#8b4f56] transition hover:bg-[#f7dce2]"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowUpRight className="size-3.5" />
            </a>
          ))}
        </div>
      ) : item.href ? (
        <a className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8b4f56]" href={item.href} target="_blank" rel="noreferrer">
          View more
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </article>
  );
}

function CreativeCard({ item }: { item: AditiCreativeWork }) {
  return (
    <article className="overflow-hidden rounded-md border border-[#e7d7c8] bg-[#fffaf3]/82 transition hover:border-[#e8aeb9] hover:bg-[#fffaf3]">
      <div className="aspect-[4/5] border-b border-[#eadfd0] bg-[#fbf4ea]">
        {item.image ? (
          <Image
            alt={item.title}
            className="h-full w-full object-cover object-top"
            height={1080}
            src={item.image}
            width={864}
          />
        ) : (
          <div className="flex h-full flex-col justify-between p-5">
            <div className="flex items-center justify-between text-[#8b4f56]">
              <Palette className="size-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">{item.accent}</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a6757d]">{item.format}</p>
              <h3 className="mt-3 font-serif text-3xl font-normal leading-none text-[#332722]">{item.title}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="h-16 rounded-sm bg-[#f7dce2]" />
              <span className="h-16 rounded-sm bg-[#eadfd0]" />
              <span className="h-16 rounded-sm bg-[#e8aeb9]" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a6757d]">{item.organization}</p>
        <h3 className="mt-2 text-lg font-semibold text-[#332722]">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#544942]">{item.body}</p>
      </div>
    </article>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-[#eadfd0] bg-[#fbf4ea]/72 p-4">
      <h4 className="text-sm font-semibold text-[#332722]">{title}</h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="relative pl-4 text-sm leading-6 text-[#544942]">
            <span className="absolute left-0 top-[0.7rem] h-px w-2 bg-[#c8949d]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhotoStory({ story }: { story: AditiPhotoStory }) {
  return (
    <article className="overflow-hidden rounded-md border border-[#e7d7c8] bg-[#fffaf3]/82">
      <Image
        src={story.image}
        alt={story.title}
        width={720}
        height={540}
        className={`aspect-[4/3] w-full object-cover ${story.position} ${story.imageClass ?? ""}`}
      />
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a6757d]">{story.meta}</p>
        <h3 className="mt-2 text-lg font-semibold text-[#332722]">{story.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#544942]">{story.body}</p>
      </div>
    </article>
  );
}

function SmartLink({ link }: { link: AditiLink }) {
  const isInternal = link.href.startsWith("/");
  const className =
    "inline-flex items-center gap-2 rounded-md border border-[#e3cbd0] bg-[#fbf4ea] px-4 py-2.5 text-sm font-semibold text-[#8b4f56] transition hover:bg-[#f7dce2]";
  const content = (
    <>
      {link.label}
      <ArrowUpRight className="size-3.5" />
    </>
  );

  if (isInternal) {
    return (
      <Link href={link.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}>
      {content}
    </a>
  );
}
