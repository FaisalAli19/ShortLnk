import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from "./Header";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route {...rest} component={props => (
		isAuthenticated ? (
			<div>
				<Header />
				<Component {...props} />
			</div>
		) : (
			<Redirect to="/" />
		)
	)
	} />
);

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);