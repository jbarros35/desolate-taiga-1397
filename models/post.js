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
    titleimage: DataTypes.STRING,
	link:DataTypes.STRING,
	shortdescription:DataTypes.STRING,
	userid: DataTypes.INTEGER,
	commentsenabled: {
		type:DataTypes.BOOLEAN,
		defaultValue: true
	}
  }, {
	classMethods: {
		  associate: function(models) {
			post.belongsTo(models.profile, {as: 'Profile', foreignKey: 'userid', onDelete: 'CASCADE', constraints:true, onUpdate: 'CASCADE' });
			post.belongsToMany(models.hashtag, 
				{as: 'Tags', foreignKey: 'postid', through: 'hashtag_posts', onDelete: 'SET NULL', constraints:true, onUpdate: 'SET NULL' });
			post.hasMany(models.comment, {as: 'Comments', foreignKey:'postid', onDelete: 'CASCADE', constraints:true, onUpdate: 'CASCADE'});
		  }
	} 
	}  
  );
  return post;
};