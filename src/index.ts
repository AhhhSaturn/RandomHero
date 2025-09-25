import {
	type AttachmentBuilder,
	type CacheType,
	type ChatInputCommandInteraction,
	Client,
	type EmbedBuilder,
	GatewayIntentBits,
} from "discord.js";
import { getDebuff } from "./debuff";
import { getRandomHero } from "./heroes";

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessagePolls,
		GatewayIntentBits.DirectMessageTyping,
	],
});

client.on("ready", async (client) => {
	console.log(`logged in as ${client.user.username}`);
});

const commandMap = new Map<
	string,
	(interaction: ChatInputCommandInteraction<CacheType>) => void
>();

commandMap.set("random", (interaction) => {
	const role: "all" | "support" | "tank" | "dps" =
		interaction.options.getString("role") || "all";

	const embeds: EmbedBuilder[] = [];
	const files: AttachmentBuilder[] = [];

	const mainHero = getRandomHero(role);
	embeds.push(mainHero?.embed);
	files.push(mainHero?.file);

	if (interaction.options.getBoolean("backup")) {
		const backupHero = getRandomHero(mainHero.role);
		embeds.push(backupHero?.embed);
		files.push(backupHero?.file);
	}

	interaction.reply({ embeds, files });
});

commandMap.set("debuff", async (interaction) => {
	interaction.reply("Remember you asked for this...");
	const debuff = getDebuff();
	await Bun.sleep(2500);
	interaction.editReply(`***${debuff} >:]***`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = commandMap.get(interaction.commandName);
	if (!command) {
		interaction.reply({
			content: "Command not configured",
			flags: "Ephemeral",
		});
		return;
	}
	command(interaction);
});

client.login(Bun.env.DISCORD_TOKEN);
