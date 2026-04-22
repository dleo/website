import { useEffect } from "react";
import type { CaseItem, TerminalContent } from "~/data/v2/types";

type Props = {
  c: CaseItem;
  t: TerminalContent;
  onClose: () => void;
  onBook: () => void;
};

export const TmCaseModal = ({ c, t, onClose, onBook }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="tm-modal-bg" onClick={onClose}>
      <div
        className="tm-modal tm-case-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tm-modal-head">
          <span
            className="tm-dot tm-dot--r"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
          <span className="tm-dot tm-dot--y" />
          <span className="tm-dot tm-dot--g" />
          <span className="tm-modal-filename">~/case-studies/{c.id}.md</span>
          <button className="tm-modal-close" onClick={onClose}>
            [ esc ]
          </button>
        </div>
        <div className="tm-modal-body">
          <div className="tm-tcm-meta">
            // {c.industry} · {c.role} · {c.year}
          </div>
          <h3 className="tm-tcm-title"># {c.client}</h3>
          <div className="tm-tcm-section">
            <div className="tm-tcm-label">{t.caseLabels.problem}</div>
            <p>{c.problem}</p>
          </div>
          <div className="tm-tcm-section">
            <div className="tm-tcm-label">{t.caseLabels.approach}</div>
            <p>{c.approach}</p>
          </div>
          <div className="tm-tcm-section">
            <div className="tm-tcm-label">{t.caseLabels.outcome}</div>
            <p>{c.outcome}</p>
          </div>
          <div className="tm-tcm-metrics">
            {c.metrics.map((m, i) => (
              <div key={i} className="tm-tcm-metric">
                <div className="tm-tcm-metric-v">{m.v}</div>
                <div className="tm-tcm-metric-k">› {m.k}</div>
              </div>
            ))}
          </div>
          <div className="tm-tcm-section">
            <div className="tm-tcm-label">{t.caseLabels.stack}</div>
            <div className="tm-tcm-stack">
              {c.stack.map((s) => (
                <span key={s} className="tm-tcm-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="tm-tcm-footer">
            <span>{t.caseFooterText}</span>
            <button className="tm-btn tm-btn--primary" onClick={onBook}>
              {t.caseFooterCTA} <span className="tm-btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
