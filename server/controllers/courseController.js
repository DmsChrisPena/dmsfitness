 import db from './../model';

const courseController = {};

courseController.get = (req, res) => {
	db.Course.findAll().then((courses) => {
		return res.json({
			result: courses
		});
	});
};

export default courseController;