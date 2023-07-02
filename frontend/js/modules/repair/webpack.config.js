const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const purgeCss = require('../../../purge-css-config.js');
const path = require('path');
const folder_name = path.basename(__dirname);
const SRC_DIR = path.resolve(__dirname, 'src');
const current_working_dir = process.cwd();
const base_config = require(`${current_working_dir}/webpack.base.config.js`);
const isProduction = process.env.NODE_ENV === 'production';

const backend_folder_config = {
	...base_config,
	entry: SRC_DIR,
	output: {
		...base_config.output,
		path: path.resolve(current_working_dir, `../backend/catalog/static/js/modules/${folder_name}/dist`)
	},
	plugins: [
		...base_config.plugins,
		new MiniCssExtractPlugin({
			filename: '../../../../../static/styles/css/repair/repair.css',
		}),
		isProduction ? purgeCss([
			`${SRC_DIR}/*`,
			`${current_working_dir}/html-statics/repair.html`
		]) : function() {}
	]
};

module.exports = backend_folder_config;