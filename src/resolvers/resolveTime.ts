import { Message } from "discord.js";

const regex: RegExp = /(?:(\d{2}):)?((?:\d{2}|\d{1})):(\d{2})/;

export function resolveTime(message: Message, raw: string): number {
	let result: number;

	if (regex.test(raw)) {
		const exec: RegExpExecArray = regex.exec(raw);

		const h: number = Number(exec[1]) || 0;
		const m: number = Number(exec[2]) || 0;
		const s: number = Number(exec[3]) || 0;

		result = (
			(h * 60 * 60 * 1000) +
			(m * 60 * 1000) +
			(s * 1000)
		);
	}

	return result;
}
