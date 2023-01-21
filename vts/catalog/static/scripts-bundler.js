const path = require('path');
const args = require('yargs').argv;
const { env, module_path, watch } = args;
console.log(process.env.test_var, args);
const config_path = path.join(__dirname, `/${module_path}`);
const callback = () => {
	console.log('script reloaded');
}
const config = require(`${config_path}/webpack.config.js`)({watch, env});
const webpack = require('webpack');

const compiler = webpack(config, callback);
compiler.run((err, res) => {
	if (err) {
		console.log(err);
	} else {
		// console.log(res);
	}
});
