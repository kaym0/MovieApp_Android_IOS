import { SEND_TO_LAYOUT, LOGIN_ACTIVE, SETTINGS_ACTIVE, MAIN_ACTIVE, SIDEBAR_COLORS, UPDATE_SIDEBAR, TOGGLE_FAB } from '../actions/types'

const ACTIVE_COLOR = "#1E202D";
const localState = {
	fab: false,
	value: "",
	error: "",
	sidebar: 0,
	main_color: "#1E202D",
	settings_color: "#191B28",
	login_color: "#191B28",
	current_route: "Main",
	go_back_state: null
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
		case UPDATE_SIDEBAR:
				return {
					...state,
					sidebar: action.payload
				}
		case SIDEBAR_COLORS:
				return {
					...state,
					main_color: "#191B28",
					settings_color: "#191B28",
					login_color: "#191B28",
				}
		case MAIN_ACTIVE:
				return {
					...state,
					main_color: "#1E202D",
				}
		case SETTINGS_ACTIVE:
				return {
					...state,
					settings_color: "#1E202D"
				}
		case LOGIN_ACTIVE:
				return {
					...state,
					login_color: "#1E202D"
				}
		case SEND_TO_LAYOUT:
				return {
					...state,
					go_back_state: action.payload
				}
			 default:
					return state
		}
}


