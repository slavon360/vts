
const path = require('path');
const folder_name = path.basename(__dirname);
const SRC_DIR = path.resolve(__dirname, 'src');
const current_working_dir = process.cwd();
const base_config = require(`${current_working_dir}/webpack.base.config.js`);

module.exports = {
	...base_config,
	entry: SRC_DIR,
	output: {
		...base_config.output,
		path: path.resolve(current_working_dir, `../backend/catalog/static/js/modules/${folder_name}/dist`),
		filename: 'index.main.js'
	},
};