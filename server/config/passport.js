import passport from 'passport';
import passportLocal from 'passport-local';
import db from './../model';

let LocalStrategy = passportLocal.Strategy;

// Serialize Sessions
passport.serializeUser((user, done) => {
	done(null, user);
})

// Deserialize Sessions
passport.deserializeUser((user, done) => {
	db.User.find({where: {id: user.id}}).then((user) => {
		done(null, user);
	}).error((err) => {
		done(err, null);
	});
});

// For Authenication Purposes
passport.use(new LocalStrategy(
	function(username, password, done) {
		db.User.find({where: {username: username}}).then((user) => {
			let passwd = user ? user.password : '';
			let isMatch = db.User.validatePassword(password, passwd, done, user);
		});
	}
));