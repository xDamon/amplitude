const path = require("path");
const replace = require("gulp-replace");
const typescript = require("gulp-typescript");

const project = typescript.createProject("tsconfig.json");

const paths = project.config.compilerOptions.paths;
const baseUrl = project.config.compilerOptions.baseUrl;

const aliasMap = {};

for (const entry of Object.entries(paths)) {
	const key = entry[0].replace("/*", "");
	const value = entry[1][0].replace("/*", "");

	aliasMap[key] = value;
}

const aliasKeys = Object.keys(aliasMap);
const requireRegex = new RegExp(`require\\s*\\(["']((${aliasKeys.join("|")}).+)["']\\)`, "g");
const importRegex = new RegExp(`from\\s*["']((${aliasKeys.join("|")}).+)["']`, "g");

function moduleAliasFactory(start, end) {
	return function moduleAlias(match, full, alias) {
		const file = this.file.relative.split(path.sep).join("/");
		const components = file.split("/");

		components.pop();

		const folder = components.join("/");

		const path1 = path.join(baseUrl, folder);
		const path2 = path.join(baseUrl, aliasMap[alias]);

		const relative = path.relative(path1, path2);

		let final = full.replace(alias, relative).split(path.sep).join("/");

		if (final.startsWith("/")) {
			final = "." + final;
		} else if (!final.startsWith("./") && !final.startsWith("../")) {
			final = "./" + final;
		}

		return `${start}${final}${end}`;
	}
}

const ts = replace.bind(replace, importRegex, moduleAliasFactory("from \"", "\""));
const js = replace.bind(replace, requireRegex, moduleAliasFactory("require(\"", "\")"));

module.exports = {
	ts,
	js
};