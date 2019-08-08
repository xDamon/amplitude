import { YuhClient, Listen } from "@discord-yuh/standard";
import { onRaw } from "@Client/events/onRaw";
import { onError } from "@Client/events/onError";
import { onUnknownCommand } from "@Client/events/onUnknownCommand";
import { Collection } from "discord.js";
import { LavaNode } from "@Lava/LavaNode";
import { MusicClientSettings } from "@Client/MusicClientSettings";

@Listen({
	raw: onRaw,
	error: onError,
	unknownCommand: onUnknownCommand
})
export class MusicClient extends YuhClient {
	public readonly lava: LavaNode;

	public constructor(settings: MusicClientSettings) {
		super(settings);

		this.lava = new LavaNode(this, settings.lava);
	}
}
