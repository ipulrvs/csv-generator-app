import React from 'react'
import Routes from './config/Routes.jsx'

import connect from 'redux-connect-decorator'
@connect(store => ({ 
   global: store.global
}))
class App extends React.Component {
  render() {
    window.hahahaAPP = this
    return (
      <div className="hbox hboxfix">
        <Routes />
      </div>
    );
  }
}

export default App