const fs = require('fs');
const path = require('path');

function ensureProjectsFolderExists() {
  const folderPath = path.join(__dirname, 'Projects');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

function ensureProjectsFileExists() {
  const filePath = path.join(__dirname, 'Projects', 'Projects.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({  }));
  }
}

function loadProjectsFile() {
  const filePath = path.join(__dirname, 'Projects', 'Projects.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getFolderData(folderPath) {
  ensureProjectsFolderExists();
  ensureProjectsFileExists();

  const folderData = {
    folder: folderPath,
    subfolders: [],
    files: [],
  };

  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      const subfolderData = getFolderData(entryPath);
      folderData.subfolders.push(subfolderData);
    } else if (entry.isFile()) {
      folderData.files.push(entry.name);
    }
  });

  return folderData;
}

module.exports = {getFolderData, loadProjectsFile};

