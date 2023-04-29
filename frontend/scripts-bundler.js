const minimist = require('minimist');
const { exec } = require('child_process');
const { getPathsToFolders } = require('./directories.js');

const args_arr = process.argv.slice(2);
const args = minimist(args_arr);
const setBuildCmd = () => {
	let build_cmd;
	if (args.all) {
		build_cmd = getPathsToFolders('./js/modules').map(path => {
			const development = args.env === 'development' ? ' --env development' : '';

			return `npx webpack --progress --profile --config ${path}/webpack.config.js${development}`;
		}).join(' & ');
	} else {
		build_cmd = `npx webpack --progress --profile --config ${args.module_path}/webpack.config.js`;
		if (args_arr.includes('watch')) {
			build_cmd += ' --watch';
		}
		if (args.env === 'development') {
			build_cmd += ' --env development';
		}
	}
	return build_cmd;
}

if (typeof args.module_path !== 'string' && !args.all) {
	throw new Error('module_path must be specified');
}

const build_cmd = setBuildCmd();
process.env.NODE_ENV = args.env === 'development' ? 'development' : 'production';

const build = exec(build_cmd);

build.stdout.on('data', console.log);
build.stderr.on('data', console.log);

build.on('exit', code => console.log(`\n\n Child process exited with code: ${code}`));
