import { ClientSettings } from "@discord-yuh/standard";
import { MusicNodeOptions } from "@Lava/LavaNodeOptions";

export type MusicClientSettings = ClientSettings & {
	lava: MusicNodeOptions;
};
