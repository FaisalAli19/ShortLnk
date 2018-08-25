import { LINK_ERROR, LINK_SUCCESS, TOGGLE_HIDE_LINK } from '../constant/types';

const initialState = {
	error: '',
	hide: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LINK_ERROR:
      return { ...state, error: payload };
    case LINK_SUCCESS:
      return { ...state, error: "" };
    case TOGGLE_HIDE_LINK:
      return { ...state, hide: !state.hide };
    default:
      return state;
  }
};
