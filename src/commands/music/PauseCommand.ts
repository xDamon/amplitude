import { Command, middleware, GuildOnly } from "@discord-yuh/standard";
import { Message } from "discord.js";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { Player, Status } from "lavalink";

@GuildOnly
export class PauseCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Pauses the current track.";
		this.usage = "[prefix][name]";
	}

	@middleware(musicOnly)
	public async execute(message: Message): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: Player = client.lava.players.get(message.guild.id);

		if (player.status === Status.PLAYING) {
			await player.pause(true);
		}
	}
}
