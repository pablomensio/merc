// Datos del negocio que aparecen en toda la web.
// Lo que tiene `confirmado: false` hay que validarlo con MERC (ver README, «Antes de abrirlo a
// buscadores»).

export const sitio = {
  nombre: "MERC Negocios Inmobiliarios",
  zona: "Alta Gracia, Córdoba",
  whatsapp: {
    numero: "5493518680414",
    visible: "351 868-0414",
    confirmado: false,
  },
  url: {
    valor: "https://merc.com.ar",
    confirmado: false,
  },
} as const;

/**
 * Mientras haya datos sin confirmar, el sitio pide no ser indexado: se puede mostrar por link
 * (al cliente, para revisar) sin que aparezca en Google con un dato equivocado.
 */
export const enRevision = !sitio.whatsapp.confirmado || !sitio.url.confirmado;

/** URL base para links absolutos (Open Graph): el dominio confirmado o la de Vercel. */
export function urlBase() {
  if (sitio.url.confirmado) return sitio.url.valor;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}
