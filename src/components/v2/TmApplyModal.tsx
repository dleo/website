import { useEffect, useState } from "react";
import type { Lang, TerminalContent } from "~/data/v2/types";
import { isFreeEmail, looksLikeUrl, qualify } from "~/data/v2/qualification";
import type { Tier } from "~/data/v2/qualification";
import { submitNetlifyForm } from "./netlify";

type Props = {
  t: TerminalContent;
  lang: Lang;
  prefillNeed?: string;
  onClose: () => void;
  onScrollToCases?: () => void;
  onScrollToServices?: () => void;
};

type FormState = {
  name: string;
  email: string;
  companyUrl: string;
  role: string;
  companyType: string;
  arr: string;
  aiStatus: string;
  timeline: string;
  need: string;
  context: string;
};

export const TmApplyModal = ({
  t,
  lang,
  prefillNeed,
  onClose,
  onScrollToCases,
  onScrollToServices,
}: Props) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    companyUrl: "",
    role: "",
    companyType: "",
    arr: "",
    aiStatus: "",
    timeline: "",
    need: prefillNeed ?? "",
    context: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Tier | null>(null);

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

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = t.apply.errRequired;
    if (!form.email.trim()) e.email = t.apply.errRequired;
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t.apply.errEmail;
    else if (isFreeEmail(form.email)) e.email = t.apply.errFreeEmail;
    if (form.companyUrl.trim() && !looksLikeUrl(form.companyUrl))
      e.companyUrl = t.apply.errUrl;
    if (!form.role) e.role = t.apply.errRequired;
    if (!form.companyType) e.companyType = t.apply.errRequired;
    if (!form.arr) e.arr = t.apply.errRequired;
    if (!form.aiStatus) e.aiStatus = t.apply.errRequired;
    if (!form.timeline) e.timeline = t.apply.errRequired;
    if (!form.need) e.need = t.apply.errRequired;
    if (!form.context.trim()) e.context = t.apply.errRequired;
    else if (form.context.trim().length < 150) e.context = t.apply.errContext;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    const { tier, reason } = qualify({
      role: form.role,
      companyType: form.companyType,
      arr: form.arr,
      aiStatus: form.aiStatus,
      timeline: form.timeline,
      context: form.context,
    });
    setSubmitting(true);
    try {
      await submitNetlifyForm("apply-v2", {
        name: form.name,
        email: form.email,
        companyUrl: form.companyUrl,
        role: form.role,
        companyType: form.companyType,
        arr: form.arr,
        aiStatus: form.aiStatus,
        timeline: form.timeline,
        need: form.need,
        context: form.context,
        qualification: tier,
        reason,
        lang,
      });
    } catch {
      // intentionally swallow — we still want to show the confirmation
      // so the user sees a response; David will see the missing entry in Netlify.
    } finally {
      setSubmitting(false);
      setResult(tier);
    }
  };

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="tm-modal-bg" onClick={onClose}>
      <div
        className="tm-modal tm-contact-modal tm-apply-modal"
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
          <span className="tm-modal-filename">{t.apply.filename}</span>
          <button className="tm-modal-close" onClick={onClose}>
            [ esc ]
          </button>
        </div>
        <div className="tm-modal-body">
          {result === null ? (
            <>
              <h3 className="tm-tcm-title">{t.apply.title}</h3>
              <div className="tm-tcm-meta">{t.apply.meta}</div>
              <div className="tm-bm-fields">
                <label>
                  <span>{t.apply.labelName}</span>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                  {errors.name && (
                    <span className="tm-err">! {errors.name}</span>
                  )}
                </label>
                <label>
                  <span>{t.apply.labelEmail}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  {errors.email && (
                    <span className="tm-err">! {errors.email}</span>
                  )}
                </label>
                <label>
                  <span>{t.apply.labelCompanyUrl}</span>
                  <input
                    value={form.companyUrl}
                    onChange={(e) => update("companyUrl", e.target.value)}
                    placeholder="acme.com"
                  />
                  {errors.companyUrl && (
                    <span className="tm-err">! {errors.companyUrl}</span>
                  )}
                </label>
                <label>
                  <span>{t.apply.labelRole}</span>
                  <select
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                  >
                    <option value="">—</option>
                    {t.apply.roleOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <span className="tm-err">! {errors.role}</span>
                  )}
                </label>
                <label>
                  <span>{t.apply.labelCompanyType}</span>
                  <select
                    value={form.companyType}
                    onChange={(e) => update("companyType", e.target.value)}
                  >
                    <option value="">—</option>
                    {t.apply.companyTypeOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.companyType && (
                    <span className="tm-err">! {errors.companyType}</span>
                  )}
                </label>
                <label>
                  <span>{t.apply.labelArr}</span>
                  <select
                    value={form.arr}
                    onChange={(e) => update("arr", e.target.value)}
                  >
                    <option value="">—</option>
                    {t.apply.arrOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.arr && <span className="tm-err">! {errors.arr}</span>}
                </label>
                <label>
                  <span>{t.apply.labelAiStatus}</span>
                  <select
                    value={form.aiStatus}
                    onChange={(e) => update("aiStatus", e.target.value)}
                  >
                    <option value="">—</option>
                    {t.apply.aiStatusOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.aiStatus && (
                    <span className="tm-err">! {errors.aiStatus}</span>
                  )}
                </label>
                <label>
                  <span>{t.apply.labelTimeline}</span>
                  <select
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                  >
                    <option value="">—</option>
                    {t.apply.timelineOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {errors.timeline && (
                    <span className="tm-err">! {errors.timeline}</span>
                  )}
                </label>
                <fieldset className="tm-apply-radios">
                  <legend>{t.apply.labelNeed}</legend>
                  {t.apply.needOptions.map((o) => (
                    <label key={o.value} className="tm-apply-radio">
                      <input
                        type="radio"
                        name="need"
                        value={o.value}
                        checked={form.need === o.value}
                        onChange={(e) => update("need", e.target.value)}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                  {errors.need && (
                    <span className="tm-err">! {errors.need}</span>
                  )}
                </fieldset>
                <label>
                  <span>{t.apply.labelContext}</span>
                  <textarea
                    rows={6}
                    value={form.context}
                    onChange={(e) => update("context", e.target.value)}
                  />
                  <span className="tm-apply-hint">
                    {t.apply.contextHint} ({form.context.trim().length}/150)
                  </span>
                  {errors.context && (
                    <span className="tm-err">! {errors.context}</span>
                  )}
                </label>
              </div>
              <div className="tm-bm-actions">
                <button
                  className="tm-btn tm-btn--primary"
                  disabled={submitting}
                  onClick={submit}
                >
                  {t.apply.send} <span className="tm-btn-arrow">→</span>
                </button>
              </div>
            </>
          ) : result === "qualified" ? (
            <div className="tm-bm-confirm">
              <div className="tm-bm-check">[✓]</div>
              <h3 className="tm-tcm-title">{t.apply.confirmQualifiedTitle}</h3>
              <p>
                {t.apply.confirmQualifiedBody.replace("{email}", form.email)}
              </p>
              <div
                className="tm-bm-actions"
                style={{ justifyContent: "center" }}
              >
                <button className="tm-btn tm-btn--primary" onClick={onClose}>
                  {t.apply.done}
                </button>
              </div>
            </div>
          ) : result === "borderline" ? (
            <div className="tm-bm-confirm">
              <div className="tm-bm-check">[✓]</div>
              <h3 className="tm-tcm-title">{t.apply.confirmBorderlineTitle}</h3>
              <p>
                {t.apply.confirmBorderlineBody.replace("{email}", form.email)}
              </p>
              <div
                className="tm-bm-actions"
                style={{ justifyContent: "center" }}
              >
                <button className="tm-btn tm-btn--primary" onClick={onClose}>
                  {t.apply.done}
                </button>
              </div>
            </div>
          ) : (
            <div className="tm-bm-confirm tm-apply-nq">
              <div className="tm-bm-check tm-apply-nq-mark">[!]</div>
              <h3 className="tm-tcm-title">
                {t.apply.confirmNotQualifiedTitle}
              </h3>
              <p>{t.apply.confirmNotQualifiedBody}</p>
              <ul className="tm-apply-nq-links">
                <li>
                  <button
                    className="tm-apply-nq-link"
                    onClick={() => {
                      onClose();
                      onScrollToCases?.();
                    }}
                  >
                    {t.apply.notQualifiedLinkCases}
                  </button>
                </li>
                <li>
                  <button
                    className="tm-apply-nq-link"
                    onClick={() => {
                      onClose();
                      onScrollToServices?.();
                    }}
                  >
                    {t.apply.notQualifiedLinkAudit}
                  </button>
                </li>
              </ul>
              <div
                className="tm-bm-actions"
                style={{ justifyContent: "center" }}
              >
                <button className="tm-btn tm-btn--ghost" onClick={onClose}>
                  {t.apply.done}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
