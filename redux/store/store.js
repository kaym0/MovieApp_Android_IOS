import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { persistReducer, persistStore, persistCombineReducers } from 'redux-persist';
import rootReducer from '../reducers/index'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const persistConfig = {
	key: 'root',
	//blacklist: ['fonts'],
	storage: storage,
};

const reducers = persistCombineReducers(persistConfig, rootReducer)

const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = [thunk];

export const store = createStore(
	persistedReducer,
	{},
	compose(composeWithDevTools(applyMiddleware(...middleware))),
);


export const persistor = persistStore(store);
