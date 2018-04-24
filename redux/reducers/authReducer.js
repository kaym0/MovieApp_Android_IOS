import { SET_SESSION, REQUEST_TOKEN } from '../actions/types';


const authState = {
	request_token: "",
	session_id: ""
}


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
		default:
			return state;
	}
}