let fs = require('fs');
let path = process.cwd();

const OUTPUT_FILE = "./result.sql";
const FILES = ['results_1-20.txt', 'results_21-40.txt', 'results_41-100.txt', 
  'results_100-200.txt', 'results_201-300.txt', 'results_301-400.txt', 'results_401-500.txt'];
let result = "";

function sanitizeString(string) {
  return string.replace(`'`, `''`);
}

function createSQLRow(user) {
  return `INSERT INTO Users(Label, LinkToUser, Username) `
    + `VALUES('${sanitizeString(user.label)}', '${sanitizeString(user.linkToUser)}', '${sanitizeString(user.username)}');\r\n`;
}
  
for (let fileName of FILES) {
  const buffer = fs.readFileSync(`../${fileName}`);
  const userArray = JSON.parse(buffer);
  
  for (let user of userArray) {
    result += createSQLRow(user);
  }
}

fs.writeFileSync(OUTPUT_FILE, result);