import { FETCH_USER_DATA } from './types'

const API_KEY = "3e310aa84d4c1640df231f11e3ab3ea8"

export const fetch_user_data = (session_id) => async (dispatch) => {
	try {
		let res = await fetch(`https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${session_id}`);
		let response = await res.json()
			.then((response) => dispatch({
				type: FETCH_USER_DATA,
				payload: response
			})).catch((e) => {
				console.error(e);
			})
		} catch (e) {
			console.error(e);
		}
}