"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
	  id: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.TEXT     
  }
  , {
    timestamps: false
	}
  );
  
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
  
  // create tables
  User.sync({force:true}).then(function() {
	User.build({ id: 1, email: 'josecarlos.barros@gmail.com', 
				password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92' })
				.save()
				.then(function(user) {
		console.log("user created");		
		
		Profile.sync({force:true}).then(function(){
			Profile.build({id:1, fullname:"Jose Carlos Barros", fk_user_id:1})
				.save()
				.then(function(profile){
				});							
		});
	});
  });
  
  

	
Profile.belongsTo(User, { foreignKeyConstraint: true, onDelete: 'cascade', foreignKey: 'fk_user_id' });

return User;
};