import db from './../model';

const goalsController = {};

goalsController.get = (req, res, next) => {
	return res.render('goalsForm.html', {
		userId: req.params.userId
	});
};

goalsController.post = (req, res, next) => {
	const {
		goalWeight,
		userId
	} = req.body;

	db.Goals.build({UserId: userId, goalWeight: goalWeight}).save();

	return res.json(req.body);
};

goalsController.results = (req, res, next) => {
	db.Goals.findAll({
		include: {
			model: db.User
		}
	}).then((data) => {
		return res.json(data);
	});
};

export default goalsController;