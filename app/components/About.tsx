import SectionHeading from "./SectionHeading";
import PlaceholderImage from "./PlaceholderImage";
import { profile, contact, skillGroups, quote } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner">
        <SectionHeading number="02" title="About Me" />

        <div className="about-grid">
          <div className="about-portrait-frame">
            <PlaceholderImage
              src="/portfolio/profile/about-portrait.jpg"
              alt={`Portrait of ${profile.fullNameEn}`}
              label="Profile Portrait"
              className="about-portrait"
            />
          </div>

          <div className="info-card">
            <h3 className="info-card-title">Profile</h3>
            <dl className="info-list">
              <div>
                <dt>Full Name</dt>
                <dd>{profile.fullNameEn}</dd>
              </div>
              <div>
                <dt>Nickname</dt>
                <dd>{profile.nickname}</dd>
              </div>
              <div>
                <dt>Date of Birth</dt>
                <dd>
                  {profile.dob} ({profile.age})
                </dd>
              </div>
              <div>
                <dt>Nationality</dt>
                <dd>{profile.nationality}</dd>
              </div>
              <div>
                <dt>School</dt>
                <dd>{profile.school}</dd>
              </div>
              <div>
                <dt>Grade</dt>
                <dd>{profile.grade}</dd>
              </div>
              <div>
                <dt>Major</dt>
                <dd>{profile.major}</dd>
              </div>
              <div>
                <dt>Study Track</dt>
                <dd>{profile.studyTrack}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="about-secondary-grid">
          <div className="info-card">
            <h3 className="info-card-title">Contact</h3>
            <ul className="contact-list">
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>{contact.phone}</li>
              <li>{contact.location}</li>
              <li>
                <a href={contact.websiteHref} target="_blank" rel="noreferrer">
                  {contact.website}
                </a>
              </li>
              <li>
                <a href={contact.githubHref} target="_blank" rel="noreferrer">
                  {contact.github}
                </a>
              </li>
            </ul>
          </div>

          <div className="info-card">
            <h3 className="info-card-title">Skills</h3>
            <ul className="skills-list">
              {skillGroups.map((group) => (
                <li key={group.category}>
                  <strong>{group.category}:</strong> {group.items.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="about-quote">&ldquo;{quote}&rdquo;</blockquote>
      </div>
    </section>
  );
}
