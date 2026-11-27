import { enlaceWhatsApp } from "@/lib/whatsapp";
import { sitio } from "@/contenido/sitio";
import s from "./Contacto.module.css";

// Cada opción abre WhatsApp con el mensaje ya escrito: un toque y la consulta llega con contexto.
const opciones = [
  { texto: "Quiero conocer Vistas de Anisacate", mensaje: "Hola, quiero conocer los lotes de Vistas de Anisacate." },
  { texto: "Quiero conocer Tres Gracias", mensaje: "Hola, quiero conocer los lotes de Tres Gracias." },
  { texto: "Quiero una vivienda modular", mensaje: "Hola, quiero consultar por una vivienda modular." },
  { texto: "Tengo otra consulta", mensaje: "Hola, tengo una consulta." },
];

export function Contacto() {
  return (
    <section id="contacto" className={`${s.seccion} oscuro`} aria-labelledby="contacto-titulo">
      <div className="contenedor">
        <div className={s.cabeza}>
          <h2 id="contacto-titulo" className="titulo-seccion">
            ¿Qué querés conocer?
          </h2>
          <p className="bajada">
            Elegí una opción y se abre WhatsApp con el mensaje listo. Te responde un asesor de MERC.
          </p>
        </div>

        <ul className={s.opciones}>
          {opciones.map((o) => (
            <li key={o.texto}>
              <a href={enlaceWhatsApp(o.mensaje)} target="_blank" rel="noopener noreferrer">
                <span>{o.texto}</span>
                <span className={s.canal}>WhatsApp</span>
              </a>
            </li>
          ))}
        </ul>

        <p className={s.telefono}>
          También podés agendar el número: <strong>{sitio.whatsapp.visible}</strong>
        </p>
      </div>
    </section>
  );
}
