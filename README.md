# Web de MERC Negocios Inmobiliarios

Sitio de MERC (lotes en Alta Gracia y Anisacate, viviendas modulares). Next.js 16 con
Cache Components, GSAP (ScrollTrigger, DrawSVG) y Lenis. Todo estático: no hay base de datos
ni formularios; cada consulta sale a WhatsApp con el mensaje ya escrito.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificación antes de cualquier deploy
npm run lint
```

## Dónde está cada cosa

| Ruta | Qué es |
|---|---|
| `src/contenido/loteos.ts` | Los loteos: textos, cifras, distancias y fotos. **Es lo único que hay que tocar para cambiar contenido.** |
| `src/contenido/sitio.ts` | Nombre, zona, WhatsApp y dominio |
| `src/app/page.tsx` | Inicio: portada, loteos, banda de drone, viviendas, cómo comprar, contacto |
| `src/app/loteos/[slug]/` | Página de cada loteo |
| `src/components/` | Una pieza por archivo, con su `.module.css` |
| `src/lib/gsap.ts` | Registro de plugins de GSAP; toda animación importa de acá |
| `src/assets/fotos/` | Fotos reales, sacadas de los brochures del cliente |
| `public/marca/` | Logos vectoriales (sin metadatos, con el recorte ajustado al contenido) |

## Decisiones de diseño

- **Fuente de la marca:** el logo y los brochures de MERC, no prototipos de terceros. Por eso el
  gris claro es `#f5f5f5` (el de las láminas) y los botones son rectos, como el isotipo.
- **Letras:** Anton (portada y cifras), Antonio (títulos), Montserrat (texto). Son las de los brochures.
- **El momento fuerte es uno solo:** al cargar, el isotipo se dibuja y sus dos caras frontales se
  llenan con la foto aérea real de Anisacate. Al bajar, la foto se desliza dentro (2.5D).
- **Viviendas modulares:** el isotipo se arma en tres tiempos con el scroll (diseño, fabricación,
  montaje). Es un dibujo de la marca, no la imagen de una casa: no promete un modelo que no existe.
- **Distancias:** barras proporcionales a los minutos, con la misma escala para los dos loteos.
- **Movimiento:** respeta `prefers-reduced-motion` (sin animaciones ni scroll suave). Si el JS no
  corre, el contenido aparece igual a los 3 segundos.

## Reglas de contenido

- Solo datos que estén en el material de MERC. Lo que no está confirmado no se publica.
- Fotos reales de los loteos. IA solo para ambiente o procesos, marcada como «Ilustración», nunca
  como el lote o una casa de MERC (regla de la ficha, `contenido/merc/ficha.md` §5).
- Voseo y frases cortas. Distancias en minutos contra lugares conocidos.

## Despliegue

Vercel, proyecto `merc`, conectado a este repositorio: cada push a `main` despliega a producción.
Mientras `enRevision` sea verdadero (`src/contenido/sitio.ts`), el sitio pide no ser indexado
(`noindex`): se comparte por link, no aparece en buscadores. Al confirmar WhatsApp y dominio,
se marca `confirmado: true` en los dos y queda indexable.

## Antes de abrirlo a buscadores (pendiente de MERC)

- [ ] WhatsApp: `351 868-0414` sin confirmar (`sitio.ts`, `confirmado: false`).
- [ ] Dominio: `merc.com.ar` sin confirmar; mientras tanto, los links absolutos usan la URL de Vercel.
- [ ] Nombre del loteo: «Vistas de Anisacate» o «Ayres de Anisacate».
- [ ] Fotos originales en alta y tomas de drone: las actuales salen de los brochures (máx. 1280 px,
      la aérea con sierras 665 px).
- [ ] Viviendas modulares: modelos, superficies, si fabrican o comercializan.
- [ ] Precios y disponibilidad: hoy no se muestran a propósito.
- [ ] Redes (Instagram, Facebook) para el pie.
