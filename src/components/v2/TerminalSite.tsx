import { Fragment, useEffect, useState } from "react";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "~/assets/styles/terminal.css";

import type { ArticleItem, CaseItem, Lang } from "~/data/v2/types";
import { useI18n } from "./i18n";
import { TmFAQ } from "./TmFAQ";
import { TmCaseModal } from "./TmCaseModal";
import { TmBookingModal } from "./TmBookingModal";
import { TmContactModal } from "./TmContactModal";

type CmdEntry = { cmd: string; out: string[] };

type Props = {
  latestPosts?: ArticleItem[];
};

const TerminalSite = ({ latestPosts }: Props = {}) => {
  const [t, lang, setLang] = useI18n();
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState<CaseItem | null>(null);
  const [filter, setFilter] = useState("all");
  const [cmdHistory, setCmdHistory] = useState<CmdEntry[]>([]);
  const [cmdInput, setCmdInput] = useState("");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    setFilter("all");
  }, [lang]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", key);
    };
  }, []);

  const industries = [
    "all",
    ...new Set(t.cases.map((c) => c.industry.toLowerCase())),
  ];
  const visibleCases =
    filter === "all"
      ? t.cases
      : t.cases.filter((c) => c.industry.toLowerCase() === filter);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 48, behavior: "smooth" });
    setNavOpen(false);
    setCmdOpen(false);
  };

  const runCmd = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    const out: string[] = [];
    if (c === "help") {
      out.push(
        "available: open <section>, book, contact, lang <en|es>, clear, whoami",
        "sections: work, services, process, writing, about",
      );
    } else if (c.startsWith("open ")) {
      const tg = c.slice(5);
      if (["work", "services", "process", "writing", "about"].includes(tg)) {
        scrollTo(tg);
        out.push(`→ scrolled to #${tg}`);
      } else out.push(`error: unknown section '${tg}'`);
    } else if (c === "book") {
      setBookingOpen(true);
      out.push("→ opening booking...");
      setCmdOpen(false);
    } else if (c === "contact") {
      setContactOpen(true);
      out.push("→ opening contact...");
      setCmdOpen(false);
    } else if (c === "lang en" || c === "lang es") {
      const next = c.split(" ")[1] as Lang;
      setLang(next);
      out.push(`→ language: ${next}`);
    } else if (c === "whoami") {
      out.push("david lopez · fractional tech lead · 15yrs · latam");
    } else if (c === "clear") {
      setCmdHistory([]);
      setCmdInput("");
      return;
    } else if (c) {
      out.push(`command not found: ${c} — try 'help'`);
    }
    setCmdHistory([...cmdHistory, { cmd, out }]);
    setCmdInput("");
  };

  return (
    <div className="tm-root">
      <div className="tm-titlebar">
        <div className="tm-tb-left">
          <span className="tm-dot tm-dot--r" />
          <span className="tm-dot tm-dot--y" />
          <span className="tm-dot tm-dot--g" />
          <span className="tm-tb-path">david@lopez:~/portfolio $</span>
        </div>
        <div className="tm-tb-center">
          dleolopez.dev — {t.footer.tag.replace("// ", "")}
        </div>
        <div className="tm-tb-right">
          <div className="tm-lang-toggle">
            <button
              className={lang === "en" ? "on" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={lang === "es" ? "on" : ""}
              onClick={() => setLang("es")}
            >
              ES
            </button>
          </div>
          <span className="tm-sep">|</span>
          <span className="tm-status-dot" />
          <span>{t.titlebar.online}</span>
          <span className="tm-sep">|</span>
          <span>{clock} UTC-5</span>
          <button className="tm-cmdk" onClick={() => setCmdOpen(true)}>
            ⌘K
          </button>
        </div>
      </div>

      <nav className="tm-nav">
        <div className="tm-nav-inner">
          <button
            className="tm-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="tm-prompt">~$</span>
            <span className="tm-logo-name">david_lopez</span>
            <span className="tm-caret">_</span>
          </button>
          <div className="tm-nav-links">
            <button onClick={() => scrollTo("work")}>cd ./{t.nav.work}</button>
            <button onClick={() => scrollTo("services")}>
              cd ./{t.nav.services}
            </button>
            <button onClick={() => scrollTo("process")}>
              cd ./{t.nav.process}
            </button>
            <button onClick={() => scrollTo("writing")}>
              cd ./{t.nav.writing}
            </button>
            <button onClick={() => scrollTo("about")}>
              cd ./{t.nav.about}
            </button>
            <button onClick={() => setContactOpen(true)}>
              cd ./{t.nav.contact}
            </button>
            <button className="tm-nav-cta" onClick={() => setBookingOpen(true)}>
              {t.nav.bookCall}
            </button>
          </div>
          <button className="tm-menu-btn" onClick={() => setNavOpen(!navOpen)}>
            [ {navOpen ? "x" : "≡"} ]
          </button>
        </div>
        {navOpen && (
          <div className="tm-mobile-menu">
            <button onClick={() => scrollTo("work")}>{t.navMobile.work}</button>
            <button onClick={() => scrollTo("services")}>
              {t.navMobile.services}
            </button>
            <button onClick={() => scrollTo("process")}>
              {t.navMobile.process}
            </button>
            <button onClick={() => scrollTo("writing")}>
              {t.navMobile.writing}
            </button>
            <button onClick={() => scrollTo("about")}>
              {t.navMobile.about}
            </button>
            <button
              onClick={() => {
                setContactOpen(true);
                setNavOpen(false);
              }}
            >
              {t.navMobile.contact}
            </button>
            <button
              onClick={() => {
                setBookingOpen(true);
                setNavOpen(false);
              }}
              className="tm-nav-cta"
            >
              {t.nav.bookCall}
            </button>
          </div>
        )}
      </nav>

      <section className="tm-hero">
        <div className="tm-grid-bg" />
        <div className="tm-hero-inner">
          <div className="tm-hero-meta">
            <div className="tm-meta-line">
              // {t.hero.session} <span className="tm-ok">{t.hero.status}</span>
            </div>
          </div>
          <h1 className="tm-h1">
            <span className="tm-h1-line">{t.hero.h1a}</span>
            <span className="tm-h1-line tm-h1-hl">{t.hero.h1b}</span>
            <span className="tm-h1-line tm-h1-sub">{t.hero.h1c}</span>
          </h1>
          <p className="tm-lede">
            <span className="tm-comment">/**</span>
            {t.hero.lede.map((line, i) => (
              <Fragment key={i}>
                <br />
                <span className="tm-comment"> *</span> {line}
              </Fragment>
            ))}
            <br />
            <span className="tm-comment"> */</span>
          </p>
          <div className="tm-hero-actions">
            <button
              className="tm-btn tm-btn--primary"
              onClick={() => setBookingOpen(true)}
            >
              <span>{t.hero.ctaPrimary}</span>
              <span className="tm-btn-arrow">→</span>
            </button>
            <button
              className="tm-btn tm-btn--ghost"
              onClick={() => scrollTo("work")}
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
          <div className="tm-hero-kbd">
            <span>{t.hero.kbdTip}</span>
            {t.hero.kbdHint} <kbd>⌘</kbd>
            <kbd>K</kbd>
          </div>
        </div>
      </section>

      <section className="tm-stats">
        {t.stats.map((s, i) => (
          <div key={i} className="tm-stat">
            <div className="tm-stat-idx">{String(i).padStart(2, "0")}</div>
            <div className="tm-stat-val">{s.value}</div>
            <div className="tm-stat-lbl">{s.label}</div>
          </div>
        ))}
      </section>

      <section id="work" className="tm-section">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.workPrompt}</div>
          <h2 className="tm-h2">{t.sections.workTitle}</h2>
          <p className="tm-section-sub">{t.sections.workSub}</p>
        </div>
        <div className="tm-filters">
          <span className="tm-filter-label">{t.sections.filterLabel}</span>
          {industries.map((ind) => (
            <button
              key={ind}
              className={`tm-filter ${filter === ind ? "tm-filter--on" : ""}`}
              onClick={() => setFilter(ind)}
            >
              {filter === ind && "●"}{" "}
              {ind === "all" ? t.sections.allFilter : ind}
            </button>
          ))}
        </div>
        <div className="tm-cases">
          {visibleCases.map((c, i) => (
            <article
              key={c.id}
              className="tm-case"
              onClick={() => setCaseOpen(c)}
            >
              <div className="tm-case-head">
                <span className="tm-dot tm-dot--r" />
                <span className="tm-dot tm-dot--y" />
                <span className="tm-dot tm-dot--g" />
                <span className="tm-case-filename">
                  ~/case-studies/{c.id}.md
                </span>
              </div>
              <div className="tm-case-body">
                <div className="tm-case-meta">
                  <span># {String(i + 1).padStart(2, "0")}</span>
                  <span>{c.industry}</span>
                  <span>{c.year}</span>
                </div>
                <div className="tm-case-title">{c.client}</div>
                <div className="tm-case-role">
                  {t.caseRole} <em>{c.role}</em>
                </div>
                <div className="tm-case-metrics">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="tm-case-metric">
                      <div className="tm-case-metric-k">› {m.k}</div>
                      <div className="tm-case-metric-v">{m.v}</div>
                    </div>
                  ))}
                </div>
                <div className="tm-case-cta">
                  {t.caseCTA} {c.id}.md →
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="tm-section tm-section--alt">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.servicesPrompt}</div>
          <h2 className="tm-h2">{t.sections.servicesTitle}</h2>
          <p className="tm-section-sub">{t.sections.servicesSub}</p>
        </div>
        <div className="tm-services">
          {t.services.map((s, i) => (
            <div key={s.id} className="tm-service">
              <div className="tm-service-idx">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="tm-service-title">{s.title}</div>
              <div className="tm-service-sub">{s.subtitle}</div>
              <div className="tm-service-price">{s.price}</div>
              <ul className="tm-service-bullets">
                {s.bullets.map((b, j) => (
                  <li key={j}>
                    <span>›</span>
                    {b}
                  </li>
                ))}
              </ul>
              <button
                className="tm-service-cta"
                onClick={() => setBookingOpen(true)}
              >
                {t.serviceStart} --{s.id} →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="tm-section">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.processPrompt}</div>
          <h2 className="tm-h2">{t.sections.processTitle}</h2>
        </div>
        <div className="tm-process">
          {t.process.map((p, i) => (
            <div key={p.n} className="tm-process-step">
              <div className="tm-process-line">
                <span className="tm-process-n">[{p.n}]</span>
                <span className="tm-process-arrow">→</span>
                <span className="tm-process-t">{p.t}</span>
              </div>
              <div className="tm-process-d">{p.d}</div>
              {i < t.process.length - 1 && (
                <div className="tm-process-connector" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="tm-section tm-section--accent">
        <div className="tm-section-head">
          <div className="tm-section-prompt">
            {t.sections.testimonialsPrompt}
          </div>
          <h2 className="tm-h2">{t.sections.testimonialsTitle}</h2>
        </div>
        <div className="tm-quotes">
          {t.testimonials.map((tq, i) => (
            <figure key={i} className="tm-quote">
              <div className="tm-quote-idx">
                {t.sections.commit} #{i + 1}
              </div>
              <blockquote>{tq.quote}</blockquote>
              <figcaption>
                <div className="tm-avatar">{tq.avatar}</div>
                <div>
                  <div className="tm-quote-author">{tq.author}</div>
                  <div className="tm-quote-role">{tq.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tm-section">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.skillsPrompt}</div>
          <h2 className="tm-h2">{t.sections.skillsTitle}</h2>
        </div>
        <div className="tm-skills">
          {Object.entries(t.skills).map(([cat, items]) => (
            <div key={cat} className="tm-skill-cat">
              <div className="tm-skill-cat-head">
                <span className="tm-bracket">{"{"}</span>
                <span className="tm-skill-cat-name">{cat.toLowerCase()}</span>
              </div>
              <div className="tm-skill-list">
                {items.map((s) => (
                  <div key={s} className="tm-skill-line">
                    <span className="tm-comma">"</span>
                    {s}
                    <span className="tm-comma">",</span>
                  </div>
                ))}
              </div>
              <span className="tm-bracket">{"}"}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="writing" className="tm-section tm-section--alt">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.writingPrompt}</div>
          <h2 className="tm-h2">{t.sections.writingTitle}</h2>
        </div>
        <div className="tm-articles">
          {(latestPosts && latestPosts.length > 0
            ? latestPosts
            : t.articles
          ).map((a, i) => (
            <a key={i} className="tm-article" href={a.href}>
              <span className="tm-article-idx">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span className="tm-article-date">{a.date}</span>
              {a.cat && (
                <span className="tm-article-cat">#{a.cat.toLowerCase()}</span>
              )}
              <span className="tm-article-title">{a.title}</span>
              <span className="tm-article-read">{a.read}</span>
              <span className="tm-article-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="tm-section">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.aboutPrompt}</div>
          <h2 className="tm-h2">{t.sections.aboutTitle}</h2>
        </div>
        <div className="tm-about">
          <div className="tm-about-left">
            <div className="tm-portrait">
              <img
                className="tm-portrait-img"
                src="/portrait.png"
                alt="David Lopez at his desk"
                loading="lazy"
                decoding="async"
              />
              <div className="tm-portrait-bars" aria-hidden="true" />
              <div className="tm-portrait-caption">
                {t.about.portraitCaption}
              </div>
            </div>
            <div className="tm-about-meta">
              {t.about.meta.map((m, i) => (
                <div key={i}>
                  <span>{">"}</span> {m}
                </div>
              ))}
            </div>
          </div>
          <div className="tm-about-right">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>
                {i === 0 ? (
                  <>
                    <span className="tm-comment">//</span> {p}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
            <p className="tm-about-outro">
              <span className="tm-comment">//</span> {t.about.outro}
            </p>
          </div>
        </div>
      </section>

      <section className="tm-section tm-section--alt">
        <div className="tm-section-head">
          <div className="tm-section-prompt">{t.sections.faqPrompt}</div>
          <h2 className="tm-h2">{t.sections.faqTitle}</h2>
        </div>
        <div className="tm-faqs">
          {t.faqs.map((f, i) => (
            <TmFAQ key={`${lang}-${i}`} n={i + 1} {...f} />
          ))}
        </div>
      </section>

      <section className="tm-cta-big">
        <div className="tm-cta-prompt">{t.sections.ctaPrompt}</div>
        <h2 className="tm-cta-h">
          {t.sections.ctaH1}
          <br />
          <span className="tm-cta-hl">{t.sections.ctaH2}</span>{" "}
          {t.sections.ctaH3}
        </h2>
        <div className="tm-cta-actions">
          <button
            className="tm-btn tm-btn--primary tm-btn--lg"
            onClick={() => setBookingOpen(true)}
          >
            {t.sections.ctaPrimary} <span className="tm-btn-arrow">→</span>
          </button>
          <button
            className="tm-btn tm-btn--ghost tm-btn--lg"
            onClick={() => setContactOpen(true)}
          >
            {t.sections.ctaSecondary}
          </button>
        </div>
      </section>

      <footer className="tm-footer">
        <div className="tm-footer-top">
          <div>
            <div className="tm-footer-name">david_lopez</div>
            <div className="tm-footer-tag">{t.footer.tag}</div>
          </div>
          <div className="tm-footer-cols">
            <div>
              <div className="tm-footer-label">{t.footer.contact}</div>
              <a href={`mailto:${t.email}`}>{t.email}</a>
              <a
                href="https://www.linkedin.com/in/dleolopez"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/dleolopez ↗
              </a>
              <a
                href="https://github.com/dleo"
                target="_blank"
                rel="noreferrer"
              >
                github.com/dleolopez ↗
              </a>
                            <a
                href="https://www.upwork.com/freelancers/davidlopezd"
                target="_blank"
                rel="noreferrer"
              >
                upwork.com/freelancers/davidlopezd ↗
              </a>
            </div>
            <div>
              <div className="tm-footer-label">{t.footer.site}</div>
              <button onClick={() => scrollTo("work")}>
                {t.footer.workLink}
              </button>
              <button onClick={() => scrollTo("services")}>
                {t.footer.servicesLink}
              </button>
              <button onClick={() => scrollTo("writing")}>
                {t.footer.writingLink}
              </button>
            </div>
          </div>
        </div>
        <div className="tm-footer-bottom">
          <span>{t.footer.copy}</span>
          <span>{t.footer.deploy}</span>
          <span>{t.footer.builtIn}</span>
        </div>
      </footer>

      {cmdOpen && (
        <div className="tm-cmdk-bg" onClick={() => setCmdOpen(false)}>
          <div className="tm-cmdk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tm-cmdk-head">
              <span className="tm-dot tm-dot--r" />
              <span className="tm-dot tm-dot--y" />
              <span className="tm-dot tm-dot--g" />
              <span className="tm-cmdk-title">{t.cmdk.title}</span>
            </div>
            <div className="tm-cmdk-body">
              {cmdHistory.map((h, i) => (
                <div key={i} className="tm-cmdk-entry">
                  <div>
                    <span className="tm-cmdk-prompt">$</span> {h.cmd}
                  </div>
                  {h.out.map((o, j) => (
                    <div key={j} className="tm-cmdk-out">
                      {o}
                    </div>
                  ))}
                </div>
              ))}
              <form
                className="tm-cmdk-input-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  runCmd(cmdInput);
                }}
              >
                <span className="tm-cmdk-prompt">$</span>
                <input
                  autoFocus
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  placeholder={t.cmdk.placeholder}
                />
                <span className="tm-caret">_</span>
              </form>
            </div>
          </div>
        </div>
      )}

      {caseOpen && (
        <TmCaseModal
          c={caseOpen}
          t={t}
          onClose={() => setCaseOpen(null)}
          onBook={() => {
            setCaseOpen(null);
            setBookingOpen(true);
          }}
        />
      )}
      {bookingOpen && (
        <TmBookingModal
          t={t}
          lang={lang}
          onClose={() => setBookingOpen(false)}
        />
      )}
      {contactOpen && (
        <TmContactModal
          t={t}
          lang={lang}
          onClose={() => setContactOpen(false)}
        />
      )}
    </div>
  );
};

export default TerminalSite;
