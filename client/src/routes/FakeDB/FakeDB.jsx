import React from 'react'

import Card, { CardActions, CardContent } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import FakeDBAction from './FakeDB.action'
import connect from 'redux-connect-decorator'
@connect(store => ({ 
  global: store.global,
  fakeDB: store.modules.fakeDB
}))
class FakeDB extends React.Component {
  componentDidMount(){
    this.props.dispatch({type: FakeDBAction.initialize, param: {_this: this}})
  }

  viewTableList(store, _this){
    const viewList = []
    const data = store.data
    if(data.length > 0){
      data.map(function (row, rowIndex){
        viewList.push(
          <TableRow key={rowIndex}>
            <TableCell>{rowIndex + 1}</TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.gender}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.address}</TableCell>
            <TableCell>{row.city}</TableCell>
            <TableCell>{row.transactionDate}</TableCell>
            <TableCell>{row.month}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.code2}</TableCell>
            <TableCell>{row.code3}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.state}</TableCell>
            <TableCell>{row.ein}</TableCell>
            <TableCell>{row.street}</TableCell>
            <TableCell>{row.country}</TableCell>
            <TableCell>{row.postal}</TableCell>
            <TableCell>{row.taxNumber}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.alphaCode}</TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>  
        )
      })
    }
    return viewList
  }

  render() {
    window.fakdb = this
    const _store = this.props.fakeDB
    var viewTableList = this.viewTableList(_store, this)
    return (
      <div className="content-fullwidth flex">
        <div className="window vbox">
          <div className="topbarSecondary">
            <AppBar position="static">
              <Toolbar className="toolbar">
                <Typography type="title" color="inherit">
                  Fake Database
                </Typography>
                <Typography type="title" color="inherit" className="topbarSpace"></Typography>
                <Button color="contrast" aria-label="Menu">
                  <Icon>add</Icon> ADD RECORD
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="content-fullwidth flex">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Firstname</TableCell>
                  <TableCell>Lastname</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>TransactionDate</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Code2</TableCell>
                  <TableCell>Code3</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Ein</TableCell>
                  <TableCell>Street</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Postal</TableCell>
                  <TableCell>TaxNumber</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>AlphaCode</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewTableList}
              </TableBody>
            </Table>
          </div>  
        </div>
      </div>
    );
  }
}

export default FakeDB