const fs = require('fs/promises');
const path = require('path');
const { stdout } = process;
const dirPath = path.join(__dirname, 'secret-folder');

const showFiles = async () => {
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  files.forEach(async (file) => {
    const stats = await fs.stat(path.join(dirPath, file.name));
    if (stats.isFile()) {
      const fileName = file.name.split('.').shift();
      const fileExt = path.extname(path.join(dirPath, file.name)).split('.').reverse().shift();
      const fileSize = (stats.size / 1024).toFixed(3) + 'kb';
      stdout.write(`${fileName} - ${fileExt} - ${fileSize}\n`);
    }
  });
};

showFiles();
