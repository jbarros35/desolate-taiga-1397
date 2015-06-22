var url     = require('url'),
   dbUrl   = url.parse(process.env.DATABASE_URL),
   authArr = dbUrl.auth.split(':');
var dbOptions = {};

dbOptions.name          = dbUrl.path.substring(1);
dbOptions.user          = authArr[0];
dbOptions.pass          = authArr[1];
dbOptions.host          = dbUrl.host.split(':')[0];
dbOptions.port          = dbUrl.host.split(':')[1];
dbOptions.dialect       = 'postgres';
dbOptions.protocol      = 'postgres';
console.log(dbUrl.host.split(':'));
var config = {

  database: {
    username: dbOptions.user,
    password: dbOptions.pass,
    name: dbOptions.name,
    host: dbOptions.host,
    dialect: dbOptions.dialect,
	port: dbOptions.port	
  }
}

module.exports = config;