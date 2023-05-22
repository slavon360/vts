const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const { getWorkingDirInversePath } = require('../../utils/webpack-utils.js');
const path = require('path');
const current_working_dir = process.cwd();
const folder_name = path.basename(__dirname);
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const base_config = require(`${current_working_dir}/webpack.base.config.js`);
const working_dir_inverse_path = getWorkingDirInversePath(__dirname, current_working_dir);
const isProduction = process.env.NODE_ENV === 'production';

const common_config = {
	module: {
		rules: [
			...base_config.module.rules
		]
	},
	plugins: [
		isProduction ? new PurgeCSSPlugin({
			paths: glob.sync([
				`${SRC_DIR}/*`,
				`${current_working_dir}/js/modules/products-search/src/*.js`,
				`${current_working_dir}/html/catalog.html`
			]),
			keyframes: true
		}) : function() {}
	]
}

const frontend_folder_config = {
	...base_config,
	...common_config,
	entry: SRC_DIR,
	output: {
		...base_config.output,
		path: DIST_DIR
	},
	plugins: [
		...common_config.plugins,
		new MiniCssExtractPlugin({
			filename: `${working_dir_inverse_path}styles/css/catalog/catalog.css`,
		})
	]
};
const backend_folder_config = {
	...base_config,
	...common_config,
	entry: SRC_DIR,
	output: {
		...base_config.output,
		path: path.resolve(current_working_dir, `../backend/catalog/static/js/modules/${folder_name}/dist`)
	},
	plugins: [
		...common_config.plugins,
		new MiniCssExtractPlugin({
			filename: '../../../../../static/styles/css/catalog/catalog.css',
		})
	]
};

module.exports = [
	frontend_folder_config,
	backend_folder_config
];