import { Message } from "discord.js";

const regex: RegExp = /(?:(\d+):)?(?:(\d+):)?(\d+)/;

export function resolveTime(message: Message, raw: string): number {
	let result: number;

	if (regex.test(raw)) {
		const r: string[] = raw.split(":");

		const h: number = parseInt(r[r.length - 3]) || 0;
		const m: number = parseInt(r[r.length - 2]) || 0;
		const s: number = parseInt(r[r.length - 1]) || 0;

		result = (
			(h * 60 * 60 * 1000) +
			(m * 60 * 1000) +
			(s * 1000)
		);
	}

	return result;
}
