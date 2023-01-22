const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const base_config = require(`${process.cwd()}/webpack.base.config.js`);

module.exports = (options) => ({
	...base_config(options),
	entry: SRC_DIR,
	output: {
		path: DIST_DIR
	}
});