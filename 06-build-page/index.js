const path = require('path');
const { readFile, writeFile, copyFile, mkdir, readdir } = require('fs/promises');

const htmlFile = 'template.html';
const output = 'project-dist';
const styles = 'styles';
const assets = 'assets';
const components = 'components';

createOutputDir(() => {
  buildHtml();
  bundleStyles();
  copyAssets(assets);
});

async function createOutputDir(cb) {
  await mkdir(path.resolve(__dirname, output), { recursive: true });

  cb();
}

async function buildHtml() {
  let html = await readFile(path.resolve(__dirname, htmlFile), { encoding: 'utf-8' });

  const usedComponents = html.matchAll(/{{(.+?)}}/g);

  for (let component of usedComponents) {
    const componentHtml = await readFile(path.resolve(__dirname, components, component[1] + '.html'), { encoding: 'utf-8' });
    html = html.replace(component[0], componentHtml);
  }

  writeFile(path.resolve(__dirname, output, 'index.html'), html);
}

async function copyAssets(from) {
  await mkdir(path.resolve(__dirname, output, from), { recursive: true });

  const direntArr = await readdir(path.resolve(__dirname, from), { withFileTypes: true });

  for (let entry of direntArr) {
    if (entry.isDirectory()) {
      copyAssets(path.join(from, entry.name));
    } else {
      copyFile(path.resolve(__dirname, from, entry.name), path.resolve(__dirname, output, from, entry.name));
    }
  }
}

async function bundleStyles() {
  const DirentArr = await readdir(path.resolve(__dirname, styles), { withFileTypes: true });

  const cssFilesArr = DirentArr.filter((el) => {
    if (el.isDirectory()) return false;
    if (path.extname(el.name).toLowerCase() !== '.css') return false;
    return true;
  });

  const cssArr = [];
  for (let i = 0; i < cssFilesArr.length; i++) {
    cssArr[i] = await readFile(path.resolve(__dirname, styles, cssFilesArr[i].name), 'utf-8');
  }

  writeFile(path.resolve(__dirname, output, 'style.css'), cssArr.join(''));
}
