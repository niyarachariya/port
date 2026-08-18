import SectionHeading from "./SectionHeading";
import { sopParagraphs } from "../data/sop";

export default function Sop() {
  return (
    <section id="sop" className="section sop-section">
      <div className="section-inner sop-inner">
        <SectionHeading number="05" title="Statement of Purpose (SOP)" />
        <div className="sop-body">
          {sopParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
