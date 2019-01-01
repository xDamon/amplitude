import { unescape } from "querystring";
import { default as fetch, Response } from "node-fetch";
import { Http, TrackResponse } from "lavalink";
import { URL } from "url";

export class RedirectHttp extends Http {
	public async load(identifier: string): Promise<TrackResponse> {
		const url: URL = this.url();

		url.pathname = "/loadtracks";
		url.searchParams.append("identifier", identifier);

		const unescaped: string = unescape(url.toString());
		const res: Response = await fetch(unescaped, {
			headers: {
				Authorization: this.node.password,
				"Content-Type": "application/json",
				Accept: "application/json",
			}
		});

		return res.json();
	}
}
