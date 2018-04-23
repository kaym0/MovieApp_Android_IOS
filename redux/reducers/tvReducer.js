import { SEARCH_TV } from '../actions/searchActions';
import _ from 'lodash';

initialState = {
	page: null,
	total_results: null,
	total_pages: null,
	results : {
	},
	searchText: ""
}

function toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
	  rv[i] = arr[i];
	return rv;
 }

export const tvReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_TV:		
		 var newobject = toObject(action.results);
			return {
				...state,
				page: action.page,
				total_results: action.total_results,
				total_pages: action.total_pages,
				results: newobject
			}
		default:
			return state;
	}
}