export type DesignWorkType = "image" | "video";

export interface DesignWork {
  id: string;
  title: string;
  category: string;
  year?: string;
  description?: string;
  type?: DesignWorkType;
  /** Required when type is "image" (default). Also used as the video poster if provided alongside `video`. */
  image?: string;
  /** Required when type is "video". */
  video?: string;
  gallery?: string[];
  link?: string;
}

// To add another design work later: append one object here.
// - Photos: { type: "image", image: "/portfolio/design/<file>.jpg" }
// - Videos: { type: "video", video: "/portfolio/design/<file>.mp4" }
// Drop the matching file into public/portfolio/design/ — the grid, lightbox,
// and video player all pick it up automatically, no layout changes needed.
export const designWorks: DesignWork[] = [
  {
    id: "street-food-to-cocktail",
    title: "Street Food to Cocktail",
    category: "Menu & Illustration Design",
    type: "image",
    image: "/portfolio/design/street-food-to-cocktail.jpg",
  },
  {
    id: "full-course-fine-dining",
    title: "Full-Course Fine Dining",
    category: "Menu Design",
    type: "image",
    image: "/portfolio/design/full-course-fine-dining.jpg",
  },
  {
    id: "young-jackfruit-nugget-packaging",
    title: "Young Jackfruit Nugget Packaging Design & Video Editing",
    category: "Packaging & Video",
    type: "image",
    image: "/portfolio/design/jackfruit-nugget-packaging.jpg",
  },
  {
    id: "young-jackfruit-nugget-video",
    title: "Young Jackfruit Nugget — Promo Video",
    category: "Video Editing",
    type: "video",
    video: "/portfolio/design/jackfruit-nugget-video.mp4",
  },
  {
    id: "new-yorker-goose-sticker",
    title: "New Yorker Goose LINE Sticker",
    category: "Character & Sticker Design",
    type: "image",
    image: "/portfolio/design/new-yorker-goose-sticker.jpg",
  },
  {
    id: "chihuahua-sticker",
    title: "Chihuahua LINE Sticker",
    category: "Character & Sticker Design",
    type: "image",
    image: "/portfolio/design/chihuahua-sticker.jpg",
  },
  {
    id: "food-science-mango-toast",
    title: "Food Science Video Editing – Mango Toast",
    category: "Video Editing",
    type: "image",
    image: "/portfolio/design/food-science-mango-toast.jpg",
  },
  {
    id: "food-science-mango-toast-video",
    title: "Food Science — Mango Toast Process Video",
    category: "Video Editing",
    type: "video",
    video: "/portfolio/design/food-science-mango-toast-video.mp4",
  },
  {
    id: "korean-fried-chicken-logo",
    title: "Korean Fried Chicken Restaurant Logo Design",
    category: "Logo Design",
    type: "image",
    image: "/portfolio/design/korean-fried-chicken-logo.jpg",
  },
];
