import { MusicClient } from "@Client/MusicClient";
import { Command } from "@discord-yuh/standard";
import { Message } from "discord.js";

export async function onUnknownCommand(
	this: MusicClient,
	name: string,
	args: string[],
	message: Message
): Promise<void> {
	const help: Command = this.commands.get("help") as Command;
	const needsHelp: boolean = name.endsWith("?");

	console.log("unknown", help);

	if (needsHelp && help) {
		try {
			await help.execute(message, [name.replace("?", "")]);
		} catch {
			// do nothing.
		}
	}
}
