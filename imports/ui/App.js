import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from "react-router-dom";

// Importing ui components
import Link from './components/Link';
import Login from './components/Login';
import NotFound from './components/NotFound';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Signup from './components/Signup';

// Importing actions
import { checkLoginStatus } from "./actions/auth";

class App extends Component {
	componentDidMount(){
		this.props.checkLoginStatus()
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<PublicRoute path="/" component={Login} exact={true} />
					<PublicRoute path="/signup" component={Signup} />
					<PrivateRoute path="/links" component={Link} />
					<Route component={NotFound} exact={true} />
				</Switch>
			</BrowserRouter>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	checkLoginStatus: () => dispatch(checkLoginStatus())
});


export default connect(null, mapDispatchToProps)(App);