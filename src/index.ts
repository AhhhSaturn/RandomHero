import {
	type AttachmentBuilder,
	Client,
	type EmbedBuilder,
	GatewayIntentBits,
} from "discord.js";
import { getRandomHero } from "./heroes";

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

			const embeds: EmbedBuilder[] = [];
			const files: AttachmentBuilder[] = [];

			const mainHero = getRandomHero(role);
			embeds.push(mainHero?.embed);
			files.push(mainHero?.file);

			if (interaction.options.getBoolean("backup")) {
				const backupHero = getRandomHero(role);
				embeds.push(backupHero?.embed);
				files.push(backupHero?.file);
			}

			interaction.reply({ embeds, files });
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
