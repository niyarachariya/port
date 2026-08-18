export interface ActivityEntry {
  id: string;
  title: string;
  institution: string;
  year: string;
  description: string;
  images: string[];
  link?: string;
}

// To add another certificate or activity later: append one object here and
// drop its image(s) into public/portfolio/activities/. `images` accepts any
// number of entries — one is fine, and more can be added any time without
// touching the component.
export const activities: ActivityEntry[] = [
  {
    id: "digital-intelligence-bootcamp",
    title: "Digital Intelligence Bootcamp: Google Cloud, Big Data & GenAI",
    institution: "Depa, OpenIQ Education",
    year: "2026",
    description:
      "Completed a bootcamp covering Google Cloud, Big Data, and Generative AI. This experience helped me learn more about modern technology and how AI and data can be used in real-world applications.",
    images: [
      "/portfolio/activities/digital-intelligence-bootcamp.jpg",
      "/portfolio/activities/digital-intelligence-bootcamp-2.jpg",
    ],
  },
  {
    id: "flutter-workshop",
    title: "Android Mobile Application Development with Flutter",
    institution: "Department of Electrical Engineering, Silpakorn University",
    year: "2026",
    description:
      "Joined a 12-hour workshop on Android mobile application development using Flutter. I learned the basics of building mobile applications and gained hands-on experience with Flutter.",
    images: [
      "/portfolio/activities/flutter-workshop.jpg",
      "/portfolio/activities/flutter-workshop-2.jpg",
    ],
  },
  {
    id: "swu-researcher-day",
    title: "SWU Researcher Day 2026",
    institution: "Innovation Competition, Srinakharinwirot University",
    year: "2026",
    description:
      'Participated in a high school invention and innovation competition with a project titled "Young Jackfruit Nuggets," which explored using young jackfruit as an alternative ingredient for making nuggets. This experience gave me the opportunity to develop an idea and present the project in an academic environment.',
    images: [
      "/portfolio/activities/swu-researcher-day.jpg",
      "/portfolio/activities/swu-researcher-day-2.jpg",
    ],
  },
  {
    id: "dtc-camp",
    title: "DTC Camp",
    institution: "Dusit Thani College",
    year: "2024",
    description:
      "Joined a two-day camp to explore the world of culinary arts and hospitality. I took part in hands-on activities and learned about food preparation, teamwork, and the hospitality field.",
    images: [
      "/portfolio/activities/dtc-camp.jpg",
      "/portfolio/activities/dtc-camp-2.jpg",
    ],
  },
  {
    id: "ict-mahidol-open-house",
    title: "ICT Mahidol Open House",
    institution: "Faculty of Information and Communication Technology, Mahidol University",
    year: "2025",
    description:
      "Attended the ICT Mahidol Open House to learn more about the ICT program, student life, and projects created by ICT students. It was a great opportunity to experience the atmosphere of the faculty and see what life as an ICT student could be like.",
    images: ["/portfolio/activities/ict-mahidol-open-house.jpg"],
  },
  {
    id: "public-performance",
    title: "Public Performance",
    institution: "Kasintorn Saint Peter School",
    year: "2023",
    description:
      "Took part in a school dance performance and enjoyed the experience of performing on stage.",
    images: ["/portfolio/activities/public-performance.jpg"],
  },
];
