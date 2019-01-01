import { BaseNode, TrackResponse } from "lavalink";
import { MusicNodeOptions } from "./LavaNodeOptions";
import { MusicClient } from "@Client/MusicClient";
import { LavaPlayer } from "@Lava/player/LavaPlayer";
import { LavaPlayerStore } from "@Lava/player/LavaPlayerStore";
import { Listen } from "@discord-yuh/standard";
import { onEvent } from "@Lava/events/onEvent";
import { RedirectHttp } from "@Lava/http/RedirectHttp";

@Listen({
	event: onEvent
})
export class LavaNode extends BaseNode {
	public readonly client: MusicClient;
	public readonly players: LavaPlayerStore;
	public readonly http: RedirectHttp;

	public constructor(client: MusicClient, options: MusicNodeOptions) {
		super(options);

		this.client = client;
		this.players = new LavaPlayerStore(this);

		if (this.http) {
			this.http = new RedirectHttp(this, options.hosts.rest);
		}
	}

	public async send(id: string, p: any): Promise<any> {
		if (this.client.guilds.has(id)) {
			return (this.client as any).ws.send(p);
		}
	}
}
