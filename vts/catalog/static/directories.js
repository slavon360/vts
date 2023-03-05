const fs = require('fs');
const testFolder = './js/modules';
const getPathsToFolders = root_folder_name => {
  const folder_names = fs.readdirSync(root_folder_name).map(folder_name => `${root_folder_name.replace('./', '')}/${folder_name}`);
  return folder_names;
}
// console.log(getPathsToFolders(testFolder));

module.exports = { getPathsToFolders };