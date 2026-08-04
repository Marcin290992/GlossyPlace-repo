import { products, type Product } from "../data/products";

export const CART_STORAGE_KEY = "glossy-place-cart";
export const CART_EVENT = "cart:change";
export const CART_OPEN_EVENT = "cart:open";

type CartLine = { id: string; quantity: number };

function readCart(): CartLine[] {
	try {
		const raw = localStorage.getItem(CART_STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		if (!Array.isArray(parsed)) return [];
		return parsed
			.map((line) =>
				line && typeof line === "object" && typeof line.id === "string"
					? { id: line.id, quantity: Number(line.quantity) || 0 }
					: null,
			)
			.filter((line): line is CartLine => line !== null && line.quantity > 0);
	} catch {
		return [];
	}
}

function writeCart(lines: CartLine[]) {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
	window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function getCartLines(): CartLine[] {
	return readCart();
}

export function getCartCount(): number {
	return readCart().reduce((sum, line) => sum + line.quantity, 0);
}

export function addToCart(id: string, quantity = 1) {
	const lines = readCart();
	const existing = lines.find((line) => line.id === id);
	if (existing) {
		existing.quantity += quantity;
	} else {
		lines.push({ id, quantity });
	}
	writeCart(lines);
}

export function setQuantity(id: string, quantity: number) {
	const lines = readCart();

	if (quantity <= 0) {
		writeCart(lines.filter((line) => line.id !== id));
		return;
	}

	const existing = lines.find((line) => line.id === id);
	if (existing) {
		existing.quantity = quantity;
	} else {
		lines.push({ id, quantity });
	}
	writeCart(lines);
}

export function removeFromCart(id: string) {
	writeCart(readCart().filter((line) => line.id !== id));
}

export function getCartItems(): { product: Product; quantity: number }[] {
	return readCart()
		.map((line) => {
			const product = products.find((existing) => existing.id === line.id);
			return product ? { product, quantity: line.quantity } : null;
		})
		.filter((item): item is { product: Product; quantity: number } => item !== null);
}

export function getCartSubtotalPence(): number {
	return getCartItems().reduce((sum, item) => sum + item.product.priceInPence * item.quantity, 0);
}

export function openCartDrawer() {
	window.dispatchEvent(new CustomEvent(CART_OPEN_EVENT));
}
