const seedData = (db) => {
	// Seed user
	db.User.find({where: {username: 'timtastic'}}).then(function(user) {
	  if(!user) {
	    db.User.build({username: 'timtastic', password: 'timtastic'}).save();
	  }
	});
};

export default seedData;