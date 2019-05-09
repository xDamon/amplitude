import { Player, Track } from "lavalink";
import { LavaNode } from "@Lava/LavaNode";

export class LavaPlayer extends Player {
	public static readonly MIN_VOLUME: number = 0;
	public static readonly MAX_VOLUME: number = 1000;
	public static readonly DEFAULT_VOLUME: number = 50;

	public volume: number;
	public queue: Track[];

	public readonly node: LavaNode;

	public constructor(node: LavaNode, guildID: string) {
		super(node, guildID);

		this.queue = [];
		this.volume = LavaPlayer.DEFAULT_VOLUME;
	}

	public async play(
		track: string | Track,
		{ start = 0, end = 0 }: { start?: number; end?: number } = {}
	): Promise<void> {
		await super.play(track, { start, end });
		await this.setVolume(this.volume);
	}

	public setVolume(volume: number): Promise<void> {
		return super.setVolume((this.volume = volume));
	}
}
