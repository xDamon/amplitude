import { Player, Track } from "lavalink";
import { LavaNode } from "@Lava/LavaNode";

export class LavaPlayer extends Player {
	public volume: number;

	public readonly node: LavaNode;
	public readonly queue: Track[];

	public constructor(node: LavaNode, guildID: string) {
		super(node, guildID);

		this.queue = [];
		this.volume = 50;
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
