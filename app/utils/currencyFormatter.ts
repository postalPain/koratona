export function formatPrice(price: number | bigint): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "SAR" }).format(price)
}
