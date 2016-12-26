import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import checkAuth from './lib/checkAuth.js';

import Layout from './modules/shared/Layout.jsx';
import Home from './modules/home/home.jsx';

const rootRoute = (
  <Router history={browserHistory}>
      <Route path='/' component={Layout}>
          <IndexRoute component={Home} onEnter={checkAuth} />
      </Route>
  </Router>
);

render(
	rootRoute,
	document.getElementById('app')
);
