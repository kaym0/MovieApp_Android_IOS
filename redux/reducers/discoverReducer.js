import { REFRESHING, CHANGE_DISCOVER_PAGE_TV, GET_TV, GET_MOVIE, DISCOVER_TV, DISCOVER_MOVIES } from '../actions/types';
import _ from 'lodash';

const discoverState = {
	page: 0,
	total_results: 0,
	total_pages: 0,
	tv : {},
	movies: {},
	movieInfoKey: 0,
	tvInfoKey: 0,
	refreshing: true
}
//function to turn 'results' array into an object for easier usage. god damn arrays	
function toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
	  rv[i] = arr[i];
	return rv;
 }

export const discoverReducer = (state = discoverState, action) => {
	switch (action.type) {
		case DISCOVER_MOVIES:	
		 //let's assign our array to become an object here.
		 let movies = toObject(action.results);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				movies: movies
			}
		case DISCOVER_TV:		
		 let tvSeries = toObject(action.results);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				tv: tvSeries
			}
		case GET_MOVIE:
			return {
				...state,
				movieInfoKey: action.key
			}
		case GET_TV:
			return {
				...state,
				tvInfoKey: action.key
			}
		case CHANGE_DISCOVER_PAGE_TV:
//		tvSeries = toObject(action.results);
			var result = Object.keys(state.tv).map(function(key) {
				return state.tv[key];
			});
			var updated = result.concat(action.results);
			let fullyUpdated = toObject(updated);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				tv: fullyUpdated
			}
		case REFRESHING:
			return {
				...state,
				refreshing: action.payload
			}
		default:
			return state;
	}
}