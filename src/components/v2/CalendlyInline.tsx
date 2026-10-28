import { useEffect } from "react";
import { CALENDLY_URL } from "~/data/v2/content";
import type { Lang } from "~/data/v2/types";

type Prefill = {
  name: string;
  email: string;
};

type Props = {
  prefill?: Prefill;
  primaryColor: string;
  lang: Lang;
  onScheduled?: () => void;
};

const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

const isCalendlyScheduled = (data: unknown): boolean => {
  return (
    typeof data === "object" &&
    data !== null &&
    "event" in data &&
    (data as { event: unknown }).event === "calendly.event_scheduled"
  );
};

export const CalendlyInline = ({
  prefill,
  primaryColor,
  lang,
  onScheduled,
}: Props) => {
  useEffect(() => {
    if (!document.getElementById(CALENDLY_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = CALENDLY_SCRIPT_ID;
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!onScheduled) return;

    const handler = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com" && isCalendlyScheduled(e.data)) {
        onScheduled();
      }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, [onScheduled]);

  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    primary_color: primaryColor,
    text_color: "e8efe8",
    background_color: "0a0e0c",
  });
  if (lang === "es") params.set("locale", "es");
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);
  const dataUrl = `${CALENDLY_URL}?${params.toString()}`;

  return (
    <div className="calendly-inline-widget tm-calendly" data-url={dataUrl} />
  );
};
