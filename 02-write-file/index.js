const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdout.write('Hi! Enter any text to write to file\n');
stdin.on('data', (data) => {
  const str = data.toString().trim();
  if (str === 'exit') {
    process.exit();
  }
  stream.write(str);
});

process.on('exit', () => {
  stdout.write('\nBye\n');
});

process.on('SIGINT', () => process.exit());
