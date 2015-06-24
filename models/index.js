var Sequelize = require('sequelize');
var config    = require('../config');  // we use node-config to handle environments
var fs        = require("fs");
var path      = require("path");
var models = require('../models');
// initialize database connection
var sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password, {
	  dialect: 'postgres',  
	  host: config.database.host,
	  port: config.database.port,
	  autoIncrement: true,
	  omitNull: true,
	  freezeTableName: true,
	  pool: {
		max: 15,
		min: 0,
		idle: 10000
	  },
});

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({
    force: true
});

module.exports = db;