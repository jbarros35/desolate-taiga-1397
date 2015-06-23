"use strict";
module.exports = function(sequelize, DataTypes) {
var Profile = sequelize.define("user_profile", {
	  id: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fk_user_id: DataTypes.INTEGER,
	fullname: DataTypes.STRING       
  }  
  );
 return Profile;
};