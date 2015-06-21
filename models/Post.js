"use strict";
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("post", {
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
  // create tables
  Post.sync({force:false})
	.then(function(){	
		console.log('table created');
	});
  return Post;
};