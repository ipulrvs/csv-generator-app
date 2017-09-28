import { combineReducers } from 'redux'

import GlobalReducer from './Global'
import SidebarReducer from './../components/Sidebar/Sidebar.service'

const Reducers = combineReducers({
	global: GlobalReducer,
	sidebar: SidebarReducer
})

export default Reducers