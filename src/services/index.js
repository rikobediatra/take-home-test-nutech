const fs = require('fs');
const path = require('path');
const repositories = require('../repositories');

const basename = path.basename(__filename);
const services = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const Class = require(path.join(__dirname, file));
    const model = new Class(repositories, services);
    let name = file.split('.')[0];
    name = name[0].toLowerCase() + name.substring(1);
    services[name] = model;
  });

module.exports = services;
