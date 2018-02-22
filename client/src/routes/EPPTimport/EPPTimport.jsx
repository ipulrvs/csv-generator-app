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
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Field, reduxForm } from 'redux-form'
import Select from 'material-ui/Select';

import Config from './../../config/Server'
import axios from 'axios'
var api = Config.host + "/api/EPPTs/import"

class EPPTimport extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        location: "",
        size: 0,
        pasal: "",
        pasals: []
      }
    }
  }

  handleForm(field, event){
   var form = this.state.form
   if(field == "size"){
    form[field] = parseInt(event.target.value)
   } else if(field == "pasal"){ 
    form[field] = event.target.value
    form["pasals"].push({
       number: form.size,
       pasal: event.target.value
    })
    form["size"] = 0
   } else {
    form[field] = event.target.value
   }
   console.log(form)
   this.setState({form: form})
  }

  handleSubmit(){
    var _this = this
    swal({
      title: "Confirmation",
      text: "Are you sure want to submit this form",
      type: "info",
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function () {
        return new Promise(function (resolve, reject){
          axios.post(api, _this.state.form).then(function (result){
            console.log(result)
            _this.setState({form: {
              location: "",
              size: 0,
              pasal: "",
              pasals: []
            }})
            resolve()
          })
        })
      }
    }).then(function(){
      swal({
        title: "Success",
        text: "Test Runner requested has been send",
        type: "success"
      })
    });
  }

  render() {
    var pasals = this.state.form.pasals
    var pasalsView = []
    if(pasals.length > 0){
      pasals.map(function (item, index){
        pasalsView.push(
          <TableRow key={index}>
            <TableCell>{index + 1 }</TableCell>
            <TableCell>{item.pasal}</TableCell>
            <TableCell>{item.number}</TableCell>
          </TableRow>
        )
      })
    }
    return (
      <div className="content-fullwidth flex">
				<div className="window vbox">
          <div className="topbarSecondary">
            <AppBar position="static">
              <Toolbar className="toolbar">
                <Typography type="title" color="inherit">
                  EPPT Import Test Runner
                </Typography>
                <Typography type="title" color="inherit" className="topbarSpace"></Typography>
                <Button color="contrast" aria-label="Menu" onClick={this.handleSubmit.bind(this)}>
                  <Icon>add</Icon> RUN
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="content flex" style={{paddingTop: 36}}>
            <Paper>
              <form className="content" style={{paddingTop: 12, paddingBottom: 24}}>
                <TextField 
                  onChange={this.handleForm.bind(this, "location")} value={this.state.form.location}
                  id="location" label="Folder Location" name="location" margin="normal" fullWidth={true} placeholder="Folder contain csv location with prefix pasal_{number pasal}_.csv" />
                <TextField 
                  onChange={this.handleForm.bind(this, "size")} value={this.state.form.size}
                  id="totalData" type="number" label="Total Runner" name="totalData" margin="normal" fullWidth={true} placeholder="Total users that run the test" />
                <div style={{paddingTop: 16, paddingBottom: 8}}>
                  <InputLabel htmlFor="pasal">Type Pasal</InputLabel>
                  <Select
                    native={false}
                    value={this.state.form.pasal}
                    onChange={this.handleForm.bind(this, "pasal")}
                    input={<Input id="pasal" fullWidth={true} margin="normal" id="pasal" name="pasal"/>}
                  >
                    <MenuItem value="Pasal A1 Tidak Final" style={{width: 200}}>Pasal A1 Tidak Final</MenuItem>
                    <MenuItem value="Pasal A1 Final" style={{width: 200}}>Pasal A1 Final</MenuItem>
                    <MenuItem value="Pasal 23" style={{width: 200}}>Pasal 23</MenuItem>
                    <MenuItem value="Pasal 22" style={{width: 200}}>Pasal 22</MenuItem>
                    <MenuItem value="Pasal 4" style={{width: 200}}>Pasal 4</MenuItem>
                    <MenuItem value="Pasal 15" style={{width: 200}}>Pasal 15</MenuItem>
                  </Select>
                </div>
            </form>
            </Paper>
            <Paper style={{marginTop: 36}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Type Pasal</TableCell>
                    <TableCell>Runner</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pasalsView}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default EPPTimport