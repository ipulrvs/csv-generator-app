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
var api = Config.host + "/api/H2Hs/generateFM"

class H2Hfm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        filename: "",
        size: 0,
        delimiter: ","
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
          console.log(_this.state.form.filename, "SADSA")
          axios.post(api, _this.state.form).then(function (result){
            console.log(result)
            _this.setState({form: {
              filename: "",
              size: 0,
              delimiter: ","
            }})
            resolve()
          })
        })
      }
    }).then(function(){
      swal({
        title: "Success",
        text: "Download csv successfully generated, You can download it in files manager",
        type: "success"
      })
    });
  }

  render() {
    return (
      <div className="content-fullwidth flex">
				<div className="window vbox">
          <div className="topbarSecondary">
            <AppBar position="static">
              <Toolbar className="toolbar">
                <Typography type="title" color="inherit">
                  H2H CSV FM Generator
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

export default H2Hfm