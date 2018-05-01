import { SEND_TO_LAYOUT, LOGIN_ACTIVE, SETTINGS_ACTIVE, MAIN_ACTIVE, SIDEBAR_COLORS, UPDATE_SIDEBAR, TOGGLE_FAB } from './types';

export const ToggleFab = () => (dispatch) => {
	dispatch({
		type: TOGGLE_FAB,
	})
}


export const updateSidebar = () => dispatch => {
	dispatch({
		type: UPDATE_SIDEBAR,
		payload: Math.random()
	})
}

export const sidebar_default_colors = () => dispatch => {
	dispatch({
		type: SIDEBAR_COLORS,
	})
}

export const main_active = () => dispatch => {
	dispatch({
		type: MAIN_ACTIVE
	})
}

export const settings_active = () => dispatch => {
	dispatch({
		type: SETTINGS_ACTIVE
	})
}

export const login_active = () => dispatch => {
	dispatch({
		type: LOGIN_ACTIVE
	})
}

export const sendToLayout = (goBack) => dispatch => {
	dispatch({
		type: SEND_TO_LAYOUT,
		payload: goBack
	})
}