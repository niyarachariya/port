export const profile = {
  fullNameEn: "Niya Rachariya",
  fullNameTh: "นายนิยะ รัชอริยะ",
  nickname: "Pastel",
  dob: "4 February 2009",
  age: "17 years old",
  nationality: "Thai",
  school:
    "Srinakharinwirot University Prasarnmit Demonstration School (Secondary)",
  grade: "Mathayom 6",
  major: "Food Hospitality and Communicative Language (FH)",
  studyTrack: "Arts – Mathematics (Equivalent)",
  faculty: "Information and Communication Technology (International Program)",
  university: "Mahidol University",
  applicationType: "Portfolio Application for Admission",
};

export const contact = {
  email: "niyarachariya@gmail.com",
  phone: "093-609-9905",
  location: "Bangkok, Thailand",
  website: "niyarachariya.github.io/port/",
  websiteHref: "https://niyarachariya.github.io/port/",
  github: "github.com/niyarachariya",
  githubHref: "https://github.com/niyarachariya",
};

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    items: ["Python", "Scratch", "Dart (Flutter)"],
  },
  {
    category: "Development Tools",
    items: ["Visual Studio Code", "Antigravity", "GitHub"],
  },
  {
    category: "AI & Vibe Coding",
    items: ["ChatGPT", "Claude Code", "Claude Design"],
  },
  {
    category: "Design & Content",
    items: ["Photoshop", "Canva", "CapCut"],
  },
];

export const quote =
  "I want to learn how to turn my ideas into something real through technology.";
