"use strict";
module.exports = function(sequelize, DataTypes) {
 
  var post = sequelize.define("post", {
	  postid: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: DataTypes.STRING,
    description: DataTypes.TEXT,
    titleImage: DataTypes.STRING,
	link:DataTypes.STRING,
	shortdescription:DataTypes.STRING,
	userid: DataTypes.INTEGER
  }, {
	classMethods: {
		  associate: function(models) {
			post.belongsTo(models.user, {as: 'User', foreignKey: 'userid', onDelete: 'CASCADE', constraints:true, onUpdate: 'CASCADE' });
		  }
		} 
	}  
  );
  return post;
};