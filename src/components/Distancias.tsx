"use client";

import { useRef } from "react";
import { gsap, useGSAP, CON_MOVIMIENTO } from "@/lib/gsap";
import s from "./Distancias.module.css";

type Distancia = { destino: string; minutos: number };

/**
 * Minutos de viaje como barras: el largo es proporcional al tiempo, así se lee de un vistazo
 * qué tan cerca queda todo. Escala fija de 30 minutos para que los loteos se puedan comparar.
 */
export function Distancias({ items }: { items: Distancia[] }) {
  const raiz = useRef<HTMLDivElement>(null);
  const escala = Math.max(30, ...items.map((d) => d.minutos));

  useGSAP(
    () => {
      gsap.matchMedia().add(CON_MOVIMIENTO, () => {
        gsap.from(`.${s.barra}`, {
          scaleX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: raiz.current, start: "top 80%" },
        });
      });
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz} className={s.distancias}>
      <ul>
        {items.map((d) => (
          <li key={d.destino}>
            <span className={s.destino}>{d.destino}</span>
            <span className={s.pista} aria-hidden="true">
              <span className={s.barra} style={{ width: `${(d.minutos / escala) * 100}%` }} />
            </span>
            <span className={s.minutos}>
              <span className={s.numero}>{d.minutos}</span> min
            </span>
          </li>
        ))}
      </ul>
      <p className={s.nota}>Tiempos de viaje aproximados, según el material del loteo.</p>
    </div>
  );
}
