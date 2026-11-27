import Image from "next/image";
import Link from "next/link";
import type { Loteo } from "@/contenido/loteos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import s from "./LaminaLoteo.module.css";

/**
 * Un loteo como una lámina del brochure: foto grande de un lado, datos verificables del otro.
 * Las cifras son las que importan para decidir: superficie mínima y minutos a lo conocido.
 */
export function LaminaLoteo({ loteo, invertida = false }: { loteo: Loteo; invertida?: boolean }) {
  const [cerca, lejos] = loteo.distancias;

  return (
    <article className={s.lamina} data-invertida={invertida} aria-labelledby={`lamina-${loteo.slug}`}>
      <div className={s.foto}>
        <Image
          src={loteo.portada.src}
          alt={loteo.portada.alt}
          placeholder="blur"
          quality={80}
          sizes="(min-width: 900px) 56vw, 100vw"
        />
      </div>

      <div className={s.texto}>
        <p className={s.lugar}>{loteo.lugar}</p>
        <h3 id={`lamina-${loteo.slug}`} className={s.nombre}>
          {loteo.nombre}
        </h3>
        <p className={s.resumen}>{loteo.resumen}</p>

        <dl className={s.cifras}>
          <div>
            <dt>Lotes desde</dt>
            <dd>
              <span className={s.numero}>{loteo.desde}</span> m²
            </dd>
          </div>
          <div>
            <dt>A {cerca.destino}</dt>
            <dd>
              <span className={s.numero}>{cerca.minutos}</span> min
            </dd>
          </div>
          <div>
            <dt>A {lejos.destino}</dt>
            <dd>
              <span className={s.numero}>{lejos.minutos}</span> min
            </dd>
          </div>
        </dl>

        <ul className={s.caracteristicas}>
          {loteo.caracteristicas.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <div className={s.acciones}>
          <Link className="boton" href={`/loteos/${loteo.slug}`}>
            Ver {loteo.nombre}
          </Link>
          <a
            className="boton boton-secundario"
            href={enlaceWhatsApp(loteo.mensaje)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
