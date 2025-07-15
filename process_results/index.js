let fs = require('fs');
let path = process.cwd();

const OUTPUT_FILE = "./result.sql";
const FILES = ['new_results_1-100.txt'];
let result = "";

function sanitizeString(string) {
  return string.replace(`'`, `''`);
}

function createSQLRow(user) {
  return `INSERT INTO Users(Label, LinkToUser, Username, location) `
    + `VALUES('${sanitizeString(user.label)}', '${sanitizeString(user.linkToUser)}', '${sanitizeString(user.username)}', '${sanitizeString(user.location)}');\r\n`;
}
  
for (let fileName of FILES) {
  const buffer = fs.readFileSync(`../${fileName}`);
  const userArray = JSON.parse(buffer);
  
  for (let user of userArray) {
    result += createSQLRow(user);
  }
}

fs.writeFileSync(OUTPUT_FILE, result);
