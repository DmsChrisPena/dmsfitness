import db from './../model';

const userController = {};

userController.signUp = (req, res, next) => {
	const {
		username,
		password
	} = req.body;

	db.User.find({where: {username}}).then((user) => {
		if(!user) {
			db.User.create({username, password}).then((user, err) => {
				if(err) {
					return res.status(500).json({
						error: err
					});
				}

				req.login(user, (err) => {
					if(err) return next(err);
					res.status(200).json({
						message: 'success'
					});
				});

			});
		} else {
			return res.status(500).json({
				error: 'There was an issue'
			});
		}
	});
};

// Client-side
userController.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		res.status(200).json({
			message: 'success'
		});
	} else {
		res.status(401).json({
			message: 'unauthorized'
		});
	}
};

userController.getUserInfo = (req, res, next) => {
	res.status(200).json({
		id: req.user.id,
		username: req.user.username
	});
};

// Server-side
userController.isAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()) {
		next();
	} else {
		next(new Error(401));
	}
};

userController.destroySession = (req, res, next) => {
	req.logOut();
	req.session.destroy();
	res.redirect('/');
};


export default userController;