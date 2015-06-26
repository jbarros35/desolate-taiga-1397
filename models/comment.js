"use strict";
module.exports = function(sequelize, DataTypes) {
 
  var comment = sequelize.define("comment", {
	  commentid: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},	
    description: DataTypes.TEXT,    
	userid: {type:DataTypes.INTEGER, allowNull: false},
	postid: {type:DataTypes.INTEGER, allowNull: false}
  }, {
	classMethods: {
		  associate: function(models) {
			comment.belongsTo(models.post, {as: 'Post', foreignKey: 'userid', onDelete: 'CASCADE', constraints:true, onUpdate: 'CASCADE' });
			comment.belongsTo(models.profile, 
				{as: 'Profile', foreignKey: 'userid', onDelete: 'CASCADE', constraints:true, onUpdate: 'CASCADE' });
		  }
	} 
	}  
  );
  return comment;
};