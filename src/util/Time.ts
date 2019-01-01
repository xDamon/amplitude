export namespace Time {
	export function millisecondsToTimestamp(ms: number): string {
		const h: number = Math.floor(ms / 3600000);
		const m: number = Math.floor((ms % 3600000) / 60000);
		const s: number = Math.floor(((ms % 360000) % 60000) / 1000);

		let timestamp: string;

		if (h > 0) {
			const hours: string = h.toString().padStart(2, "0");
			const minutes: string = m.toString().padStart(2, "0");
			const seconds: string = s.toString().padStart(2, "0");

			timestamp = `${hours}:${minutes}:${seconds}`;
		} else {
			const minutes: string = m.toString();
			const seconds: string = s.toString().padStart(2, "0");

			timestamp = `${minutes}:${seconds}`;
		}

		return timestamp;
	}
}