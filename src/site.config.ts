import type { SiteConfig } from "@/types";

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
