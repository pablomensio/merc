"use client";

// Un solo lugar donde se registran los plugins de GSAP. Todo el código de animación importa de acá.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Media query para animar solo si la persona no pidió reducir el movimiento. */
export const CON_MOVIMIENTO = "(prefers-reduced-motion: no-preference)";
