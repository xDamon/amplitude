import { LavaEvent } from "@Lava/LavaEvent";
import { LavaPlayer } from "@Lava/player/LavaPlayer";
import { LavaNode } from "@Lava/LavaNode";
import { Track, Player } from "lavalink";
import { root } from "@Util/logger";

const logger = root.fork(__filename);

export async function onEvent(this: LavaNode, e: LavaEvent): Promise<void> {
	const player: LavaPlayer = this.players.get(e.guildId);

	logger.info(`${e.type}[ ${e.reason}(${e.guildId}) ] - ${player.queue.length}`);

	if (e.type === "TrackEndEvent") {
		if (e.reason !== "REPLACED") {
			if (e.reason === "STOPPED" || e.reason === "CLEANUP") {
				player.queue = [];
			} else {
				player.queue.shift();
			}
		}

		if (player.queue.length === 0) {
			await player.setVolume(LavaPlayer.DEFAULT_VOLUME);
			await player.leave();

			player.removeAllListeners();
		} else {
			const track: Track = player.queue[0];

			if (e.reason !== "REPLACED") {
				await player.play(track.track);
			}

			player.emit("playing", track);
		}
	} else {
		await player.destroy();
		await player.leave();
	}
}
