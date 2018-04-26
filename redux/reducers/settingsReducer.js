import {SETTINGS_DISCOVER} from '../actions/types'


const optionsState = {
	discover: "TV"
}

export const settingsReducer = (state = optionsState, action) => {
	switch(action.type) {
		case SETTINGS_DISCOVER:
			return {
				...state,
				discover: action.payload
			}
		default:
			return state;
	}
}