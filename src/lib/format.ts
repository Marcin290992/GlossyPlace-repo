const priceFormatter = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

export function formatPrice(priceInPence: number): string {
	return priceFormatter.format(priceInPence / 100);
}
