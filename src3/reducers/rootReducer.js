import { combineReducers } from 'redux';
import appReducer from '../modules/app/reducer';
import authReducer from '../modules/authentication/reducer';
import { persistReducer, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
};

const appPersistConfig = {
	key: 'app',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
};

const pReducer = persistCombineReducers(persistConfig, {
	appReducer: persistReducer(appPersistConfig, appReducer),
	authReducer: persistReducer(authPersistConfig, authReducer),
});

const rootReducer = combineReducers({
	appReducer,
	authReducer
});

export default pReducer;
