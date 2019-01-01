import { Message, GuildMember } from "discord.js";
import { MiddlewareResult } from "@discord-yuh/standard";
import { MusicClient } from "@Client/MusicClient";
import { LavaPlayer } from "@Lava/player/LavaPlayer";
import { Status } from "lavalink";

export async function musicOnly(message: Message, args: any[]): Promise<MiddlewareResult> {
	let result: MiddlewareResult;

	const client: MusicClient = message.client as MusicClient;
	const player: LavaPlayer = client.lava.players.get(message.guild.id);

	if (player.status === Status.INSTANTIATED || player.status === Status.STUCK) {
		result = "No music is playing.";
	} else {
		const member: GuildMember = await message.guild.fetchMember(message.author.id);
		const me: GuildMember = await message.guild.fetchMember(client.user.id);

		if (member.voiceChannelID !== me.voiceChannelID) {
			result = "I am not in your voice channel.";
		}
	}

	return result;
}
