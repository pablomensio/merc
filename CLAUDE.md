@AGENTS.md

# Web de MERC

Leé `README.md` antes de tocar nada: ahí están las decisiones de diseño y lo pendiente.

- Castellano con voseo en todo lo que ve un usuario, y en los comentarios.
- Contenido solo desde `src/contenido/`; nada que no esté en el material de MERC (la ficha y los
  brochures del cliente). Lo no confirmado no se publica.
- IA nunca como el lote, el barrio o una casa de MERC.
- Toda animación con GSAP vía `src/lib/gsap.ts`, dentro de `gsap.matchMedia()` con `CON_MOVIMIENTO`.
- Verificá con `npm run lint` y `npm run build` antes de dar algo por terminado.
