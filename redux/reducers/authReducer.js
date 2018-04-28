import { LOGIN_STATUS, LOGIN_COMPLETE, USER_LOGGED_IN, CHECK_USER, SET_SESSION, REQUEST_TOKEN } from '../actions/types';


const authState = {
	request_token: "",
	session_id: "",
	success: null,
	user: "",
	login_status: false,
}

/**
 * @description double tab after case declaration to help easily identify where cases begin and end at a glance
 */
export const authReducer = (state = authState, action) => {
	switch(action.type) {
		case REQUEST_TOKEN:
				return {
					...state,
					request_token: action.payload
				}
		case SET_SESSION:
				return {
					...state,
					session_id: action.payload
				}
		case CHECK_USER:
		/**
		 * @todo 
		 * what is this suppose to do? 
		 * I can't remember. 
		 * It doesn't do anything.
		 * @todo
		 **/
				return {
					...state
				}
		case USER_LOGGED_IN:
				return {
					...state,
					session_id: action.payload.session_id,
					success: action.payload.success
				}
		case LOGIN_COMPLETE:
				return {
					...state,
					session_id: action.payload.session_id,
					success: action.payload.success
				}
		case LOGIN_STATUS:
				return {
					...state,
					login_status: action.success
				}
		default:
				return state;
	}
}
