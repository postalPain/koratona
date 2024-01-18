export function formatPrice(price: number | bigint): string {
  if (typeof price !== 'number' && typeof price !== 'bigint') {
    // Handle invalid input, return a default value, or throw an error
    return 'Invalid Price';
  }

  // Convert to number if bigint to ensure compatibility with Intl.NumberFormat
  const formattedPrice = new Intl.NumberFormat("en-EN", { style: "currency", currency: "SAR" }).format(Number(price));

  return formattedPrice;
}
