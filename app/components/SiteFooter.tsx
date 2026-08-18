import { contact, profile } from "../data/profile";

export default function SiteFooter() {
  return (
    <footer id="contact" className="section site-footer">
      <div className="section-inner footer-inner">
        <div>
          <p className="footer-name">{profile.fullNameEn}</p>
          <p className="footer-tagline">{profile.applicationType}</p>
        </div>

        <ul className="footer-contact-list">
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>{contact.phone}</li>
          <li>
            <a href={contact.githubHref} target="_blank" rel="noreferrer">
              {contact.github}
            </a>
          </li>
        </ul>

        <p className="footer-copyright">
          © {profile.fullNameEn} — Built for university admission
        </p>
      </div>
    </footer>
  );
}
