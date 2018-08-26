import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR, AUTH_PENDING } from '../constant/types'

const initialState = { 
	isAuthenticated: false,
	isPending: false,
	error: ''
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH_PENDING:
			return { ...state, isPending: true, error: '' };
    case LOGIN_USER:
      return { ...state, isAuthenticated: true, error: '', isPending: false };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false, error: '', isPending: false };
    case AUTH_ERROR:
			return { ...state, error: payload, isPending: false };
    default:
      return state;
  }
}
