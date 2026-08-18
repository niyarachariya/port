interface SectionHeadingProps {
  number: string;
  title: string;
  eyebrow?: string;
}

export default function SectionHeading({ number, title, eyebrow }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-heading-hex" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="hex-svg">
          <polygon points="50,4 93,27 93,73 50,96 7,73 7,27" />
        </svg>
        <span className="section-heading-number">{number}</span>
      </span>
      <div className="section-heading-text">
        {eyebrow && <span className="section-heading-eyebrow">{eyebrow}</span>}
        <h2 className="section-heading-title">{title}</h2>
      </div>
    </div>
  );
}
