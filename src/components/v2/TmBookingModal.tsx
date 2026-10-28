import { useEffect } from "react";
import type { Lang, TerminalContent } from "~/data/v2/types";
import { CalendlyInline } from "./CalendlyInline";

type Props = {
  t: TerminalContent;
  lang: Lang;
  onClose: () => void;
};

export const TmBookingModal = ({ t, lang, onClose }: Props) => {
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
          <CalendlyInline primaryColor="6bf098" lang={lang} />
        </div>
      </div>
    </div>
  );
};
