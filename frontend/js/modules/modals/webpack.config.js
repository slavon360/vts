const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const base_config = require(`${process.cwd()}/webpack.base.config.js`);
const current_working_dir = process.cwd();
const { getWorkingDirInversePath } = require('../../utils/webpack-utils.js');
const working_dir_inverse_path = getWorkingDirInversePath(__dirname, current_working_dir);

module.exports = {
	...base_config,
	entry: SRC_DIR,
	output: {
		path: DIST_DIR
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${working_dir_inverse_path}styles/css/modals/modals.css`,
		  })
	]
};