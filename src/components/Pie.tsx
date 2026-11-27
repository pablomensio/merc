import Link from "next/link";
import { loteos } from "@/contenido/loteos";
import { sitio } from "@/contenido/sitio";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import s from "./Pie.module.css";

export function Pie() {
  return (
    <footer className={`${s.pie} oscuro`}>
      <div className={`contenedor ${s.grilla}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG vectorial */}
        <img
          className={s.logo}
          src="/marca/merc-logo-vertical-negativo.svg"
          alt="MERC Negocios Inmobiliarios"
          width={420}
          height={590}
        />

        <nav aria-label="Loteos">
          <h2>Loteos</h2>
          <ul>
            {loteos.map((l) => (
              <li key={l.slug}>
                <Link href={`/loteos/${l.slug}`}>{l.nombre}</Link>
              </li>
            ))}
            <li>
              <Link href="/#viviendas">Viviendas modulares</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2>Contacto</h2>
          <ul>
            <li>
              <a href={enlaceWhatsApp("Hola, quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer">
                WhatsApp <span className={s.numero}>{sitio.whatsapp.visible}</span>
              </a>
            </li>
            <li>{sitio.zona}</li>
          </ul>
        </div>
      </div>

      <div className={`contenedor ${s.legal}`}>
        <p>
          © 2026 {sitio.nombre}
        </p>
        <p>Las fotos son de los loteos. Precios y disponibilidad, por WhatsApp.</p>
      </div>
    </footer>
  );
}
