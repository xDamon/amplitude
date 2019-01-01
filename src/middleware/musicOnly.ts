import { Message, GuildMember } from "discord.js";
import { MiddlewareResult } from "@discord-yuh/standard";
import { MusicClient } from "@Client/MusicClient";

export async function musicOnly(message: Message, args: any[]): Promise<MiddlewareResult> {
	let result: MiddlewareResult;

	const client: MusicClient = message.client as MusicClient;
	const hasPlayer: boolean = client.lava.players.has(message.guild.id);

	if (hasPlayer) {
		const member: GuildMember = await message.guild.fetchMember(message.author.id);
		const me: GuildMember = await message.guild.fetchMember(client.user.id);

		if (member.voiceChannelID !== me.voiceChannelID) {
			result = "I am not in your voice channel.";
		}
	} else {
		result = "No music is playing.";
	}

	return result;
}