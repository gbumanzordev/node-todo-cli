const fs = require('fs');
const path = require('path');

const saveDB = (data) => {
  const file = './src/db/data.json';

  fs.writeFileSync(file, JSON.stringify(data));
};

module.exports = { saveDB };
