import { Logger, Level } from "./logging/Logger";
import { LoggerStream } from "./logging/LoggerStream";
import { briefFormat } from "./logging/format/briefFormat";

export const root = new Logger("magnitude.ts", Level.INFO, [
	new LoggerStream(process.stdout, briefFormat)
]);
