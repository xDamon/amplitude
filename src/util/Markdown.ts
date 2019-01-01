export namespace Markdown {
	export function bold(str: string): string {
		return `**${str}**`;
	}

	export function underline(str: string): string {
		return `__${str}__`;
	}

	export function italics(str: string): string {
		return `*${str}*`;
	}
}
