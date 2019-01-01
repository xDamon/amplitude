import { Command, GuildOnly, middleware, args, r } from "@discord-yuh/standard";
import { Message, GuildMember, StreamDispatcher } from "discord.js";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

@GuildOnly
export class VolumeCommand extends Command {
	public static readonly MAX_VOLUME: number = 1000;
	public static readonly MIN_VOLUME: number = 0;

	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Resumes the current song.";
		this.usage = "[prefix][name] [volume]";
	}

	@middleware(musicOnly)
	@middleware(args(r.or(r.integer, r.oneOf("up", "down"))))
	public async execute(message: Message, [input]: [number | string]): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);

		let volume = player.volume;

		if (typeof input === "string") {
			switch (input) {
				case "up": volume += 10; break;
				case "down": volume -= 10; break;
			}
		} else {
			volume = input;
		}

		if (volume > VolumeCommand.MAX_VOLUME) {
			volume = VolumeCommand.MAX_VOLUME;
		} else if (volume < VolumeCommand.MIN_VOLUME) {
			volume = VolumeCommand.MIN_VOLUME;
		}

		if (volume === player.volume) {
			await message.channel.send("We're already at that volume mate.");
		} else {
			await message.channel.send(`Changing volume from ${player.volume} to ${volume}`);
			await player.setVolume(volume);
		}
	}
}