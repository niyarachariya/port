export interface EducationEntry {
  years: string;
  level: string;
  school: string;
  detail?: string;
  gpa: string;
}

export const educationTimeline: EducationEntry[] = [
  {
    years: "2024 – Present",
    level: "Mathayom 4–6",
    school: "Srinakharinwirot University Prasarnmit Demonstration School (Secondary)",
    detail: "Food Hospitality and Communicative Language (FH) Major",
    gpa: "2.94",
  },
  {
    years: "2021 – 2024",
    level: "Mathayom 1–3",
    school: "Kasintorn Saint Peter School",
    detail: "English Program",
    gpa: "2.48",
  },
  {
    years: "2015 – 2021",
    level: "Primary School",
    school: "Assumption College Primary Section",
    gpa: "2.73",
  },
];

// Photo of the student in culinary uniform, shown alongside the timeline.
export const educationPortrait = "/portfolio/education/culinary-portrait.jpg";

// Transcript scans — open in a lightbox when clicked.
export const transcripts = [
  {
    src: "/portfolio/transcripts/transcript-1.jpg",
    label: "Academic Transcript — Page 1",
  },
  {
    src: "/portfolio/transcripts/transcript-2.jpg",
    label: "Academic Transcript — Page 2",
  },
];
