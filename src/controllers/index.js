const fs = require('fs');
const path = require('path');

const services = require('../services');
const repositories = require('../repositories');

const basename = path.basename(__filename);
const controllers = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const Class = require(path.join(__dirname, file));
    const controller = new Class(services, repositories);
    let name = file.split('.')[0];
    name = name[0].toLowerCase() + name.substring(1);
    controllers[name] = controller;
  });

module.exports = controllers;
