import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2TidakFinalManual extends Template {
	_title(){
		return "Eppt v2 Tidak Final Manual"
	}
	api = Config.host + "/api/EPPTs/generateTidakFinalManual"
}