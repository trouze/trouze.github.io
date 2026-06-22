export interface ShowcaseItem {
	name: string;
	/** External URL (GitHub, live site, etc.). Used by the badge link when slug is set, or wraps the whole card otherwise. */
	href: string;
	stack: string;
	badge?: string;
	desc: string;
	/** If set, the card title links to /showcase/[slug]/ instead of href. */
	slug?: string;
}

export const showcase: ShowcaseItem[] = [
	{
		name: "Neural Networks in R",
		href: "https://github.com/trouze/neural-network-r",
		stack: "R · Machine Learning",
		badge: "OSS",
		desc: "Classifying handwritten digits from the MNIST dataset using a neural network implemented from scratch in R.",
		slug: "neural-network-r",
	},
	{
		name: "Kidney Exchange Optimization",
		href: "https://github.com/trouze/kidney-donor-pairing",
		stack: "Julia · Optimization",
		badge: "OSS",
		desc: "An optimization model for kidney exchange programs, maximizing the number of compatible donor-recipient pairs.",
		slug: "kidney-exchange",
	},
];
