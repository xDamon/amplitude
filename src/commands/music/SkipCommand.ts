import { Command, middleware, GuildOnly } from "@discord-yuh/standard";
import { Message } from "discord.js";
import { Track } from "lavalink";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { Markdown } from "@Util/Markdown";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

@GuildOnly
export class SkipCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Skips to the next track.";
		this.usage = "[prefix][name]";
	}

	@middleware(musicOnly)
	public async execute(message: Message): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);
		const queue: Track[] = player.queue;

		const track: Track = queue.shift();
		const next: Track = queue[0];

		if (next) {
			const tag: string = Markdown.bold(message.author.tag);
			const title: string = Markdown.bold(track.info.title);

			await player.play(next.track);
			await message.channel.send(`${tag} has skipped ${title}.`);
		} else {
			await player.stop();
			await message.channel.send("Looks like we're out of music.");
		}
	}
}
