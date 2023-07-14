const fs = require('fs');
const getPathsToFolders = root_folder_name => {
  const folder_names = fs.readdirSync(root_folder_name).map(folder_name => `${root_folder_name.replace('./', '')}/${folder_name}`);
  return folder_names;
}

module.exports = { getPathsToFolders };