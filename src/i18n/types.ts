export type Language = 'fa' | 'ar' | 'tr' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface SelectOption {
  value: string;
  label: string;
}

export type ArticleBlock =
  | { type: 'heading' | 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export interface JournalArticle {
  id: string;
  date: string;
  cat: string;
  title: string;
  excerpt: string;
  img: string;
  readTime: string;
  content: ArticleBlock[];
}

export interface GalleryProject {
  id: string;
  title: string;
  location: string;
  type: string;
  category: string;
  season: string;
  sqft: string;
  blurb: string;
  image: string;
}

export interface Translation {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    degree: string;
  };
  language: {
    switchLabel: string;
  };
  nav: {
    navigationLabel: string;
    items: Record<'services' | 'process' | 'gallery' | 'journal', string>;
    request: string;
    mobileRequest: string;
    openMenu: string;
    closeMenu: string;
    home: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titlePrefix: string;
    titleEmphasis: string;
    titleSuffix: string;
    description: string;
    primary: string;
    secondary: string;
    scroll: string;
  };
  services: {
    eyebrow: string;
    titleA: string;
    highlightA: string;
    titleB: string;
    highlightB: string;
    titleC: string;
    items: { title: string; desc: string }[];
  };
  process: {
    eyebrow: string;
    titleA: string;
    highlight: string;
    description: string;
    cta: string;
    steps: { num: string; title: string; desc: string }[];
  };
  stats: {
    eyebrow: string;
    titleA: string;
    highlight: string;
    description: string;
    items: { num: string; unit: string; sub: string }[];
    galleryTitle: string;
    galleryDescription: string;
    galleryButton: string;
  };
  testimonial: {
    eyebrow: string;
    mainAlt: string;
    natureAlt: string;
    portraitAlt: string;
    quoteA: string;
    highlight: string;
    quoteB: string;
    name: string;
    role: string;
  };
  journal: {
    eyebrow: string;
    titleA: string;
    highlight: string;
    showAll: string;
    showLess: string;
    readMore: string;
    close: string;
    reviewText: string;
    reviewButton: string;
    articles: JournalArticle[];
  };
  quote: {
    eyebrow: string;
    titleLine1: string;
    titleEmphasis: string;
    description: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    project: string;
    size: string;
    timeline: string;
    notes: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    addressPlaceholder: string;
    notesPlaceholder: string;
    projectOptions: SelectOption[];
    sizeOptions: SelectOption[];
    timelineOptions: SelectOption[];
    submit: string;
    loading: string;
    successButton: string;
    errorButton: string;
    saveSuccess: string;
    saveError: string;
    privacyLine1: string;
    privacyLine2: string;
    errors: {
      name: string;
      phone: string;
      email: string;
    };
  };
  footer: {
    description: string;
    regions: string[];
    servicesTitle: string;
    services: string[];
    resourcesTitle: string;
    resources: { id: string; label: string }[];
    activityTitle: string;
    activity: {
      regions: string;
      visits: string;
      degree: string;
      diagnostics: string;
      inputs: string;
    };
    copyright: string;
    principles: string;
  };
  controls: {
    settings: string;
    title: string;
    stage: string;
    windStrength: string;
    windSpeed: string;
    mouseRadius: string;
    fogDensity: string;
    hint: string;
  };
  gallery: {
    dialogLabel: string;
    eyebrow: string;
    titleA: string;
    highlight: string;
    description: string;
    close: string;
    all: string;
    empty: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    closeImage: string;
    previous: string;
    next: string;
    fullView: string;
    items: GalleryProject[];
  };
}
