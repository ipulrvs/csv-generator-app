import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import GlobalReducer from './Global'
import SidebarReducer from './../components/Sidebar/Sidebar.service'

import FakeDBReducer from './../routes/FakeDB/FakeDB.service'
import FileManagerReducer from './../routes/FileManager/FileManager.service'

const ModuleReducers = combineReducers({
	fakeDB: FakeDBReducer,
	fileManager: FileManagerReducer
})

const Reducers = combineReducers({
	global: GlobalReducer,
	sidebar: SidebarReducer,
	modules: ModuleReducers,
	form: formReducer
})

export default Reducers

