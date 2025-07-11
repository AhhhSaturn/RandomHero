import {
	AttachmentBuilder,
	Client,
	EmbedBuilder,
	GatewayIntentBits,
} from "discord.js";
import { heroes } from "./heroes";
import Elysia from "elysia";
import staticPlugin from "@elysiajs/static";

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessagePolls,
		GatewayIntentBits.DirectMessageTyping,
	],
});

client.on("ready", (client) => {
	console.log(`logged in as ${client.user.username}`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;
	switch (interaction.commandName) {
		case "random": {
			const role: "all" | "support" | "tank" | "dps" =
				interaction.options.getString("role") || "all";

			const index = Math.floor(Math.random() * heroes[role].length);
			const hero = heroes[role].at(index) as string;

			const file = new AttachmentBuilder(`assets/${hero}.png`);
			const embed = new EmbedBuilder()
				.setTitle(hero)
				.setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
				.setDescription(role === "all" ? "Random Hero" : `Random ${role} Hero`)
				.setImage(`attachment://${hero}.png`);

			interaction.reply({ embeds: [embed], files: [file] });
			break;
		}
		default: {
			interaction.reply({
				content: "Command not configured",
				flags: "Ephemeral",
			});
		}
	}
});

client.login(Bun.env.DISCORD_TOKEN);
