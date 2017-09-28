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

class FakeDB extends React.Component {
  render() {
    return (
      <div className="content-fullwidth flex">
        <div className="window vbox">
          <AppBar position="static" className="topbarSecondary">
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
          <div class="content-fullwidth flex">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Firstname</TableCell>
                  <TableCell>Secondaryname</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Firstname</TableCell>
                  <TableCell>Secondaryname</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Fullname</TableCell>
                  <TableCell>Firstname</TableCell>
                  <TableCell>Secondaryname</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                  <TableCell>Acep Muhamad Saepuloh</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>  
        </div>
      </div>
    );
  }
}

export default FakeDB