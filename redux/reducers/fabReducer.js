import { TOGGLE_FAB } from '../actions/types'

const localState = {
	fab: false
}

export const fabReducer = (state = localState, action) => {
	switch(action.type) {
		case TOGGLE_FAB:
		console.log(state.fab)
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