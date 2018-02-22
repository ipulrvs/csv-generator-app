'use strict';

module.exports = function(Eppt) {

	var Nightmare = require('nightmare')	
	require('nightmare-upload')(Nightmare);
	var config = { 
		show: true
	}
	
	Eppt.import = function(filename, size, pasal, pasals, cb) {
		console.log(filename, size, pasal, pasals)
		if(pasals.length > 0){
			pasals.map(function (item){
				if(item.pasal == "Pasal 23"){
					pasal23(location)
				}
			})
		}
		cb(null, "WORKS")
	}
	Eppt.remoteMethod('import', {
		accepts: [
			{arg: 'location', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'pasal', type: 'string'},
			{arg: 'pasals', type: 'array'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	var pasal23 = function (location){
		// Pasal 23
		console.log("Config: " + JSON.stringify(config))
		var nightmare = Nightmare(config)
			.goto("http://localhost:7000/")
			.wait(10000)
			.type('#username', '23user')
			.wait(1000)
			.type('#password', '12qwaszx')
			.wait(1000)
			.evaluate(function (){
				$('form').find('button').click()
			})
			.wait(3000)
			.goto("http://localhost:7000/#/import/pph23/bukti_potong")
			.wait(3000)
			.evaluate(function () {
				console.log("File Upload exist", $('input[type="file"]')[0])
				return "found input file";
			})
			.wait(1000)
			.upload('input[type="file"]', location).evaluate(function () {
				return "uploaded";
			})
			.wait(2000)
			.evaluate(function (){
				var formUpload = $('.form')[1];
				$(formUpload).find('button').click();
				console.log("OK ITS DONE")
			})
			.then(function (result){
				console.log("Complete: Success Pasal 23 User 1");
				console.log("Result: "+ JSON.stringify(result));
			}).catch(function (result){
				console.log("Complete: Failed Pasal 23 User 1");
				console.log("Result: "+ JSON.stringify(result));
			});
	}

};
