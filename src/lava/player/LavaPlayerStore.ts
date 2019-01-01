import { LavaPlayer } from "@Lava/player/LavaPlayer";
import { LavaNode } from "@Lava/LavaNode";

export class LavaPlayerStore extends Map<string, LavaPlayer> {
	public readonly node: LavaNode;

	public constructor(node: LavaNode) {
		super();

		this.node = node;
	}

	public get(key: string): LavaPlayer {
		let player: LavaPlayer = super.get(key);

		if (!player) {
			player = new LavaPlayer(this.node, key);
			this.set(key, player);
		}

		return player;
	}
}
