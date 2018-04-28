
import { authReducer } from './authReducer';
import { movieReducer }  from './movieReducer';
import { localReducer } from './localReducer'
import { tvReducer } from './tvReducer'
import { discoverReducer } from './discoverReducer';
import { settingsReducer } from './settingsReducer'

export default rootReducer = {
	auth: authReducer,
	movie: movieReducer,
	tv: tvReducer,
	discover: discoverReducer,
	settings: settingsReducer,
	local: localReducer,
};