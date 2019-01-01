import { Command } from "@discord-yuh/standard";
import { Message, PermissionResolvable } from "discord.js";

export class InviteCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Generates an invite URL for the bot.";
		this.usage = "[prefix][name]";
	}

	public async execute(message: Message): Promise<void> {
		const permissions: PermissionResolvable = [
			"VIEW_CHANNEL",
			"SEND_MESSAGES",
			"CONNECT",
			"SPEAK",
			"ADD_REACTIONS",
			"MOVE_MEMBERS"
		];

		const invite: string = await message.client.generateInvite(permissions);

		await message.channel.send(`Here is my invite URL: <${invite}>`);
	}
}