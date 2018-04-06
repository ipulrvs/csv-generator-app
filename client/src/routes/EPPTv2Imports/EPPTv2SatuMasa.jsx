import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2SatuMasa extends Template {
  _title(){
    return "Eppt v2 Satu Masa"
  }
  api = Config.host + "/api/EPPTs/generateSatuMasa"
}