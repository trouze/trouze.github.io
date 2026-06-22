import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	author: "Tyler Rouze",
	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	description:
		"Hi, I'm Tyler — Senior Resident Architect at dbt Labs. This is where I write, think, and share on data engineering, the modern data stack, and lifelong learning.",
	lang: "en-US",
	ogLocale: "en_US",
	sortPostsByUpdatedDate: false,
	title: "Tyler Rouze",
	hideThemeCredit: false,
	profile: {
		name: "Tyler Rouze",
		email: "tyler@tylerrouze.com",
		github: "https://github.com/trouze",
		linkedin: "https://www.linkedin.com/in/tylerrouze",
		strava: "https://www.strava.com/athletes/116840931",
		spotify: "https://open.spotify.com/user/tyrouze10?si=183b7fda195e4e09",
		youtube: "https://www.youtube.com/@tylerrouze",
		vsco: "https://vsco.co/tylerrouze",
		jobTitle: "Senior Resident Architect",
		employer: "dbt Labs",
		employerUrl: "https://www.getdbt.com",
		alumni: "University of Minnesota",
		avatar: "/images/dbt_nyc.jpg",
	},
	comments: {
		repo: "trouze/trouze.github.io",
		repoId: "MDEwOlJlcG9zaXRvcnkyMDM4NTU5ODU=",
		category: "Blog Comments",
		categoryId: "DIC_kwDODCaYcc4CTODa",
	},
};

export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/posts/",
		title: "Posts",
	},
	{
		path: "/now/",
		title: "now",
	},
	{
		path: "/subscribe/",
		title: "Subscribe",
	},
];

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1a1715"),
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			editorActiveTabBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1a1715"),
			editorTabBarBackground: ({ theme }) => (theme.type === "light" ? "#ebe3cd" : "#15120e"),
			frameBoxShadowCssValue: "none",
			terminalBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1a1715"),
			terminalTitlebarBackground: ({ theme }) => (theme.type === "light" ? "#ebe3cd" : "#15120e"),
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["min-dark", "min-light"],
	useThemedScrollbars: false,
};
