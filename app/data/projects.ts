export interface ProjectEntry {
  id: string;
  title: string;
  tagline: string;
  description: string[];
  images: string[];
  link?: string;
}

// To add another project later: append one object here and drop its
// screenshots into public/portfolio/projects/<project-id>/.
export const projects: ProjectEntry[] = [
  {
    id: "haanjod",
    title: "HaanJod",
    tagline: "A Flexible Note & List App",
    description: [
      "HaanJod is a flexible note and list app designed to help students organize their studies in a way that works for them. It can be used to keep track of assignments, subjects, exam dates, study notes, and other learning information.",
      "Users can create their own fields and choose how to view their information as a list, table, or gallery. The same idea can also be used for everyday life, such as comparing furniture, prices, and items when planning a room.",
      "I designed the concept and UI and created the prototype with the help of AI tools.",
    ],
    images: [
      "/portfolio/projects/haanjod/screen-1.jpg",
      "/portfolio/projects/haanjod/screen-2.jpg",
      "/portfolio/projects/haanjod/screen-3.jpg",
      "/portfolio/projects/haanjod/screen-4.jpg",
    ],
  },
  {
    id: "golden-goose",
    title: "Golden Goose",
    tagline: "A Fun Way to Manage Money",
    description: [
      "Golden Goose is a personal finance app inspired by the golden goose from Jack and the Beanstalk. It makes saving money more fun by turning each saving goal into a goose that grows along with the user's progress.",
      "Users can record income and expenses, set saving goals, and watch their collection of geese grow as they save.",
      "I designed the concept, characters, and UI, and created the prototype with the help of AI tools.",
    ],
    images: [
      "/portfolio/projects/golden-goose/screen-1.jpg",
      "/portfolio/projects/golden-goose/screen-2.jpg",
      "/portfolio/projects/golden-goose/screen-3.jpg",
      "/portfolio/projects/golden-goose/screen-4.jpg",
    ],
  },
];
