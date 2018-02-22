import FakeDBAction from './FakeDB.action'
import Config from './../../config/Server'
import axios from 'axios'
var api = Config.host + "/api/FakeDBs"

function FakeDBReducer(state = {
	api: api,
	data: []
}, action){
	switch(action.type){
		case FakeDBAction.initialize:
			console.log("FakeDB Initialize", api)
			var _this = action.param._this
			var findAll = new Promise(function (resolve, reject){
				axios.get(api, {
					method: "GET",
					params: {
						filter: {
							limit: 50
						}
					}
				}).then(function (res){
					resolve(res)
				}).catch(function (res){
					resolve({data: []})
				})
			})
			findAll.then(function (result){
				_this.props.dispatch({type: FakeDBAction.findAll, param: result.data})
			})
		case FakeDBAction.findAll: 
			return {
				...state,
				data: action.param
			}
		default: 
			return {
				...state
			}
	}
}

export default FakeDBReducer