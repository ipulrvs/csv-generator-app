import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2FinalAuto extends Template {
	_title(){
		return "Eppt v2 Final Auto"
	}
	api = Config.host + "/api/EPPTs/generateFinalAuto"
}