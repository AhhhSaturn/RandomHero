import { AttachmentBuilder, EmbedBuilder } from "discord.js";

// https://workshop.codes/wiki/articles/hero-color-reference-table#TABLE
export const heroes = {
	support: [
		{ name: "Ana", file: "Ana.png", color: "#6e89b1" },
		{ name: "Baptiste", file: "Baptiste.png", color: "#55b2cc" },
		{ name: "Brigitte", file: "Brigitte.png", color: "#8b625e" },
		{ name: "Illari", file: "Illari.png", color: "#b7a88e" },
		{ name: "Juno", file: "Juno.png", color: "#721fa3" },
		{ name: "Kiriko", file: "Kiriko.png", color: "#d4878f" },
		{ name: "Lifeweaver", file: "Lifeweaver.png", color: "#e0b6c6" },
		{ name: "Lucio", file: "Lucio.png", color: "#84c951" },
		{ name: "Mercy", file: "Mercy.png", color: "#ece9bd" },
		{ name: "Moira", file: "Moira.png", color: "#9771e4" },
		{ name: "Zenyatta", file: "Zenyatta.png", color: "#ece580" },
		{ name: "Wuyang", file: "Wuyang.png", color: "#1d6eaf" },
	],
	tank: [
		{ name: "D.Va", file: "D.Va.png", color: "#ed93c7" },
		{ name: "Doomfist", file: "Doomfist.png", color: "#83534c" },
		{ name: "Hazard", file: "Hazard.png", color: "#ad8fcb" },
		{ name: "Junker Queen", file: "Queen.png", color: "#8eb5d7" },
		{ name: "Mauga", file: "Mauga.png", color: "#dc847d" },
		{ name: "Orisa", file: "Orisa.png", color: "#458b42" },
		{ name: "Ramattra", file: "Ramattra.png", color: "#9d8cd0" },
		{ name: "Reinhardt", file: "Reinhardt.png", color: "#94a1a5" },
		{ name: "Roadhog", file: "Roadhog.png", color: "#b38b50" },
		{ name: "Sigma", file: "Sigma.png", color: "#94a0a5" },
		{ name: "Winston", file: "Winston.png", color: "#a0a9ba" },
		{ name: "Wrecking Ball", file: "Ball.png", color: "#db9342" },
		{ name: "Zarya", file: "Zarya.png", color: "#e782b8" },
	],
	dps: [
		{ name: "Ashe", file: "Ashe.png", color: "#696968" },
		{ name: "Bastion", file: "Bastion.png", color: "#7c8f7a" },
		{ name: "Cassidy", file: "Cassidy.png", color: "#ad5a5f" },
		{ name: "Echo", file: "Echo.png", color: "#9acaf3" },
		{ name: "Freja", file: "Freja.png", color: "#367fdd" },
		{ name: "Genji", file: "Genji.png", color: "#95ef42" },
		{ name: "Hanzo", file: "Hanzo.png", color: "#b9b489" },
		{ name: "Junkrat", file: "Junkrat.png", color: "#ecbe52" },
		{ name: "Mei", file: "Mei.png", color: "#6dabeb" },
		{ name: "Pharah", file: "Pharah.png", color: "#3c7ecc" },
		{ name: "Reaper", file: "Reaper.png", color: "#7c3e52" },
		{ name: "Soljourn", file: "Soljourn.png", color: "#C61C41" },
		{ name: "Soldier: 76", file: "Soldier76.png", color: "#6d7995" },
		{ name: "Sombra", file: "Sombra.png", color: "#765dbd" },
		{ name: "Symmetra", file: "Symmetra.png", color: "#91bbd1" },
		{ name: "Torbjorn", file: "Torbjorn.png", color: "#bf736e" },
		{ name: "Tracer", file: "Tracer.png", color: "#d69141" },
		{ name: "Venture", file: "Venture.png", color: "#79614e" },
		{ name: "Widowmaker", file: "Widowmaker.png", color: "#9d69a6" },
	],
	all: [] as { name: string; file: string; color: string }[],
};
heroes.all.push(...heroes.dps, ...heroes.support, ...heroes.tank);

export const getRandomHero = (role: "support" | "dps" | "tank" | "all") => {
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
};
