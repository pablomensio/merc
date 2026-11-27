"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, CON_MOVIMIENTO } from "@/lib/gsap";
import dron from "@/assets/fotos/anisacate-dron-parcelas.jpg";
import s from "./BandaDron.module.css";

/** Franja de borde a borde con la toma de drone real de los lotes alambrados. */
export function BandaDron() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(CON_MOVIMIENTO, () => {
        gsap.fromTo(
          `.${s.imagen}`,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: raiz.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: raiz },
  );

  return (
    <figure ref={raiz} className={s.banda}>
      <div className={s.marco}>
        <Image
          className={s.imagen}
          src={dron}
          alt="Toma con drone de los lotes alambrados de Vistas de Anisacate, al atardecer"
          placeholder="blur"
          quality={80}
          sizes="100vw"
        />
      </div>
      <figcaption className="contenedor">Vistas de Anisacate desde el drone, al atardecer.</figcaption>
    </figure>
  );
}
