"use strict";
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
	  id: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: DataTypes.STRING,
    description: DataTypes.TEXT,
    titleImage: DataTypes.STRING,
	link:DataTypes.STRING,
	shortdescription:DataTypes.STRING
  }  
  );
  return post;
};