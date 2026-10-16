// Shared interactive behaviors from BlogPost.astro + ShareButtons.astro.
const scrollBtn = document.getElementById("to-top-btn");
const heroEl = document.getElementById("blog-hero");
if (scrollBtn && heroEl) {
	new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			scrollBtn.dataset.show = (!entry.isIntersecting).toString();
		});
	}).observe(heroEl);
	scrollBtn.addEventListener("click", () =>
		document.documentElement.scrollTo({ behavior: "smooth", top: 0 }),
	);
}

const progressBar = document.getElementById("reading-progress");
if (progressBar) {
	const update = () => {
		const h = document.documentElement;
		const max = h.scrollHeight - h.clientHeight;
		const pct = max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0;
		progressBar.style.width = pct + "%";
	};
	update();
	window.addEventListener("scroll", update, { passive: true });
	window.addEventListener("resize", update, { passive: true });
}

const lazyImgs = document.querySelectorAll('.post-article img[loading="lazy"]');
if (lazyImgs.length && "IntersectionObserver" in window) {
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.dataset.in = "1";
					io.unobserve(e.target);
				}
			});
		},
		{ rootMargin: "120px 0px" },
	);
	lazyImgs.forEach((img) => io.observe(img));
}

document.querySelectorAll("[data-share-copy]").forEach((btn) => {
	const label = btn.querySelector(".share-copy-label");
	const original = label?.textContent ?? "Copy link";
	const originalAria = btn.getAttribute("aria-label") ?? "Copy link";

	btn.addEventListener("click", async () => {
		const url = btn.dataset.url ?? window.location.href;
		try {
			await navigator.clipboard.writeText(url);
		} catch {}
		btn.dataset.copied = "true";
		btn.setAttribute("aria-label", "Copied");
		if (label) label.textContent = "Copied!";
		setTimeout(() => {
			delete btn.dataset.copied;
			btn.setAttribute("aria-label", originalAria);
			if (label) label.textContent = original;
		}, 1500);
	});
});

const articleEl = document.querySelector(".post-article");
const postCodeStyle = articleEl?.dataset.codeStyle ?? "default";

document.querySelectorAll(".post-article pre").forEach((pre) => {
	const metaParts = (pre.dataset.meta ?? "").split(/\s+/);
	const isMac = postCodeStyle === "mac" || metaParts.includes("mac");
	const isTerminal = postCodeStyle === "terminal" || metaParts.includes("terminal");

	const wrapper = document.createElement("div");
	wrapper.className =
		"code-wrapper" + (isMac ? " mac-window" : isTerminal ? " terminal" : "");
	pre.parentNode?.insertBefore(wrapper, pre);
	wrapper.appendChild(pre);

	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = "copy-code-btn";
	btn.setAttribute("aria-label", "Copy code");
	btn.textContent = "copy";
	btn.addEventListener("click", async () => {
		const text = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
		try {
			await navigator.clipboard.writeText(text);
			btn.textContent = "copied";
			btn.dataset.copied = "true";
			setTimeout(() => {
				btn.textContent = "copy";
				delete btn.dataset.copied;
			}, 1500);
		} catch {}
	});

	if (isMac) {
		const bar = document.createElement("div");
		bar.className = "mac-bar";
		for (let i = 0; i < 3; i++) {
			const dot = document.createElement("span");
			dot.className = "mac-dot";
			bar.appendChild(dot);
		}
		bar.appendChild(btn);
		wrapper.insertBefore(bar, pre);
	} else if (isTerminal) {
		const bar = document.createElement("div");
		bar.className = "terminal-bar";

		const dotsEl = document.createElement("div");
		dotsEl.className = "terminal-dots";
		for (let i = 0; i < 3; i++) {
			const dot = document.createElement("span");
			dot.className = "mac-dot";
			dotsEl.appendChild(dot);
		}
		bar.appendChild(dotsEl);
		wrapper.insertBefore(bar, pre);
		wrapper.appendChild(btn);
	} else {
		wrapper.appendChild(btn);
	}
});

const slugify = (s) =>
	s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const usedIds = new Set();
document
	.querySelectorAll(".post-article h2, .post-article h3")
	.forEach((h) => {
		const baseId = h.id || slugify(h.textContent ?? "");
		if (!baseId) return;
		let id = baseId;
		for (let n = 2; usedIds.has(id); n++) id = `${baseId}-${n}`;
		usedIds.add(id);
		if (!h.id) h.id = id;

		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "heading-anchor";
		btn.setAttribute("aria-label", `Copy link to ${h.textContent ?? "section"}`);
		btn.textContent = "#";
		btn.addEventListener("click", async () => {
			const url = `${location.origin}${location.pathname}#${id}`;
			try {
				await navigator.clipboard.writeText(url);
				btn.textContent = "✓";
				setTimeout(() => (btn.textContent = "#"), 1200);
			} catch {}
		});
		h.prepend(btn);
	});

const tocNav = document.querySelector(".toc");
if (tocNav) {
	const tocItems = [];
	tocNav.querySelectorAll("[data-toc-link]").forEach((link) => {
		const heading = document.getElementById(link.dataset.tocLink ?? "");
		if (heading) tocItems.push({ link, heading });
	});

	if (tocItems.length > 0) {
		const SPY_OFFSET = 96;
		let currentItem = -1;

		const syncToc = () => {
			let active = 0;
			tocItems.forEach((item, i) => {
				if (item.heading.getBoundingClientRect().top <= SPY_OFFSET) active = i;
			});
			// Fully scrolled to the bottom: the last section wins.
			const doc = document.documentElement;
			if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
				active = tocItems.length - 1;
			}
			if (active === currentItem) return;
			currentItem = active;

			tocItems.forEach((item, i) => {
				if (i === active) {
					item.link.setAttribute("aria-current", "location");
					// Keep the active link visible when the list itself scrolls.
					if (tocNav.scrollHeight > tocNav.clientHeight) {
						item.link.scrollIntoView({ block: "nearest" });
					}
				} else {
					item.link.removeAttribute("aria-current");
				}
			});
		};

		let tocTicking = false;
		const onTocScroll = () => {
			if (tocTicking) return;
			tocTicking = true;
			requestAnimationFrame(() => {
				tocTicking = false;
				syncToc();
			});
		};

		syncToc();
		window.addEventListener("scroll", onTocScroll, { passive: true });
		window.addEventListener("resize", onTocScroll, { passive: true });
	}
}

// Giscus comments — config comes from data attributes on the #comments mount.
const mount = document.getElementById("comments");
if (mount && mount.dataset.repo) {
	const isLocalhost = ["localhost", "127.0.0.1"].includes(location.hostname);
	const themes = isLocalhost
		? { light: "noborder_light", dark: "noborder_dark" }
		: { light: mount.dataset.themeLight, dark: mount.dataset.themeDark };

	const theme = document.documentElement.getAttribute("data-theme");
	const script = document.createElement("script");
	script.src = "https://giscus.app/client.js";
	script.setAttribute("data-repo", mount.dataset.repo);
	script.setAttribute("data-repo-id", mount.dataset.repoId);
	script.setAttribute("data-category", mount.dataset.category);
	script.setAttribute("data-category-id", mount.dataset.categoryId);
	script.setAttribute("data-mapping", "title");
	script.setAttribute("data-strict", "0");
	script.setAttribute("data-reactions-enabled", "1");
	script.setAttribute("data-emit-metadata", "0");
	script.setAttribute("data-input-position", "top");
	script.setAttribute("data-theme", theme === "dark" ? themes.dark : themes.light);
	script.setAttribute("data-lang", "en");
	script.setAttribute("crossorigin", "anonymous");
	script.async = true;
	mount.appendChild(script);

	document.addEventListener("theme-change", (e) => {
		const iframe = document.querySelector("iframe.giscus-frame");
		if (iframe && iframe.contentWindow) {
			iframe.contentWindow.postMessage(
				{ giscus: { setConfig: { theme: e.detail.theme === "dark" ? themes.dark : themes.light } } },
				"https://giscus.app",
			);
		}
	});
}
