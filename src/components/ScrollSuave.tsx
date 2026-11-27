"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let instancia: Lenis | null = null;

/** Frena o reanuda el scroll suave (por ejemplo, con el menú abierto en el celular). */
export function pausarScroll(pausar: boolean) {
  if (!instancia) return;
  if (pausar) instancia.stop();
  else instancia.start();
}

/** Scroll suave con Lenis, sincronizado con ScrollTrigger. No corre si se pidió menos movimiento. */
export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, anchors: { offset: -64 }, lerp: 0.11 });
    instancia = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const avanzar = (tiempo: number) => lenis.raf(tiempo * 1000);
    gsap.ticker.add(avanzar);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(avanzar);
      lenis.destroy();
      instancia = null;
    };
  }, []);

  return null;
}
