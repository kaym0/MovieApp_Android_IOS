import { LOGIN_STATUS, LOGIN_COMPLETE, USER_LOGGED_IN, CHECK_USER, SEARCH_TEXT, MOVIE_SEARCH, REQUEST_TOKEN, SET_SESSION } from './types';


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


export const checkUser = () => async (dispatch) => {
	dispatch({
		type: CHECK_USER,
		payload: null
	})
}

export const loginUser = (values) => async (dispatch) => {
	 try {
		let res1 = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
		let response1 = await res1.json()
		.then( async (resp1) => { 
			let firstRequestToken = resp1.request_token;
		  let res2 = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}&username=${values.username}&password=${values.password}&request_token=${firstRequestToken}`)
			let response2 = await res2.json()
		  .then( async(resp2)=>{
				let secondRequestToken = resp2.request_token;
				let res3 = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${secondRequestToken}`)
				let response3 = await res3.json()
				.then( (response3) => {		
					console.log(response3);			
					if (response3.success === true) {
						dispatch({
							type: USER_LOGGED_IN,
							payload: resp3,					
						})
						dispatch({
							type: LOGIN_STATUS,
							success: true
						})
					} else {
						dispatch({
							type: LOGIN_STATUS,
							success: false
						})
					}
				}).catch((error) => {
					dispatch({
						type: LOGIN_STATUS,
						success: false
					})
				})
			}).catch((error) => {
				dispatch({
					type: LOGIN_STATUS,
					success: false
				})
			})
		}).catch((error) => {
			dispatch({
				type: LOGIN_STATUS,
				success: false
			})
		})
	} catch (error){
		dispatch({
			type: LOGIN_STATUS,
			success: false
		})
	}
}


export const loginComplete = (response) =>  (dispatch) => {
	dispatch({
		type: LOGIN_COMPLETE,
		payload: response
	})
}