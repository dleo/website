import type { Lang, TerminalContent } from "./types";

export const CALENDLY_URL = "https://calendly.com/dleolopez/meeting";

const en: TerminalContent = {
  name: "David Lopez",
  location: "Remote · LATAM time zones",
  email: "david@dleolopez.dev",

  nav: {
    work: "work",
    services: "services",
    process: "process",
    writing: "writing",
    about: "about",
    contact: "contact",
    bookCall: "./apply.sh",
  },
  navMobile: {
    work: "› work",
    services: "› services",
    process: "› process",
    writing: "› writing",
    about: "› about",
    contact: "› contact",
  },

  titlebar: { online: "ONLINE", cmdk: "⌘K" },

  hero: {
    session: "session_id: 0x7f4a · uptime: 15y 2m · status:",
    status: "available_jun_2026",
    h1a: "I ship",
    h1b: "revenue.",
    h1c: "Not tickets.",
    lede: [
      "Fractional tech lead & product engineer",
      "for CTOs who need someone senior to",
      "architect, ship, and lead — without",
      "the full-time hire.",
    ],
    ctaPrimary: "$ ./apply.sh",
    ctaSecondary: "cat ./case-studies",
    kbdTip: "TIP",
    kbdHint: "press",
  },

  stats: [
    { value: "15+", label: "Years shipping" },
    { value: "40+", label: "Products delivered" },
    { value: "$28M", label: "Revenue unlocked for clients" },
    { value: "1,000+", label: "Systems deployed" },
  ],

  sections: {
    workPrompt: "$ ls -la ./case-studies/",
    workTitle: "Shipped work.",
    workSub: "Real engagements. Business outcomes. No feature lists.",
    filterLabel: "--filter",
    allFilter: "all",

    servicesPrompt: "$ cat ./services.json",
    servicesTitle: "Engagement shapes.",
    servicesSub:
      "Three ways to work together. All fixed-scope. No hourly games.",

    processPrompt: "$ ./process.sh --verbose",
    processTitle: "How I work.",

    testimonialsPrompt: "$ git log --author=clients",
    testimonialsTitle: "What they said.",
    commit: "commit",

    skillsPrompt: "$ cat ./package.json | jq .dependencies",
    skillsTitle: "The stack.",

    writingPrompt: "$ ls ./blog/ | head -n 4",
    writingTitle: "Recent writing.",

    aboutPrompt: "$ whoami --long",
    aboutTitle: "About me.",

    faqPrompt: "$ man david-lopez",
    faqTitle: "FAQ.",

    ctaPrompt: "$ sudo ship --next-quarter",
    ctaH1: "Let's make your",
    ctaH2: "next quarter",
    ctaH3: "ship.",
    ctaPrimary: "./apply.sh",
    ctaSecondary: "./send-question.sh",
  },

  services: [
    {
      id: "audit",
      title: "Velocity Audit",
      subtitle: "Best entry point if you're not sure what you need yet",
      price: "$1,500 · 5 business days",
      bullets: [
        "Codebase health audit",
        "Top 3 velocity blockers",
        "90-day shipping plan",
        "60-min walkthrough",
      ],
    },
    {
      id: "fractional",
      title: "Fractional Tech Lead",
      subtitle: "Own the roadmap without the full-time hire",
      price: "from $8k / mo",
      bullets: [
        "Architecture decisions & code reviews",
        "Hiring, standards, and technical roadmap",
        "Stand-in CTO for founder-led teams",
      ],
    },
    {
      id: "sprint",
      title: "Product Sprint",
      subtitle: "Ship the thing you've been stuck on",
      price: "$15k / 4 wks",
      bullets: [
        "Scoped engagement, fixed timeline",
        "From prototype to production-ready",
        "Laravel, Vue, APIs, integrations",
      ],
    },
    {
      id: "rescue",
      title: "System Rescue",
      subtitle: "Stabilize the platform that's breaking",
      price: "$7,500 / 2 wks",
      bullets: [
        "Performance audits, DB tuning",
        "Legacy migration & refactoring",
        "Debt triage — ship first, fix the rest",
      ],
    },
  ],
  serviceStart: "$ start",

  caseRole: "role:",
  caseCTA: "cat",
  caseLabels: {
    problem: "## problem",
    approach: "## approach",
    outcome: "## outcome",
    stack: "## stack",
  },
  caseFooterText: "// have a similar problem?",
  caseFooterCTA: "$ ./apply.sh",
  cases: [
    {
      id: "fintech",
      client: "Fintech platform, Chile",
      industry: "Fintech",
      role: "Backend architect",
      year: "2024",
      problem:
        "Reconciliation platform couldn't keep up with daily volume. SII compliance deadlines slipping. Launch blocked.",
      approach:
        "Architected event-driven Laravel backend. Rebuilt reconciliation engine. Integrated SII for electronic invoicing. Shipped in 11 weeks.",
      outcome:
        "Launched on time. Daily reconciliation went from 9h to 22min. Platform now processes $4M/mo.",
      metrics: [
        { k: "Launch", v: "On time" },
        { k: "Reconciliation", v: "9h → 22min" },
        { k: "Processed", v: "$4M/mo" },
      ],
      stack: ["Laravel", "PostgreSQL", "Redis", "AWS", "SII API"],
    },
    {
      id: "isp",
      client: "Regional ISP, LATAM",
      industry: "Networking",
      role: "Systems + product lead",
      year: "2023",
      problem:
        "Manual hotspot provisioning capped growth. Support tickets drowning the team.",
      approach:
        "Built MikroTik-integrated captive portal with self-serve signup. Automated device provisioning across 1,000+ routers.",
      outcome:
        "Onboarding from 40min to 90sec. Support tickets cut 68%. ARPU up 19%.",
      metrics: [
        { k: "Onboarding", v: "40m → 90s" },
        { k: "Support load", v: "−68%" },
        { k: "ARPU", v: "+19%" },
      ],
      stack: ["MikroTik", "Python", "Vue", "Debian", "WHMCS"],
    },
    {
      id: "saas",
      client: "B2B SaaS, US",
      industry: "SaaS",
      role: "Fractional CTO",
      year: "2023",
      problem:
        "Solo-founder codebase couldn't onboard new devs. Stripe integration leaking edge cases.",
      approach:
        "6-month fractional engagement. Refactored to modular Laravel. Rewrote billing layer with idempotent Stripe webhooks.",
      outcome:
        "Team scaled from 1→4 devs. Billing disputes down 94%. Raised seed round with clean due diligence.",
      metrics: [
        { k: "Team", v: "1 → 4 devs" },
        { k: "Billing disputes", v: "−94%" },
        { k: "Raised", v: "Seed round" },
      ],
      stack: ["Laravel", "Vue", "Stripe", "AWS", "Terraform"],
    },
    {
      id: "whmcs",
      client: "Hosting provider, AU",
      industry: "Hosting",
      role: "Integration engineer",
      year: "2022",
      problem:
        "Custom WHMCS billing couldn't handle St. George Bank reconciliation. Manual workarounds every month.",
      approach:
        "Built custom WHMCS module with bank-feed reconciliation. Added audit trail + retry logic.",
      outcome:
        "Monthly close from 3 days to 20 minutes. Zero reconciliation errors across 8 quarters.",
      metrics: [
        { k: "Monthly close", v: "3d → 20m" },
        { k: "Error rate", v: "0" },
        { k: "Saved", v: "$60k/yr" },
      ],
      stack: ["WHMCS", "PHP", "MySQL", "St. George API"],
    },
  ],

  testimonials: [
    {
      quote:
        "David doesn't just write code, he understands the business. He rewrote our billing layer and saved us from a lawsuit-worthy edge case nobody on my team had seen. Hired him for 3 months, kept him for a year.",
      author: "Daniel H",
      role: "CTO, LocalSpark (US)",
      avatar: "DH",
    },
    {
      quote:
        "We had three agencies quote us 6 months to do what David shipped in 11 weeks. And it's still running in production, untouched. He's the real deal.",
      author: "Andres A",
      role: "CEO, Fintech (Chile)",
      avatar: "AA",
    },
    {
      quote:
        "More than 11 years working with David. Senior enough to make the hard calls, hands-on enough to still ship. Rare combo.",
      author: "Phil K.",
      role: "Founder, KernWiFi (AU)",
      avatar: "PK",
    },
  ],

  skills: {
    Backend: [
      "Laravel",
      "PHP",
      "Python",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "Redis",
    ],
    Frontend: ["Vue 3", "React", "TypeScript", "Tailwind", "Inertia"],
    Infrastructure: ["AWS", "Docker", "Terraform", "Debian", "CI/CD"],
    Integrations: [
      "Stripe",
      "SII",
      "WHMCS",
      "MikroTik RouterOS",
      "REST / GraphQL",
    ],
  },

  process: [
    {
      n: "01",
      t: "Discovery call",
      d: "30 min. I listen, ask uncomfortable questions, and tell you if I'm wrong for the job.",
    },
    {
      n: "02",
      t: "Scope & proposal",
      d: "Fixed milestones, fixed price where possible. No hourly games.",
    },
    {
      n: "03",
      t: "Weekly shipping",
      d: "Demos every Friday. You always know what I'm doing and why.",
    },
    {
      n: "04",
      t: "Handover",
      d: "Docs, tests, runbooks. Your team owns it from day one of go-live.",
    },
  ],

  articles: [
    {
      title: "Why I charge more for rescue jobs than greenfield",
      cat: "Business",
      date: "Apr 2026",
      read: "6 min read",
      href: "/blog",
    },
    {
      title: "Idempotent Stripe webhooks: the version that actually works",
      cat: "Engineering",
      date: "Mar 2026",
      read: "11 min read",
      href: "/blog",
    },
    {
      title: "Laravel queues at scale — what breaks first",
      cat: "Engineering",
      date: "Feb 2026",
      read: "9 min read",
      href: "/blog",
    },
    {
      title: "Fractional CTO: the pricing model most founders miss",
      cat: "Business",
      date: "Jan 2026",
      read: "4 min read",
      href: "/blog",
    },
  ],

  about: {
    portraitCaption: "./portrait.jpg",
    meta: [
      "Remote · LATAM time zones",
      "laravel / vue / aws",
      "1 slot, jun 2026",
      "$8k–$12k / month",
    ],
    paragraphs: [
      "been shipping web software since PHP 4.",
      "Started with networking — deployed over a thousand MikroTik devices across LATAM — then moved into backend engineering as the work shifted to SaaS and fintech.",
      "These days I work as a fractional tech lead for founders and CTOs who need someone senior to make the hard calls, lead a small team, and still open a PR.",
      "I care about outcomes — the kind you put on a board deck.",
    ],
    outro: "based in LATAM. Work with teams anywhere. Three clients max.",
  },

  faqs: [
    {
      q: "How quickly can you start?",
      a: "Usually 1–2 weeks. I keep one slot open for urgent rescue work at a premium.",
    },
    {
      q: "Do you sign NDAs?",
      a: "Standard mutual NDA — yes. Predatory assignment-of-all-your-thoughts clauses — no.",
    },
    {
      q: "Will you sub-contract?",
      a: "No. You hire me, you get me. I bring in trusted specialists only with your sign-off.",
    },
    {
      q: "Fixed or hourly?",
      a: "Fixed where scope is clear. Day-rate for advisory and ambiguous discovery. Never hourly.",
    },
  ],

  booking: {
    meta: "// 30 min · remote · utc-5",
    embedHeading: "# pick a slot",
  },
  contact: {
    title: "# ask a question",
    meta: "// Have a question but not a project yet? Good place to start. Reply within 24h.",
    labelName: "> name *",
    labelEmail: "> email *",
    labelMsg: "> question *",
    send: "./send",
    done: "done",
    errRequired: "required",
    errEmail: "invalid email",
    errMsg: "tell me something",
    gotIt: "got it. reply incoming to {email} within 24h.",
  },
  apply: {
    title: "# apply to work with me",
    filename: "~/apply.sh",
    meta: "// 60 seconds. I read every application personally. Reply within 24h.",
    labelName: "> name *",
    labelEmail: "> work email *",
    labelCompanyUrl: "> company url",
    labelRole: "> your role *",
    labelStage: "> company stage *",
    labelNeed: "> what you need *",
    labelContext: "> brief context * (100 chars min)",
    contextHint: "// What's the problem, what have you tried, what does success look like?",
    roleOptions: [
      { value: "CTO", label: "CTO" },
      { value: "Founder", label: "Founder" },
      { value: "VP Eng", label: "VP Engineering" },
      { value: "Head of Eng", label: "Head of Engineering" },
      { value: "Other", label: "Other" },
    ],
    stageOptions: [
      { value: "Pre-seed", label: "Pre-seed" },
      { value: "Seed", label: "Seed" },
      { value: "Series A", label: "Series A" },
      { value: "Series B", label: "Series B" },
      { value: "Bootstrapped profitable", label: "Bootstrapped (profitable)" },
      { value: "Other", label: "Other" },
    ],
    needOptions: [
      { value: "Velocity Audit", label: "Velocity Audit ($1,500)" },
      { value: "Fractional Tech Lead", label: "Fractional Tech Lead" },
      { value: "Product Sprint", label: "Product Sprint" },
      { value: "System Rescue", label: "System Rescue" },
      { value: "Not sure", label: "Not sure yet" },
    ],
    send: "./apply",
    done: "done",
    errRequired: "required",
    errEmail: "invalid email",
    errFreeEmail: "please use your work email (not gmail/yahoo/etc)",
    errUrl: "please enter a valid company url",
    errContext: "needs at least 100 characters — what's the problem?",
    confirmQualifiedTitle: "[✓] application received",
    confirmQualifiedBody:
      "Thanks — you're a strong fit. I'll send a calendar link and 2 prep questions to {email} within 24h.",
    confirmBorderlineTitle: "[✓] application received",
    confirmBorderlineBody:
      "Thanks — I read every application personally. I'll reply to {email} within 24h.",
    confirmNotQualifiedTitle: "[!] probably not the right fit",
    confirmNotQualifiedBody:
      "Based on what you shared, I'm probably not the best person for this. Two things that might help:",
    notQualifiedLinkCases: "→ read the case studies",
    notQualifiedLinkAudit: "→ start with a $1,500 Velocity Audit",
  },
  fitCheck: {
    prompt: "$ cat ./fit-check.txt",
    forHeading: "# This is for you if:",
    forItems: [
      "You're a CTO, founder, or VP Eng at a Seed–Series B SaaS or AI startup",
      "Your team is 5–25 engineers and you're hitting velocity walls",
      "You've shipped products and you know good engineering when you see it",
      "You have budget approved for fractional / contract engineering ($8k+/mo)",
    ],
    notHeading: "# This is NOT for you if:",
    notItems: [
      "You're pre-seed and looking for an equity-based co-founder",
      "You need a junior dev or a single-feature builder ($50/hr work)",
      "You're an agency looking for white-label subcontractors",
      "You want a quick MVP with no architecture conversation",
      "You're in web3 / crypto (not my domain)",
    ],
    footnote:
      'If most of "This is for you" matches → apply below.\nIf most of "NOT for you" matches → I\'ll be honest, save us both the time.',
  },

  cmdk: {
    title: "command palette — type 'help'",
    placeholder: "apply, open work, help...",
  },

  footer: {
    tag: "// fractional tech lead · product engineer",
    contact: "./contact",
    site: "./site",
    workLink: "./work",
    servicesLink: "./services",
    writingLink: "./writing",
    copy: "© 2026 dleolopez.dev",
    deployLabel: "last deploy:",
    builtIn: "built with ♥ in LATAM",
  },
};

const es: TerminalContent = {
  name: "David Lopez",
  location: "Remoto · Zona LATAM",
  email: "david@dleolopez.dev",

  nav: {
    work: "proyectos",
    services: "servicios",
    process: "proceso",
    writing: "blog",
    about: "sobre-mi",
    contact: "contacto",
    bookCall: "./postular.sh",
  },
  navMobile: {
    work: "› proyectos",
    services: "› servicios",
    process: "› proceso",
    writing: "› blog",
    about: "› sobre-mí",
    contact: "› contacto",
  },

  titlebar: { online: "EN LÍNEA", cmdk: "⌘K" },

  hero: {
    session: "session_id: 0x7f4a · uptime: 15a 2m · estado:",
    status: "disponible_jun_2026",
    h1a: "Entrego",
    h1b: "resultados.",
    h1c: "No tickets.",
    lede: [
      "Tech lead fraccional e ingeniero de",
      "producto para CTOs que necesitan",
      "alguien senior que diseñe, entregue",
      "y lidere — sin contratar tiempo completo.",
    ],
    ctaPrimary: "$ ./postular.sh",
    ctaSecondary: "cat ./casos-de-estudio",
    kbdTip: "TIP",
    kbdHint: "pulsa",
  },

  stats: [
    { value: "15+", label: "Años entregando" },
    { value: "40+", label: "Productos lanzados" },
    { value: "$28M", label: "Ingresos desbloqueados a clientes" },
    { value: "1,000+", label: "Sistemas desplegados" },
  ],

  sections: {
    workPrompt: "$ ls -la ./casos-de-estudio/",
    workTitle: "Trabajo entregado.",
    workSub: "Proyectos reales. Resultados de negocio. Sin listas de features.",
    filterLabel: "--filtro",
    allFilter: "todos",

    servicesPrompt: "$ cat ./servicios.json",
    servicesTitle: "Formas de colaborar.",
    servicesSub:
      "Tres maneras de trabajar juntos. Alcance fijo. Sin juegos por hora.",

    processPrompt: "$ ./proceso.sh --verbose",
    processTitle: "Cómo trabajo.",

    testimonialsPrompt: "$ git log --author=clientes",
    testimonialsTitle: "Lo que dijeron.",
    commit: "commit",

    skillsPrompt: "$ cat ./package.json | jq .dependencies",
    skillsTitle: "El stack.",

    writingPrompt: "$ ls ./blog/ | head -n 4",
    writingTitle: "Escritos recientes.",

    aboutPrompt: "$ whoami --long",
    aboutTitle: "Sobre mí.",

    faqPrompt: "$ man david-lopez",
    faqTitle: "Preguntas frecuentes.",

    ctaPrompt: "$ sudo ship --proximo-trimestre",
    ctaH1: "Hagamos que tu",
    ctaH2: "próximo trimestre",
    ctaH3: "se entregue.",
    ctaPrimary: "./postular.sh",
    ctaSecondary: "./enviar-pregunta.sh",
  },

  services: [
    {
      id: "audit",
      title: "Auditoría de Velocidad",
      subtitle: "El mejor punto de entrada si aún no sabes qué necesitas",
      price: "$1,500 · 5 días hábiles",
      bullets: [
        "Auditoría de salud del codebase",
        "Top 3 bloqueadores de velocidad",
        "Plan de entrega a 90 días",
        "Walkthrough de 60 min",
      ],
    },
    {
      id: "fractional",
      title: "Tech Lead Fraccional",
      subtitle: "Sé dueño del roadmap sin contratar tiempo completo",
      price: "desde $8k / mes",
      bullets: [
        "Decisiones de arquitectura y revisiones de código",
        "Contratación, estándares y roadmap técnico",
        "CTO interino para equipos liderados por founders",
      ],
    },
    {
      id: "sprint",
      title: "Sprint de Producto",
      subtitle: "Entrega eso que está atascado",
      price: "$15k / 4 sem",
      bullets: [
        "Alcance y plazo fijos",
        "De prototipo a producción",
        "Laravel, Vue, APIs, integraciones",
      ],
    },
    {
      id: "rescue",
      title: "Rescate de Sistema",
      subtitle: "Estabiliza la plataforma que se está rompiendo",
      price: "$7,500 / 2 sem",
      bullets: [
        "Auditorías de performance, tuning de DB",
        "Migración y refactor de legacy",
        "Triaje de deuda — entregar primero, limpiar después",
      ],
    },
  ],
  serviceStart: "$ start",

  caseRole: "rol:",
  caseCTA: "cat",
  caseLabels: {
    problem: "## problema",
    approach: "## enfoque",
    outcome: "## resultado",
    stack: "## stack",
  },
  caseFooterText: "// ¿un problema parecido?",
  caseFooterCTA: "$ ./postular.sh",
  cases: [
    {
      id: "fintech",
      client: "Plataforma Fintech, Chile",
      industry: "Fintech",
      role: "Arquitecto backend",
      year: "2024",
      problem:
        "La plataforma de conciliación no daba abasto con el volumen diario. Los plazos del SII se estaban incumpliendo. Lanzamiento bloqueado.",
      approach:
        "Diseñé un backend event-driven en Laravel. Reconstruí el motor de conciliación. Integré el SII para facturación electrónica. Entregado en 11 semanas.",
      outcome:
        "Lanzó a tiempo. La conciliación diaria pasó de 9h a 22min. La plataforma procesa $4M/mes.",
      metrics: [
        { k: "Lanzamiento", v: "A tiempo" },
        { k: "Conciliación", v: "9h → 22min" },
        { k: "Procesado", v: "$4M/mes" },
      ],
      stack: ["Laravel", "PostgreSQL", "Redis", "AWS", "API SII"],
    },
    {
      id: "isp",
      client: "ISP regional, LATAM",
      industry: "Redes",
      role: "Lead de sistemas + producto",
      year: "2023",
      problem:
        "El aprovisionamiento manual de hotspots limitaba el crecimiento. Los tickets de soporte ahogaban al equipo.",
      approach:
        "Construí un captive portal integrado con MikroTik con auto-registro. Aprovisionamiento automático en 1,000+ routers.",
      outcome: "Onboarding de 40min a 90s. Tickets de soporte −68%. ARPU +19%.",
      metrics: [
        { k: "Onboarding", v: "40m → 90s" },
        { k: "Soporte", v: "−68%" },
        { k: "ARPU", v: "+19%" },
      ],
      stack: ["MikroTik", "Python", "Vue", "Debian", "WHMCS"],
    },
    {
      id: "saas",
      client: "SaaS B2B, EE.UU.",
      industry: "SaaS",
      role: "CTO fraccional",
      year: "2023",
      problem:
        "Codebase de founder único no permitía sumar devs. Integración con Stripe con edge cases.",
      approach:
        "Compromiso fraccional de 6 meses. Refactor a Laravel modular. Reescribí la capa de billing con webhooks Stripe idempotentes.",
      outcome:
        "Equipo creció de 1→4 devs. Disputas de cobro −94%. Cerraron ronda seed con due diligence limpio.",
      metrics: [
        { k: "Equipo", v: "1 → 4 devs" },
        { k: "Disputas", v: "−94%" },
        { k: "Ronda", v: "Seed" },
      ],
      stack: ["Laravel", "Vue", "Stripe", "AWS", "Terraform"],
    },
    {
      id: "whmcs",
      client: "Proveedor de hosting, AU",
      industry: "Hosting",
      role: "Ingeniero de integración",
      year: "2022",
      problem:
        "WHMCS custom no manejaba la conciliación con St. George Bank. Workarounds manuales cada mes.",
      approach:
        "Módulo WHMCS custom con conciliación por bank feed. Audit trail y lógica de reintentos.",
      outcome:
        "Cierre mensual de 3 días a 20 minutos. Cero errores de conciliación en 8 trimestres.",
      metrics: [
        { k: "Cierre mensual", v: "3d → 20m" },
        { k: "Errores", v: "0" },
        { k: "Ahorro", v: "$60k/año" },
      ],
      stack: ["WHMCS", "PHP", "MySQL", "API St. George"],
    },
  ],

  testimonials: [
    {
      quote:
        "David no solo escribe código, entiende el negocio. Reescribió nuestra capa de billing y nos salvó de un edge case que nadie en el equipo había visto. Lo contraté por 3 meses y se quedó un año.",
      author: "Daniel H",
      role: "CTO, LocalSpark (EE.UU.)",
      avatar: "DH",
    },
    {
      quote:
        "Tres agencias nos cotizaron 6 meses para lo que David entregó en 11 semanas. Y sigue en producción intacto. Es el verdadero.",
      author: "Andres A",
      role: "CEO, Fintech (Chile)",
      avatar: "AA",
    },
    {
      quote:
        "Todos los founders que conozco buscan a su David. Senior suficiente para las decisiones duras, hands-on suficiente para entregar. Combinación rara.",
      author: "Phil K.",
      role: "Founder, KernWiFi (AU)",
      avatar: "PK",
    },
  ],

  skills: {
    Backend: [
      "Laravel",
      "PHP",
      "Python",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "Redis",
    ],
    Frontend: ["Vue 3", "React", "TypeScript", "Tailwind", "Inertia"],
    Infraestructura: ["AWS", "Docker", "Terraform", "Debian", "CI/CD"],
    Integraciones: [
      "Stripe",
      "SII",
      "WHMCS",
      "MikroTik RouterOS",
      "REST / GraphQL",
    ],
  },

  process: [
    {
      n: "01",
      t: "Llamada de descubrimiento",
      d: "30 min. Escucho, hago preguntas incómodas, y te digo si no soy la persona indicada.",
    },
    {
      n: "02",
      t: "Alcance y propuesta",
      d: "Hitos fijos, precio fijo cuando es posible. Sin juegos por hora.",
    },
    {
      n: "03",
      t: "Entregas semanales",
      d: "Demos cada viernes. Siempre sabes qué estoy haciendo y por qué.",
    },
    {
      n: "04",
      t: "Entrega final",
      d: "Docs, tests, runbooks. Tu equipo toma posesión desde el día uno del go-live.",
    },
  ],

  articles: [
    {
      title: "Por qué cobro más por rescates que por greenfield",
      cat: "Negocio",
      date: "Abr 2026",
      read: "6 min",
      href: "/blog",
    },
    {
      title:
        "Webhooks idempotentes de Stripe: la versión que realmente funciona",
      cat: "Ingeniería",
      date: "Mar 2026",
      read: "11 min",
      href: "/blog",
    },
    {
      title: "Colas de Laravel a escala — qué se rompe primero",
      cat: "Ingeniería",
      date: "Feb 2026",
      read: "9 min",
      href: "/blog",
    },
    {
      title:
        "CTO fraccional: el modelo de precios que la mayoría de founders no ve",
      cat: "Negocio",
      date: "Ene 2026",
      read: "4 min",
      href: "/blog",
    },
  ],

  about: {
    portraitCaption: "./retrato.jpg",
    meta: [
      "Remoto · Zona LATAM",
      "laravel / vue / aws",
      "1 cupo, jun 2026",
      "$8k–$12k / mes",
    ],
    paragraphs: [
      "entregando software web desde PHP 4.",
      "Empecé en redes — desplegué más de mil equipos MikroTik en LATAM — luego me moví a ingeniería backend mientras el trabajo migraba a SaaS y fintech.",
      "Hoy trabajo como tech lead fraccional para founders y CTOs que necesitan alguien senior que tome decisiones difíciles, lidere un equipo pequeño y aún así abra PRs.",
      "Me importan los resultados — del tipo que se presenta al board.",
    ],
    outro:
      "con base en LATAM. Trabajo con equipos en cualquier parte. Máximo tres clientes.",
  },

  faqs: [
    {
      q: "¿Qué tan rápido puedes empezar?",
      a: "Usualmente 1–2 semanas. Mantengo un cupo abierto para rescates urgentes con tarifa premium.",
    },
    {
      q: "¿Firmas NDAs?",
      a: "NDA mutuo estándar — sí. Cláusulas predatorias de cesión de todo-lo-que-piensas — no.",
    },
    {
      q: "¿Subcontratas?",
      a: "No. Me contratas a mí, trabajo yo. Traigo especialistas de confianza solo con tu aprobación.",
    },
    {
      q: "¿Fijo o por hora?",
      a: "Fijo cuando el alcance es claro. Tarifa diaria para consultoría y descubrimiento ambiguo. Nunca por hora.",
    },
  ],

  booking: {
    meta: "// 30 min · remoto · utc-5",
    embedHeading: "# elige un horario",
  },
  contact: {
    title: "# hazme una pregunta",
    meta: "// ¿Una pregunta sin proyecto todavía? Este es el lugar. Respuesta en 24h.",
    labelName: "> nombre *",
    labelEmail: "> email *",
    labelMsg: "> pregunta *",
    send: "./enviar",
    done: "listo",
    errRequired: "requerido",
    errEmail: "email inválido",
    errMsg: "cuéntame algo",
    gotIt: "recibido. respuesta para {email} dentro de 24h.",
  },
  apply: {
    title: "# postular para trabajar conmigo",
    filename: "~/postular.sh",
    meta: "// 60 segundos. Leo cada postulación personalmente. Respondo en 24h.",
    labelName: "> nombre *",
    labelEmail: "> email de trabajo *",
    labelCompanyUrl: "> url de la empresa",
    labelRole: "> tu rol *",
    labelStage: "> etapa de la empresa *",
    labelNeed: "> qué necesitas *",
    labelContext: "> contexto breve * (mín. 100 caracteres)",
    contextHint:
      "// ¿Cuál es el problema, qué has intentado, cómo se ve el éxito?",
    roleOptions: [
      { value: "CTO", label: "CTO" },
      { value: "Founder", label: "Founder" },
      { value: "VP Eng", label: "VP de Ingeniería" },
      { value: "Head of Eng", label: "Head de Ingeniería" },
      { value: "Other", label: "Otro" },
    ],
    stageOptions: [
      { value: "Pre-seed", label: "Pre-seed" },
      { value: "Seed", label: "Seed" },
      { value: "Series A", label: "Series A" },
      { value: "Series B", label: "Series B" },
      { value: "Bootstrapped profitable", label: "Bootstrapped (rentable)" },
      { value: "Other", label: "Otro" },
    ],
    needOptions: [
      { value: "Velocity Audit", label: "Auditoría de Velocidad ($1,500)" },
      { value: "Fractional Tech Lead", label: "Tech Lead Fraccional" },
      { value: "Product Sprint", label: "Sprint de Producto" },
      { value: "System Rescue", label: "Rescate de Sistema" },
      { value: "Not sure", label: "No estoy seguro todavía" },
    ],
    send: "./postular",
    done: "listo",
    errRequired: "requerido",
    errEmail: "email inválido",
    errFreeEmail: "usa tu email de trabajo (no gmail/yahoo/etc)",
    errUrl: "ingresa una url válida",
    errContext: "mínimo 100 caracteres — ¿cuál es el problema?",
    confirmQualifiedTitle: "[✓] postulación recibida",
    confirmQualifiedBody:
      "Gracias — eres un buen fit. Enviaré link de calendario y 2 preguntas de preparación a {email} en 24h.",
    confirmBorderlineTitle: "[✓] postulación recibida",
    confirmBorderlineBody:
      "Gracias — leo cada postulación personalmente. Responderé a {email} en 24h.",
    confirmNotQualifiedTitle: "[!] probablemente no soy el fit correcto",
    confirmNotQualifiedBody:
      "Por lo que compartiste, probablemente no soy la mejor persona. Dos cosas que pueden ayudar:",
    notQualifiedLinkCases: "→ lee los casos de estudio",
    notQualifiedLinkAudit: "→ empieza con una Auditoría de Velocidad ($1,500)",
  },
  fitCheck: {
    prompt: "$ cat ./fit-check.txt",
    forHeading: "# Esto es para ti si:",
    forItems: [
      "Eres CTO, founder o VP de Ingeniería en un SaaS o startup AI en etapa Seed–Series B",
      "Tu equipo tiene 5–25 ingenieros y están chocando con muros de velocidad",
      "Has entregado productos y reconoces buena ingeniería cuando la ves",
      "Tienes presupuesto aprobado para ingeniería fraccional / contratista ($8k+/mes)",
    ],
    notHeading: "# Esto NO es para ti si:",
    notItems: [
      "Estás en pre-seed buscando un co-founder técnico con equity",
      "Necesitas un dev junior o alguien para una sola feature ($50/hr)",
      "Eres una agencia buscando subcontratar white-label",
      "Quieres un MVP rápido sin conversación de arquitectura",
      "Estás en web3 / crypto (no es mi dominio)",
    ],
    footnote:
      'Si la mayoría de "Esto es para ti" aplica → postula abajo.\nSi la mayoría de "NO es para ti" aplica → te lo diré con honestidad, ahorrémonos el tiempo.',
  },

  cmdk: {
    title: "paleta de comandos — escribe 'help'",
    placeholder: "apply, open work, help...",
  },

  footer: {
    tag: "// tech lead fraccional · ingeniero de producto",
    contact: "./contacto",
    site: "./sitio",
    workLink: "./proyectos",
    servicesLink: "./servicios",
    writingLink: "./blog",
    copy: "© 2026 dleolopez.dev",
    deployLabel: "último deploy:",
    builtIn: "construido con ♥ en LATAM",
  },
};

export const terminalContent: Record<Lang, TerminalContent> = { en, es };
