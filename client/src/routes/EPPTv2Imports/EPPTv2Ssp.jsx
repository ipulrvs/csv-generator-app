import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2Ssp extends Template {
	_title(){
		return "Eppt v2 SSP"
	}
	api = Config.host + "/api/EPPTs/generateSsp"
}