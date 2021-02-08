import {
	createStore,
	applyMiddleware,
	combineReducers,
	bindActionCreators
} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import actionItem from './actionItem.js';
import reducerItem from './reducerItem.js';

let cachedMiddlewares = [];

export const getMiddlewares = () => {
	return cachedMiddlewares || [];
};

export const setMiddlewares = (arr = []) => {
	return (cachedMiddlewares = [ ...arr ]);
};

export default class Store {
	static store = null;

	constructor(props = [], reloadStore) {
		if (!Store['store'] || reloadStore) {
			Store['store'] = this._createStore(props);
		}
	};

	_createStore = (reducersArray = [], middleware) => {
		const appliedMiddleware = applyMiddleware(thunk, typeof middleware === 'function' ?
			middleware :
			(store) => (next) => (action) => {
			return next(action);
			});
		return createStore(this._combineReducers(reducersArray), undefined, appliedMiddleware);
	};

	_combineReducers = (reducersArray = []) => {
		let i = 0,
			reducers = {};
		while (i < reducersArray.length) {
			reducers[reducersArray[i].name] = reducersArray[i].reducer;
			i++;
		}
		return combineReducers(reducers);
	};

	static setActionItem = (modelName) => (dispatch) => {
		return bindActionCreators(actionItem('SET', modelName), dispatch);
	};

	static mergeActionItem = (modelName) => (dispatch) => {
		return bindActionCreators(actionItem('MERGE', modelName), dispatch);
	};

	static cleanActionItem = (modelName) => (dispatch) => {
		return bindActionCreators(actionItem('CLEAN', modelName), dispatch);
	};

	static reducerItem = (modelName, defaultState = {}) => {
		return reducerItem(modelName, defaultState);
	};

	static Provider = ({children}) => {
		return <Provider store={Store['store']}>
			{children}
		</Provider>
	};
};
