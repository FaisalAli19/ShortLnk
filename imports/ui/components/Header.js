import React from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../actions/auth';

const Header = ({ logoutUser }) => (
	<nav className="header">
		<div className="header__content">
			<h1 className="header__title">Short Lnk</h1>
			<button onClick={logoutUser} className="button button--noBg">Logout</button>
		</div>
	</nav>
);

const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(Header);