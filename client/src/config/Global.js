function GlobalReducer(state = {
	initialize: false,
	moduleSwitch: false
}, action){
	switch(action.type){
		case "":
			return {
				...state
			}
		default: 
			return {
				...state
			}
	}
}

export default GlobalReducer