import FileManagerAction from './FileManager.action'
import Config from './../../config/Server'
import axios from 'axios'
var api = Config.host + "/api/FakeDBs/files"

function FileManagerReducer(state = {
	api: api,
	data: []
}, action){
	switch(action.type){
		case FileManagerAction.initialize:
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
				var data = result.data.res
				_this.props.dispatch({type: FileManagerAction.findAll, param: data})
			})
		case FileManagerAction.findAll: 
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

export default FileManagerReducer