import { YuhClientSettings } from "@discord-yuh/standard";
import { LavaNodeOptions } from "@Lava/LavaNodeOptions";

export type MusicClientSettings = YuhClientSettings & {
	lava: LavaNodeOptions;
};