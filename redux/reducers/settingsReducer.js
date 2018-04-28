import {SETTINGS_DISCOVER} from '../actions/types'


const optionsState = {
	discover: "Movies"
}

/**
 * @description double tab after case declaration to help easily identify where cases begin and end at a glance
 */
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