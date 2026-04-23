export interface NavLabels {
  work: string;
  services: string;
  process: string;
  writing: string;
  about: string;
  contact: string;
  bookCall: string;
}

export interface NavMobileLabels {
  work: string;
  services: string;
  process: string;
  writing: string;
  about: string;
  contact: string;
}

export interface TitlebarLabels {
  online: string;
  cmdk: string;
}

export interface HeroContent {
  session: string;
  status: string;
  h1a: string;
  h1b: string;
  h1c: string;
  lede: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  kbdTip: string;
  kbdHint: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SectionsLabels {
  workPrompt: string;
  workTitle: string;
  workSub: string;
  filterLabel: string;
  allFilter: string;
  servicesPrompt: string;
  servicesTitle: string;
  servicesSub: string;
  processPrompt: string;
  processTitle: string;
  testimonialsPrompt: string;
  testimonialsTitle: string;
  commit: string;
  skillsPrompt: string;
  skillsTitle: string;
  writingPrompt: string;
  writingTitle: string;
  aboutPrompt: string;
  aboutTitle: string;
  faqPrompt: string;
  faqTitle: string;
  ctaPrompt: string;
  ctaH1: string;
  ctaH2: string;
  ctaH3: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  bullets: string[];
}

export interface CaseLabels {
  problem: string;
  approach: string;
  outcome: string;
  stack: string;
}

export interface CaseMetric {
  k: string;
  v: string;
}

export interface CaseItem {
  id: string;
  client: string;
  industry: string;
  role: string;
  year: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: CaseMetric[];
  stack: string[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface ArticleItem {
  title: string;
  cat: string;
  date: string;
  read: string;
  href: string;
}

export interface AboutContent {
  portraitCaption: string;
  meta: string[];
  paragraphs: string[];
  outro: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BookingLabels {
  meta: string;
  embedHeading: string;
}

export interface ContactModalLabels {
  title: string;
  meta: string;
  labelName: string;
  labelEmail: string;
  labelMsg: string;
  send: string;
  done: string;
  errRequired: string;
  errEmail: string;
  errMsg: string;
  gotIt: string;
}

export interface CmdkLabels {
  title: string;
  placeholder: string;
}

export interface FitCheckContent {
  prompt: string;
  forHeading: string;
  forItems: string[];
  notHeading: string;
  notItems: string[];
  footnote: string;
}

export interface ApplyModalLabels {
  title: string;
  filename: string;
  meta: string;
  labelName: string;
  labelEmail: string;
  labelCompanyUrl: string;
  labelRole: string;
  labelStage: string;
  labelNeed: string;
  labelContext: string;
  contextHint: string;
  roleOptions: { value: string; label: string }[];
  stageOptions: { value: string; label: string }[];
  needOptions: { value: string; label: string }[];
  send: string;
  done: string;
  errRequired: string;
  errEmail: string;
  errFreeEmail: string;
  errUrl: string;
  errContext: string;
  confirmQualifiedTitle: string;
  confirmQualifiedBody: string;
  confirmBorderlineTitle: string;
  confirmBorderlineBody: string;
  confirmNotQualifiedTitle: string;
  confirmNotQualifiedBody: string;
  notQualifiedLinkCases: string;
  notQualifiedLinkAudit: string;
}

export interface FooterLabels {
  tag: string;
  contact: string;
  site: string;
  workLink: string;
  servicesLink: string;
  writingLink: string;
  copy: string;
  deployLabel: string;
  builtIn: string;
}

export interface TerminalContent {
  name: string;
  location: string;
  email: string;
  nav: NavLabels;
  navMobile: NavMobileLabels;
  titlebar: TitlebarLabels;
  hero: HeroContent;
  stats: StatItem[];
  sections: SectionsLabels;
  services: ServiceItem[];
  serviceStart: string;
  caseRole: string;
  caseCTA: string;
  caseLabels: CaseLabels;
  caseFooterText: string;
  caseFooterCTA: string;
  cases: CaseItem[];
  testimonials: TestimonialItem[];
  skills: Record<string, string[]>;
  process: ProcessStep[];
  articles: ArticleItem[];
  about: AboutContent;
  faqs: FaqItem[];
  booking: BookingLabels;
  contact: ContactModalLabels;
  apply: ApplyModalLabels;
  fitCheck: FitCheckContent;
  cmdk: CmdkLabels;
  footer: FooterLabels;
}

export type Lang = "en" | "es";
