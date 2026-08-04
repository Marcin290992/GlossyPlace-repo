import { products, type Product } from "../data/products";

export const CART_STORAGE_KEY = "glossy-place-cart";
export const CART_EVENT = "cart:change";
export const CART_OPEN_EVENT = "cart:open";

function readCart(): string[] {
	try {
		const raw = localStorage.getItem(CART_STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
	} catch {
		return [];
	}
}

function writeCart(ids: string[]) {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids));
	window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function getCartIds(): string[] {
	return readCart();
}

export function addToCart(id: string) {
	const ids = readCart();
	if (!ids.includes(id)) {
		writeCart([...ids, id]);
	}
}

export function removeFromCart(id: string) {
	writeCart(readCart().filter((existing) => existing !== id));
}

export function getCartItems(): Product[] {
	const ids = readCart();
	return ids
		.map((id) => products.find((product) => product.id === id))
		.filter((product): product is Product => Boolean(product));
}

export function getCartSubtotalPence(): number {
	return getCartItems().reduce((sum, product) => sum + product.priceInPence, 0);
}

export function openCartDrawer() {
	window.dispatchEvent(new CustomEvent(CART_OPEN_EVENT));
}
