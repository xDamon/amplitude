import { Client, Listen } from "@discord-yuh/standard";
import { onRaw } from "@Client/events/onRaw";
import { MusicClientSettings } from "@Client/MusicClientSettings";
import { onReady } from "@Client/events/onReady";
import { Collection } from "discord.js";
import { LavaNode } from "@Lava/LavaNode";

@Listen({
	raw: onRaw,
	ready: onReady
})
export class MusicClient extends Client {
	public readonly lava: LavaNode;

	public constructor(settings: MusicClientSettings) {
		super(settings);

		this.lava = new LavaNode(this, settings.lava);
	}
}
