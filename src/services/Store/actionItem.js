
export default (type, modelName) => (payload) => (dispatch) => {
	dispatch({
		type: type +'_ITEM_'+ modelName,
		payload
	})
};
