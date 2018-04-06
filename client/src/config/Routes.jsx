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
import Epptv2FinalManual from './../routes/EPPTv2Imports/EPPTv2FinalManual.jsx';
import EPPTv2FinalAuto from './../routes/EPPTv2Imports/EPPTv2FinalAuto.jsx'
import EPPTv2DaftarBiaya from './../routes/EPPTv2Imports/EPPTv2DaftarBiaya.jsx'
import EPPTv2Ssp from './../routes/EPPTv2Imports/EPPTv2Ssp.jsx'
import EPPTv2SatuMasa from './../routes/EPPTv2Imports/EPPTv2SatuMasa.jsx'
import EPPTv2TidakFinalManual from './../routes/EPPTv2Imports/EPPTv2TidakFinalManual.jsx'
import EPPTv2TidakFinalAuto from './../routes/EPPTv2Imports/EPPTv2TidakFinalAuto.jsx'


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
                <Route exact path="/modules/epptv2/csv/final_manual" component={Epptv2FinalManual} />
                <Route exact path="/modules/epptv2/csv/final_auto" component={EPPTv2FinalAuto} />
                <Route exact path="/modules/epptv2/csv/daftar_biaya" component={EPPTv2DaftarBiaya} />
                <Route exact path="/modules/epptv2/csv/ssp" component={EPPTv2Ssp} />
                <Route exact path="/modules/epptv2/csv/satu_masa" component={EPPTv2SatuMasa} />
                <Route exact path="/modules/epptv2/csv/tidak_final_manual" component={EPPTv2TidakFinalManual} />
                <Route exact path="/modules/epptv2/csv/tidak_final_auto" component={EPPTv2TidakFinalAuto} />
              </div>
            </div>
          </div>
        </Router>
      );
   }
}

export default Routes