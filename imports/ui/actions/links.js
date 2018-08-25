import { LINK_ERROR, LINK_SUCCESS, TOGGLE_HIDE_LINK } from "../constant/types";

export const addLink = (url) => dispatch => {
	Meteor.call("addLink", url, (err) => {
		if (err) dispatch({ type: LINK_ERROR, payload: err.reason })
		else dispatch({ type: LINK_SUCCESS });
	})
}

export const removeLink = (id) => dispatch => {
	Meteor.call("removeLink", id, err => {
		if (err) dispatch({ type: LINK_ERROR, payload: err.reason });
		else dispatch({ type: LINK_SUCCESS });
	});
}

export const toggleHide = () => ({
	type: TOGGLE_HIDE_LINK
})

export const toggleHideLink = (id) => dispatch => {
	Meteor.call("toggleHideLink", id, err => {
		if (err) dispatch({ type: LINK_ERROR, payload: err.reason });
    else dispatch({ type: LINK_SUCCESS });
	});
}

export const emptyError = () => ({ type: LINK_SUCCESS })