"use strict";
module.exports = function(sequelize, DataTypes) {
var profile = sequelize.define("profile", {
	 profileid: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},	
	fullname: DataTypes.STRING,
	userid: DataTypes.INTEGER
  }, {
	classMethods: {
		  associate: function(models) {
			profile.belongsTo(models.user, {as: 'User', foreignKey: 'userid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
		  }
		} 
	}	
  );
 return profile;
};