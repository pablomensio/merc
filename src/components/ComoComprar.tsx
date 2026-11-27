import s from "./ComoComprar.module.css";

const pasos = [
  {
    titulo: "Consultá por WhatsApp",
    texto:
      "Contanos qué buscás: zona, superficie y si vas a construir o invertir. Te pasamos lo que hay disponible.",
  },
  {
    titulo: "Visitá el lote",
    texto: "Coordinamos una visita para que lo recorras con un asesor y veas los servicios en el lugar.",
  },
  {
    titulo: "Cerrá con el asesor",
    texto:
      "Acordás la forma de pago y la documentación. Tres Gracias tiene escritura; en Vistas de Anisacate hay lotes con escritura inmediata y otros con posesión.",
  },
];

export function ComoComprar() {
  return (
    <section id="como-comprar" className={`${s.seccion} claro`} aria-labelledby="como-comprar-titulo">
      <div className="contenedor">
        <h2 id="como-comprar-titulo" className="titulo-seccion">
          Cómo se compra un lote
        </h2>
        <ol className={s.pasos}>
          {pasos.map((p, i) => (
            <li key={p.titulo}>
              <span className={s.numero} aria-hidden="true">
                {i + 1}
              </span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
