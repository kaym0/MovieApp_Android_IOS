import { 
  MOVIE_CREDITS,
  MOVIE_RECOMMENDATIONS,
  MOVIE_INFO,
	REFRESHING, 
	CHANGE_DISCOVER_PAGE_TV, 
	CHANGE_DISCOVER_PAGE_MOVIE,
	GET_TV, 
	GET_MOVIE, 
	DISCOVER_TV, 
	DISCOVER_MOVIES 
} from '../actions/types';
import _ from 'lodash';

const discoverState = {
	page: 0,
	total_results: 0,
	total_pages: 0,
	tv : {},
  movies: {},
  movie_info: {},
  movie_recommendations: {},
  cast: {},
  crew: {},
	movie_info_key: 0,
	tv_info_key: 0,
	refreshing: true
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
export const discoverReducer = (state = discoverState, action) => {
	switch (action.type) {
		case DISCOVER_MOVIES:	
		 /**
			* @description let's assign our array to become an object here.
			*/
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
					movie_info_key: action.key
				}
		case GET_TV:
				return {
					...state,
					tv_info_key: action.key
				}
		case CHANGE_DISCOVER_PAGE_TV:
				var result_tv = Object.keys(state.tv).map(function(key) {
					return state.tv[key];
				});
				var updated_tv = result_tv.concat(action.results);
				let fully_updated_tv = toObject(updated_tv);
				return {
					...state,
					page: action.page,
					total_results: action.total_results,
					total_pages: action.total_pages,
					tv: fully_updated_tv
				}
		case CHANGE_DISCOVER_PAGE_MOVIE:
				var result_movie = Object.keys(state.movies).map(function(key) {
					return state.movies[key];
				});
				var updated_movies = result_movie.concat(action.results);
				let fully_updated_movies = toObject(updated_movies);
				return {
					...state,
					page: action.page,
					total_results: action.total_results,
					total_pages: action.total_pages,
					movies: fully_updated_movies
				}
		case REFRESHING:
				return {
					...state,
					refreshing: action.payload
        }
    case MOVIE_INFO:
        let genres = toObject(action.payload.genres);
        let production_companies = toObject(action.payload.production_companies);
        let belongs_to_collection = toObject(action.payload.belongs_to_collection);
        let spoken_languages = toObject(action.payload.spoken_languages)
        let production_countries = toObject(action.payload.production_countries)
        return {
          ...state,
          movie_info: {...action.payload, genres, production_companies, spoken_languages, production_countries}
        }
    case MOVIE_RECOMMENDATIONS:
        let movierecommendations = toObject(action.payload);
        return {
          ...state,
          movie_recommendations: movierecommendations
        }
    case MOVIE_CREDITS:
        let cast = toObject(action.payload.cast);
        let crew = toObject(action.payload.crew);
        return {
          ...state,
          cast: cast,
          crew: crew
        }
		default:
				return state;
	}
}
