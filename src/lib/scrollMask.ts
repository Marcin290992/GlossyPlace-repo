import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Variant = "iris" | "wipe" | "curtain" | "slats" | "grid" | "type";

type ScrollMaskOptions = {
	variant: Variant;
	src: string;
	alt: string;
	word: string;
	scrollLength: number;
	settle: number;
	smooth: number;
	feather: number;
	stagger: number;
	columns: number;
	originX: number;
	originY: number;
	angle: number;
	zoom: number;
	fit: "cover" | "contain";
	overlay: number;
	background: string;
	revealContent: boolean;
	calm: boolean;
};

type Sheet = { image: string; size: string; position: string };

type Piece = {
	left: number;
	top: number;
	width: number;
	height: number;
	delay: number;
	lift: number;
};

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const glide = (t: number) => t * t * (3 - 2 * t);
const ramp = (p: number, from: number, to: number) => clamp((p - from) / Math.max(1e-6, to - from), 0, 1);
const phase = (p: number, delay: number, spread: number) => {
	const s = clamp(spread, 0, 0.92);
	return glide(clamp((p - delay * s) / Math.max(1e-6, 1 - s), 0, 1));
};

const escapeText = (raw: string) =>
	raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const VOID: Sheet = {
	image: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))",
	size: "100% 100%",
	position: "0% 0%",
};

const gather = (rows: [string, string, string][]): Sheet => ({
	image: rows.map((r) => r[0]).join(", "),
	size: rows.map((r) => r[1]).join(", "),
	position: rows.map((r) => r[2]).join(", "),
});

const solid = (a: number): [string, string, string] => [
	`linear-gradient(rgba(0,0,0,${a.toFixed(3)}), rgba(0,0,0,${a.toFixed(3)}))`,
	"100% 100%",
	"0% 0%",
];

const STOPS = 14;
const ease5 = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

const falloff = (p: number, f: number) => {
	const soft = Math.max(0.8, f);
	const edge = -soft + p * (100 + 2 * soft);
	const opaque = edge - soft;
	if (edge <= 0) return null;
	const span = edge - opaque;
	const head = clamp(-opaque / span, 0, 1);
	const stops: string[] = [];
	for (let i = 0; i <= STOPS; i += 1) {
		const t = head + (1 - head) * (i / STOPS);
		stops.push(`rgba(0,0,0,${(1 - ease5(t)).toFixed(4)}) ${(opaque + span * t).toFixed(2)}%`);
	}
	return stops.join(", ");
};

const irisSheet = (p: number, f: number, ox: number, oy: number): Sheet => {
	const stops = falloff(p, f);
	if (!stops) return VOID;
	return gather([[`radial-gradient(circle at ${ox}% ${oy}%, ${stops})`, "100% 100%", "0% 0%"]]);
};

const wipeSheet = (p: number, f: number, angle: number): Sheet => {
	const stops = falloff(p, f);
	if (!stops) return VOID;
	return gather([[`linear-gradient(${angle}deg, ${stops})`, "100% 100%", "0% 0%"]]);
};

const curtainSheet = (p: number, f: number): Sheet => {
	const stops = falloff(p, f);
	if (!stops) return VOID;
	return gather([
		[`linear-gradient(to left, ${stops})`, "50.3% 100%", "0% 0%"],
		[`linear-gradient(to right, ${stops})`, "50.3% 100%", "100% 0%"],
	]);
};

const TYPE_CAP_START = 0.54;

const typeCap = (p: number) => ramp(p, TYPE_CAP_START, 1);

const typeSheet = (p: number, stamp: string): Sheet => {
	const rows: [string, string, string][] = [[stamp, "contain", "50% 50%"]];
	const cap = typeCap(p);
	if (cap > 0) rows.push(solid(cap));
	return gather(rows);
};

function buildStamp(word: string): string {
	const label = (word || "SCROLL").trim() || "SCROLL";
	const em = 200;
	const wide = Math.max(260, label.length * em * 0.6 + em * 0.24);
	const high = em * 1.34;
	const svg =
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wide.toFixed(0)} ${high.toFixed(0)}">` +
		`<text x="${(wide / 2).toFixed(0)}" y="${(high * 0.74).toFixed(0)}" text-anchor="middle" ` +
		`font-family="Cormorant Garamond,Georgia,serif" ` +
		`font-size="${em}" font-weight="600" letter-spacing="${(-em * 0.01).toFixed(1)}" fill="#000">` +
		`${escapeText(label)}</text></svg>`;
	return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const DEFAULTS: ScrollMaskOptions = {
	variant: "iris",
	src: "",
	alt: "",
	word: "SCROLL",
	scrollLength: 1.7,
	settle: 0.84,
	smooth: 0.4,
	feather: 14,
	stagger: 0.55,
	columns: 9,
	originX: 50,
	originY: 50,
	angle: 108,
	zoom: 1.14,
	fit: "cover",
	overlay: 0,
	background: "transparent",
	revealContent: true,
	calm: false,
};

export class ScrollMask {
	root: HTMLElement;
	opts: ScrollMaskOptions;
	tiled: boolean;
	box = { w: 0, h: 0 };
	nat = { w: 0, h: 0 };
	pieces: Piece[] = [];
	pieceEls: HTMLDivElement[] = [];
	stamp: string | null;

	stageEl!: HTMLDivElement;
	tilesEl?: HTMLDivElement;
	veilEl?: HTMLDivElement;
	imgEl?: HTMLImageElement;
	contentEl?: HTMLDivElement;

	trigger?: ScrollTrigger;
	watcher?: ResizeObserver;

	constructor(root: HTMLElement, options: Partial<ScrollMaskOptions>) {
		this.root = root;
		this.opts = Object.assign({}, DEFAULTS, options);
		this.tiled = this.opts.variant === "slats" || this.opts.variant === "grid";
		this.stamp = this.opts.variant === "type" ? buildStamp(this.opts.word) : null;

		this._build();
		this._bind();
	}

	private _build() {
		const o = this.opts;
		const originalChildren = Array.from(this.root.children);
		this.root.innerHTML = "";
		this.root.classList.add("scroll-mask");
		this.root.style.height = `${(1 + Math.max(0.25, o.scrollLength)) * 100}vh`;
		this.root.style.background = o.background;

		const pin = document.createElement("div");
		pin.className = "scroll-mask__pin";

		const stage = document.createElement("div");
		stage.className = "scroll-mask__stage";

		if (this.tiled) {
			const tiles = document.createElement("div");
			tiles.className = "scroll-mask__tiles";
			stage.appendChild(tiles);
			this.tilesEl = tiles;
		} else {
			const veil = document.createElement("div");
			veil.className = "scroll-mask__veil";
			veil.style.webkitMaskRepeat = "no-repeat";
			veil.style.maskRepeat = "no-repeat";
			veil.style.transformOrigin = "50% 50%";
			veil.style.willChange = "transform";
			veil.style.webkitMaskImage = VOID.image;
			veil.style.maskImage = VOID.image;

			const img = document.createElement("img");
			img.src = o.src;
			img.alt = o.alt;
			img.draggable = false;
			img.className = "scroll-mask__image";
			img.style.objectFit = o.fit;
			veil.appendChild(img);

			if (o.overlay > 0) {
				const scrim = document.createElement("div");
				scrim.className = "scroll-mask__scrim";
				scrim.style.background = `rgba(0,0,0,${clamp(o.overlay, 0, 1)})`;
				veil.appendChild(scrim);
			}

			stage.appendChild(veil);
			this.veilEl = veil;
			this.imgEl = img;
		}

		if (originalChildren.length) {
			const content = document.createElement("div");
			content.className = "scroll-mask__content";
			content.style.opacity = o.revealContent ? "0" : "1";
			originalChildren.forEach((c) => content.appendChild(c));
			stage.appendChild(content);
			this.contentEl = content;
		}

		pin.appendChild(stage);
		this.root.appendChild(pin);
		this.stageEl = stage;
	}

	private _computeFrame() {
		const { box, nat, opts } = this;
		if (!box.w || !box.h) return null;
		const iw = nat.w || box.w;
		const ih = nat.h || box.h;
		const k = opts.fit === "contain" ? Math.min(box.w / iw, box.h / ih) : Math.max(box.w / iw, box.h / ih);
		const cw = iw * k;
		const ch = ih * k;
		return {
			size: `${cw.toFixed(2)}px ${ch.toFixed(2)}px`,
			x: (box.w - cw) / 2,
			y: (box.h - ch) / 2,
		};
	}

	private _computePieces() {
		const { tiled, box, opts } = this;
		if (!tiled || !box.w || !box.h) {
			this.pieces = [];
			return;
		}
		const cols = clamp(Math.round(opts.columns), 2, 26);
		const rows = opts.variant === "slats" ? 1 : clamp(Math.round(cols * (box.h / box.w) * 0.92), 1, 18);
		const cw = box.w / cols;
		const ch = box.h / rows;
		const out: Piece[] = [];
		let far = 1e-6;
		for (let r = 0; r < rows; r += 1) {
			for (let c = 0; c < cols; c += 1) {
				const midX = ((c + 0.5) / cols) * 100;
				const midY = ((r + 0.5) / rows) * 100;
				const dx = (midX - opts.originX) / 100;
				const dy = opts.variant === "slats" ? 0 : (midY - opts.originY) / 100;
				const d = Math.hypot(dx, dy);
				if (d > far) far = d;
				out.push({
					left: c * cw,
					top: r * ch,
					width: cw + 1.6,
					height: ch + 1.6,
					delay: d,
					lift: c % 2 === 0 ? -1 : 1,
				});
			}
		}
		out.forEach((piece) => {
			piece.delay /= far;
		});
		this.pieces = out;
	}

	private _renderTiles() {
		if (!this.tiled || !this.tilesEl) return;
		this._computePieces();
		const frame = this._computeFrame();
		const o = this.opts;
		const a = clamp(o.overlay, 0, 1);
		const dim = a > 0 ? `linear-gradient(rgba(0,0,0,${a}), rgba(0,0,0,${a})), ` : "";

		this.tilesEl.innerHTML = "";
		this.pieceEls = this.pieces.map((piece) => {
			const div = document.createElement("div");
			div.className = "scroll-mask__tile";
			div.style.left = `${piece.left.toFixed(2)}px`;
			div.style.top = `${piece.top.toFixed(2)}px`;
			div.style.width = `${piece.width.toFixed(2)}px`;
			div.style.height = `${piece.height.toFixed(2)}px`;
			div.style.opacity = "0";
			if (o.src) {
				div.style.backgroundImage = `${dim}url("${o.src}")`;
				div.style.backgroundRepeat = dim ? "no-repeat, no-repeat" : "no-repeat";
				div.style.backgroundSize = `${dim ? "auto, " : ""}${frame ? frame.size : "cover"}`;
				div.style.backgroundPosition = `${dim ? "0 0, " : ""}${
					frame ? `${(frame.x - piece.left).toFixed(2)}px ${(frame.y - piece.top).toFixed(2)}px` : "center"
				}`;
			}
			this.tilesEl!.appendChild(div);
			return div;
		});
	}

	private _paint(raw: number) {
		const o = this.opts;
		const finish = clamp(o.settle, 0.35, 1);
		const soft = clamp(o.feather, 0, 45);
		const ox = clamp(o.originX, 0, 100);
		const oy = clamp(o.originY, 0, 100);
		const p = glide(clamp(raw / finish, 0, 1));
		let lens = 1;

		if (!this.tiled && this.veilEl) {
			let sheet: Sheet;
			if (o.variant === "wipe") sheet = wipeSheet(p, soft, o.angle);
			else if (o.variant === "curtain") sheet = curtainSheet(p, soft);
			else if (o.variant === "type") sheet = typeSheet(p, this.stamp as string);
			else sheet = irisSheet(p, soft, ox, oy);

			this.veilEl.style.setProperty("-webkit-mask-image", sheet.image);
			this.veilEl.style.setProperty("mask-image", sheet.image);
			this.veilEl.style.setProperty("-webkit-mask-size", sheet.size);
			this.veilEl.style.setProperty("mask-size", sheet.size);
			this.veilEl.style.setProperty("-webkit-mask-position", sheet.position);
			this.veilEl.style.setProperty("mask-position", sheet.position);

			if (o.variant === "type") {
				lens = 0.42 + p * 0.58;
				this.veilEl.style.transform = `scale(${lens.toFixed(4)})`;
			}
		}

		if (this.imgEl) {
			const s = (1 + (o.zoom - 1) * (1 - p)) / lens;
			this.imgEl.style.transform = `scale(${s.toFixed(4)})`;
		}

		if (this.tiled) {
			for (let i = 0; i < this.pieces.length; i += 1) {
				const node = this.pieceEls[i];
				if (!node) continue;
				const piece = this.pieces[i];
				const local = phase(p, piece.delay, o.stagger);
				if (o.variant === "slats") {
					const slide = (1 - local) * 62 * piece.lift;
					node.style.transform = `translate3d(0, ${slide.toFixed(2)}%, 0)`;
					node.style.opacity = clamp(local * 1.9, 0, 1).toFixed(3);
				} else {
					node.style.transform = `scale(${(0.9 + local * 0.1).toFixed(4)})`;
					node.style.opacity = local.toFixed(3);
				}
			}
		}

		if (this.contentEl) {
			let e = 1;
			if (o.revealContent) {
				// "type" reveals the word as a mask first — content must wait until the
				// letter shape has mostly dissolved into a solid reveal, or the two overlap.
				e = o.variant === "type" ? glide(ramp(typeCap(p), 0.35, 1)) : glide(ramp(p, 0.5, 0.94));
			}
			this.contentEl.style.opacity = e.toFixed(3);
			this.contentEl.style.transform = `translate3d(0, ${((1 - e) * 20).toFixed(2)}px, 0)`;
		}
	}

	private _gauge = () => {
		const rect = this.stageEl.getBoundingClientRect();
		if (Math.abs(this.box.w - rect.width) > 0.5 || Math.abs(this.box.h - rect.height) > 0.5) {
			this.box = { w: rect.width, h: rect.height };
			if (this.tiled) this._renderTiles();
		}
	};

	private _bind() {
		this._gauge();
		this._paint(0);

		this.trigger = ScrollTrigger.create({
			trigger: this.root,
			start: "top top",
			end: "bottom bottom",
			scrub: this.opts.calm ? true : Math.max(0.05, this.opts.smooth),
			onUpdate: (self) => this._paint(self.progress),
			onRefresh: (self) => {
				this._gauge();
				this._paint(self.progress);
			},
		});

		this.watcher = new ResizeObserver(() => {
			this._gauge();
			ScrollTrigger.refresh();
		});
		this.watcher.observe(this.stageEl);

		if (this.opts.src) {
			const probe = new Image();
			probe.onload = () => {
				this.nat = { w: probe.naturalWidth, h: probe.naturalHeight };
				if (this.tiled) this._renderTiles();
			};
			probe.src = this.opts.src;
		}
	}

	destroy() {
		this.trigger?.kill();
		this.watcher?.disconnect();
	}
}

function readOptionsFromDataset(el: HTMLElement): Partial<ScrollMaskOptions> {
	const ds = el.dataset;
	const num = (v: string | undefined) => (v !== undefined ? parseFloat(v) : undefined);
	const bool = (v: string | undefined) => (v === undefined ? undefined : v === "true");
	const opts = {
		variant: ds.variant as Variant | undefined,
		src: ds.src,
		alt: ds.alt,
		word: ds.word,
		scrollLength: num(ds.scrollLength),
		settle: num(ds.settle),
		smooth: num(ds.smooth),
		feather: num(ds.feather),
		stagger: num(ds.stagger),
		columns: num(ds.columns),
		originX: num(ds.originX),
		originY: num(ds.originY),
		angle: num(ds.angle),
		zoom: num(ds.zoom),
		fit: ds.fit as "cover" | "contain" | undefined,
		overlay: num(ds.overlay),
		background: ds.background,
		revealContent: bool(ds.revealContent),
		calm: bool(ds.calm),
	};
	const out: Partial<ScrollMaskOptions> = {};
	(Object.keys(opts) as (keyof typeof opts)[]).forEach((key) => {
		const value = opts[key];
		if (value !== undefined) (out as Record<string, unknown>)[key] = value;
	});
	return out;
}

export function initScrollMasks(root?: ParentNode) {
	const scope = root ?? document;
	const els = scope.querySelectorAll<HTMLElement>(".scroll-mask");
	els.forEach((el) => {
		if ((el as HTMLElement & { _scrollMaskInstance?: ScrollMask })._scrollMaskInstance) return;
		const instance = new ScrollMask(el, readOptionsFromDataset(el));
		(el as HTMLElement & { _scrollMaskInstance?: ScrollMask })._scrollMaskInstance = instance;
	});
}
