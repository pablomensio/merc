// Los loteos que vende MERC. Todo lo que dice este archivo sale de los brochures del cliente
// (noviembre 2026). Precios y disponibilidad no se publican hasta que MERC los confirme.
import type { StaticImageData } from "next/image";

import aereaSierras from "@/assets/fotos/anisacate-aerea-sierras.jpg";
import alambrado from "@/assets/fotos/anisacate-alambrado.jpg";
import loteAnisacate from "@/assets/fotos/anisacate-lote.jpg";
import dronParcelas from "@/assets/fotos/anisacate-dron-parcelas.jpg";
import boulevard from "@/assets/fotos/tres-gracias-boulevard.jpg";
import acceso from "@/assets/fotos/tres-gracias-acceso.jpg";
import calle from "@/assets/fotos/tres-gracias-calle.jpg";

export type Foto = { src: StaticImageData; alt: string };

export type Loteo = {
  slug: string;
  nombre: string;
  /** Localidad, tal como se la diría en una charla. */
  lugar: string;
  /** Superficie mínima de los lotes, en m². */
  desde: number;
  /** Una oración: por qué este loteo. */
  resumen: string;
  descripcion: string[];
  caracteristicas: string[];
  ubicacion: string;
  /** Minutos de viaje, del más cercano al más lejano. */
  distancias: { destino: string; minutos: number }[];
  portada: Foto;
  fotos: Foto[];
  /** Mensaje que queda escrito al abrir WhatsApp desde este loteo. */
  mensaje: string;
};

export const loteos: Loteo[] = [
  {
    slug: "vistas-de-anisacate",
    nombre: "Vistas de Anisacate",
    lugar: "Anisacate, Córdoba",
    desde: 600,
    resumen:
      "Lotes con todos los servicios, vista a las sierras y cerca del río Anisacate.",
    descripcion: [
      "Lotes desde 600 m² en un entorno natural, con vista a las sierras y cerca del río Anisacate. Cada lote tiene todos los servicios y está listo para empezar tu proyecto.",
      "Es un barrio abierto, aprobado por Catastro, que tributa impuestos provinciales y municipales. Hay lotes con escritura inmediata y otros con posesión.",
    ],
    caracteristicas: [
      "Todos los servicios",
      "Escritura inmediata o posesión, según el lote",
      "Aprobado por Catastro",
      "Barrio abierto",
    ],
    ubicacion:
      "A cinco minutos de Alta Gracia y a media hora de Córdoba Capital, Villa Carlos Paz y el Lago Los Molinos.",
    distancias: [
      { destino: "Alta Gracia", minutos: 5 },
      { destino: "Córdoba Capital", minutos: 30 },
      { destino: "Villa Carlos Paz", minutos: 30 },
      { destino: "Lago Los Molinos", minutos: 30 },
    ],
    portada: {
      src: alambrado,
      alt: "Lote alambrado en Vistas de Anisacate, con el cielo abierto y las sierras al fondo",
    },
    fotos: [
      {
        src: aereaSierras,
        alt: "Vista aérea de Anisacate, con el barrio, las calles y las sierras de fondo",
      },
      { src: loteAnisacate, alt: "Lote con pasto y árboles en Vistas de Anisacate" },
      {
        src: dronParcelas,
        alt: "Toma con drone de los lotes alambrados de Vistas de Anisacate al atardecer",
      },
    ],
    mensaje: "Hola, quiero conocer los lotes de Vistas de Anisacate.",
  },
  {
    slug: "tres-gracias",
    nombre: "Tres Gracias",
    lugar: "Alta Gracia, Córdoba",
    desde: 360,
    resumen: "Lotes planos con asfalto, cloacas y escritura, a un minuto del centro de Alta Gracia.",
    descripcion: [
      "Lotes planos desde 360 m², con agua y luz aprobadas, cordón cuneta, cloacas y asfalto. Cuentan con escritura.",
      "El loteo depende de la Municipalidad de Alta Gracia.",
    ],
    caracteristicas: [
      "Agua y luz aprobadas",
      "Cloacas",
      "Cordón cuneta y asfalto",
      "Con escritura",
    ],
    ubicacion:
      "En la zona norte de Alta Gracia, sobre el nexo que une la autovía N.º 5 y la ruta provincial RC45.",
    distancias: [
      { destino: "Centro de Alta Gracia", minutos: 1 },
      { destino: "Córdoba", minutos: 25 },
      { destino: "Villa Carlos Paz", minutos: 28 },
    ],
    portada: {
      src: boulevard,
      alt: "Boulevard asfaltado con cordón cuneta en el loteo Tres Gracias, en un día despejado",
    },
    fotos: [
      { src: acceso, alt: "Calle de acceso a Tres Gracias, con alumbrado y veredas de pasto" },
      { src: calle, alt: "Calle asfaltada de Tres Gracias con lotes a ambos lados" },
    ],
    mensaje: "Hola, quiero conocer los lotes de Tres Gracias.",
  },
];

export function buscarLoteo(slug: string) {
  return loteos.find((l) => l.slug === slug);
}
