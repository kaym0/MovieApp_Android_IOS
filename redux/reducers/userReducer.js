import { FETCH_USER_DATA, } from '../actions/types';

const userState = {
	avatar: "",
	id: 0,
	language: 'en',
	region: 'us',
	name: "",
	include_adult: false,
	username: ""
}


export const userReducer = (state = userState, action) => {
	switch (action.type) {
			case FETCH_USER_DATA:
				return {
					...state,
					avatar: `https://www.gravatar.com/avatar/${action.payload.avatar.gravatar.hash}.png`,
					id: action.payload.id,
					language: action.payload.iso_639_1,
					region: action.payload.iso_3166_1,
					name: action.payload.name,
					include_adult: action.payload.include_adult,
					username: action.payload.username
				}
			default:
				return state;
	}
}