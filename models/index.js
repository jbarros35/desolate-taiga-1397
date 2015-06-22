var Sequelize = require('sequelize');
var config    = require('../config');  // we use node-config to handle environments

// initialize database connection
var sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password, {
	  dialect: 'postgres',  
	  host: config.database.host,
	  port: config.database.port,
	  autoIncrement: true,
	  omitNull: true	  
  ,
  pool: {
    max: 15,
    min: 0,
    idle: 10000
  },
});

// load models
var models = [
  'User', 'Post'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
/*m.PhoneNumber.belongsTo(m.User);
m.Task.belongsTo(m.User);
m.User.hasMany(m.Task);
m.User.hasMany(m.PhoneNumber);*/
//m.User.hasOne(m.Profile);
})(module.exports);
// export connection
module.exports.sequelize = sequelize;