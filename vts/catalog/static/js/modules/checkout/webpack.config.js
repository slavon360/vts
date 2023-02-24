const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const base_config = require(`${process.cwd()}/webpack.base.config.js`);

module.exports = {
	...base_config,
	entry: SRC_DIR,
	output: {
		path: DIST_DIR
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			}
		]
	}
};