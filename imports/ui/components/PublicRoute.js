import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route {...rest} component={props => (
		isAuthenticated ? (
			<Redirect to="/links" />
		) : (
				<Component {...props} />
			)
	)
	} />
);

const mapStateToProps = ({ auth }) => ({
	isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);