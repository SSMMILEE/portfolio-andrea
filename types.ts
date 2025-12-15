export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
  tools?: string[];
  year: string;
  bookSpread?: string;
  bookCovers?: {       
    front: string;
    back: string;
    spine: string;
  };
  hoodieImage?: string; 
  newspaperImages?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}