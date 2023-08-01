export function price_format(
  price: number,
  off_percent: number
): { price: string; off_price: string } {
  const result = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(price);
  let off_price: string = "";
  if (off_percent) {
    off_price = new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(price - (price / 100) * off_percent);
  }
  return { price: result, off_price };
}

export function price_calculator(price: number, off_percent: number): number {
  let result = price;
  if (off_percent) result = price - (price / 100) * off_percent;
  return result;
}
