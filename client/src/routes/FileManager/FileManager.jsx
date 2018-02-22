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
import Config from './../../config/Server'

import FileManagerAction from './FileManager.action'
import connect from 'redux-connect-decorator'
@connect(store => ({ 
  global: store.global,
  fileManager: store.modules.fileManager
}))
class FileManager extends React.Component {
  
  componentDidMount(){
    this.props.dispatch({type: FileManagerAction.initialize, param: {_this: this}})
  }

  handleDownloadFile(filename){
    window.open(Config.files+filename)
  }

  viewTableList(store, _this){
    const viewList = []
    const data = store.data
    if(data.length > 0){
      data.map(function (row, rowIndex){
        viewList.push(
          <TableRow key={rowIndex}>
            <TableCell>{rowIndex + 1}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <IconButton onClick={_this.handleDownloadFile.bind(_this, row.name)}>
                <Icon>file_download</Icon>
              </IconButton>
            </TableCell>
          </TableRow>  
        )
      })
    }
    return viewList
  }

  render() {
    const _store = this.props.fileManager
    var viewTableList = this.viewTableList(_store, this)
    window.hahaahFIlemnager = this
    console.log(viewTableList)
    return (
      <div className="content-fullwidth flex">
        <div className="window vbox">
          <div className="topbarSecondary">
            <AppBar position="static">
              <Toolbar className="toolbar">
                <Typography type="title" color="inherit">
                  File Manager
                </Typography>
                <Typography type="title" color="inherit" className="topbarSpace"></Typography>
              </Toolbar>
            </AppBar>
          </div>
          <div className="content-fullwidth flex">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Filename</TableCell>
                  <TableCell>Download</TableCell>
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

export default FileManager