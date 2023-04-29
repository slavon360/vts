const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const { getWorkingDirInversePath } = require('../../utils/webpack-utils.js');
const path = require('path');
const folder_name = path.basename(__dirname);
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const current_working_dir = process.cwd();
const base_config = require(`${current_working_dir}/webpack.base.config.js`);
const working_dir_inverse_path = getWorkingDirInversePath(__dirname, current_working_dir);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
	...base_config,
	entry: SRC_DIR,
	output: {
		...base_config.output,
		path: DIST_DIR
	},
	module: {
		rules: [
			...base_config.module.rules
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: `${working_dir_inverse_path}styles/css/shopping-cart/shopping-cart.css`,
		}),
		isProduction ? new PurgeCSSPlugin({
			paths: glob.sync([
				`${SRC_DIR}/*`,
				`${current_working_dir}/js/modules/products-search/src/*.js`,
				
				`${current_working_dir}/html/shopping-cart.html`
			]),
			keyframes: true
		}) : function() {}
	]
};