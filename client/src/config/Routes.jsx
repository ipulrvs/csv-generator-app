import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Sidebar from './../components/Sidebar/Sidebar.jsx'
import Topbar from './../components/Topbar/Topbar.jsx'
import Home from './../components/Home/Home.jsx'

/* Entities */
import FakeDB from './../routes/FakeDB/FakeDB.jsx'
import H2Hfk from './../routes/H2Hfk/H2Hfk.jsx'
import H2Hfm from './../routes/H2Hfm/H2Hfm.jsx'
import H2Hlt from './../routes/H2Hlt/H2Hlt.jsx'
import H2Hrdkm from './../routes/H2Hrdkm/H2Hrdkm.jsx'
import H2Hdkdm from './../routes/H2Hdkdm/H2Hdkdm.jsx'
import H2Hvat from './../routes/H2Hvat/H2Hvat.jsx'
import H2Hcancel from './../routes/H2Hcancel/H2Hcancel.jsx'
import EPPTimport from './../routes/EPPTimport/EPPTimport.jsx'
import FileManager from './../routes/FileManager/FileManager.jsx'

class Routes extends React.Component {
   render() {
      return (
        <Router>
          <div className="hbox hboxfix">
            <Route exact path="*" component={Sidebar} />
            <div className="main flex">
              <div className="window vbox">
                <Route exact path="*" component={Topbar} />
                <Route exact path="/" component={FileManager} />
                <Route exact path="/modules/fakedb" component={FakeDB} />
                <Route exact path="/modules/h2h/csv/fk" component={H2Hfk} />
                <Route exact path="/modules/h2h/csv/fm" component={H2Hfm} />
                <Route exact path="/modules/h2h/csv/lt" component={H2Hlt} />
                <Route exact path="/modules/h2h/csv/rdkm" component={H2Hrdkm} />
                <Route exact path="/modules/h2h/csv/dkdm" component={H2Hdkdm} />
                <Route exact path="/modules/h2h/csv/vat" component={H2Hvat} />
                <Route exact path="/modules/h2h/csv/cancel" component={H2Hcancel} />
                <Route exact path="/modules/eppt/runner/import" component={EPPTimport} />
              </div>
            </div>
          </div>
        </Router>
      );
   }
}

export default Routes