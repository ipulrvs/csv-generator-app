import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2A1 extends Template {
	_title(){
		return "Eppt v2 A1"
	}
	api = Config.host + "/api/EPPTs/generateA1"
}