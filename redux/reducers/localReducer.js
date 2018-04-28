import { LOGIN_SUCCESS, TOGGLE_FAB } from '../actions/types'

const localState = {
	fab: false,
	value: "",
	error: "",
	login_success: null
}

export const localReducer = (state = localState, action) => {
	switch(action.type) {
		case TOGGLE_FAB:
			if (state.fab === false) {
				return {
					...state,
					fab: true
				}
			} else {
				return {
					...state,
					fab: false
				}
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				login_success: action.success
			}
			default:
				return state
	}
}


