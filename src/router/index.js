import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
const AppRouter = props => {
	return (
		<Router className="bodyPage">
			<div className="head">
				<h1>The Mellow Lounge</h1>
			</div>
			<main className="main-body">
				<NavBar routes={routes} />
				<Switch className="main">
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							component={props => <Component {...props} />}
						></Route>
					))}
				</Switch>
			</main>
		</Router>
	);
};

export default AppRouter;
