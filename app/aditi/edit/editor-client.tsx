"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { AditiContent, AditiLink, AditiPhotoStory, AditiWorkItem } from "@/types/aditi-content";

type Status = "idle" | "saving" | "saved" | "error";

const emptyLink: AditiLink = {
  label: "New link",
  href: ""
};

const emptyWorkItem: AditiWorkItem = {
  organization: "New organization",
  role: "",
  title: "New item",
  body: "",
  href: "",
  period: "Team",
  image: "/aditi/headshot.jpg",
  imagePosition: "object-center",
  imageClass: ""
};

const emptyPhotoStory: AditiPhotoStory = {
  title: "New photo",
  meta: "",
  body: "",
  image: "/aditi/headshot.jpg",
  position: "object-center",
  imageClass: ""
};

export default function AditiEditor({ initialContent }: { initialContent: AditiContent }) {
  const [content, setContent] = useState<AditiContent>(initialContent);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function save() {
    setStatus("saving");
    setMessage("");

    const response = await fetch("/api/aditi-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Save failed. This editor only saves when the app is running locally.");
      return;
    }

    setStatus("saved");
    setMessage("Saved. Refresh the public page to see it.");
  }

  const updateMetadata = (key: keyof AditiContent["metadata"], value: string) => {
    setContent({ ...content, metadata: { ...content.metadata, [key]: value } });
  };

  const updateHero = (key: keyof AditiContent["hero"], value: string) => {
    setContent({ ...content, hero: { ...content.hero, [key]: value } });
  };

  const updateSectionTitle = (key: keyof AditiContent["sectionTitles"], value: string) => {
    setContent({ ...content, sectionTitles: { ...content.sectionTitles, [key]: value } });
  };

  const updateNav = (index: number, key: keyof AditiLink, value: string) => {
    const nav = [...content.nav];
    nav[index] = { ...nav[index], [key]: value };
    setContent({ ...content, nav });
  };

  const addNav = () => {
    setContent({ ...content, nav: [...content.nav, { ...emptyLink, href: "#new-section" }] });
  };

  const removeNav = (index: number) => {
    setContent({ ...content, nav: content.nav.filter((_, itemIndex) => itemIndex !== index) });
  };

  const updateLink = (index: number, key: keyof AditiLink, value: string) => {
    const links = [...content.links];
    links[index] = { ...links[index], [key]: value };
    setContent({ ...content, links });
  };

  const addLink = () => {
    setContent({ ...content, links: [...content.links, emptyLink] });
  };

  const removeLink = (index: number) => {
    setContent({ ...content, links: content.links.filter((_, itemIndex) => itemIndex !== index) });
  };

  const updateStat = (index: number, value: string) => {
    const stats = [...content.stats];
    stats[index] = value;
    setContent({ ...content, stats });
  };

  const addStat = () => {
    setContent({ ...content, stats: [...content.stats, "New stat"] });
  };

  const removeStat = (index: number) => {
    setContent({ ...content, stats: content.stats.filter((_, itemIndex) => itemIndex !== index) });
  };

  const updateWork = (index: number, key: keyof AditiWorkItem, value: string) => {
    const professionalWork = [...content.professionalWork];
    professionalWork[index] = { ...professionalWork[index], [key]: value };
    setContent({ ...content, professionalWork });
  };

  const addWork = () => {
    setContent({ ...content, professionalWork: [...content.professionalWork, { ...emptyWorkItem }] });
  };

  const removeWork = (index: number) => {
    setContent({
      ...content,
      professionalWork: content.professionalWork.filter((_, itemIndex) => itemIndex !== index)
    });
  };

  const updateInvolvement = (index: number, key: keyof AditiWorkItem, value: string) => {
    const involvements = [...content.involvements];
    involvements[index] = { ...involvements[index], [key]: value };
    setContent({ ...content, involvements });
  };

  const addInvolvement = () => {
    setContent({ ...content, involvements: [...content.involvements, { ...emptyWorkItem }] });
  };

  const removeInvolvement = (index: number) => {
    setContent({
      ...content,
      involvements: content.involvements.filter((_, itemIndex) => itemIndex !== index)
    });
  };

  const updateRecognition = (index: number, value: string) => {
    const recognition = [...content.recognition];
    recognition[index] = value;
    setContent({ ...content, recognition });
  };

  const addRecognition = () => {
    setContent({ ...content, recognition: [...content.recognition, "New recognition"] });
  };

  const removeRecognition = (index: number) => {
    setContent({ ...content, recognition: content.recognition.filter((_, itemIndex) => itemIndex !== index) });
  };

  const updatePhoto = (index: number, key: keyof AditiPhotoStory, value: string) => {
    const photoStories = [...content.photoStories];
    photoStories[index] = { ...photoStories[index], [key]: value };
    setContent({ ...content, photoStories });
  };

  const addPhoto = () => {
    setContent({ ...content, photoStories: [...content.photoStories, { ...emptyPhotoStory }] });
  };

  const removePhoto = (index: number) => {
    setContent({ ...content, photoStories: content.photoStories.filter((_, itemIndex) => itemIndex !== index) });
  };

  const updateParagraph = (index: number, value: string) => {
    const paragraphs = [...content.about.paragraphs];
    paragraphs[index] = value;
    setContent({ ...content, about: { ...content.about, paragraphs } });
  };

  const addParagraph = () => {
    setContent({
      ...content,
      about: { ...content.about, paragraphs: [...content.about.paragraphs, "New paragraph"] }
    });
  };

  const removeParagraph = (index: number) => {
    setContent({
      ...content,
      about: {
        ...content.about,
        paragraphs: content.about.paragraphs.filter((_, itemIndex) => itemIndex !== index)
      }
    });
  };

  return (
    <div className="py-8">
      <div className="sticky top-0 z-10 -mx-5 mb-6 border-b border-[#d7c9b4] bg-[#f5efe4]/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#5f5142]">
            Edit anything below. After saving, refresh the public page to see the update.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {message ? <p className="text-sm text-[#5f5142]">{message}</p> : null}
            <button
              type="button"
              onClick={save}
              disabled={status === "saving"}
              className="border border-[#8f1d21] bg-[#8f1d21] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {status === "saving" ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>

      <EditorSection title="Page Metadata">
        <TextField label="Browser title" value={content.metadata.title} onChange={(value) => updateMetadata("title", value)} />
        <TextArea
          label="Search description"
          value={content.metadata.description}
          onChange={(value) => updateMetadata("description", value)}
        />
      </EditorSection>

      <EditorSection
        title="Top Navigation"
        action={<SmallButton onClick={addNav}>Add nav item</SmallButton>}
      >
        {content.nav.map((item, index) => (
          <ItemCard
            key={`${item.label}-${index}`}
            title={item.label}
            action={<SmallButton onClick={() => removeNav(index)}>Remove</SmallButton>}
          >
            <TextField label="Label" value={item.label} onChange={(value) => updateNav(index, "label", value)} />
            <TextField label="Section link" value={item.href} onChange={(value) => updateNav(index, "href", value)} />
          </ItemCard>
        ))}
      </EditorSection>

      <EditorSection title="Hero">
        <TextField label="Top label" value={content.hero.kicker} onChange={(value) => updateHero("kicker", value)} />
        <TextField label="Name" value={content.hero.name} onChange={(value) => updateHero("name", value)} />
        <TextField label="Quote" value={content.hero.quote} onChange={(value) => updateHero("quote", value)} />
        <TextArea label="Intro" value={content.hero.intro} onChange={(value) => updateHero("intro", value)} />
        <TextArea label="Side blurb" value={content.hero.blurb} onChange={(value) => updateHero("blurb", value)} />
        <TextField label="Hero image path" value={content.hero.image} onChange={(value) => updateHero("image", value)} />
      </EditorSection>

      <EditorSection title="Main Links" action={<SmallButton onClick={addLink}>Add link</SmallButton>}>
        {content.links.map((item, index) => (
          <ItemCard
            key={`${item.label}-${index}`}
            title={item.label}
            action={<SmallButton onClick={() => removeLink(index)}>Remove</SmallButton>}
          >
            <TextField label="Label" value={item.label} onChange={(value) => updateLink(index, "label", value)} />
            <TextField label="URL" value={item.href} onChange={(value) => updateLink(index, "href", value)} />
          </ItemCard>
        ))}
      </EditorSection>

      <EditorSection title="Quick Stats" action={<SmallButton onClick={addStat}>Add stat</SmallButton>}>
        {content.stats.map((stat, index) => (
          <InlineEdit
            key={`${stat}-${index}`}
            label={`Stat ${index + 1}`}
            value={stat}
            onChange={(value) => updateStat(index, value)}
            onRemove={() => removeStat(index)}
          />
        ))}
      </EditorSection>

      <EditorSection title="Section Labels">
        <TextField label="Work kicker" value={content.sectionTitles.workKicker} onChange={(value) => updateSectionTitle("workKicker", value)} />
        <TextField label="Work title" value={content.sectionTitles.workTitle} onChange={(value) => updateSectionTitle("workTitle", value)} />
        <TextField
          label="Involvement kicker"
          value={content.sectionTitles.involvementKicker}
          onChange={(value) => updateSectionTitle("involvementKicker", value)}
        />
        <TextField
          label="Involvement title"
          value={content.sectionTitles.involvementTitle}
          onChange={(value) => updateSectionTitle("involvementTitle", value)}
        />
        <TextField
          label="Recognition kicker"
          value={content.sectionTitles.recognitionKicker}
          onChange={(value) => updateSectionTitle("recognitionKicker", value)}
        />
        <TextField
          label="Recognition title"
          value={content.sectionTitles.recognitionTitle}
          onChange={(value) => updateSectionTitle("recognitionTitle", value)}
        />
        <TextField
          label="Gallery kicker"
          value={content.sectionTitles.galleryKicker}
          onChange={(value) => updateSectionTitle("galleryKicker", value)}
        />
        <TextField label="Gallery title" value={content.sectionTitles.galleryTitle} onChange={(value) => updateSectionTitle("galleryTitle", value)} />
        <TextArea
          label="Gallery intro"
          value={content.sectionTitles.galleryIntro}
          onChange={(value) => updateSectionTitle("galleryIntro", value)}
        />
        <TextField label="About kicker" value={content.sectionTitles.aboutKicker} onChange={(value) => updateSectionTitle("aboutKicker", value)} />
        <TextField label="About title" value={content.sectionTitles.aboutTitle} onChange={(value) => updateSectionTitle("aboutTitle", value)} />
      </EditorSection>

      <EditorSection title="Professional Work" action={<SmallButton onClick={addWork}>Add work item</SmallButton>}>
        {content.professionalWork.map((item, index) => (
          <WorkFields
            key={`${item.organization}-${index}`}
            item={item}
            onChange={(key, value) => updateWork(index, key, value)}
            onRemove={() => removeWork(index)}
          />
        ))}
      </EditorSection>

      <EditorSection title="Involvement" action={<SmallButton onClick={addInvolvement}>Add involvement</SmallButton>}>
        {content.involvements.map((item, index) => (
          <WorkFields
            key={`${item.organization}-${index}`}
            item={item}
            onChange={(key, value) => updateInvolvement(index, key, value)}
            onRemove={() => removeInvolvement(index)}
          />
        ))}
      </EditorSection>

      <EditorSection title="Recognition" action={<SmallButton onClick={addRecognition}>Add recognition</SmallButton>}>
        {content.recognition.map((item, index) => (
          <InlineEdit
            key={`${item}-${index}`}
            label={`Recognition ${index + 1}`}
            value={item}
            textarea
            onChange={(value) => updateRecognition(index, value)}
            onRemove={() => removeRecognition(index)}
          />
        ))}
      </EditorSection>

      <EditorSection title="Gallery" action={<SmallButton onClick={addPhoto}>Add photo</SmallButton>}>
        {content.photoStories.map((item, index) => (
          <ItemCard
            key={`${item.title}-${index}`}
            title={item.title}
            action={<SmallButton onClick={() => removePhoto(index)}>Remove</SmallButton>}
          >
            <TextField label="Title" value={item.title} onChange={(value) => updatePhoto(index, "title", value)} />
            <TextField label="Meta" value={item.meta} onChange={(value) => updatePhoto(index, "meta", value)} />
            <TextArea label="Caption" value={item.body} onChange={(value) => updatePhoto(index, "body", value)} />
            <TextField label="Image path" value={item.image} onChange={(value) => updatePhoto(index, "image", value)} />
            <TextField label="Image position class" value={item.position} onChange={(value) => updatePhoto(index, "position", value)} />
            <TextField
              label="Extra image class"
              value={item.imageClass ?? ""}
              onChange={(value) => updatePhoto(index, "imageClass", value)}
            />
          </ItemCard>
        ))}
      </EditorSection>

      <EditorSection title="About" action={<SmallButton onClick={addParagraph}>Add paragraph</SmallButton>}>
        {content.about.paragraphs.map((paragraph, index) => (
          <InlineEdit
            key={`${paragraph}-${index}`}
            label={`Paragraph ${index + 1}`}
            value={paragraph}
            textarea
            onChange={(value) => updateParagraph(index, value)}
            onRemove={() => removeParagraph(index)}
          />
        ))}
        <TextArea
          label="Highlight"
          value={content.about.highlight}
          onChange={(value) => setContent({ ...content, about: { ...content.about, highlight: value } })}
        />
      </EditorSection>
    </div>
  );
}

function WorkFields({
  item,
  onChange,
  onRemove
}: {
  item: AditiWorkItem;
  onChange: (key: keyof AditiWorkItem, value: string) => void;
  onRemove: () => void;
}) {
  return (
    <ItemCard title={item.organization} action={<SmallButton onClick={onRemove}>Remove</SmallButton>}>
      <TextField label="Organization" value={item.organization} onChange={(value) => onChange("organization", value)} />
      <TextField label="Title" value={item.title} onChange={(value) => onChange("title", value)} />
      <TextField label="Role" value={item.role} onChange={(value) => onChange("role", value)} />
      <TextField label="Small label / period" value={item.period ?? ""} onChange={(value) => onChange("period", value)} />
      <TextArea label="Description" value={item.body} onChange={(value) => onChange("body", value)} />
      <TextField label="Link" value={item.href ?? ""} onChange={(value) => onChange("href", value)} />
      <TextField label="Thumbnail image path" value={item.image ?? ""} onChange={(value) => onChange("image", value)} />
      <TextField label="Thumbnail position class" value={item.imagePosition ?? ""} onChange={(value) => onChange("imagePosition", value)} />
      <TextField label="Extra thumbnail class" value={item.imageClass ?? ""} onChange={(value) => onChange("imageClass", value)} />
    </ItemCard>
  );
}

function EditorSection({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="mb-8 border border-[#d7c9b4] bg-[#f8f2e8] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function ItemCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="border border-[#d7c9b4] bg-[#f5efe4] p-4">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-[#8f1d21]">{title}</h3>
        {action}
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function InlineEdit({
  label,
  value,
  textarea = false,
  onChange,
  onRemove
}: {
  label: string;
  value: string;
  textarea?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid gap-3 border border-[#d7c9b4] bg-[#f5efe4] p-4 md:grid-cols-[1fr_auto] md:items-end">
      {textarea ? (
        <TextArea label={label} value={value} onChange={onChange} />
      ) : (
        <TextField label={label} value={value} onChange={onChange} />
      )}
      <SmallButton onClick={onRemove}>Remove</SmallButton>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-[#cbbda8] bg-white px-3 py-2 text-sm font-normal outline-none focus:border-[#8f1d21]"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="resize-y border border-[#cbbda8] bg-white px-3 py-2 text-sm font-normal leading-6 outline-none focus:border-[#8f1d21]"
      />
    </label>
  );
}

function SmallButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-[#cbbda8] bg-white px-3 py-2 text-sm font-medium text-[#3d342b] transition hover:border-[#8f1d21] hover:text-[#8f1d21]"
    >
      {children}
    </button>
  );
}
