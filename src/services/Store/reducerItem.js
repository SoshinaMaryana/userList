
export default (name, defaultState = {}) => ({
	name,
	reducer: (state = defaultState, action) => {
		if (action.type.indexOf('_'+ name) > 0) {
			let cached = state;
			let lastKey;
			if (action.type.indexOf('_FORCE_') === - 1 &&
				action.type.indexOf(name) > -1 &&
				action.payload && 
				action.payload.keys && 
				action.payload.keys.length > 0) {
				const keys = [ ...action.payload.keys ];
				
				lastKey = keys[keys.length - 1];
				keys.pop();
				keys.forEach((key, i) => {
					if (cached && cached[key]) {
						cached = cached[key];
					}
				});
			}

			switch(action.type) {
				case 'CLEAN_ITEM_'+ name:
					return {};

				case 'SET_ITEM_'+ name:
					return {
						...action.payload
					};

				case 'NEW_SET_FORCE_'+ name:
					return {
						...state,
						...action.payload
					};

				case 'NEW_SET_ITEM_'+ name:
					typeof lastKey !== 'undefined' ?
						(cached[lastKey] = typeof cached[lastKey] === 'object' ?
							Array.isArray(cached[lastKey]) ? [
								...(action.payload.value || []),
							] : {
								...(action.payload.value || {}),
							} :
						action.payload.value) :
						(state = typeof state === 'object' ?
							Array.isArray(state) ? [
								...(action.payload.value || []),
							] : {
								...(action.payload.value || {}),
							} :
						action.payload.value);
					return { ...state };

				case 'NEW_MERGE_ITEM_'+ name:
					typeof lastKey !== 'undefined' ?
						(cached[lastKey] = typeof cached[lastKey] === 'object' ?
							Array.isArray(cached[lastKey]) ? [
								...cached[lastKey],
								...(action.payload.value || []),
							] : {
								...cached[lastKey],
								...(action.payload.value || {}),
							} :
						action.payload.value) :
						(state = typeof state === 'object' ?
							Array.isArray(state) ? [
								...state,
								...(action.payload.value || []),
							] : {
								...state,
								...(action.payload.value || {}),
							} :
						action.payload.value);
					return { ...state };

				case 'MERGE_ITEM_'+ name:
					return {
						...state,
						...action.payload
					};

				default:
					return { ...state };
			}
		}
		return { ...state };
	}
});