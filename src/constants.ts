import { Project } from '../types';

// Función para arreglar las rutas en GitHub Pages
// Si la ruta es una URL externa (http...), la deja igual.
// Si es local, le añade la "base" del repositorio.
const asset = (path: string) => {
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.BASE_URL; 
  // Eliminamos el slash inicial si existe para evitar dobles slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

// Image mapping from user upload
// NOTA: Asegúrate de que estos archivos existan en tu carpeta "public"

export const HERO_IMAGE = "https://k.sinaimg.cn/n/sinakd20240212s/258/w1324h534/20240212/8b62-1259e8f66858e922c09268686d6545b7.png/w700d1q75cms.jpg";
export const ABOUT_IMAGE_1 = asset("acerca.jpg");
export const PATTERN_IMAGE = "https://k.sinaimg.cn/n/sinakd20240212s/538/w1000h538/20240212/e8f7-f1388b0227d81a938c5f5904d6074218.png/w700d1q75cms.jpg";

// Constantes para la nueva sección "Otros Proyectos"
export const OTHER_PROJECTS_HEADER = asset("ilusport.png");
export const OTHER_IMG_1 = asset("publiport.png"); 
export const OTHER_IMG_5 = asset("cartpubli.png");
export const OTHER_IMG_2 = asset("tipo1.jpg");
export const OTHER_IMG_3 = asset("publifotoport.jpg");
export const OTHER_IMG_4 = asset("ilusport.png");

// IMÁGENES DEL LIBRO (SEPARADAS)
export const BOOK_FRONT = asset("confesiones_front.jpg");
export const BOOK_BACK = asset("confesiones_back.jpg");
export const BOOK_SPINE = asset("confesiones_spine.jpg");

// IMAGEN DEL CANGURO (TIWANAKU)
export const HOODIE_IMAGE = asset("hoodie.png");

// IMÁGENES DEL PERIÓDICO (VOLTAIGE)
export const PERI_IMG_1 = asset("peri1.jpg");
export const PERI_IMG_2 = asset("peri2.jpg");
export const PERI_IMG_3 = asset("peri3.jpeg");

// 1. LISTA DE PROYECTOS PRINCIPALES (Aparecen en la Galería Grande)
export const MAIN_PROJECTS: Project[] = [
  {
    id: "kusillos",
    title: "Kusillos: Mestizaje Digital",
    category: "Music Editorial & Branding",
    year: "2024",
    description: "Creación de un disco boliviano con fusiones neo contemporáneas. Trabajo en Photoshop con Mockups y diagramación con medidas precisas.",
    tools: ["Photoshop", "Illustrator"],
    coverImage: asset("kusilloport.jpg"),  // Project 01 Cover
    images: [
      asset("kusilloport.jpg"),
      asset("kudillos2.jpeg"),
      asset("kusillos3.jpeg"),
      asset("kusillos4.jpeg"),
      asset("kusillos5.jpeg")
    ]
  },
  {
    id: "periodico-voltaige",
    title: "Periódico Voltaige",
    category: "Editorial Design",
    year: "2023",
    description: "Realización y diagramación de un periódico de temática científica y futurista con InDesign y Photoshop.",
    tools: ["InDesign", "Photoshop"],
    coverImage: asset("periport.jpg"), // Project 02 Cover
    newspaperImages: [PERI_IMG_1, PERI_IMG_2, PERI_IMG_3], // <-- NUEVA PROPIEDAD
    images: [
      asset("periport.jpg"),
      asset("peri1.jpg"),
      asset("peri2.jpg"),
      asset("peri3.jpeg")
    ]
  },
  {
    id: "tiwanaku",
    title: "Tiwanaku Identity",
    category: "Brand Design",
    year: "2024",
    description: "Proyecto de diseño de marca turística basada en Tiwanaku. Manejo de colores e imágenes iconográficas del lugar.",
    tools: ["Illustrator", "Photoshop", "Blender"],
    coverImage: asset("tiwaport.jpeg"), // Project 03 Cover
    hoodieImage: HOODIE_IMAGE,    
    images: [
      asset("tiwaport.jpeg"),
      asset("tiwa1.jpg"),
      asset("tiwa2.jpg"),
      asset("tiwa3.jpg"),
      asset("tiwa4.jpg"),
      asset("tiwa5.jpg"),
      asset("tiwa6.jpg"),
      asset("tiwa7.jpg"),
      asset("tiwa8.jpg"),
      asset("tiwa9.jpg"),
    ]
  },
  {
    id: "confesiones",
    title: "Confesiones de una Máscara",
    category: "Book Redesign",
    year: "2023",
    description: "Rediseño de un libro diagramado con InDesign y diseñado con Photoshop.",
    tools: ["InDesign", "Photoshop"],
    coverImage: asset("mascport.jpg"), // Project 04 Cover
    bookCovers: {
        front: BOOK_FRONT,
        back: BOOK_BACK,
        spine: BOOK_SPINE
    },
    images: [
      asset("mascport.jpg"),
      asset("masc1.jpg"),
      asset("masc2.jpg"),
      asset("masc3.jpg")
    ]
  }
];

// 2. LISTA DE OTROS PROYECTOS (Aparecen en la sección inferior)
export const OTHER_PROJECTS_LIST: Project[] = [
  {
    id: "publicidad-cursos",
    title: "Diseño Publicidad",
    category: "Social Media Design",
    year: "2023-2024",
    description: "Diseño de publicidades variadas, flyers para cursos y manejo de redes sociales. Realizadas con Photoshop e Illustrator.",
    tools: ["Photoshop", "Illustrator"],
    coverImage: OTHER_IMG_1,
    images: [asset("publicidad1.jpg"), asset("publicidad2.jpg"), asset("publicidad3.jpg")] 
  },
  {
    id: "carteles-tipograficos",
    title: "Carteles Tipográficos",
    category: "Typography",
    year: "2023",
    description: "Experimentación para la realización de carteles tipográficos. Algunos de ellos con referencias de la cultura boliviana y expresiones populares.",
    tools: ["Illustrator", "Typography"],
    coverImage: OTHER_IMG_5,
    images: [OTHER_IMG_2, asset("cartpubli1.png"), asset("cartpubli3.jpg")]
  },
  {
    id: "publicidad-fotografica",
    title: "Publicidad Fotográfica",
    category: "Photography & Ads",
    year: "2024",
    description: "Publicidades las cuales se realizó con un trabajo fotográfico desde cero, montaje y post-producción.",
    tools: ["Photography", "Photoshop"],
    coverImage: OTHER_IMG_3,
    images: [ asset("publfoto1.jpg"), asset("publfoto2.jpg"), asset("publfoto3.jpg")]
  },
  {
    id: "carteles-ilustrados",
    title: "Carteles Ilustrados",
    category: "Illustration",
    year: "2024",
    description: "Carteles ilustrados con un estilo artístico predominante. Realizados en programas como IbisPaint y Photoshop.",
    tools: ["IbisPaint", "Photoshop"],
    coverImage: OTHER_IMG_4,
    images: [asset("ilustra1.jpg"), asset("ilustra2jpg.jpg"), asset("ilustra3.jpg")]
  }
];

// 3. EXPORTACIÓN COMBINADA
export const PROJECTS: Project[] = [...MAIN_PROJECTS, ...OTHER_PROJECTS_LIST];