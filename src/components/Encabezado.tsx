"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pausarScroll } from "@/components/ScrollSuave";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import s from "./Encabezado.module.css";

const secciones = [
  { href: "/#loteos", texto: "Loteos" },
  { href: "/#viviendas", texto: "Viviendas modulares" },
  { href: "/#como-comprar", texto: "Cómo comprar" },
  { href: "/#contacto", texto: "Contacto" },
];

const whatsapp = enlaceWhatsApp("Hola, quiero hacer una consulta.");

/** Barra negra fija, como el folio de las láminas del brochure. */
export function Encabezado() {
  const ruta = usePathname();
  // El menú recuerda en qué ruta se abrió: al navegar a otra, queda cerrado solo.
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null);
  const abierto = abiertoEn === ruta;
  const setAbierto = (valor: boolean | ((v: boolean) => boolean)) => {
    const siguiente = typeof valor === "function" ? valor(abierto) : valor;
    setAbiertoEn(siguiente ? ruta : null);
  };

  useEffect(() => {
    pausarScroll(abierto);
    document.documentElement.classList.toggle("menu-abierto", abierto);
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbiertoEn(null);
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  return (
    <header className={s.encabezado}>
      <Link href="/" className={s.marca} aria-label="MERC Negocios Inmobiliarios, inicio">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG vectorial, no necesita optimización */}
        <img src="/marca/merc-logo-horizontal-negativo.svg" alt="" width={324} height={162} />
      </Link>

      <nav className={s.nav} aria-label="Principal">
        <ul>
          {secciones.map((x) => (
            <li key={x.href}>
              <Link href={x.href}>{x.texto}</Link>
            </li>
          ))}
        </ul>
        <a className={s.whatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </nav>

      <button
        type="button"
        className={s.botonMenu}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto((v) => !v)}
      >
        {abierto ? "Cerrar" : "Menú"}
      </button>

      <div id="menu-movil" className={s.menuMovil} data-abierto={abierto} hidden={!abierto} data-lenis-prevent>
        <ul>
          {secciones.map((x) => (
            <li key={x.href}>
              <Link href={x.href} onClick={() => setAbierto(false)}>
                {x.texto}
              </Link>
            </li>
          ))}
        </ul>
        <a className="boton" href={whatsapp} target="_blank" rel="noopener noreferrer">
          Escribinos por WhatsApp
        </a>
      </div>
    </header>
  );
}
