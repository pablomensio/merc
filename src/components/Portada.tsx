"use client";

import Link from "next/link";
import { useRef } from "react";
import { preload } from "react-dom";
import { gsap, useGSAP, CON_MOVIMIENTO } from "@/lib/gsap";
import { loteos } from "@/contenido/loteos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import aerea from "@/assets/fotos/anisacate-aerea-sierras.jpg";
import s from "./Portada.module.css";

// Geometría del isotipo de MERC (versión positiva, viewBox 0 0 318 375): dos volúmenes con
// su cara frontal y su cara lateral. Las caras frontales son ventanas a la foto del lugar.
const CARA_CHICA = "65,94 65,290 145,317 145,121";
const CARA_ALTA = "204,1 205,338 317,375 317,39";
// Las mismas caras aplastadas contra el piso: de acá «crecen» al cargar.
const CARA_CHICA_PISO = "65,290 65,290 145,317 145,317";
const CARA_ALTA_PISO = "205,338 205,338 317,375 317,375";
const LADO_CHICO = "64,94 0,115 1,249 64,228";
const LADO_ALTO = "203,1 108,32 106,107 203,75";

const whatsapp = enlaceWhatsApp("Hola, quiero conocer los lotes disponibles.");

export function Portada() {
  const raiz = useRef<HTMLElement>(null);
  // La foto va dentro de un <image> de SVG: se precarga a mano porque next/image no la ve.
  preload(aerea.src, { as: "image", fetchPriority: "high" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        // Primero se hace visible lo que el CSS ocultó; después cada `from` lo vuelve a su
        // estado inicial. (Dentro del timeline, el set correría después y haría un parpadeo.)
        gsap.set("[data-anim]", { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(`.${s.linea} > span`, { yPercent: 108, duration: 1.1, stagger: 0.09 }, 0.1)
          .set(`.${s.contorno}`, { opacity: 1 }, 0.25)
          .from(`.${s.contorno}`, { drawSVG: "0%", duration: 1.1, stagger: 0.12, ease: "power2.inOut" }, 0.25)
          .from(`.${s.caraChica}`, { attr: { points: CARA_CHICA_PISO }, duration: 1.2 }, 0.7)
          .from(`.${s.caraAlta}`, { attr: { points: CARA_ALTA_PISO }, duration: 1.4 }, 0.85)
          .from(`.${s.lado}`, { autoAlpha: 0, x: 14, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 1.25)
          .to(`.${s.contorno}`, { autoAlpha: 0, duration: 0.8, ease: "power1.out" }, 1.7)
          .from(`.${s.texto} > :not(h1)`, { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 1.0)
          .from(`.${s.figura} figcaption`, { autoAlpha: 0, duration: 0.8 }, 1.9)
          .from(`.${s.accesos} li`, { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 1.4);

        // Al bajar, la foto se desliza dentro de las caras: un 2.5D mínimo, sin video generado.
        gsap.to(`.${s.foto}`, {
          attr: { y: -40 },
          ease: "none",
          scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} className={`${s.portada} oscuro`} aria-labelledby="portada-titulo">
      <div className={s.texto}>
        <h1 id="portada-titulo" className={s.titulo} data-anim>
          <span className={s.linea}>
            <span>Un lugar</span>
          </span>
          <span className={s.linea}>
            <span>para</span>
          </span>
          <span className={s.linea}>
            <span>proyectar.</span>
          </span>
        </h1>
        <p className={`bajada ${s.bajada}`} data-anim>
          Lotes con escritura y servicios en Alta Gracia y Anisacate, a media hora de Córdoba. Y
          viviendas modulares, con diseño a medida, para construir en tu lote.
        </p>
        <div className={s.acciones} data-anim>
          <a className="boton" href="#loteos">
            Ver los loteos
          </a>
          <a className="boton boton-secundario" href={whatsapp} target="_blank" rel="noopener noreferrer">
            Escribinos por WhatsApp
          </a>
        </div>
      </div>

      <figure className={s.figura} data-anim>
        <svg viewBox="-4 -4 326 384" className={s.isotipo} role="img" aria-labelledby="portada-foto">
          <title id="portada-foto">Vista aérea de Anisacate con las sierras de fondo, dentro del isotipo de MERC</title>
          <defs>
            <clipPath id="portada-caras">
              <polygon className={s.caraChica} points={CARA_CHICA} />
              <polygon className={s.caraAlta} points={CARA_ALTA} />
            </clipPath>
          </defs>
          <polygon className={s.lado} points={LADO_CHICO} />
          <polygon className={s.lado} points={LADO_ALTO} />
          <g clipPath="url(#portada-caras)">
            <image
              className={s.foto}
              href={aerea.src}
              x={-33}
              y={-20}
              width={449}
              height={414}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
          <polygon className={s.contorno} points={CARA_CHICA} />
          <polygon className={s.contorno} points={CARA_ALTA} />
        </svg>
        <figcaption>Vistas de Anisacate, desde el aire.</figcaption>
      </figure>

      <ul className={s.accesos} aria-label="Loteos">
        {loteos.map((l) => (
          <li key={l.slug} data-anim>
            <Link href={`/loteos/${l.slug}`}>
              <span className={s.accesoNombre}>{l.nombre}</span>
              <span className={s.accesoDato}>
                Lotes desde {l.desde} m² en {l.lugar.split(",")[0]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
