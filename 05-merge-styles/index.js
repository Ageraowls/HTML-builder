const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

const createBundle = async () => {
  const files = await fs.promises.readdir(stylesDir, { withFileTypes: true });
  files.forEach((file) => {
    const fileName = path.join(stylesDir, file.name);
    if (path.extname(fileName) === '.css') {
      const readStream = fs.createReadStream(fileName, 'utf-8');
      readStream.pipe(writeStream);
    }
  });
};

createBundle();
