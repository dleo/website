// Extended blog post data — lives alongside SITE_I18N
window.BLOG_I18N = {
  en: {
    headerPrompt: "$ cat ~/blog/README.md",
    headerTitle: "The blog.",
    headerSub: "Notes from 15 years of shipping. Engineering, business, and the messy middle.",
    searchPlaceholder: "search posts...",
    searchLabel: "--query",
    filterLabel: "--category",
    allFilter: "all",
    featuredLabel: "// pinned",
    postsLabel: "$ ls -la ./posts/",
    postsCount: "posts",
    noResults: "// no posts match. try a different query.",
    backToIndex: "← cd ..",
    tocLabel: "// table of contents",
    publishedOn: "published",
    updatedOn: "updated",
    tagsLabel: "// tags",
    shareLabel: "// share",
    nextPost: "next post →",
    prevPost: "← previous post",
    subscribePrompt: "$ subscribe --email",
    subscribeTitle: "New posts. No noise.",
    subscribeSub: "One email when I publish. Usually every 3–4 weeks. No tracking.",
    subscribePlaceholder: "your@email.com",
    subscribeBtn: "./subscribe",
    subscribedMsg: "// you're in. check your inbox.",
    readingLabel: "reading",
    minRead: "min read",
    categories: {
      "all": "all",
      "Engineering": "engineering",
      "Business": "business",
      "Tooling": "tooling",
      "Career": "career"
    },

    posts: [
      {
        slug: "rescue-vs-greenfield",
        title: "Why I charge more for rescue jobs than greenfield",
        cat: "Business",
        date: "Apr 2026",
        dateISO: "2026-04-14",
        read: 6,
        featured: true,
        tags: ["pricing", "consulting", "fractional-cto"],
        excerpt: "Fixing a production fire is harder than starting from zero. The pricing should reflect that — and most consultants get this backwards.",
        blocks: [
          { type: "p", text: "Most consultants price greenfield higher than rescue work. The logic goes: greenfield is creative, rescue is cleanup. New builds feel sexier to quote." },
          { type: "p", text: "I do the opposite. A rescue job costs you 40% more than a greenfield sprint of the same duration. Here's why, and why you should probably want that too." },
          { type: "h3", text: "Rescue work carries real risk" },
          { type: "p", text: "When you walk into a broken system, you inherit every decision the previous team made — including the ones nobody documented. You're archaeologist and engineer. You're also the person on the hook when production catches fire at 3am on week two." },
          { type: "p", text: "Greenfield, I own every line I write. If it breaks, I wrote it. I can fix it. My velocity is predictable because I'm not fighting ghosts." },
          { type: "h3", text: "The pricing math" },
          { type: "code", lang: "text", text: "Greenfield sprint (4 wks):   $12k  →  $3k/wk\nRescue engagement (2 wks):    $6k   →  $3k/wk  (base)\nRescue engagement (2 wks):    $8.4k →  $4.2k/wk (actual)" },
          { type: "p", text: "Same hourly base. Plus a risk premium. I set the premium at 40% because in my data, rescue jobs run ~35% over scope. Someone has to absorb that risk. If I don't, you do." },
          { type: "h3", text: "What you're actually paying for" },
          { type: "ul", items: [
            "A triage process that works under pressure (not guesswork)",
            "Someone who's seen this pattern before and won't panic",
            "The option to stop — clean exit, docs, runbook — if the system can't be saved"
          ] },
          { type: "p", text: "If your current vendor hasn't given you a clean answer on any of those three, the discount you think you're getting is a loan with terrible terms." },
          { type: "h3", text: "When to take the premium" },
          { type: "p", text: "Not every rescue needs a premium price. If the system is broken but documented, and the original team is available to pair with — it's a scoped sprint. Discount territory." },
          { type: "p", text: "But if you're telling me \"we don't know what it does anymore\" or \"the person who wrote this left\" — that's a rescue, and you're buying risk transfer, not code." }
        ]
      },
      {
        slug: "idempotent-stripe-webhooks",
        title: "Idempotent Stripe webhooks: the version that actually works",
        cat: "Engineering",
        date: "Mar 2026",
        dateISO: "2026-03-22",
        read: 11,
        featured: false,
        tags: ["stripe", "laravel", "webhooks"],
        excerpt: "Every Stripe integration tutorial hand-waves idempotency. Here's the pattern I've shipped 6 times without a single duplicate charge.",
        blocks: [
          { type: "p", text: "Stripe will retry any webhook it doesn't get a 2xx for. That's a feature — until it isn't." },
          { type: "p", text: "In production, you'll see the same event arrive 2–4 times on bad network days. If your handler isn't idempotent, you'll charge customers twice, send duplicate emails, and double-fulfill orders. This is the #1 billing bug I get hired to fix." },
          { type: "h3", text: "The wrong pattern" },
          { type: "code", lang: "php", text: "// DON'T DO THIS\npublic function handle(Request $r) {\n  $event = $r->input('data.object');\n  $this->fulfillOrder($event['id']);\n  return response('ok');\n}" },
          { type: "p", text: "This will double-fulfill. Every time." },
          { type: "h3", text: "The right pattern" },
          { type: "p", text: "Three rules, in this order:" },
          { type: "ul", items: [
            "1. Record the event.id before processing. Unique index. Transaction.",
            "2. If insert fails with a constraint violation, it's a replay — return 200 immediately.",
            "3. Only after the insert commits do you run side effects."
          ] },
          { type: "code", lang: "php", text: "public function handle(Request $r) {\n  $eventId = $r->input('id');\n  try {\n    DB::transaction(function () use ($eventId, $r) {\n      StripeEvent::create(['id' => $eventId, 'payload' => $r->all()]);\n    });\n  } catch (QueryException $e) {\n    if ($e->errorInfo[1] === 1062) return response('replay', 200);\n    throw $e;\n  }\n  ProcessStripeEvent::dispatch($eventId);\n  return response('ok');\n}" },
          { type: "h3", text: "Why the job dispatch, not inline?" },
          { type: "p", text: "Stripe's timeout is 30s. Your fulfillment logic might call 3 APIs and take longer on a bad day. If the handler times out, Stripe retries — but now you've committed the event row, so it becomes a replay and you silently drop the fulfillment." },
          { type: "p", text: "Queue the work. Handler returns 200 in <200ms every time. Queue worker does the heavy lift with its own retry budget." }
        ]
      },
      {
        slug: "laravel-queues-at-scale",
        title: "Laravel queues at scale — what breaks first",
        cat: "Engineering",
        date: "Feb 2026",
        dateISO: "2026-02-10",
        read: 9,
        featured: false,
        tags: ["laravel", "queues", "redis", "scaling"],
        excerpt: "A Laravel queue handles 100 jobs/sec until it doesn't. Here's the order things fail, and what to fix before you hit each wall.",
        blocks: [
          { type: "p", text: "I've watched Laravel queues fail in production 12+ times across different clients. The failures follow a predictable order. Fix them in this order and you'll never fight the same fire twice." },
          { type: "h3", text: "Wall #1: Redis connection saturation (~50 jobs/sec)" },
          { type: "p", text: "Every worker holds a Redis connection. Add workers, add connections. Default phpredis + default Laravel config hits ~50 jobs/sec per worker before you start queueing on Redis itself." },
          { type: "p", text: "Fix: Use Redis pipelining for bulk dispatches. Raise maxclients in redis.conf. Use connection pooling if you're on a hosted Redis." },
          { type: "h3", text: "Wall #2: The serializer (~200 jobs/sec)" },
          { type: "p", text: "Laravel serializes the entire job object. If you're passing an Eloquent model, you're serializing all its loaded relations. At volume, this kills both CPU and Redis memory." },
          { type: "p", text: "Fix: Pass IDs, not models. Refetch inside the job." }
        ]
      },
      {
        slug: "fractional-cto-pricing",
        title: "Fractional CTO: the pricing model most founders miss",
        cat: "Business",
        date: "Jan 2026",
        dateISO: "2026-01-18",
        read: 4,
        featured: false,
        tags: ["pricing", "fractional-cto", "founders"],
        excerpt: "Hourly rates make fractional work a bad deal for both sides. The retainer + milestone model is the one that actually aligns incentives.",
        blocks: [
          { type: "p", text: "Most fractional CTOs price hourly. It's the easiest thing to quote, and the worst thing for everyone involved." },
          { type: "h3", text: "The problem with hourly" },
          { type: "p", text: "Hourly incentivizes slow. If I bill $200/hr and I can fix your problem in 2 hours or 6, which one gets paid better? The one that takes longer." },
          { type: "p", text: "You, the founder, feel this. You start rationing questions. You stop asking for quick opinions. You definitely don't call me when something's on fire on a Saturday because you're afraid of the bill." },
          { type: "h3", text: "The retainer + milestone model" },
          { type: "p", text: "Flat monthly retainer. Unlimited access (text, call, async). Scoped milestones attached to business outcomes." },
          { type: "p", text: "I get paid to think, not to type. You get a senior technical partner who's actually available. We both win when the business ships." }
        ]
      },
      {
        slug: "mikrotik-at-scale",
        title: "Deploying a thousand MikroTiks — lessons from ISP land",
        cat: "Tooling",
        date: "Dec 2025",
        dateISO: "2025-12-07",
        read: 8,
        featured: false,
        tags: ["mikrotik", "networking", "automation"],
        excerpt: "Before I was a Laravel consultant I was a networking guy. Here's what 1,000+ MikroTik deployments taught me about building tooling that survives.",
        blocks: [
          { type: "p", text: "My first real engineering job was an ISP in LATAM. By the time I left, I'd had hands on more than a thousand MikroTik devices across three countries. Most of what I know about shipping software came from shipping hardware first." },
          { type: "h3", text: "Rule 1: Config is source code" },
          { type: "p", text: "Nothing gets typed into a device by hand. Ever. Every config is a template, every template lives in git, every deployment is a script. This sounds obvious in 2026 but half the ISPs I audited last year still SSH into boxes and hand-edit rules." }
        ]
      },
      {
        slug: "hiring-senior-engineers",
        title: "How I screen senior engineering candidates",
        cat: "Career",
        date: "Nov 2025",
        dateISO: "2025-11-14",
        read: 7,
        featured: false,
        tags: ["hiring", "interviews"],
        excerpt: "Most senior interviews are badly calibrated. Here's the 3-question screen I use when helping clients hire a staff+ engineer.",
        blocks: [
          { type: "p", text: "I help clients hire their first senior engineer maybe 3–4 times a year. I've refined a short screen that catches impostors and identifies real staff-level thinking in 45 minutes." },
          { type: "h3", text: "Question 1: \"Walk me through a system you'd rebuild\"" },
          { type: "p", text: "Not a system they built — one they'd rebuild. The answer tells you how they think about trade-offs, technical debt, and what they consider worth the effort to change." }
        ]
      }
    ]
  },

  es: {
    headerPrompt: "$ cat ~/blog/README.md",
    headerTitle: "El blog.",
    headerSub: "Notas de 15 años entregando. Ingeniería, negocio y el caos intermedio.",
    searchPlaceholder: "buscar posts...",
    searchLabel: "--query",
    filterLabel: "--categoría",
    allFilter: "todos",
    featuredLabel: "// destacado",
    postsLabel: "$ ls -la ./posts/",
    postsCount: "posts",
    noResults: "// no hay posts que coincidan. prueba otra búsqueda.",
    backToIndex: "← cd ..",
    tocLabel: "// tabla de contenidos",
    publishedOn: "publicado",
    updatedOn: "actualizado",
    tagsLabel: "// tags",
    shareLabel: "// compartir",
    nextPost: "siguiente post →",
    prevPost: "← post anterior",
    subscribePrompt: "$ subscribe --email",
    subscribeTitle: "Nuevos posts. Sin ruido.",
    subscribeSub: "Un email cuando publico. Cada 3–4 semanas. Sin tracking.",
    subscribePlaceholder: "tu@email.com",
    subscribeBtn: "./suscribir",
    subscribedMsg: "// listo. revisa tu inbox.",
    readingLabel: "lectura",
    minRead: "min",
    categories: {
      "all": "todos",
      "Engineering": "ingeniería",
      "Business": "negocio",
      "Tooling": "herramientas",
      "Career": "carrera"
    },

    posts: [
      {
        slug: "rescue-vs-greenfield",
        title: "Por qué cobro más por rescates que por greenfield",
        cat: "Business",
        date: "Abr 2026",
        dateISO: "2026-04-14",
        read: 6,
        featured: true,
        tags: ["pricing", "consultoría", "cto-fraccional"],
        excerpt: "Apagar un incendio en producción es más difícil que empezar de cero. El precio debería reflejarlo — y la mayoría de consultores lo hacen al revés.",
        blocks: [
          { type: "p", text: "La mayoría de consultores cobra más por greenfield que por rescate. La lógica: greenfield es creativo, rescate es limpieza. Los builds nuevos se sienten más sexys para cotizar." },
          { type: "p", text: "Yo hago lo contrario. Un rescate cuesta 40% más que un sprint greenfield de la misma duración. Aquí está por qué, y por qué probablemente tú también lo prefieras." },
          { type: "h3", text: "El trabajo de rescate carga riesgo real" },
          { type: "p", text: "Cuando entras a un sistema roto, heredas cada decisión que tomó el equipo anterior — incluidas las que nadie documentó. Eres arqueólogo e ingeniero. También eres la persona a la que llaman cuando producción se cae a las 3am en la semana dos." },
          { type: "p", text: "En greenfield, soy dueño de cada línea que escribo. Si se rompe, yo la escribí. Puedo arreglarla. Mi velocidad es predecible porque no estoy peleando con fantasmas." },
          { type: "h3", text: "La matemática del precio" },
          { type: "code", lang: "text", text: "Sprint greenfield (4 sem):    $12k  →  $3k/sem\nRescate (2 sem):               $6k   →  $3k/sem  (base)\nRescate (2 sem):               $8.4k →  $4.2k/sem (real)" },
          { type: "p", text: "Misma tarifa base. Más un premium de riesgo. Pongo el premium en 40% porque en mi data, los rescates se pasan de alcance ~35%. Alguien absorbe ese riesgo. Si no soy yo, eres tú." },
          { type: "h3", text: "Qué estás pagando realmente" },
          { type: "ul", items: [
            "Un proceso de triaje que funciona bajo presión (no adivinanzas)",
            "Alguien que ya vio este patrón y no entra en pánico",
            "La opción de parar — salida limpia, docs, runbook — si el sistema no se puede salvar"
          ] },
          { type: "p", text: "Si tu proveedor actual no te da una respuesta clara en cualquiera de esos tres, el descuento que crees tener es un préstamo con términos terribles." }
        ]
      },
      {
        slug: "idempotent-stripe-webhooks",
        title: "Webhooks idempotentes de Stripe: la versión que funciona",
        cat: "Engineering",
        date: "Mar 2026",
        dateISO: "2026-03-22",
        read: 11,
        featured: false,
        tags: ["stripe", "laravel", "webhooks"],
        excerpt: "Todos los tutoriales de Stripe pasan por alto la idempotencia. Aquí está el patrón que he entregado 6 veces sin un solo cobro duplicado.",
        blocks: [
          { type: "p", text: "Stripe reintenta cualquier webhook que no reciba un 2xx. Es un feature — hasta que no lo es." },
          { type: "p", text: "En producción, vas a ver el mismo evento llegar 2–4 veces en días de red mala. Si tu handler no es idempotente, cobrarás dos veces, enviarás emails duplicados y fulfilarás órdenes dobles. Este es el bug #1 de billing que me contratan para arreglar." },
          { type: "h3", text: "El patrón incorrecto" },
          { type: "code", lang: "php", text: "// NO HAGAS ESTO\npublic function handle(Request $r) {\n  $event = $r->input('data.object');\n  $this->fulfillOrder($event['id']);\n  return response('ok');\n}" },
          { type: "p", text: "Esto va a fulfilar dos veces. Siempre." },
          { type: "h3", text: "El patrón correcto" },
          { type: "ul", items: [
            "1. Registra event.id antes de procesar. Índice único. Transacción.",
            "2. Si el insert falla por constraint, es un replay — retorna 200 de inmediato.",
            "3. Solo después del commit ejecutas los side effects."
          ] }
        ]
      },
      {
        slug: "laravel-queues-at-scale",
        title: "Colas de Laravel a escala — qué se rompe primero",
        cat: "Engineering",
        date: "Feb 2026",
        dateISO: "2026-02-10",
        read: 9,
        featured: false,
        tags: ["laravel", "colas", "redis", "escala"],
        excerpt: "Una cola de Laravel maneja 100 jobs/seg hasta que no. Aquí está el orden en que fallan las cosas y qué arreglar antes de cada pared.",
        blocks: [
          { type: "p", text: "He visto colas de Laravel fallar en producción 12+ veces en distintos clientes. Los fallos siguen un orden predecible. Arréglalos en este orden y no pelearás el mismo incendio dos veces." },
          { type: "h3", text: "Pared #1: Saturación de conexiones Redis (~50 jobs/seg)" },
          { type: "p", text: "Cada worker mantiene una conexión Redis. Más workers, más conexiones. phpredis default + config Laravel default te da ~50 jobs/seg por worker antes de hacer cola en el mismo Redis." }
        ]
      },
      {
        slug: "fractional-cto-pricing",
        title: "CTO fraccional: el modelo de precios que los founders no ven",
        cat: "Business",
        date: "Ene 2026",
        dateISO: "2026-01-18",
        read: 4,
        featured: false,
        tags: ["pricing", "cto-fraccional", "founders"],
        excerpt: "Las tarifas por hora hacen que el trabajo fraccional sea un mal deal para ambos. El modelo de retainer + hitos es el que realmente alinea incentivos.",
        blocks: [
          { type: "p", text: "La mayoría de los CTOs fraccionales cobra por hora. Es lo más fácil de cotizar, y lo peor para todos los involucrados." },
          { type: "h3", text: "El problema con cobrar por hora" },
          { type: "p", text: "Por hora incentiva la lentitud. Si cobro $200/hr y puedo arreglar tu problema en 2 horas o 6, ¿cuál me paga mejor? La que toma más tiempo." }
        ]
      },
      {
        slug: "mikrotik-at-scale",
        title: "Desplegando mil MikroTiks — lecciones del mundo ISP",
        cat: "Tooling",
        date: "Dic 2025",
        dateISO: "2025-12-07",
        read: 8,
        featured: false,
        tags: ["mikrotik", "redes", "automatización"],
        excerpt: "Antes de ser consultor Laravel era el chico de redes. Esto es lo que me enseñaron 1,000+ despliegues de MikroTik sobre construir herramientas que sobreviven.",
        blocks: [
          { type: "p", text: "Mi primer trabajo real de ingeniería fue en un ISP en LATAM. Cuando me fui, había puesto las manos en más de mil equipos MikroTik en tres países." }
        ]
      },
      {
        slug: "hiring-senior-engineers",
        title: "Cómo screeneo candidatos senior",
        cat: "Career",
        date: "Nov 2025",
        dateISO: "2025-11-14",
        read: 7,
        featured: false,
        tags: ["hiring", "entrevistas"],
        excerpt: "La mayoría de entrevistas senior están mal calibradas. Este es el screen de 3 preguntas que uso cuando ayudo a clientes a contratar staff+.",
        blocks: [
          { type: "p", text: "Ayudo a clientes a contratar a su primer ingeniero senior unas 3–4 veces al año. Afiné un screen corto que detecta impostores e identifica pensamiento staff-level en 45 minutos." }
        ]
      }
    ]
  }
};
