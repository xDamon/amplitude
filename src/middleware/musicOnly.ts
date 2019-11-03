import { Message, GuildMember } from "discord.js";
import { MiddlewareResult } from "@discord-yuh/standard";
import { MusicClient } from "@Client/MusicClient";
import { LavaPlayer } from "@Lava/player/LavaPlayer";
import { Status } from "lavalink";

export async function musicOnly(message: Message, args: any[]): Promise<MiddlewareResult> {
	let result: MiddlewareResult;

	const client: MusicClient = message.client as MusicClient;
	const player: LavaPlayer = client.lava.players.get(message.guild.id);
	const me: GuildMember = await message.guild.fetchMember(client.user.id);

	if (player.channelID) {
		const member: GuildMember = await message.guild.fetchMember(message.author.id);

		if (player.channelID !== member.voiceChannelID) {
			result = "I am not in your voice channel.";
		}
	} else {
		result = "No music is playing.";
	}

	return result;
}
