import { DISCOVER_MOVIES, DISCOVER_TV } from './types' 

const API_KEY = '3e310aa84d4c1640df231f11e3ab3ea8';

export const discoverMovies = () => async dispatch => {
	let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
	let response = await res.json();
	dispatch({
		type: DISCOVER_MOVIES,
		page: response.page,
		total_results: response.total_results,
		total_pages: response.total_pages,
		results: response.results
	})
}

export const discoverTV = () => async dispatch => {
	let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)
	let response = await res.json();
	dispatch({
		type: DISCOVER_TV,
		page: response.page,
		total_results: response.total_results,
		total_pages: response.total_pages,
		results: response.results
	})
}