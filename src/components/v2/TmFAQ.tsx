import { useState } from "react";

type Props = {
  n: number;
  q: string;
  a: string;
};

export const TmFAQ = ({ n, q, a }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tm-faq ${open ? "tm-faq--open" : ""}`}>
      <button className="tm-faq-q" onClick={() => setOpen(!open)}>
        <span className="tm-faq-n">[{String(n).padStart(2, "0")}]</span>
        <span className="tm-faq-qt">{q}</span>
        <span className="tm-faq-icon">{open ? "[−]" : "[+]"}</span>
      </button>
      {open && (
        <div className="tm-faq-a">
          <span className="tm-comment">›</span> {a}
        </div>
      )}
    </div>
  );
};
