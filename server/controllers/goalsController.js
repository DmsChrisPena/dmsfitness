import db from './../model';

const goalsController = {};

goalsController.get = (req, res, next) => {
	return res.render('goalsForm.html', {
		userId: req.params.userId
	});
};

goalsController.post = (req, res, next) => {
	const {
		username,
		email,
		firstName,
		lastName,
		heightFeet,
		heightInches,
		workoutsPerWeek,
		foodLoggedPerWeek,
		goalWeight,
		myFitnessPal,
		otherSuggestions,
		userId
	} = req.body;

	db.User.build({
		username,
		password: "dmsFitness",
		email,
		firstName,
		lastName,
		heightFeet,
		heightInches,
		goalWeight,
		myFitnessPalName: myFitnessPal
	}).save().then((data) => {
		db.Goals.build({
			UserId: data.id, 
			goalWeight, 
			foodLoggedPerWeek, 
			workoutsPerWeek,
			otherSuggestions
		}).save();
	});

	return res.render('thanks.html');
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