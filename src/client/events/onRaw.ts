import { Packet } from "@Definition/Packet";
import { MusicClient } from "@Client/MusicClient";

export function onRaw(this: MusicClient, packet: Packet): void {
	switch (packet.t) {
		case "VOICE_STATE_UPDATE": this.lava.voiceStateUpdate(packet.d); break;
		case "VOICE_SERVER_UPDATE": this.lava.voiceServerUpdate(packet.d); break;
	}
}
