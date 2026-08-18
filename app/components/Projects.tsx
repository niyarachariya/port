"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import PlaceholderImage from "./PlaceholderImage";
import Lightbox from "./Lightbox";
import { projects } from "../data/projects";

export default function Projects() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="projects" className="section projects-section">
      <div className="section-inner">
        <SectionHeading number="07" title="Personal Projects" />

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-copy">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                {project.description.map((paragraph, i) => (
                  <p className="project-description" key={i}>
                    {paragraph}
                  </p>
                ))}
                {project.link && (
                  <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                    View project →
                  </a>
                )}
              </div>

              <div className="project-gallery" role="list">
                {project.images.map((src, i) => (
                  <button
                    type="button"
                    className="project-screenshot-button"
                    role="listitem"
                    key={src}
                    onClick={() =>
                      setLightbox({ src, alt: `${project.title} screenshot ${i + 1}` })
                    }
                    aria-label={`Enlarge ${project.title} screenshot ${i + 1}`}
                  >
                    <PlaceholderImage
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      label={`${project.title} #${i + 1}`}
                      className="project-screenshot"
                    />
                  </button>
                ))}
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
