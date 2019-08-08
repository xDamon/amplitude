import { Writable } from "stream";
import { Level } from "./Logger";

export type LogData = {
	args: any[];
	name: string;
	date: Date;
	level: Level;
};

export type FormatFunction = (data: LogData) => string;

export class LoggerStream {
	private readonly _stream: Writable;
	private readonly _format: FormatFunction;
	private readonly _level: Level;

	public constructor(stream: Writable, format: FormatFunction, level: Level = Level.TRACE) {
		this._stream = stream;
		this._format = format;
		this._level = level;
	}

	public isLoggable(level: Level): boolean {
		return level <= this._level;
	}

	public write(data: LogData): void {
		this._stream.write(this._format(data));
	}
}
