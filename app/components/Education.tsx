"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import { educationTimeline, educationPortrait, transcripts } from "../data/education";

export default function Education() {
  const [openTranscript, setOpenTranscript] = useState<number | null>(null);

  return (
    <section id="education" className="section education-section">
      <div className="section-inner">
        <SectionHeading number="03" title="Education" />

        <div className="education-grid">
          <div className="timeline">
            {educationTimeline.map((entry) => (
              <div className="timeline-item" key={entry.school + entry.years}>
                <span className="timeline-dot" aria-hidden="true" />
                <span className="timeline-years">{entry.years}</span>
                <h3 className="timeline-level">{entry.level}</h3>
                <p className="timeline-school">{entry.school}</p>
                {entry.detail && <p className="timeline-detail">{entry.detail}</p>}
                <p className="timeline-gpa">GPA: {entry.gpa}</p>
              </div>
            ))}
          </div>

          <div className="education-portrait-col">
            <PlaceholderImage
              src={educationPortrait}
              alt="Niya in culinary uniform"
              label="Culinary Class Portrait"
              className="education-portrait"
            />
          </div>
        </div>

        <div className="transcript-gallery">
          <h3 className="info-card-title">Transcript</h3>
          <div className="transcript-grid">
            {transcripts.map((t, i) => (
              <button
                type="button"
                key={t.src}
                className="transcript-thumb-button"
                onClick={() => setOpenTranscript(i)}
                aria-label={`Enlarge ${t.label}`}
              >
                <PlaceholderImage
                  src={t.src}
                  alt={t.label}
                  label={t.label}
                  className="transcript-thumb"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {openTranscript !== null && (
        <Lightbox
          src={transcripts[openTranscript].src}
          alt={transcripts[openTranscript].label}
          label={transcripts[openTranscript].label}
          onClose={() => setOpenTranscript(null)}
        />
      )}
    </section>
  );
}
