
import { authReducer } from './authReducer';
import { movieReducer }  from './movieReducer';
import { localReducer } from './localReducer'
import { tvReducer } from './tvReducer'
import { discoverReducer } from './discoverReducer';
import { settingsReducer } from './settingsReducer'
import { userReducer } from './userReducer'
//import  { navigationReducer } from './navReducer'
export default rootReducer = {
	auth: authReducer,
	user: userReducer,
	movie: movieReducer,
	tv: tvReducer,
	discover: discoverReducer,
	settings: settingsReducer,
	local: localReducer,
//	navigationReducer
};