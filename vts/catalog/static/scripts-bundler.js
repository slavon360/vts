const minimist = require('minimist');
const { exec } = require('child_process');

const args_arr = process.argv.slice(2);
const args = minimist(args_arr);

if (typeof args.module_path !== 'string') {
	throw new Error('module_path must be specified');
}

let build_cmd = `npx webpack --progress --profile --config ${args.module_path}/webpack.config.js`;

console.log(args);
if (args_arr.includes('watch')) {
	build_cmd += ' --watch';
}
if (args.env === 'development') {
	build_cmd += ' --env development';
}

process.env.NODE_ENV = args.env === 'development' ? 'development' : 'production';

const build = exec(build_cmd);

build.stdout.on('data', console.log);
build.stderr.on('data', console.log);

build.on('exit', code => console.log(`\n\n Child process exited with code: ${code}`));
