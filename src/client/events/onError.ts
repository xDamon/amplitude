import { root } from "@Util/logger";

const logger = root.fork(__filename);

export function onError(err: Error) {
	logger.error(err);
}
