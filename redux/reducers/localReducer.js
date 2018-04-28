import { LOGIN_STATUS, TOGGLE_FAB } from '../actions/types'

const localState = {
	fab: false,
	value: "",
	error: "",
}

/**
 * @description double tab after case declaration to help easily identify where cases begin and end at a glance
 */
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
			default:
					return state
	}
}


