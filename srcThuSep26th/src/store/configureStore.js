
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import pReducer from '../reducers/rootReducer';
import { persistStore } from 'redux-persist';

let middleware = [thunk];

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
	middleware = [...middleware];
}

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export function configureStore(initialState) {
	return createStore(
		pReducer,
		undefined,
		composeWithDevTools(
			applyMiddleware(...middleware),
			//applyMiddleware(autoRehydrate)	
			// other store enhancers if any
		)
	);
}

const store = configureStore();
export const persistor = persistStore(store, null, ()=>{
	store.getState()
});