import { SETTINGS_DISCOVER } from './types';

const API_KEY = "3e310aa84d4c1640df231f11e3ab3ea8";

export const optionsDiscover = (option) => (dispatch) => {
	dispatch({
		type: SETTINGS_DISCOVER,
		payload: option
	})
}
