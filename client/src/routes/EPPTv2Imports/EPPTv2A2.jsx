import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2A2 extends Template {
	_title(){
		return "Eppt v2 A2"
	}
	api = Config.host + "/api/EPPTs/generateA2"
}