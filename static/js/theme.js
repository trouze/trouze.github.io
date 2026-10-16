const r = document.documentElement;
const btn = document.getElementById("theme-toggle");
if (btn) {
	btn.addEventListener("click", () => {
		const next = r.dataset.theme === "dark" ? "light" : "dark";
		r.dataset.theme = next;
		try { localStorage.setItem("theme", next); } catch {}
		document.dispatchEvent(new CustomEvent("theme-change", { detail: { theme: next } }));
	});
}
