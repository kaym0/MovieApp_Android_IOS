import { SEARCH_MOVIE, SEARCH_TEXT } from './types';

const API_KEY = "3e310aa84d4c1640df231f11e3ab3ea8";

export const updateSearchText = (text) => (dispatch) => {
	dispatch({
		type: SEARCH_TEXT,
		payload: text
	})
}

export const searchMovie = (movie) => async (dispatch) => {
	try {
		let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movie}&page=1&include_adult=false`);
		let responseJson = await res.json();
		dispatch({
			type: SEARCH_MOVIE,
			page: responseJson.page,
			total_pages: responseJson.total_pages,
			total_results: responseJson.total_results,
			results: responseJson.results
		})
	} catch(error) {
		console.error(error);
	}
}

