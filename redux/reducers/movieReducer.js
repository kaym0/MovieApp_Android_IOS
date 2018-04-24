import { SEARCH_TEXT, SEARCH_MOVIE } from '../actions/types';
import _ from 'lodash';

const movieState = {
	page: null,
	total_results: null,
	total_pages: null,
	results : {
	},
	searchText: ""
}
/*
results : {
	vote_count: null,
	id: null,
	video: null,
	vote_average: null,
	title: null,
	popularity: null,
	poster_path: null,
	language: null,
	original_title: null,
	gendre_ids: [
		null
	],
	backdrop_path:	null,
	adult: null,
	release_date: null
}
*/
//function to turn 'results' array into an object for easier usage. god damn arrays	
function toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
	  rv[i] = arr[i];
	return rv;
 }

export const movieReducer = (state = movieState, action) => {
	switch (action.type) {
		case SEARCH_MOVIE:	
		 //let's assign our array to become an object here.
		 var newobject = toObject(action.results);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				results: newobject
			}
			// updates text
		case SEARCH_TEXT:
			return {
				...state,
				searchText: action.payload
			};
		default:
			return state;
	}
}