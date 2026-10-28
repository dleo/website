/**
 * UTM convention for inbound links to /audit:
 * ?utm_source=linkedin&utm_medium=banner|headline|post|dm&utm_campaign=ai-audit&utm_content=variant-a|b|c
 */

// Hero section
export const hero = {
  eyebrow: "AI PRODUCTION AUDIT — FOR B2B SOFTWARE TEAMS",
  h1: "Your AI feature is stuck in pilot. Here's the way out.",
  subtitle:
    "A fixed-fee, 10-day audit of your codebase, data, and integrations. You get a ship / fix / kill call on every AI initiative and a 90-day production roadmap your team can execute — with or without me.",
  metaLine:
    "$1,500 fixed · 10 business days · credited to any follow-on sprint",
  ctaPrimary: "Apply for an audit →",
  ctaSecondaryLabel: "See what's in the report ↓",
};

// For / not for section
export const forNotFor = {
  title: "Who should apply",
  forYouIf: [
    "You lead engineering at a B2B software company with a product customers already pay for.",
    "Customers or sales are asking for AI, and your roadmap keeps slipping it.",
    "You've built a prototype or pilot that never made it to production.",
    "You'd rather know what to ship, fix, or kill before committing a quarter to it.",
  ],
  notForYouIf: [
    "You're pre-revenue and looking for an MVP or a technical co-founder.",
    'You want a slide deck about "AI strategy" with no code review.',
    "You need a model trained from scratch (I integrate and ship; I don't do research).",
  ],
};

// Why AI pilots stall section
export const whyStall = {
  title: "Why AI pilots stall",
  intro: {
    before:
      "Most AI pilots never reach production — MIT's 2025 study put it at roughly 95% with no measurable P&L impact (",
    sourceLabel: "source",
    sourceUrl:
      "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/",
    after:
      "). In established products it's rarely the model. It's one of these:",
  },
  reasons: [
    {
      title: "The demo used clean data.",
      description: "Production data is messy, partial, and tenant-scoped.",
    },
    {
      title: "It lives outside the app.",
      description:
        "A side service with no auth, tenancy, or audit trail can't ship to customers.",
    },
    {
      title: "Nobody can say if it's good.",
      description:
        "No test set, no metric, no regression gate — so every change is a debate.",
    },
    {
      title: "The cost curve is unknown.",
      description: "It's cheap at 10 users and alarming at 10,000.",
    },
    {
      title: "Security says no.",
      description:
        "PII, prompt injection, and data residency questions with no answers.",
    },
    {
      title: "No one owns it.",
      description:
        "The engineer who built the pilot moved on; the AI req is still open.",
    },
  ],
};

// Deliverables section (6.4)
export const deliverables = {
  title: "What you get",
  intro:
    "Written for your team to execute. If you never hire me again, the roadmap still works.",
  items: [
    {
      file: "01_inventory.md",
      description: "ship / fix / kill call on every AI initiative",
    },
    {
      file: "02_integration-map.md",
      description:
        "where AI touches the product: auth, multi-tenancy, data access, queues, background jobs; what breaks at production load",
    },
    {
      file: "03_data-readiness.md",
      description:
        "what data the use cases need vs. what's accessible, clean, and permitted",
    },
    {
      file: "04_risk-register.md",
      description:
        "PII/tenant data leakage, prompt injection, vendor lock-in, failure modes with no fallback, missing evaluation / regression gate",
    },
    {
      file: "05_cost-model.md",
      description:
        "estimated per-request and per-tenant inference cost at current usage, with the levers that move it",
    },
    {
      file: "06_roadmap-90d.md",
      description:
        "ROI-ranked, sized in engineer-weeks, executable by their team with or without David",
    },
    {
      file: "07_walkthrough.mp4",
      description: "90-min walkthrough with the eng team + recording",
    },
  ],
};

// How it works timeline (6.5)
export const timeline = {
  title: "How it works",
  rows: [
    {
      day: "0",
      what: "You apply (2 minutes). I reply within 24h.",
    },
    {
      day: "1",
      what: "20-min fit call. If it's not a fit, I'll say so on the call.",
    },
    {
      day: "2",
      what: "Invoice + mutual NDA. You grant read-only access.",
    },
    {
      day: "3",
      what: "60-min kickoff with your eng lead.",
    },
    {
      day: "3–11",
      what: "I review code, data paths, and integrations. Async questions in a shared channel.",
    },
    {
      day: "12",
      what: "90-min walkthrough with your team. Report + recording delivered.",
    },
  ],
};

// Proof section (6.6)
export const proof = {
  title: "Proof",
  heading: "Production systems I've shipped",
  intro: "These aren't AI projects — those case studies are coming.",
  note: "TODO(proof): one AI-specific case study, industry-neutral, no client name unless approved. Do not write one — no voice-agent or placeholder case. Until David supplies a real one, show the two published non-AI cases under this heading.",
};

// Price + after section (6.7)
export const priceAfter = {
  title: "Price and what happens after",
  main: "$1,500 fixed. 10 business days. 100% credited if you book a Pilot-to-Production Sprint within 30 days.",
  ladder: [
    {
      title: "Execute it yourselves",
      description: "The roadmap is written for that.",
    },
    {
      title: "Pilot-to-Production Sprint",
      description: "Fixed scope, 4–6 weeks.",
    },
    {
      title: "Fractional AI Engineering Lead",
      description: "Monthly retainer.",
    },
  ],
};

// About section (6.8)
export const about = {
  title: "About David",
  text: "I'm David Lopez — a product engineer with 17 years shipping production systems in Laravel, Python, and the infrastructure under them. I work as a fractional engineer for software teams that need AI in their product without hiring a team to get there. Based in LATAM, working US hours (UTC−4).",
};

// FAQ section (6.9)
export const faq = {
  title: "FAQ",
  items: [
    {
      question: "Do you need access to our code?",
      answer:
        "Read-only repo access, under mutual NDA. No production write access, ever.",
    },
    {
      question: "What stacks do you review?",
      answer:
        "Any backend with a real data layer. Deepest in Laravel/PHP and Python; comfortable reviewing Node, Rails, and .NET.",
    },
    {
      question: "We don't have any AI yet. Is this still useful?",
      answer:
        'Yes — the inventory becomes "what to build first and what to skip", and the roadmap starts from zero.',
    },
    {
      question: 'What if the answer is "don\'t build it"?',
      answer:
        "Then the audit saved you a quarter. Kill calls are a deliverable, not a failure.",
    },
    {
      question: "Which models/vendors do you recommend?",
      answer:
        "Whatever fits your data, cost, and compliance constraints. I have no vendor partnerships.",
    },
    {
      question: "How do we pay?",
      answer: "Invoice up front via Payoneer. Bank transfer (USD) or PayPal.",
    },
    {
      question: "Can you also build it?",
      answer:
        "Yes — the audit fee is credited to a Pilot-to-Production Sprint booked within 30 days.",
    },
  ],
};

// Final CTA before form (6.10)
export const formCta = {
  h2: "Apply for an AI Production Audit",
  line: "2 minutes. I read every application and reply within 24h.",
};

// Form field configuration (7.1)
export interface FormFieldConfig {
  name: string;
  type: "text" | "email" | "select" | "textarea";
  required: boolean;
  label: string;
  hint?: string;
  error: string;
  options?: readonly string[];
}

export const formFields: Record<string, FormFieldConfig> = {
  name: {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    error: "Name is required",
  },
  email: {
    name: "email",
    type: "email",
    required: true,
    label: "Work email",
    hint: "We'll use this to set up your audit",
    error: "A valid work email is required",
  },
  companyUrl: {
    name: "companyUrl",
    type: "text",
    required: true,
    label: "Your company's website",
    error: "A valid URL is required",
  },
  role: {
    name: "role",
    type: "select",
    required: true,
    label: "Your role",
    error: "Please select a role",
  },
  companyType: {
    name: "companyType",
    type: "select",
    required: true,
    label: "Company type",
    error: "Please select a company type",
  },
  arr: {
    name: "arr",
    type: "select",
    required: true,
    label: "Annual recurring revenue",
    error: "Please select an ARR range",
  },
  aiStatus: {
    name: "aiStatus",
    type: "select",
    required: true,
    label: "Where are you with AI?",
    error: "Please select an option",
  },
  timeline: {
    name: "timeline",
    type: "select",
    required: true,
    label: "Timeline",
    error: "Please select a timeline",
  },
  context: {
    name: "context",
    type: "textarea",
    required: true,
    label: "Tell me about the use case",
    hint: 'What\'s the AI use case, where is it stuck, and what does "shipped" look like? (≥150 chars)',
    error: "Context is required (at least 150 characters)",
  },
};

// Form routing messages (7.3)
export const formRouting = {
  qualified: {
    heading: "You're a fit. Pick a 20-minute slot.",
    message: "",
  },
  borderline: {
    heading: "Thanks — I'll review and reply to {email} within 24h.",
    message:
      "I read every application personally and will follow up with you at the email address you provided.",
  },
  not_qualified: {
    heading: "This audit probably isn't the right fit yet.",
    message:
      "But if you're curious about what we've learned building AI systems in production, check out the blog.",
    linkText: "Visit the blog →",
    linkHref: "/blog",
  },
};
