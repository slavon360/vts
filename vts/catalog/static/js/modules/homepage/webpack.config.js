const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getWorkingDirInversePath } = require('../../utils/webpack-utils.js');
const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const current_working_dir = process.cwd();
const base_config = require(`${current_working_dir}/webpack.base.config.js`);
const working_dir_inverse_path = getWorkingDirInversePath(__dirname, current_working_dir);

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
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: `${working_dir_inverse_path}styles/css/homepage/homepage.css`,
		})
	]
};