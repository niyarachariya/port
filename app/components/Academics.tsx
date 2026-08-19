import SectionHeading from "./SectionHeading";
import { academicResults } from "../data/academics";

export default function Academics() {
  return (
    <section id="academic" className="section academics-section">
      <div className="section-inner">
        <SectionHeading number="04" title="Academic Results" />

        <div className="academic-table-wrapper">
          <table className="academic-table">
            <thead>
              <tr>
                <th scope="col">Learning Area</th>
                <th scope="col">Credits</th>
                <th scope="col">GPA</th>
              </tr>
            </thead>
            <tbody>
              {academicResults.map((row) => (
                <tr key={row.area}>
                  <td>{row.area}</td>
                  <td>{row.credits}</td>
                  <td>{row.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="academic-cards">
          {academicResults.map((row) => (
            <div className="academic-card" key={row.area}>
              <span className="academic-card-area">{row.area}</span>
              <div className="academic-card-stats">
                <span>Credits: {row.credits}</span>
                <span>GPA: {row.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
