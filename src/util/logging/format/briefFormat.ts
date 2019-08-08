import { format } from "util";
import { Level } from "../Logger";
import { LogData } from "../LoggerStream";
import { colours, createColourWrapper } from "./ansi/colours";

const cyan = createColourWrapper([36, 39]);
const srcRegex = /.+dist(?:\\|\/)/;
const slashRegex = /\\|\//g;

export function briefFormat({ level, name, args }: LogData): string {
	const fixedName: string = name
		.replace(srcRegex, "")
		.replace(slashRegex, ".")
		.slice(0, -3);

	const logName: string = cyan(fixedName);
	const logLevel: string = colours[level](Level[level]);
	const message: string = (format as any)(...args);

	return message.split("\n").map(m => `[${logLevel}][${logName}] ${m}`).join("\n") + "\n";
}
