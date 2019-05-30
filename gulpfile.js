const del = require("del");
const path = require("path");
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const merge = require("merge-stream");
const alias = require("@discord-yuh/gulp-alias");

const project = typescript.createProject("tsconfig.json");
const compilerOptions = project.config.compilerOptions;

function createCleanTask(path) {
	return function clean() {
		return del(path);
	};
}

function createCompileTask(inputDir, outputDir, compilerOptions) {
	const { baseUrl, paths } = compilerOptions;

	return function compile() {
		const compiled = gulp.src(`${inputDir}/**/*.ts`,  { base: inputDir })
		.pipe(project());

		const js = compiled.js
			.pipe(alias.js(baseUrl, paths))
			.pipe(gulp.dest(outputDir))

		const dts = compiled.dts
			.pipe(alias.ts(baseUrl, paths))
			.pipe(gulp.dest(outputDir));

		return merge(js, dts);		
	};
}

function createCopyTask(input, output) {
	return function copy() {
		return gulp.src(input).pipe(gulp.dest(output));
	};
}

const build = gulp.series(
	createCleanTask("dist/**/*.*"),
	createCompileTask("src", "dist", compilerOptions)
);

module.exports = {
	build
};