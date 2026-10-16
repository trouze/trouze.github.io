const sidebar = document.querySelector(".tag-sidebar");
const tagFilter = document.querySelector(".tag-filter");
const chips = Array.from(document.querySelectorAll(".tag-chip"));
const posts = Array.from(document.querySelectorAll(".timeline .post"));
const emptyState = document.querySelector(".tag-empty");
const clearBtn = document.querySelector(".tag-clear");
const visibleCountEl = document.querySelector("#visible-count");

if (tagFilter) {
	const desktopQuery = window.matchMedia("(min-width: 860px)");
	const syncOpenState = (matches) => {
		tagFilter.open = matches;
	};
	syncOpenState(desktopQuery.matches);
	desktopQuery.addEventListener("change", (e) => syncOpenState(e.matches));
}

if (sidebar && chips.length > 0) {
	const params = new URLSearchParams(location.search);
	const selected = new Set(
		(params.get("tags") ?? "")
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean),
	);

	const syncUrl = () => {
		const url = new URL(location.href);
		if (selected.size > 0) {
			url.searchParams.set("tags", Array.from(selected).join(","));
		} else {
			url.searchParams.delete("tags");
		}
		history.replaceState(null, "", url);
	};

	const applyFilter = () => {
		let visibleCount = 0;
		for (const post of posts) {
			const postTags = (post.dataset.tags ?? "").split(",").filter(Boolean);
			const matches = Array.from(selected).every((tag) => postTags.includes(tag));
			post.hidden = !matches;
			if (matches) visibleCount++;
		}
		for (const chip of chips) {
			chip.setAttribute("aria-pressed", selected.has(chip.dataset.tag ?? "") ? "true" : "false");
		}
		if (emptyState) emptyState.hidden = visibleCount !== 0;
		if (clearBtn) clearBtn.hidden = selected.size === 0;
		if (visibleCountEl) visibleCountEl.textContent = String(visibleCount);
	};

	for (const chip of chips) {
		chip.addEventListener("click", () => {
			const tag = chip.dataset.tag;
			if (!tag) return;
			if (selected.has(tag)) {
				selected.delete(tag);
			} else {
				selected.add(tag);
			}
			syncUrl();
			applyFilter();
		});
	}

	clearBtn?.addEventListener("click", () => {
		selected.clear();
		syncUrl();
		applyFilter();
	});

	applyFilter();
}
