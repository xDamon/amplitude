import { Command, middleware, GuildOnly } from "@discord-yuh/standard";
import { Message, GuildMember } from "discord.js";
import { Track } from "lavalink";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { Markdown } from "@Util/Markdown";
import { Time } from "@Util/Time";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

@GuildOnly
export class QueueCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Lists all songs in the queue.";
		this.usage = "[prefix][name]";
	}

	@middleware(musicOnly)
	public async execute(message: Message): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);
		const queue: Track[] = player.queue;

		let index: number = 0;
		let tooLong: boolean = false;
		let list: string = `${Markdown.underline(Markdown.bold("Current Queue"))}\n`;

		while (!tooLong && index < queue.length) {
			const num: number = index + 1;
			const title: string = queue[index].info.title;
			const time: string = Time.millisecondsToTimestamp(queue[index].info.length);

			const line: string = `${num}.  ${title}  (${time})\n`;

			tooLong = list.length + line.length >= 1000;

			if (tooLong) {
				list += `\n${queue.length - index} more songs...`;
			} else {
				list += line;
			}

			index++;
		}

		await message.channel.send(list);
	}
}