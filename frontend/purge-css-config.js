const glob = require('glob-all');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const current_working_dir = process.cwd();
function collectSafelist() {
	return {
		standard: [/mm-/, /mean-/, /:where\(\.mm-slideout\)/]
	}
};

const purgeCss = function (files_paths) {
	return new PurgeCSSPlugin({
		paths: glob.sync([
			`${current_working_dir}/js/modules/products-search/src/*.js`,
			`${current_working_dir}/node_modules/mmenu-js/dist/mmenu.js`,
			...files_paths
		]),
		keyframes: true,
		safelist: collectSafelist
	})
};

module.exports = purgeCss;