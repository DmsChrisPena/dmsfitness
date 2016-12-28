const seedData = (db) => {
	// Seed user
	db.User.find({where: {username: 'ThunderCatsBro'}}).then(function(user) {
	  if(!user) {
	    db.User.build({
	    	username: 'ThunderCatsBro',
	    	password: '1q0p2w9o',
	    	firstName: "Chris",
	    	lastName: "Pena",
	    	email: "cpena@dmshouston.com",
	    	heightFeet: 6,
	    	heightInches: 4,
	    	startingWeight: 280,
	    	publicWeight: true,
	    	okayWithBeingRef: true,
	    	myFitnessPalName: "ThunderCatsBro"
	    }).save();
	  }
	});
};

export default seedData;