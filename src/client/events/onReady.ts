import { MusicClient } from "@Client/MusicClient";

export function onReady(this: MusicClient): void {
	const output: string = this.options.shardId ?
		`Shard ${this.options.shardId} ready` :
		`Client ready`;

	console.log(output);
}
