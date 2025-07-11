import {
	InteractionContextType,
	REST,
	type RESTPostAPIApplicationCommandsJSONBody,
	Routes,
	SlashCommandBuilder,
} from "discord.js";

const rest = new REST({ version: "9" }).setToken(Bun.env.DISCORD_TOKEN);

const commands = [
	new SlashCommandBuilder()
		.setName("random")
		.setDescription("Pick a random hero")
		.setContexts(
			InteractionContextType.PrivateChannel,
			InteractionContextType.BotDM,
			InteractionContextType.Guild,
		)
		.addStringOption((option) =>
			option
				.setName("role")
				.setDescription("role you want to play")
				.addChoices(
					{ name: "Tank", value: "tank" },
					{ name: "Dps", value: "dps" },
					{ name: "Support", value: "support" },
				),
		),
];
const commandJson: RESTPostAPIApplicationCommandsJSONBody[] = [];
for (const command of commands) {
	commandJson.push(command.toJSON());
}

rest
	.put(Routes.applicationCommands(Bun.env.CLIENT_ID), {
		body: commandJson,
	})
	.then(console.log)
	.catch(console.warn);
