import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2FinalManual extends Template {
  _title(){
    return "Eppt v2 Final Manual"
  }
  api = Config.host + "/api/EPPTs/generateFinalManual"
}