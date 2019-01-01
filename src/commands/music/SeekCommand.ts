import { Command, middleware, args, GuildOnly } from "@discord-yuh/standard";
import { Message } from "discord.js";
import { Track } from "lavalink";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { resolveTime } from "@Resolvers/resolveTime";
import { Time } from "@Util/Time";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

@GuildOnly
export class SeekCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Skips to a specified time in a track.";
		this.usage = "[prefix][name] [timestamp]";
	}

	@middleware(musicOnly)
	@middleware(args(resolveTime))
	public async execute(message: Message, [time]: [number]): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);
		const track: Track = player.queue[0];

		await player.seek(time);

		if (time < track.info.length) {
			const timestamp: string = Time.millisecondsToTimestamp(time);

			await message.channel.send(`Moved to ${timestamp}`);
		} else {
			await message.channel.send("That time is longer than the song! I guess we're skipping it.");
		}
	}
}
