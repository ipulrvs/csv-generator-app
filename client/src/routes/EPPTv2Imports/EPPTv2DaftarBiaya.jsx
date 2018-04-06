import React from 'react'
import Config from './../../config/Server'
import Template from './../EPPTv2Imports/Template.jsx'

export default class EPPTv2DaftarBiaya extends Template {
	_title(){
		return "Eppt v2 Daftar Biaya"
	}
	api = Config.host + "/api/EPPTs/generateDaftarBiaya"
}