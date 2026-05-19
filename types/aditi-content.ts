export type AditiLink = {
  label: string;
  href: string;
};

export type AditiGalleryItem = {
  title: string;
  image?: string;
  description?: string;
  href?: string;
  embedUrl?: string;
  slides?: {
    title: string;
    image: string;
  }[];
  type?: "slides" | "pdf";
};

export type AditiWorkItem = {
  organization: string;
  role: string;
  title: string;
  body: string;
  href?: string;
  links?: AditiLink[];
  period?: string;
  image?: string;
  imagePosition?: string;
  imageClass?: string;
  projectHighlights?: string[];
  projectHighlightsTitle?: string;
  organizationContributions?: string[];
  organizationContributionsTitle?: string;
  gallery?: AditiGalleryItem[];
};

export type AditiCreativeWork = {
  title: string;
  organization: string;
  format: string;
  body: string;
  image?: string;
  accent?: string;
};

export type AditiPhotoStory = {
  title: string;
  meta: string;
  body: string;
  image: string;
  position: string;
  imageClass?: string;
};

export type AditiContent = {
  metadata: {
    title: string;
    description: string;
  };
  nav: AditiLink[];
  links: AditiLink[];
  hero: {
    kicker: string;
    name: string;
    quote: string;
    intro: string;
    blurb: string;
    image: string;
  };
  stats: string[];
  professionalWork: AditiWorkItem[];
  involvements: AditiWorkItem[];
  creativeWork: AditiCreativeWork[];
  recognition: string[];
  photoStories: AditiPhotoStory[];
  sectionTitles: {
    workKicker: string;
    workTitle: string;
    involvementKicker: string;
    involvementTitle: string;
    recognitionKicker: string;
    recognitionTitle: string;
    galleryKicker: string;
    galleryTitle: string;
    galleryIntro: string;
    aboutKicker: string;
    aboutTitle: string;
  };
  about: {
    paragraphs: string[];
    highlight: string;
  };
};
