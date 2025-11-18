const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const repositories = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const Class = require(path.join(__dirname, file));
    const model = new Class();
    let name = file.split('.')[0];
    name = name[0].toLowerCase() + name.substring(1);
    repositories[name] = model;
  });

module.exports = repositories;
