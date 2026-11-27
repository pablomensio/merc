import type { Metadata, Viewport } from "next";
import { Anton, Antonio, Montserrat } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

import { Encabezado } from "@/components/Encabezado";
import { Pie } from "@/components/Pie";
import { ScrollSuave } from "@/components/ScrollSuave";
import { enRevision, sitio, urlBase } from "@/contenido/sitio";

// Las tres letras de los brochures del cliente.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const antonio = Antonio({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-antonio" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  metadataBase: new URL(urlBase()),
  robots: enRevision ? { index: false, follow: false } : undefined,
  title: {
    default: "MERC Negocios Inmobiliarios · Lotes en Alta Gracia y Anisacate",
    template: "%s · MERC Negocios Inmobiliarios",
  },
  description:
    "Lotes con escritura y servicios en Alta Gracia y Anisacate, a media hora de Córdoba. También viviendas modulares con diseño a medida.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: sitio.nombre,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Marca el documento antes de pintar: si hay JS y se acepta movimiento, las entradas animadas
// arrancan ocultas. Tiene una salida a los 3 s por si la animación no corre.
const marcarMovimiento = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion');setTimeout(function(){d.classList.add('motion-listo')},3000)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${anton.variable} ${antonio.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: marcarMovimiento }} />
      </head>
      <body>
        <a className="saltar" href="#contenido">
          Saltar al contenido
        </a>
        <ScrollSuave />
        <Encabezado />
        <main id="contenido">{children}</main>
        <Pie />
      </body>
    </html>
  );
}
