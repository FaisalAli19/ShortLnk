import { Accounts } from 'meteor/accounts-base';

import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR, AUTH_PENDING } from '../constant/types';

export const createUser = ({ email, password }) => dispatch => {
	dispatch({ type: AUTH_PENDING })
	Accounts.createUser({ email, password}, (err) => {
		if(!err) dispatch({ type: LOGIN_USER })
		if(err)dispatch({ type: AUTH_ERROR, payload: err.reason });
	});
}

export const checkLoginStatus = () => dispatch => {
	const userId = Meteor.userId()
	if (!!userId) dispatch({ type: LOGIN_USER })
}

export const loginUser = ({ email, password }) => dispatch => {
	dispatch({ type: AUTH_PENDING });
	Meteor.loginWithPassword(email, password, (err) => {
		if (!err) dispatch({ type: LOGIN_USER })
		if (err)  dispatch({ type: AUTH_ERROR, payload: err.reason });
	})
}

export const logoutUser = () => dispatch => {
	Meteor.logout(err => {
		if (!err) dispatch({ type: LOGOUT_USER });
    if (err) dispatch({ type: AUTH_ERROR, payload: err.reason });
	})
}