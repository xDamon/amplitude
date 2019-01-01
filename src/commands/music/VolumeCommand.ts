import { Command, GuildOnly, middleware, args, r } from "@discord-yuh/standard";
import { Message, GuildMember, StreamDispatcher } from "discord.js";
import { MusicClient } from "@Client/MusicClient";
import { musicOnly } from "@Middleware/musicOnly";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

@GuildOnly
export class VolumeCommand extends Command {
	public static readonly MAX_VOLUME: number = 38;
	public static readonly MIN_VOLUME: number = 0;
	public static readonly FACTOR: number = 25;

	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Changes the volume, minimum is 0, maximum is 38.";
		this.usage = "[prefix][name] [volume]";
	}

	@middleware(musicOnly)
	@middleware(args(r.or(r.integer, r.oneOf("up", "down"))))
	public async execute(message: Message, [input]: [number | string]): Promise<void> {
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(message.guild.id);
		const oldVolume: number = player.volume > 0 ? this._toUserVolume(player.volume) : 0;

		let volume: number = oldVolume;

		if (typeof input === "string") {
			switch (input) {
				case "up": volume++; break;
				case "down": volume--; break;
			}
		} else {
			volume = input;
		}

		if (volume >= VolumeCommand.MAX_VOLUME) {
			volume = VolumeCommand.MAX_VOLUME;
		} else if (volume <= VolumeCommand.MIN_VOLUME) {
			volume = VolumeCommand.MIN_VOLUME;
		}

		const nextVolume: number = volume > 0 ? this._toLavaVolume(volume) : 0;

		if (nextVolume === player.volume) {
			await message.channel.send("We're already at that volume mate.");
		} else {
			await message.channel.send(`Changing volume from ${oldVolume} to ${volume}.`);
			await player.setVolume(nextVolume);
		}
	}

	private _toLavaVolume(volume: number): number {
		return ((volume - 1) * VolumeCommand.FACTOR) + LavaPlayer.DEFAULT_VOLUME;
	}

	private _toUserVolume(volume: number): number {
		return ((volume - LavaPlayer.DEFAULT_VOLUME)  / VolumeCommand.FACTOR) + 1;
	}
}
