import { useEffect, useState } from "react";
import type { Lang, TerminalContent } from "~/data/v2/types";
import { submitNetlifyForm } from "./netlify";

type Props = {
  t: TerminalContent;
  lang: Lang;
  onClose: () => void;
};

type FormState = { name: string; email: string; msg: string };

export const TmContactModal = ({ t, lang, onClose }: Props) => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

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

  const submit = async () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = t.contact.errRequired;
    if (!form.email.trim()) e.email = t.contact.errRequired;
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t.contact.errEmail;
    if (!form.msg.trim()) e.msg = t.contact.errMsg;
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    try {
      await submitNetlifyForm("contact-v2", {
        name: form.name,
        email: form.email,
        message: form.msg,
        lang,
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tm-modal-bg" onClick={onClose}>
      <div
        className="tm-modal tm-contact-modal"
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
          <span className="tm-modal-filename">~/send-brief.sh</span>
          <button className="tm-modal-close" onClick={onClose}>
            [ esc ]
          </button>
        </div>
        <div className="tm-modal-body">
          {!sent ? (
            <>
              <h3 className="tm-tcm-title">{t.contact.title}</h3>
              <div className="tm-tcm-meta">{t.contact.meta}</div>
              <div className="tm-bm-fields">
                <label>
                  <span>{t.contact.labelName}</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && (
                    <span className="tm-err">! {errors.name}</span>
                  )}
                </label>
                <label>
                  <span>{t.contact.labelEmail}</span>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <span className="tm-err">! {errors.email}</span>
                  )}
                </label>
                <label>
                  <span>{t.contact.labelMsg}</span>
                  <textarea
                    rows={6}
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  />
                  {errors.msg && <span className="tm-err">! {errors.msg}</span>}
                </label>
              </div>
              <div className="tm-bm-actions">
                <button
                  className="tm-btn tm-btn--primary"
                  disabled={submitting}
                  onClick={submit}
                >
                  {t.contact.send} <span className="tm-btn-arrow">→</span>
                </button>
              </div>
            </>
          ) : (
            <div className="tm-bm-confirm">
              <div className="tm-bm-check">[✓]</div>
              <p>{t.contact.gotIt.replace("{email}", form.email)}</p>
              <div
                className="tm-bm-actions"
                style={{ justifyContent: "center" }}
              >
                <button className="tm-btn tm-btn--primary" onClick={onClose}>
                  {t.contact.done}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
