import { LoggerStream, LogData } from "./LoggerStream";

export enum Level {
	OFF,
	FATAL,
	ERROR,
	WARN,
	INFO,
	DEBUG,
	TRACE
}

export class Logger {
	private readonly _name: string;
	private readonly _level: Level;
	private readonly _streams: LoggerStream[];
	private readonly _forks: Map<string, Logger>;

	public constructor(name: string, level: Level, streams: LoggerStream[]) {
		this._name = name;
		this._level = level;
		this._streams = [...streams];
		this._forks = new Map();
	}

	public fork(name: string, level: Level = this._level, streams: LoggerStream[] = this._streams): Logger {
		let logger: Logger = this._forks.get(name);

		if (!logger) {
			this._forks.set(name, logger = new Logger(name, level, streams));
		}

		return logger;
	}

	public log(level: Level, ...args: any[]): void {
		this._log(level, args);
	}

	public fatal(...args: any[]): void {
		this._log(Level.FATAL, args);
	}

	public error(...args: any[]): void {
		this._log(Level.ERROR, args);
	}

	public warn(...args: any[]): void {
		this._log(Level.WARN, args);
	}

	public info(...args: any[]): void {
		this._log(Level.INFO, args);
	}

	public debug(...args: any[]): void {
		this._log(Level.DEBUG, args);
	}

	public trace(...args: any[]): void {
		this._log(Level.TRACE, args);
	}

	private _log(level: Level, args: any[]): void {
		if (level <= this._level) {
			const data: LogData = {
				args: args,
				name: this._name,
				date: new Date(),
				level: level
			};

			for (const stream of this._streams) {
				if (stream.isLoggable(level)) {
					stream.write(data);
				}
			}
		}
	}
}
