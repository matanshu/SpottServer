const fs = require('fs');
const path = require('path');
async function readFile() {
  let rawdata = await fs.readFileSync(
    path.resolve(__dirname + '/products.json')
  );
  return rawdata;
}

exports.readFile = readFile;
