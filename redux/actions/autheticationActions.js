import { SEARCH_TEXT, MOVIE_SEARCH, REQUEST_TOKEN, SET_SESSION } from './types';


const API_KEY = "3e310aa84d4c1640df231f11e3ab3ea8";

export const requestToken = () => async (dispatch) => {
	try {
	let res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
	let response = await res.json();
	dispatch({
		type: REQUEST_TOKEN,
		payload: response.request_token
	})
	} catch (e) {
		console.log("REQUEST_TOKEN error!");
	}
}


export const requestSession = (api_key) => async (dispatch) => {
	try {
		let res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`);
		let response = await res.json();

		dispatch({
			type: SET_SESSION,
			payload: response.guest_session_id
		})
	} catch (error) {
		console.log("Session ID error");
	}
}