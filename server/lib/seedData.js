const courseList = [
	{ 
		title: 'Intro to Gas Industry',
		desc: 'Bacon ipsum dolor amet pancetta ham hock porchetta pork chop turducken. Hamburger short ribs pastrami short loin pork loin tenderloin.',
		pic: 'http://makerbook.net/wp-content/uploads/2015/11/1237.jpg',
		category: 'Natural Gas'
	}
];

const seedData = (db) => {
	// Seed user
	db.User.find({where: {username: 'winsby'}}).then(function(user) {
	  if(!user) {
	    db.User.build({username: 'winsby', password: 'winsby'}).save();
	  }
	});

	// Seed courses
	db.Course.findAll().then((courses) => {
		if(courses.length === 0) {
			courseList.forEach((course) => {
				db.Course.build(course).save();
			});
		}
	});

};

export default seedData;