import { DISCOVER_TV, DISCOVER_MOVIES } from '../actions/types';
import _ from 'lodash';

initialState = {
	page: 0,
	total_results: 0,
	total_pages: 0,
	tv : {},
	movies: {},
}
//function to turn 'results' array into an object for easier usage. god damn arrays	
function toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
	  rv[i] = arr[i];
	return rv;
 }

export const discoverReducer = (state = initialState, action) => {
	switch (action.type) {
		case DISCOVER_MOVIES:	
		 //let's assign our array to become an object here.
		 var movies = toObject(action.results);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				movies: movies
			}
		case DISCOVER_TV:		
		 var tvSeries = toObject(action.results);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				tv: tvSeries
			}
		default:
			return state;
	}
}