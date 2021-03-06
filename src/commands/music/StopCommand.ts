import { Command, middleware, GuildOnly } from "@discord-yuh/standard";
import { Message } from "discord.js";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { Markdown } from "@Util/Markdown";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

@GuildOnly
export class StopCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Stops playback and deletes the queue.";
		this.usage = "[prefix][name]";
	}

	@middleware(musicOnly)
	public async execute(message: Message): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);

		const tag: string = Markdown.bold(message.author.tag);

		await player.stop();
		await message.channel.send(`Playback stopped manually by ${tag}.`);
	}
}
