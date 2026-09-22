import SectionHeading from "./SectionHeading";
import { sopParagraphs, sopQuote, sopSubtitle, sopTitle } from "../data/sop";

export default function Sop() {
  return (
    <section id="sop" className="section sop-section">
      <div className="section-inner sop-inner">
        <SectionHeading number="05" title="Statement of Purpose (SOP)" />
        <header className="sop-intro">
          <h3>{sopTitle}</h3>
          <p>{sopSubtitle}</p>
        </header>
        <div className="sop-body">
          {sopParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <blockquote className="sop-quote">“{sopQuote}”</blockquote>
      </div>
    </section>
  );
}
