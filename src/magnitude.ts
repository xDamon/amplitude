import { join } from "path";
import {
	CommandRegistry,
	MiddlewareRegistry,
	CommandLoader,
	PingCommand,
	EvalCommand,
	HelpCommand,
	channelsMetadata
} from "@discord-yuh/standard";
import { Config } from "@Definition/Config";
import { MusicClient } from "@Client/MusicClient";

let config: Config;

try {
	config = require("../config.json");
} catch {
	config = {
		production: true,
		discord: {
			token: process.env.DISCORD_TOKEN,
			prefix: process.env.DISCORD_PREFIX,
			owners: process.env.DISCORD_OWNERS.split(",")
		},
		lavalink: {
			user: process.env.LAVALINK_USER,
			password: process.env.LAVALINK_PASSWORD,
			hosts: {
				rest: process.env.LAVALINK_HOSTS_REST,
				ws: process.env.LAVALINK_HOSTS_WS
			}
		}
	};
}

const commandsDir: string = join(__dirname, "commands");

const commands: CommandRegistry = new CommandRegistry();
const middleware: MiddlewareRegistry = new MiddlewareRegistry();

commands
	.register(new PingCommand())
	.register(new EvalCommand())
	.register(new HelpCommand());

middleware
	.register(channelsMetadata);

const commandLoader: CommandLoader = new CommandLoader(commands);

const client: MusicClient = new MusicClient({
	production: config.production,
	prefix: config.discord.prefix,
	owners: config.discord.owners,
	commands: commands,
	middleware: middleware,
	lava: {
		userID: config.lavalink.user,
		password: config.lavalink.password,
		hosts: {
			rest: config.lavalink.hosts.rest,
			ws: config.lavalink.hosts.ws
		}
	},
	discordOptions: {
		messageCacheMaxSize: 1,
		messageCacheLifetime: 0,
		messageSweepInterval: 0,
		disableEveryone: true,
		disabledEvents: [
			"TYPING_START",
			"MESSAGE_REACTION_ADD",
			"MESSAGE_REACTION_REMOVE",
			"MESSAGE_REACTION_REMOVE_ALL"
		]
	}
});

process.on("unhandledRejection", (err: Error) => {
	console.error(`Unhandled Rejection: ${err}`);
});

commandLoader.loadDir(commandsDir)
	.then(() => client.login(config.discord.token));