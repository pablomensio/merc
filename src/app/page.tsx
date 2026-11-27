import { Portada } from "@/components/Portada";
import { LaminaLoteo } from "@/components/LaminaLoteo";
import { BandaDron } from "@/components/BandaDron";
import { Viviendas } from "@/components/Viviendas";
import { ComoComprar } from "@/components/ComoComprar";
import { Contacto } from "@/components/Contacto";
import { loteos } from "@/contenido/loteos";
import s from "./inicio.module.css";

export default function Inicio() {
  return (
    <>
      <Portada />

      <section id="loteos" className={`${s.loteos} claro`} aria-labelledby="loteos-titulo">
        <div className="contenedor">
          <header className={s.cabeza}>
            <h2 id="loteos-titulo" className="titulo-seccion">
              Elegí dónde proyectar.
            </h2>
            <p className="bajada">
              Uno en Anisacate, a cinco minutos de Alta Gracia; otro dentro de la ciudad, a un minuto
              del centro. Los dos, a media hora de Córdoba.
            </p>
          </header>

          <div className={s.laminas}>
            {loteos.map((l, i) => (
              <LaminaLoteo key={l.slug} loteo={l} invertida={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <BandaDron />
      <Viviendas />
      <ComoComprar />
      <Contacto />
    </>
  );
}
