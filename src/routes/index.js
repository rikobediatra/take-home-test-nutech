const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => file !== basename)
  .forEach((file) => {
    const full = path.join(__dirname, file);

    if (fs.lstatSync(full).isDirectory()) {
      router.use(require(full));
    } else if (file.endsWith('.js')) {
      router.use(require(full));
    }
  });

module.exports = router;
