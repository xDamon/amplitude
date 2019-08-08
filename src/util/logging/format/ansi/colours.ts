import { Level } from "../../Logger";

export function createColourWrapper(...args: [number, number][]) {
	return function wrap(str: string): string {
		let wrapped: string = str;

		for (const [start, end] of args) {
			wrapped = `\u001b[${start}m${wrapped}\u001b[${end}m`;
		}

		return wrapped;
	};
}

export const colours: { [key: number]: (str: string) => string } = {
	[Level.FATAL]: createColourWrapper([41, 49], [37, 39]),
	[Level.ERROR]: createColourWrapper([31, 39]),
	[Level.WARN]: createColourWrapper([33, 39]),
	[Level.INFO]: createColourWrapper([32, 39]),
	[Level.DEBUG]: createColourWrapper([35, 39]),
	[Level.TRACE]: createColourWrapper([34, 39])
};
