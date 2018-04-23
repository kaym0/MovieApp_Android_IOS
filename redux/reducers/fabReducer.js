import { TOGGLE_FAB } from '../actions/types'

initialState = {
	fab: false
}

export const fabReducer = (state = initialState, action) => {
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