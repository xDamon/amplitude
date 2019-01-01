import { Command, middleware } from "@discord-yuh/standard";
import { Message } from "discord.js";
import { Track } from "lavalink";
import { musicOnly } from "@Middleware/musicOnly";
import { MusicClient } from "@Client/MusicClient";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

export class ShuffleCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Shuffles all songs in the queue.";
		this.usage = "[prefix][name]";
	}

	@middleware(musicOnly)
	public async execute(message: Message): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);
		const queue: Track[] = player.queue;

		if (queue.length > 0) {
			let temp: Track;

			for (let i = queue.length - 1; i > 0; i--) {
					const j: number = Math.floor(Math.random() * (i + 1));

					temp = queue[i];
					queue[i] = queue[j];
					queue[j] = temp;
			}
		}

		await message.channel.send("The queue has been shuffled.");
		await player.play(queue[0]);
	}
}
