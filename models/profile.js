"use strict";
module.exports = function(sequelize, DataTypes) {
var profile = sequelize.define("profile", {
	 profileid: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},	
	fullname: DataTypes.STRING,
	userid: {type:DataTypes.INTEGER, allowNull: false},
	nickname: {type:DataTypes.STRING, allowNull: false, unique: true},
	photo: DataTypes.STRING
  }, {
	classMethods: {
		  associate: function(models) {
			profile.belongsTo(models.user, {as: 'User', foreignKey: 'userid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
			profile.hasMany(models.post,		
				{as: 'Post', foreignKey: 'userid', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
			profile.hasMany(models.comment, 
				{as: 'Comments', foreignKey:'userid', onDelete: 'CASCADE', constraints:true, onUpdate: 'CASCADE'});
		  }
		} 
	}	
  );
 return profile;
};