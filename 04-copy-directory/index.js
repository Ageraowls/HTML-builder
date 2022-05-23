const fs = require('fs/promises');
const path = require('path');
const { stdout } = process;
const dirPath = path.join(__dirname, 'files');
const dirPathCopy = path.join(__dirname, 'files-copy');

const copyDir = async () => {
  await fs.rm(dirPathCopy, { recursive: true, force: true });
  await fs.mkdir(dirPathCopy);
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  files.forEach((file) => {
    fs.copyFile(path.join(dirPath, file.name), path.join(dirPathCopy, file.name));
  });
  stdout.write('\nsuccessful copy folder\n');
};

copyDir();
