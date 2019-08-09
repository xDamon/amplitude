import { LavaEvent } from "@Lava/LavaEvent";
import { LavaPlayer } from "@Lava/player/LavaPlayer";
import { LavaNode } from "@Lava/LavaNode";
import { Track, Player } from "lavalink";
import { root } from "@Util/logger";

const logger = root.fork(__filename);

export async function onEvent(this: LavaNode, e: LavaEvent): Promise<void> {
	logger.info(e);

	if (e.type === "TrackExceptionEvent") {
		await this.players.get(e.guildId).leave();
	} else if (e.type === "TrackEndEvent") {
		const player: LavaPlayer = this.players.get(e.guildId);
		const queue: Track[] = player.queue;

		if (e.reason !== "REPLACED") {
			queue.shift();
		}

		if (e.reason === "STOPPED" || e.reason === "CLEANUP" || queue.length === 0) {
			await player.leave();

			player.removeAllListeners();
		} else {
			const track: Track = queue[0];

			if (e.reason !== "REPLACED") {
				await player.play(track.track);
			}

			player.emit("playing", track);
		}
	}
}
