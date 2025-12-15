import { Project } from "./types";

// Image mapping from user upload
// NOTA: Asegúrate de que estos archivos existan en tu carpeta "public"

export const HERO_IMAGE =
  "https://k.sinaimg.cn/n/sinakd20240212s/258/w1324h534/20240212/8b62-1259e8f66858e922c09268686d6545b7.png/w700d1q75cms.jpg";
export const ABOUT_IMAGE_1 = "/acerca.jpg";
export const ABOUT_IMAGE_2 = "/skills.jpg";
export const PATTERN_IMAGE =
  "https://k.sinaimg.cn/n/sinakd20240212s/538/w1000h538/20240212/e8f7-f1388b0227d81a938c5f5904d6074218.png/w700d1q75cms.jpg";

// Constantes para la nueva sección "Otros Proyectos"
export const OTHER_PROJECTS_HEADER = "/otros_proyectos.png";
export const OTHER_IMG_1 = "/publicidad.png";
export const OTHER_IMG_2 = "/carteles_tipograficos.png";
export const OTHER_IMG_3 = "/publicidad_fotografica.png";
export const OTHER_IMG_4 = "/carteles_ilustrados.png";

// IMÁGENES DEL LIBRO (SEPARADAS)
export const BOOK_FRONT = "/confesiones_front.jpg";
export const BOOK_BACK = "/confesiones_back.jpg";
export const BOOK_SPINE = "/confesiones_spine.jpg";

// IMAGEN DEL CANGURO (TIWANAKU)
export const HOODIE_IMAGE = "/hoodie.png";

// IMÁGENES DEL PERIÓDICO (VOLTAIGE)
export const PERI_IMG_1 = "/peri3.jpeg";
export const PERI_IMG_2 = "/peri2.jpg";
export const PERI_IMG_3 = "/peri1.jpeg";

// 1. LISTA DE PROYECTOS PRINCIPALES (Aparecen en la Galería Grande)
export const MAIN_PROJECTS: Project[] = [
  {
    id: "kusillos",
    title: "Kusillos: Mestizaje Digital",
    category: "Music Editorial & Branding",
    year: "2024",
    description:
      "Creación de un disco boliviano con fusiones neo contemporáneas. Trabajo en Photoshop con Mockups y diagramación con medidas precisas.",
    tools: ["Photoshop", "Illustrator"],
    coverImage: "/kusilloport.jpg", // Project 01 Cover
    images: [
      "/kusilloport.jpg",
      "/kudillos2.jpeg",
      "/kusillos3.jpeg",
      "/kusillos4.jpeg",
      "/kusillos5.jpeg",
    ],
  },
  {
    id: "periodico-voltaige",
    title: "Periódico Voltaige",
    category: "Editorial Design",
    year: "2023",
    description:
      "Realización y diagramación de un periódico de temática científica y futurista con InDesign y Photoshop.",
    tools: ["InDesign", "Photoshop"],
    coverImage: "/periport.jpg", // Project 02 Cover
    newspaperImages: [PERI_IMG_1, PERI_IMG_2, PERI_IMG_3], // <-- NUEVA PROPIEDAD
    images: ["/periport.jpg", "/peri1.jpg", "/peri2.jpg", "/peri3.jpeg"],
  },
  {
    id: "tiwanaku",
    title: "Tiwanaku Identity",
    category: "Brand Design",
    year: "2024",
    description:
      "Proyecto de diseño de marca turística basada en Tiwanaku. Manejo de colores e imágenes iconográficas del lugar.",
    tools: ["Illustrator", "Photoshop", "Blender"],
    coverImage: "/tiwaport.jpeg", // Project 03 Cover
    hoodieImage: HOODIE_IMAGE,
    images: [
      "/tiwaport.jpeg",
      "/tiwa1.jpg",
      "/tiwa2.jpg",
      "/tiwa3.jpg",
      "/tiwa4.jpg",
      "/tiwa5.jpg",
      "/tiwa6.jpg",
      "/tiwa7.jpg",
      "/tiwa8.jpg",
      "/tiwa9.jpg",
    ],
  },
  {
    id: "confesiones",
    title: "Confesiones de una Máscara",
    category: "Book Redesign",
    year: "2023",
    description:
      "Rediseño de un libro diagramado con InDesign y diseñado con Photoshop.",
    tools: ["InDesign", "Photoshop"],
    coverImage: "/mascport.jpg", // Project 04 Cover
    bookCovers: {
      front: BOOK_FRONT,
      back: BOOK_BACK,
      spine: BOOK_SPINE,
    },
    images: ["/mascport.jpg", "/masc1.jpg", "/masc2.jpg", "/masc3.jpg"],
  },
];

// 2. LISTA DE OTROS PROYECTOS (Aparecen en la sección inferior)
export const OTHER_PROJECTS_LIST: Project[] = [
  {
    id: "publicidad-cursos",
    title: "Publicidad y Cursos",
    category: "Social Media Design",
    year: "2023-2024",
    description:
      "Diseño de publicidades variadas, flyers para cursos y manejo de redes sociales. Realizadas con Photoshop e Illustrator.",
    tools: ["Photoshop", "Illustrator"],
 coverImage: "/publiport.png", // Project 02 Cover
    images: ["/publicidad1.jpg", "/publicidad2.jpg", "/publicidad3.jpg"],
  },
  {
    id: "carteles-tipograficos",
    title: "Carteles Tipográficos",
    category: "Typography",
    year: "2023",
    description:
      "Experimentación para la realización de carteles tipográficos. Algunos de ellos con referencias de la cultura boliviana y expresiones populares.",
    tools: ["Illustrator", "Typography"],
    coverImage: "/cartpubli.png", // Project 02 Cover
    images: ["/cartpubli1.png", "/cartpubli2.jpg", "/cartpubli3.jpg"],
  },
  {
    id: "publicidad-fotografica",
    title: "Publicidad Fotográfica",
    category: "Photography & Ads",
    year: "2024",
    description:
      "Publicidades las cuales se realizó con un trabajo fotográfico desde cero, montaje y post-producción.",
    tools: ["Photography", "Photoshop"],
    coverImage: "/publifotoport.jpg", // Project 02 Cover
    images: ["/publfoto1.jpg", "/publfoto2.jpg", "/publfoto3.jpg"],
  },
  {
    id: "carteles-ilustrados",
    title: "Carteles Ilustrados",
    category: "Illustration",
    year: "2024",
    description:
      "Carteles ilustrados con un estilo artístico predominante. Realizados en programas como IbisPaint y Photoshop.",
    tools: ["IbisPaint", "Photoshop"],
    coverImage: "/ilusport.png", // Project 02 Cover
    images: ["/ilustra1.jpg", "/ilustra2jpg.jpg", "/ilustra3.jpg"],
  },
];

// 3. EXPORTACIÓN COMBINADA
export const PROJECTS: Project[] = [...MAIN_PROJECTS, ...OTHER_PROJECTS_LIST];
