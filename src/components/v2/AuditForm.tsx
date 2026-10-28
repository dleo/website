import { useEffect, useRef, useState } from "react";
import { CalendlyInline } from "~/components/v2/CalendlyInline";
import { formFields, formRouting } from "~/data/v2/audit";
import {
  AI_STATUS_VALUES,
  ARR_VALUES,
  COMPANY_TYPE_VALUES,
  ROLE_VALUES,
  TIMELINE_VALUES,
  isFreeEmail,
  looksLikeUrl,
  qualify,
} from "~/data/v2/qualification";
import type { Tier } from "~/data/v2/qualification";
import { submitNetlifyForm } from "./netlify";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string>,
    ) => void;
  }
}

const trackEvent = (name: string, params?: Record<string, string>): void => {
  window.gtag?.("event", name, params);
};

type UtmFields = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
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
  context: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export const AuditForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    companyUrl: "",
    role: "",
    companyType: "",
    arr: "",
    aiStatus: "",
    timeline: "",
    context: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [utms, setUtms] = useState<UtmFields>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Tier | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startTracked = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
    });
  }, []);

  const handleFirstFocus = (): void => {
    if (!startTracked.current) {
      startTracked.current = true;
      trackEvent("audit_form_start");
    }
  };

  const update = <K extends keyof FormState>(k: K, v: FormState[K]): void => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = formFields.name.error!;
    if (!form.email.trim()) e.email = formFields.email.error!;
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = formFields.email.error!;
    else if (isFreeEmail(form.email)) e.email = formFields.email.error!;
    if (!form.companyUrl.trim()) e.companyUrl = formFields.companyUrl.error!;
    else if (!looksLikeUrl(form.companyUrl))
      e.companyUrl = formFields.companyUrl.error!;
    if (!form.role) e.role = formFields.role.error!;
    if (!form.companyType) e.companyType = formFields.companyType.error!;
    if (!form.arr) e.arr = formFields.arr.error!;
    if (!form.aiStatus) e.aiStatus = formFields.aiStatus.error!;
    if (!form.timeline) e.timeline = formFields.timeline.error!;
    if (!form.context.trim()) e.context = formFields.context.error!;
    else if (form.context.trim().length < 150)
      e.context = formFields.context.error!;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBookingScheduled = (): void => {
    trackEvent("audit_booking_scheduled");
  };

  const submit = async (): Promise<void> => {
    if (!validate()) return;
    const { tier, reason } = qualify(form);
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitNetlifyForm("audit-v1", {
        name: form.name,
        email: form.email,
        companyUrl: form.companyUrl,
        role: form.role,
        companyType: form.companyType,
        arr: form.arr,
        aiStatus: form.aiStatus,
        timeline: form.timeline,
        context: form.context,
        "bot-field": honeypot,
        qualification: tier,
        reason,
        ...utms,
      });
      trackEvent("audit_form_submit", { tier });
      setResult(tier);
    } catch {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result === "qualified") {
    return (
      <div className="tm-audit-form-result">
        <h3 className="tm-tcm-title">{formRouting.qualified.heading}</h3>
        <CalendlyInline
          prefill={{ name: form.name, email: form.email }}
          primaryColor="D7FF3F"
          lang="en"
          onScheduled={handleBookingScheduled}
        />
      </div>
    );
  }

  if (result === "borderline") {
    return (
      <div className="tm-bm-confirm">
        <div className="tm-bm-check">[✓]</div>
        <h3 className="tm-tcm-title">{formRouting.borderline.heading}</h3>
        <p>{formRouting.borderline.message}</p>
      </div>
    );
  }

  if (result === "not_qualified") {
    return (
      <div className="tm-bm-confirm tm-apply-nq">
        <div className="tm-bm-check tm-apply-nq-mark">[!]</div>
        <h3 className="tm-tcm-title">{formRouting.not_qualified.heading}</h3>
        <p>{formRouting.not_qualified.message}</p>
        <a
          href={formRouting.not_qualified.linkHref}
          className="tm-apply-nq-link"
        >
          {formRouting.not_qualified.linkText}
        </a>
      </div>
    );
  }

  return (
    <div className="tm-bm-fields" onFocus={handleFirstFocus}>
      <input
        type="text"
        name="bot-field"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        aria-hidden={true}
      />
      <label>
        <span>{formFields.name.label}</span>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && <span className="tm-err">! {errors.name}</span>}
      </label>
      <label>
        <span>{formFields.email.label}</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <span className="tm-err">! {errors.email}</span>}
      </label>
      <label>
        <span>{formFields.companyUrl.label}</span>
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
        <span>{formFields.role.label}</span>
        <select
          value={form.role}
          onChange={(e) => update("role", e.target.value)}
        >
          <option value="">—</option>
          {ROLE_VALUES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {errors.role && <span className="tm-err">! {errors.role}</span>}
      </label>
      <label>
        <span>{formFields.companyType.label}</span>
        <select
          value={form.companyType}
          onChange={(e) => update("companyType", e.target.value)}
        >
          <option value="">—</option>
          {COMPANY_TYPE_VALUES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {errors.companyType && (
          <span className="tm-err">! {errors.companyType}</span>
        )}
      </label>
      <label>
        <span>{formFields.arr.label}</span>
        <select
          value={form.arr}
          onChange={(e) => update("arr", e.target.value)}
        >
          <option value="">—</option>
          {ARR_VALUES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {errors.arr && <span className="tm-err">! {errors.arr}</span>}
      </label>
      <label>
        <span>{formFields.aiStatus.label}</span>
        <select
          value={form.aiStatus}
          onChange={(e) => update("aiStatus", e.target.value)}
        >
          <option value="">—</option>
          {AI_STATUS_VALUES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {errors.aiStatus && <span className="tm-err">! {errors.aiStatus}</span>}
      </label>
      <label>
        <span>{formFields.timeline.label}</span>
        <select
          value={form.timeline}
          onChange={(e) => update("timeline", e.target.value)}
        >
          <option value="">—</option>
          {TIMELINE_VALUES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {errors.timeline && <span className="tm-err">! {errors.timeline}</span>}
      </label>
      <label>
        <span>{formFields.context.label}</span>
        <textarea
          rows={6}
          value={form.context}
          onChange={(e) => update("context", e.target.value)}
        />
        <span className="tm-apply-hint">
          {formFields.context.hint} ({form.context.trim().length}/150)
        </span>
        {errors.context && <span className="tm-err">! {errors.context}</span>}
      </label>
      {submitError !== null && <p className="tm-err">{submitError}</p>}
      <div className="tm-bm-actions">
        <button
          className="tm-btn tm-btn--primary"
          disabled={submitting}
          onClick={submit}
        >
          {submitting ? "Sending…" : "Apply →"}
        </button>
      </div>
    </div>
  );
};
