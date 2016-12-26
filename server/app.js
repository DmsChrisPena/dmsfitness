import express from 'express';
import chalk from 'chalk';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import engines from 'consolidate';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.js';

import passport from 'passport';
import passportConfig from './config/passport.js';
import userController from './controllers/userController.js';
import db from './model';
const SALT_WORK_FACTOR = 12;
import seedData from './lib/seedData.js';

import courseController from './controllers/courseController.js';
import videoController from './controllers/videoController.js';
import qandaController from './controllers/qandaController.js';

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'winsbeeIsCool', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Connect to database
db
  .sequelize
  .sync()
  .then((err) => {
    console.log('connected to database...');
    seedData(db);
  });

// Static Pages
app.get('/login', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login.html');
  }
});

app.get('/signUp', (req, res, next) => {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signUp.html');
  }
});

// Api Calls
app.get('/api/courses', userController.isAuthenticated, courseController.get);
app.get('/api/videos', videoController.get);
app.get('/api/qanda', qandaController.get);

// Auth Routes
app.post('/authenticate', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  });
);
app.post('/api/signUp', userController.signUp);
app.get('/logout', userController.destroySession);
app.get('/api/getUserInfo', userController.getUserInfo);
app.get('/isLoggedIn', userController.isLoggedIn);

// Connect to hot middleware
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
  // If user is not logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  } else {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  }
});

const port = 1337;
app.listen(port, function() { console.log(`Running on port ${port}`)});
