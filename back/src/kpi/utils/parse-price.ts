export function parsePrice(price: string | null | undefined): number {
  if (!price) return 0;
  const cleaned = price.replace(",", ".").replace(/[^0-9.-]/g, "");
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
}