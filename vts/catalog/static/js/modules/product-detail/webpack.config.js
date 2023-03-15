const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob-all');
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
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: `${working_dir_inverse_path}styles/css/product-detail/`,
							name: '[name]-local-styles.css'
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: `${working_dir_inverse_path}styles/css/product-detail/product-detail.css`,
		}),
		new PurgeCSSPlugin({
			paths: glob.sync([
				`${SRC_DIR}/*`,
				`${current_working_dir}/js/modules/products-search/src/*.js`,
				`${current_working_dir}/js/jquery.meanmenu.min.js`,
				`${current_working_dir}/node_modules/tiny-slider/src/tiny-slider.js`,
				`${current_working_dir}/html/product-detail.html`
			]),
			keyframes: true
		})
	]
};