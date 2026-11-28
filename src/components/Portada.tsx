"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { preload } from "react-dom";
import { gsap, useGSAP, CON_MOVIMIENTO } from "@/lib/gsap";
import { loteos } from "@/contenido/loteos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import inicio from "@/assets/portada/video-inicio.jpg";
import final from "@/assets/portada/video-final.jpg";
import s from "./Portada.module.css";

// Video hecho con IA (Google Flow): vuelo sobre sierras y el isotipo que se arma en el cielo.
// Es ambiente, no el loteo: por eso lleva la marca «Ilustración» (regla de la ficha, §5).
const VIDEO = "/video/merc-portada.mp4";

const whatsapp = enlaceWhatsApp("Hola, quiero conocer los lotes disponibles.");

export function Portada() {
  const raiz = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  // Mientras baja el video se ve su primer cuadro: es lo primero que se pinta en la portada.
  preload(inicio.src, { as: "image", fetchPriority: "high" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        // El video corre una sola vez y queda quieto en el último cuadro, con el logo armado.
        // Si el navegador no deja reproducirlo (ahorro de batería), se muestra ese cuadro fijo.
        // Si la página se abrió en una pestaña de fondo, espera a que la miren para arrancar.
        const v = video.current;
        const arrancar = () => {
          if (!v || document.hidden) return;
          document.removeEventListener("visibilitychange", arrancar);
          v.muted = true;
          v.play().catch(() => raiz.current?.setAttribute("data-sin-video", ""));
        };
        if (document.hidden) document.addEventListener("visibilitychange", arrancar);
        else arrancar();

        // Primero se hace visible lo que el CSS ocultó; después cada `from` lo vuelve a su
        // estado inicial. (Dentro del timeline, el set correría después y haría un parpadeo.)
        gsap.set("[data-anim]", { autoAlpha: 1 });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(`.${s.linea} > span`, { yPercent: 108, duration: 1.1, stagger: 0.09 }, 0.1)
          .from(`.${s.texto} > :not(h1)`, { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.6)
          .from(`.${s.accesos} li`, { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.9);

        // Al bajar, el fondo se queda un poco atrás: la portada se va por encima del video.
        gsap.to(`.${s.capa}`, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          document.removeEventListener("visibilitychange", arrancar);
          v?.pause();
        };
      });
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} className={`${s.portada} oscuro`} aria-labelledby="portada-titulo">
      <div className={s.fondo} aria-hidden="true">
        <div className={s.capa}>
          {/* Sin movimiento (o sin video): el último cuadro, con el logo ya armado. */}
          <Image className={`${s.medio} ${s.final}`} src={final} alt="" sizes="100vw" quality={80} />
          <video
            ref={video}
            className={`${s.medio} ${s.video}`}
            poster={inicio.src}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        </div>
        <span className={s.nota}>Ilustración</span>
      </div>

      <div className={s.interior}>
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
      </div>
    </section>
  );
}
