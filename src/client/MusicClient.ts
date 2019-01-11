import { YuhClient, Listen } from "@discord-yuh/standard";
import { onRaw } from "@Client/events/onRaw";
import { onReady } from "@Client/events/onReady";
import { onUnknownCommand } from "@Client/events/onUnknownCommand";
import { Collection } from "discord.js";
import { LavaNode } from "@Lava/LavaNode";
import { MusicNodeOptions } from "@Lava/LavaNodeOptions";

@Listen({
	raw: onRaw,
	ready: onReady,
	unknownCommand: onUnknownCommand
})
export class MusicClient extends YuhClient {
	public readonly lava: LavaNode;

	public constructor(settings: MusicClient.Settings) {
		super(settings);

		this.lava = new LavaNode(this, settings.lava);
	}
}

export namespace MusicClient {
	export type Settings = YuhClient.Settings & {
		lava: MusicNodeOptions;
	};
}
