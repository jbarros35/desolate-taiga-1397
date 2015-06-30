"use strict";
module.exports = function(sequelize, DataTypes) {
 
  var hashtag = sequelize.define("hashtag", {
	  hashid: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    description: {type:DataTypes.STRING, allowNull: false, unique: true},   
  }, {
	classMethods: {
		  associate: function(models) {
			hashtag.belongsToMany(models.post, 
				{as: 'Posts', foreignKey: 'hashid', through: 'hashtag_posts', onDelete: 'SET NULL', constraints:true, onUpdate: 'SET NULL' });
		  }
		} 
	}  
  );
  return hashtag;
};