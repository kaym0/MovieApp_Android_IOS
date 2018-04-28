import { SEARCH_TV } from '../actions/searchActions';
import _ from 'lodash';

const tvState = {
	page: null,
	total_results: null,
	total_pages: null,
	results : {
	},
	searchText: ""
}


/**
 * @param arr array to convert into an object.
 * @example [{a: 1}, {b: 1}] returns {{a: 1}, {b: 1}}
 */
function toObject(arr) {
	var rv = {};
	for (var i = 0; i < arr.length; ++i)
	  rv[i] = arr[i];
	return rv;
 }

 /**
 * @description double tab after case declaration to help easily identify where cases begin and end at a glance
 */
export const tvReducer = (state = tvState, action) => {
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