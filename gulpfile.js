const del = require("del");
const path = require("path");
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const merge = require("merge-stream");
const alias = require("./gulp-alias.js");

const project = typescript.createProject("tsconfig.json");

const input = "src";
const output = "dist";

function clean() {
	return del(`${output}/**/*.*`);
}

function compile() {
	const compiled = gulp.src(`${input}/**/*.ts`,  { base: input })
		.pipe(project());

	const js = compiled.js
		.pipe(alias.js())
		.pipe(gulp.dest(output))

	const dts = compiled.dts
		.pipe(alias.ts())
		.pipe(gulp.dest(output));

	return merge(js, dts);
}

const build = gulp.series(clean, compile);

module.exports = {
	clean,
	compile,
	build
};