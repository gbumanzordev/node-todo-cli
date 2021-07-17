const fs = require('fs');

const readDB = () => {
  const file = './src/db/data.json';
  if (!fs.existsSync(file)) {
    return null;
  }
  const info = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
  return info || [];
};

module.exports = {
  readDB,
};
