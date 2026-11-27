import { sitio } from "@/contenido/sitio";

/** Link a WhatsApp con el mensaje ya escrito. */
export function enlaceWhatsApp(mensaje: string) {
  return `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}
