import Link from "next/link";

export default function NoEncontrada() {
  return (
    <section className="oscuro" style={{ padding: "clamp(96px, 18vh, 200px) 0" }}>
      <div className="contenedor" style={{ display: "grid", gap: 24, justifyItems: "start" }}>
        <h1 className="titulo-seccion">Esta página no existe.</h1>
        <p className="bajada">Puede que el link esté mal escrito o que el loteo ya no esté publicado.</p>
        <Link className="boton" href="/">
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}
