import { TOGGLE_FAB } from '../actions/types'

const localState = {
	fab: false,
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
			default:
				return state
	}
}


