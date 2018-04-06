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

export default class EPPTv2FinalAuto extends React.Component {
  api = Config.host + "/api/url"

  constructor(props){
    super(props)
    this.state = {
      form: {
        filename: "",
        size: 0,
        delimiter: ",",
        npwp: "000000000000000"
      }
    }
  }

  handleForm(field, event){
   var form = this.state.form
   if(field == "size"){
    form[field] = parseInt(event.target.value)
   } else {
    form[field] = event.target.value
   }
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
          axios.post(_this.api, _this.state.form).then(function (result){
            _this.setState({form: {
              filename: "",
              size: 0,
              delimiter: ",",
              type: 0,
              npwp: "000000000000000"
            }})
            resolve(true)
          })
        })
      }
    }).then(function(res){
      if(res.value){
        swal({
          title: "Success",
          text: "Download csv successfully generated, You can download it in files manager",
          type: "success"
        })
      }
    });
  }

  _addons(){
    return (
        <TextField 
        onChange={this.handleForm.bind(this, "npwp")} value={this.state.form.npwp}
        id="npwp" label="Npwp Profile" name="npwp" margin="normal" fullWidth={true} placeholder="Npwp Profile" />
    )
  }

  _title(){
      return "Eppt v2 Final Manual"
  }

  render() {
    return (
      <div className="content-fullwidth flex">
				<div className="window vbox">
          <div className="topbarSecondary">
            <AppBar position="static">
              <Toolbar className="toolbar">
                <Typography type="title" color="inherit">
                    {this._title()}
                </Typography>
                <Typography type="title" color="inherit" className="topbarSpace"></Typography>
                <Button color="contrast" aria-label="Menu" onClick={this.handleSubmit.bind(this)}>
                  <Icon>add</Icon> SUBMIT
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="content flex" style={{paddingTop: 36}}>
            <Paper>
              <form className="content" style={{paddingTop: 12, paddingBottom: 24}}>
                <TextField 
                  onChange={this.handleForm.bind(this, "filename")} value={this.state.form.filename}
                  id="filename" label="Filename" name="filename" margin="normal" fullWidth={true} placeholder="Input filename if field empty will get random name" />
                {this._addons()}
                <TextField 
                  onChange={this.handleForm.bind(this, "size")} value={this.state.form.size}
                  id="totalData" type="number" label="Total Data" name="totalData" margin="normal" fullWidth={true} placeholder="Total Data will be generated" />
                <div style={{paddingTop: 16, paddingBottom: 8}}>
                  <InputLabel htmlFor="delimiter">CSV Delimiter</InputLabel>
                  <Select
                    native={false}
                    value={this.state.form.delimiter}
                    onChange={this.handleForm.bind(this, "delimiter")}
                    input={<Input id="delimiter" fullWidth={true} margin="normal" id="delimiter" name="delimiter"/>}
                  >
                    <MenuItem value="," style={{width: 200}}>,</MenuItem>
                    <MenuItem value=";" style={{width: 200}}>;</MenuItem>
                  </Select>
                </div>
            </form>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}