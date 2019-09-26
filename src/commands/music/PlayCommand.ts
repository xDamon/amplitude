import { Command, middleware, args, r, GuildOnly } from "@discord-yuh/standard";
import { Message, GuildMember } from "discord.js";
import { MusicClient } from "@Client/MusicClient";
import { TrackResponse, Track, Status } from "lavalink";
import { Markdown } from "@Util/Markdown";
import { Time } from "@Util/Time";
import { LavaPlayer } from "@Lava/player/LavaPlayer";

const regex: RegExp = /[\w\d]+\.\w+\/\w+/;

@GuildOnly
export class PlayCommand extends Command {
	public readonly aliases: string[];
	public readonly description: string;
	public readonly usage: string;

	public constructor() {
		super();

		this.aliases = [];
		this.description = "Plays a track from YouTube/SoundCloud etc.";
		this.usage = "[prefix][name] [...track?]";
	}

	@middleware(args(r.string))
	public async execute(message: Message, [query]: [string]): Promise<void> {
		const guildID: string = message.guild.id;
		const client: MusicClient = message.client as MusicClient;
		const player: LavaPlayer = client.lava.players.get(guildID);

		const member: GuildMember = await message.guild.fetchMember(message.author.id);
		const me: GuildMember = await message.guild.fetchMember(client.user.id);

		if (!member.voiceChannel) {
			await message.channel.send("You are not in a voice channel");
		} else if (me.voiceChannelID && me.voiceChannelID !== member.voiceChannelID) {
			await message.channel.send("I'm in a different voice channel.");
		} else if (!me.voiceChannel && member.voiceChannel.full) {
			await message.channel.send("Your voice channel is full.");
		} else {
			let identifier: string = query;

			if (message.attachments.size > 0) {
				identifier = message.attachments.first().url;
			} else if (!regex.test(identifier)) {
				identifier = `ytsearch:${identifier}`;
			}

			const queue: Track[] = player.queue;
			const status: Message = await message.channel.send("Searching...") as Message;
			const res: TrackResponse = await client.lava.load(encodeURIComponent(identifier));

			const single: boolean = (
				res.loadType === "TRACK_LOADED" ||
				res.loadType === "SEARCH_RESULT"
			);

			const successful: boolean = single || res.loadType === "PLAYLIST_LOADED";

			if (successful) {
				let edited: string;

				if (single) {
					const track: Track = res.tracks[0];
					const tag: string = this._createTrackTag(track);

					edited = `Added track ${tag}.`;

					queue.push(track);
				} else {
					const trackNum: number = res.playlistInfo.selectedTrack;
					const tracks: Track[] = res.tracks.slice(trackNum);
					const title: string = Markdown.bold(res.playlistInfo.name);

					edited = `Added playlist ${title}.`;

					queue.push(...tracks);
				}

				await status.edit(edited);

				const broken: boolean = (
					player.status === Status.ERRORED ||
					player.status === Status.STUCK
				);

				const mustStart: boolean = (
					player.status === Status.INSTANTIATED ||
					player.status === Status.ENDED ||
					broken
				);

				if (mustStart) {
					if (broken) {
						queue.shift();
					}

					if (player.listenerCount("playing") === 0) {
						player.on("playing", async (t: Track): Promise<void> => {
							await message.channel.send(`🎵 Now playing ${this._createTrackTag(t)} 🎵`);
						});
					}

					const track: Track = queue[0];

					await player.join(member.voiceChannelID);
					await player.play(track.track);

					player.emit("playing", track);
				}
			} else {
				await status.edit("I could not find that track.");
			}
		}
	}

	private _createTrackTag(track: Track) {
		const title: string = Markdown.bold(track.info.title);
		const time: string = Time.millisecondsToTimestamp(track.info.length);

		return `${title} (${time})`;
	}
}
