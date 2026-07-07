// WhatsApp order deep-linking. Replace WHATSAPP_NUMBER with the real one.
// Format: international number, digits only, no + or spaces.
export const WHATSAPP_NUMBER = "15550000000";

export function whatsappOrderUrl(opts: { product?: string; size?: string; price?: string; note?: string } = {}) {
  const lines = [
    "Hello BAS3NJI WORLD,",
    "",
    "I'd like to place an order:",
    opts.product ? `• Item: ${opts.product}` : null,
    opts.size ? `• Size: ${opts.size}` : null,
    opts.price ? `• Price: ${opts.price}` : null,
    opts.note ? `• Note: ${opts.note}` : null,
  ].filter(Boolean).join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
}

export function whatsappGeneralUrl(message = "Hello BAS3NJI WORLD, I'd like to know more.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
