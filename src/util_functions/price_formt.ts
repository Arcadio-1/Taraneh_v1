export function price_format(
  price: number,
  off_percent: number
): { price: string; off_price: string; off_percent: string } {
  const result = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(price);

  let off_price: string = result;

  if (off_percent) {
    off_price = new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(price_calculator(price, off_percent));
  }

  return { price: result, off_price, off_percent: `${off_percent}٪` };
}

export function price_calculator(price: number, off_percent: number): number {
  if (off_percent > 0) return price - (price / 100) * off_percent;
  return price;
}

export function numberSeperator(number: number): string {
  const result = new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(number);
  return result;
}

export const numberGenerator = (number: string): number => {
  return parseInt(number.replace(/,/g, ""));
};
