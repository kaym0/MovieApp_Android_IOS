import { 
  MOVIE_CREDITS,
  MOVIE_RECOMMENDATIONS,
  MOVIE_INFO,
	REFRESHING, 
	CHANGE_DISCOVER_PAGE_MOVIE, 
	CHANGE_DISCOVER_PAGE_TV, 
	GET_TV, GET_MOVIE, 
	DISCOVER_MOVIES, 
	DISCOVER_TV } from './types' 

const API_KEY = '3e310aa84d4c1640df231f11e3ab3ea8';

export const discoverMovies = () => async dispatch => {
	try { let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
		let response = await res.json();
		dispatch({
			type: DISCOVER_MOVIES,
			page: response.page,
			total_results: response.total_results,
			total_pages: response.total_pages,
			results: response.results
		})
	} catch (e) {
		null;
	}
}

export const discoverTV = (page) => async dispatch => {
	try {
		let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)
		let response = await res.json();
		dispatch({
			type: DISCOVER_TV,
			page: response.page,
			total_results: response.total_results,
			total_pages: response.total_pages,
			results: response.results
		})
	} catch (e) {
		null;
	}
}

export const update_movie_key = (key) => dispatch => {
	dispatch({
		type: GET_MOVIE,
		key: key
	})
}

export const update_tv_key = (key) => dispatch => {
	dispatch({
		type: GET_TV,
		key: key
	})
}

export const update_tv_discovery_page = (page) => async dispatch => {
	try { 
		let res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
		let response = await res.json()
		.then((response) => dispatch({
			type: CHANGE_DISCOVER_PAGE_TV,
			page: response.page,
			total_results: response.total_results,
			total_pages: response.total_pages,
			results: response.results,
		})).catch((e) => {
			console.error(e);
		}
		)
	} catch (e) {
		console.log(e);
	}
}

export const update_movie_discovery_page = (page) => async dispatch => {
	try { 
		let res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
		let response = await res.json()
		.then((response) => dispatch({
			type: CHANGE_DISCOVER_PAGE_MOVIE,
			page: response.page,
			total_results: response.total_results,
			total_pages: response.total_pages,
			results: response.results,
		})).catch((e) => {
			console.error(e);
		}
		)
	} catch (e) {
		null;
	}
}


export const _refreshing = (boolean) => dispatch => {
	dispatch({
		type: REFRESHING,
		payload: boolean
	})
}

export const fetch_movie_info = (movie_id) => async (dispatch) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
    let response = await res.json()
    .then((response) => {
      dispatch({
        type: MOVIE_INFO,
        payload: response
      })
    }).catch((error) => {
      console.log(error);
    })
  } catch (error) {
    console.log(error);
  }
};

export const fetch_movie_recommendations = (movie_id) => async (dispatch) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/movie/337167/recommendations?api_key=3e310aa84d4c1640df231f11e3ab3ea8&language=en-US&page=1`);
    let response = await res.json()
    .then((response) => {
      dispatch({
        type: MOVIE_RECOMMENDATIONS,
        payload: response.results
      })
    })
    .catch((error) => {
      console.log(error);
    })
  } catch (error) {
    console.log(error);
  }
}

export const fetch_movie_credits = (movie_id) => async (dispatch) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`);
    let response = await res.json()
    .then((response) => {
      dispatch({
        type: MOVIE_CREDITS,
        payload: response
      })
    })
    .catch ((e) => {
      console.log(e);
    })
  } catch (e) {
    console.log(e);
  }
}