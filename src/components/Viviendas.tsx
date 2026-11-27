"use client";

import { useRef } from "react";
import { gsap, useGSAP, CON_MOVIMIENTO } from "@/lib/gsap";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import s from "./Viviendas.module.css";

const pasos = [
  {
    titulo: "Diseño a medida",
    texto: "Definimos con vos la vivienda según tu lote, tu familia y lo que querés invertir.",
  },
  { titulo: "Fabricación en planta", texto: "La vivienda se fabrica por módulos, en planta." },
  { titulo: "Montaje en tu terreno", texto: "Se traslada y se monta en tu lote." },
];

// Isotipo (viewBox 0 0 318 375). Las bases de las dos caras frontales caen sobre la misma
// recta (y = 0,335·x + 269): esa es la línea del terreno, con dos mojones que marcan el lote.
const CARAS = ["65,94 65,290 145,317 145,121", "204,1 205,338 317,375 317,39"];
const LADOS = ["64,94 0,115 1,249 64,228", "203,1 108,32 106,107 203,75"];
const terreno = (x: number) => 0.335 * x + 269;

/**
 * Viviendas modulares: el isotipo se arma en tres tiempos mientras se leen los pasos.
 * Es un dibujo de la marca, no la imagen de una casa: no promete un modelo que no existe.
 */
export function Viviendas() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const armar = () => {
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        tl.from(`.${s.lote}`, { drawSVG: "0%", duration: 1 })
          .from(`.${s.contorno}`, { drawSVG: "0%", duration: 1, stagger: 0.2 }, 0)
          .from(`.${s.lado}`, { autoAlpha: 0, duration: 0.6, stagger: 0.15 }, 1.2)
          .from(`.${s.cara}`, { autoAlpha: 0, duration: 0.6, stagger: 0.15 }, 1.35)
          .from(`.${s.edificio}`, { y: -90, duration: 1, ease: "power2.in" }, 2.2);
        return tl;
      };

      // Pantallas anchas: el dibujo queda fijo y se arma con el scroll, paso a paso.
      mm.add(`${CON_MOVIMIENTO} and (min-width: 901px)`, () => {
        const tl = armar();
        gsap.timeline({
          scrollTrigger: {
            trigger: `.${s.pasos}`,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }).add(tl);

        gsap.utils.toArray<HTMLElement>(`.${s.paso}`).forEach((paso) => {
          gsap.from(paso, {
            opacity: 0.3,
            ease: "none",
            scrollTrigger: { trigger: paso, start: "top 75%", end: "top 45%", scrub: true },
          });
        });
      });

      // Celulares: se arma una vez, al aparecer.
      mm.add(`${CON_MOVIMIENTO} and (max-width: 900px)`, () => {
        const tl = armar();
        tl.duration(2.4).pause();
        gsap.timeline({
          scrollTrigger: { trigger: `.${s.figura}`, start: "top 75%", onEnter: () => tl.play() },
        });
      });
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} id="viviendas" className={`${s.viviendas} oscuro`} aria-labelledby="viviendas-titulo">
      <div className={`contenedor ${s.grilla}`}>
        <div className={s.texto}>
          <h2 id="viviendas-titulo" className="titulo-seccion">
            Tu casa, en tu lote.
          </h2>
          <p className="bajada">
            Viviendas modulares con diseño a medida: se fabrican en planta y se montan en tu terreno.
          </p>

          <ol className={s.pasos}>
            {pasos.map((p, i) => (
              <li key={p.titulo} className={s.paso}>
                <span className={s.numero} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={s.cierre}>
            <p>Modelos, superficies, plazos y precios: consultanos.</p>
            <a
              className="boton"
              href={enlaceWhatsApp("Hola, quiero consultar por una vivienda modular.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por viviendas modulares
            </a>
          </div>
        </div>

        <div className={s.figura} aria-hidden="true">
          <svg viewBox="-70 -110 480 540" className={s.dibujo}>
            <line className={s.lote} x1={-50} y1={terreno(-50)} x2={390} y2={terreno(390)} />
            {[-20, 360].map((x) => (
              <line key={x} className={s.lote} x1={x} y1={terreno(x) - 12} x2={x} y2={terreno(x) + 12} />
            ))}
            <g className={s.edificio}>
              {LADOS.map((p) => (
                <polygon key={p} className={s.lado} points={p} />
              ))}
              {CARAS.map((p) => (
                <polygon key={p} className={s.cara} points={p} />
              ))}
              {[...LADOS, ...CARAS].map((p) => (
                <polygon key={`c-${p}`} className={s.contorno} points={p} />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
