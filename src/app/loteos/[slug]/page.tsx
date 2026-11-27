import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarLoteo, loteos } from "@/contenido/loteos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { Distancias } from "@/components/Distancias";
import s from "./loteo.module.css";

export function generateStaticParams() {
  return loteos.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/loteos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loteo = buscarLoteo(slug);
  if (!loteo) return {};
  const { src } = loteo.portada;
  return {
    title: `${loteo.nombre}, lotes desde ${loteo.desde} m²`,
    description: loteo.resumen,
    openGraph: {
      images: [{ url: src.src, width: src.width, height: src.height, alt: loteo.portada.alt }],
    },
  };
}

export default async function PaginaLoteo({ params }: PageProps<"/loteos/[slug]">) {
  const { slug } = await params;
  const loteo = buscarLoteo(slug);
  if (!loteo) notFound();

  const otro = loteos.find((l) => l.slug !== loteo.slug);
  const visita = enlaceWhatsApp(`Hola, quiero coordinar una visita a ${loteo.nombre}.`);

  return (
    <article>
      <header className={`${s.portada} oscuro`}>
        <div className={`contenedor ${s.portadaGrilla}`}>
          <div className={s.portadaTexto}>
            <p className={s.lugar}>{loteo.lugar}</p>
            <h1 className={s.nombre}>{loteo.nombre}</h1>
            <p className="bajada">{loteo.resumen}</p>
            <div className={s.acciones}>
              <a className="boton" href={enlaceWhatsApp(loteo.mensaje)} target="_blank" rel="noopener noreferrer">
                Consultar por WhatsApp
              </a>
              <a className="boton boton-secundario" href="#ubicacion">
                Ver la ubicación
              </a>
            </div>
          </div>
          <div className={s.portadaFoto}>
            <Image
              src={loteo.portada.src}
              alt={loteo.portada.alt}
              placeholder="blur"
              quality={80}
              preload
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </div>
        </div>
      </header>

      <section className={`${s.datos} claro`} aria-labelledby="datos-titulo">
        <div className={`contenedor ${s.datosGrilla}`}>
          <h2 id="datos-titulo" className="solo-lectores">
            El loteo
          </h2>
          <p className={s.superficie}>
            <span className={s.superficieNumero}>{loteo.desde}</span>
            <span className={s.superficieUnidad}>
              m²
              <br />
              <span>superficie mínima de los lotes</span>
            </span>
          </p>
          <div className={s.descripcion}>
            {loteo.descripcion.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className={s.caracteristicas}>
            {loteo.caracteristicas.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className={`contenedor ${s.galeria}`} data-cantidad={loteo.fotos.length}>
          {loteo.fotos.map((f) => (
            <figure key={f.alt}>
              <Image src={f.src} alt={f.alt} placeholder="blur" quality={80} sizes="(min-width: 900px) 50vw, 100vw" />
            </figure>
          ))}
        </div>
      </section>

      <section id="ubicacion" className={`${s.ubicacion} oscuro`} aria-labelledby="ubicacion-titulo">
        <div className="contenedor">
          <div className={s.ubicacionCabeza}>
            <h2 id="ubicacion-titulo" className="titulo-seccion">
              Ubicación
            </h2>
            <p className="bajada">{loteo.ubicacion}</p>
          </div>
          <Distancias items={loteo.distancias} />
        </div>
      </section>

      <section className={`${s.cierre} claro`} aria-labelledby="cierre-titulo">
        <div className={`contenedor ${s.cierreGrilla}`}>
          <h2 id="cierre-titulo" className="titulo-seccion">
            Recorrelo con un asesor.
          </h2>
          <div className={s.cierreAcciones}>
            <a className="boton" href={visita} target="_blank" rel="noopener noreferrer">
              Coordinar una visita
            </a>
            {otro && (
              <Link className="boton boton-secundario" href={`/loteos/${otro.slug}`}>
                Ver {otro.nombre}
              </Link>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
