const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = ({watch, env}, callback) => {
	console.log('env: ', env);
	return {
		entry: SRC_DIR,
		output: {
			path: DIST_DIR
		},
		module: {
			rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			],
		},
		mode: env,
		watch
	}
};