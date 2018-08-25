import { combineReducers } from "redux";

import authReducer from "./authReducer";
import linkReducer from './linkReducer';

export default appReducer = combineReducers({
	auth: authReducer,
	link: linkReducer
})