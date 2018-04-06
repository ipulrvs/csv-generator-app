import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import App from './src/App.jsx'

/* begin Redux Configuration */
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Reducers from './src/config/Reducers'
/* dev */
// let store = createStore(Reducers, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
/* prod */
let store = createStore(Reducers, applyMiddleware(thunk))
/* end Redux Configuration */

/* load Theme Configuration */
import primary from 'material-ui/colors/red';
var Theme = createMuiTheme({
	palette: {
		primary: primary
	}
})
/* end Theme Configuration */

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={Theme}>
			<App />
		</MuiThemeProvider>
	</Provider>
, document.getElementById('app'))