import { useEffect } from "react";
import type { Lang, TerminalContent } from "~/data/v2/types";
import { CALENDLY_URL } from "~/data/v2/content";

type Props = {
  t: TerminalContent;
  lang: Lang;
  onClose: () => void;
};

const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

export const TmBookingModal = ({ t, lang, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    if (!document.getElementById(CALENDLY_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = CALENDLY_SCRIPT_ID;
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    primary_color: "6bf098",
    text_color: "e8efe8",
    background_color: "0a0e0c",
  });
  if (lang === "es") params.set("locale", "es");
  const dataUrl = `${CALENDLY_URL}?${params.toString()}`;

  return (
    <div className="tm-modal-bg" onClick={onClose}>
      <div
        className="tm-modal tm-booking-modal"
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
          <span className="tm-modal-filename">~/book-call.sh</span>
          <button className="tm-modal-close" onClick={onClose}>
            [ esc ]
          </button>
        </div>
        <div className="tm-modal-body tm-booking-body">
          <div className="tm-tcm-meta">{t.booking.meta}</div>
          <h3 className="tm-tcm-title">{t.booking.embedHeading}</h3>
          <div
            className="calendly-inline-widget tm-calendly"
            data-url={dataUrl}
          />
        </div>
      </div>
    </div>
  );
};
