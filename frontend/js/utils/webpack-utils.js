
const path = (dirname, current_working_dir) => dirname.replace(current_working_dir, '').split('\\').map(word => '../').join('');

module.exports = { getWorkingDirInversePath: path };