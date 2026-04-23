import { AttachmentBuilder, EmbedBuilder } from "discord.js";

// https://workshop.codes/wiki/articles/hero-color-reference-table#TABLE
export const heroes = {
	support: [
		{ name: "Ana", file: "Ana.png", color: "#6e89b1", stadium: true },
		{
			name: "Baptiste",
			file: "Baptiste.png",
			color: "#55b2cc",
			stadium: false,
		},
		{ name: "Brigitte", file: "Brigitte.png", color: "#8b625e", stadium: true },
		{ name: "Illari", file: "Illari.png", color: "#b7a88e", stadium: false },
		{ name: "Jetpack Cat", file: "Jpc.png", color: "#aab3c0", stadium: false },
		{ name: "Juno", file: "Juno.png", color: "#721fa3", stadium: true },
		{ name: "Kiriko", file: "Kiriko.png", color: "#d4878f", stadium: true },
		{
			name: "Lifeweaver",
			file: "Lifeweaver.png",
			color: "#e0b6c6",
			stadium: false,
		},
		{ name: "Lucio", file: "Lucio.png", color: "#84c951", stadium: true },
		{ name: "Mercy", file: "Mercy.png", color: "#ece9bd", stadium: true },
		{ name: "Mizuki", file: "Mizuki.png", color: "#9affc7", stadium: false },
		{ name: "Moira", file: "Moira.png", color: "#9771e4", stadium: true },
		{ name: "Zenyatta", file: "Zenyatta.png", color: "#ece580", stadium: true },
		{ name: "Wuyang", file: "Wuyang.png", color: "#436fd2", stadium: true },
	],
	tank: [
		{ name: "D.Va", file: "D.Va.png", color: "#ed93c7", stadium: true },
		{ name: "Domina", file: "Domina.png", color: "#69deef", stadium: false },
		{ name: "Doomfist", file: "Doomfist.png", color: "#83534c", stadium: true },
		{ name: "Hazard", file: "Hazard.png", color: "#ad8fcb", stadium: true },
		{
			name: "Junker Queen",
			file: "Queen.png",
			color: "#8eb5d7",
			stadium: true,
		},
		{ name: "Mauga", file: "Mauga.png", color: "#dc847d", stadium: false },
		{ name: "Orisa", file: "Orisa.png", color: "#458b42", stadium: true },
		{ name: "Ramattra", file: "Ramattra.png", color: "#9d8cd0", stadium: true },
		{
			name: "Reinhardt",
			file: "Reinhardt.png",
			color: "#94a1a5",
			stadium: true,
		},
		{ name: "Roadhog", file: "Roadhog.png", color: "#b38b50", stadium: false },
		{ name: "Sigma", file: "Sigma.png", color: "#94a0a5", stadium: true },
		{ name: "Winston", file: "Winston.png", color: "#a0a9ba", stadium: true },
		{
			name: "Wrecking Ball",
			file: "Ball.png",
			color: "#db9342",
			stadium: false,
		},
		{ name: "Zarya", file: "Zarya.png", color: "#e782b8", stadium: true },
	],
	dps: [
		{ name: "Anran", file: "Anran.png", color: "#e81a05", stadium: false },
		{ name: "Ashe", file: "Ashe.png", color: "#696968", stadium: true },
		{ name: "Bastion", file: "Bastion.png", color: "#7c8f7a", stadium: false },
		{ name: "Cassidy", file: "Cassidy.png", color: "#ad5a5f", stadium: true },
		{ name: "Echo", file: "Echo.png", color: "#9acaf3", stadium: false },
		{ name: "Emre", file: "Emre.png", color: "#c70c0c", stadium: false },
		{ name: "Freja", file: "Freja.png", color: "#367fdd", stadium: true },
		{ name: "Genji", file: "Genji.png", color: "#95ef42", stadium: true },
		{ name: "Hanzo", file: "Hanzo.png", color: "#b9b489", stadium: false },
		{ name: "Junkrat", file: "Junkrat.png", color: "#ecbe52", stadium: true },
		{ name: "Mei", file: "Mei.png", color: "#6dabeb", stadium: true },
		{ name: "Pharah", file: "Pharah.png", color: "#3c7ecc", stadium: true },
		{ name: "Reaper", file: "Reaper.png", color: "#7c3e52", stadium: true },
		{ name: "Soljourn", file: "Soljourn.png", color: "#C61C41", stadium: true },
		{
			name: "Soldier: 76",
			file: "Soldier76.png",
			color: "#6d7995",
			stadium: true,
		},
		{ name: "Sombra", file: "Sombra.png", color: "#765dbd", stadium: false },
		{
			name: "Symmetra",
			file: "Symmetra.png",
			color: "#91bbd1",
			stadium: false,
		},
		{ name: "Torbjorn", file: "Torbjorn.png", color: "#bf736e", stadium: true },
		{ name: "Tracer", file: "Tracer.png", color: "#d69141", stadium: true },
		{ name: "Vendetta", file: "Vendetta.png", color: "#83191e", stadium: true },
		{ name: "Venture", file: "Venture.png", color: "#79614e", stadium: false },
		{
			name: "Widowmaker",
			file: "Widowmaker.png",
			color: "#9d69a6",
			stadium: false,
		},
	],
	all: [] as { name: string; file: string; color: string; stadium: boolean }[],
	stadium: {
		dps: [] as {
			name: string;
			file: string;
			color: string;
			stadium: boolean;
		}[],
		support: [] as {
			name: string;
			file: string;
			color: string;
			stadium: boolean;
		}[],
		tank: [] as {
			name: string;
			file: string;
			color: string;
			stadium: boolean;
		}[],
	},
};
heroes.all.push(...heroes.dps, ...heroes.support, ...heroes.tank);
heroes.stadium.tank.push(
	...heroes.tank.filter((hero) => hero.stadium === true),
);
heroes.stadium.dps.push(...heroes.dps.filter((hero) => hero.stadium === true));
heroes.stadium.support.push(
	...heroes.support.filter((hero) => hero.stadium === true),
);

export const getRandomHero = (
	role: "support" | "dps" | "tank" | "all",
	stadium: boolean,
) => {
	if (stadium) {
		if (role === "all") return false;

		const index = Math.floor(Math.random() * heroes.stadium[role].length);

		const hero = heroes.stadium[role].at(index);
		if (!hero) throw new Error("hero index failed");

		const file = new AttachmentBuilder(`assets/${hero.file}`);
		const embed = new EmbedBuilder()
			.setTitle(hero.name)
			.setColor(hero.color)
			.setDescription(`Random ${role} Hero`)
			.setImage(`attachment://${hero.file}`);
		return { embed, file, role };
	} else {
		const index = Math.floor(Math.random() * heroes[role].length);

		const hero = heroes[role].at(index);
		if (!hero) throw new Error("hero index failed");

		const file = new AttachmentBuilder(`assets/${hero.file}`);
		const embed = new EmbedBuilder()
			.setTitle(hero.name)
			.setColor(hero.color)
			.setDescription(role === "all" ? "Random Hero" : `Random ${role} Hero`)
			.setImage(`attachment://${hero.file}`);
		return { embed, file, role };
	}
};
