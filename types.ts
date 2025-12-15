export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  tools?: string[];
  year: string;
  bookSpread?: string; // Deprecated but kept for compatibility if needed
  bookCovers?: {
    front: string;
    back: string;
    spine: string;
  };
  hoodieImage?: string;
  newspaperImages?: string[]; // New property for the 3D Newspaper stack
}

export interface NavItem {
  label: string;
  href: string;
}