"use strict";
module.exports = function(sequelize, DataTypes) {
  var profile   = sequelize.import(__dirname + "/profile");
  var post   = sequelize.import(__dirname + "/post");
  var user = sequelize.define("user", {
	  id: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.TEXT     
  }
  ,  {
    classMethods: {
      associate: function(models) {
        user.hasOne(models.profile,		
		{as: 'Profile', foreignKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
		user.hasMany(models.post,		
		{as: 'Post', foreignKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      }
    }
	}
  );

return user;
};