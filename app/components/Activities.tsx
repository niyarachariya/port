"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import { activities } from "../data/activities";

interface LightboxTarget {
  src: string;
  alt: string;
}

export default function Activities() {
  const [lightbox, setLightbox] = useState<LightboxTarget | null>(null);

  return (
    <section id="activities" className="section activities-section">
      <div className="section-inner">
        <SectionHeading number="06" title="Certificates and Activities" />

        <div className="activity-list">
          {activities.map((item, i) => (
            <article
              className={`activity-card ${i % 2 === 1 ? "activity-card-reverse" : ""}`}
              key={item.id}
            >
              <div
                className={`activity-image-gallery ${
                  item.images.length > 1 ? "activity-image-gallery-multi" : ""
                }`}
              >
                {item.images.map((src, imgIndex) => (
                  <button
                    type="button"
                    key={src}
                    className="activity-image-button"
                    onClick={() =>
                      setLightbox({
                        src,
                        alt:
                          item.images.length > 1
                            ? `${item.title} — photo ${imgIndex + 1}`
                            : item.title,
                      })
                    }
                    aria-label={`Enlarge image ${imgIndex + 1} for ${item.title}`}
                  >
                    <PlaceholderImage
                      src={src}
                      alt={`${item.title} — photo ${imgIndex + 1}`}
                      label={item.title}
                      className="activity-image"
                    />
                  </button>
                ))}
              </div>

              <div className="activity-copy">
                <span className="activity-meta">
                  {item.institution} · {item.year}
                </span>
                <h3 className="activity-title">{item.title}</h3>
                <p className="activity-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          label={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
