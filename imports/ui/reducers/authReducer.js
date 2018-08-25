import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR } from '../constant/types'

const initialState = { 
	isAuthenticated: false,
	error: ''
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
    case LOGIN_USER:
      return { ...state, isAuthenticated: true, error: '' };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false, error: '' };
    case AUTH_ERROR:
			return { ...state, error: payload };
    default:
      return state;
  }
}
