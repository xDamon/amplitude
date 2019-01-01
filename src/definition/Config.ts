export type Config = {
	production: boolean;
	discord: {
		token: string;
		prefix: string;
		owners: string[];
	};
	lavalink: {
		user: string;
		password: string;
		hosts: {
			rest: string;
			ws: string;
		}
	};
};
