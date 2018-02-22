'use strict';

var path = require('path');

module.exports = function(app) {

	// Datasource
	var ds = app.dataSources.postgres;

	console.log(["Models"], "FakeDB")
  var FakeDB = app.models.FakeDB;
	FakeDB.sharedClass.methods().forEach(function(method) {
		console.log(["Method"], method.name)
		if(method.name == "create" || method.name == "find" || method.name == "files"){
			// Expose Method API
		} else {
			FakeDB.disableRemoteMethodByName(method.name, method.isStatic);
		}
	});

	var H2H = app.models.H2H;
	H2H.sharedClass.methods().forEach(function(method) {
		if(method.name == "generateUnlimitedFK" || method.name == "generateFM" || method.name == "generateLT" || method.name == "generateRDKM" || method.name == "generateVAT" || method.name == "generateDKDM" || method.name == "generateFK"){
			// Expose Method API
		} else {
			H2H.disableRemoteMethodByName(method.name, method.isStatic);
		}
	});

	var EPPT = app.models.EPPT;
	EPPT.sharedClass.methods().forEach(function(method) {
		if(method.name == "import"){
			// Expose Method API
		} else {
			EPPT.disableRemoteMethodByName(method.name, method.isStatic);
		}
	});

	// MIGRATE automigrate | autoupdate
	// ds.automigrate("FakeDB", function (err, result) {
	// 	console.log(["Migrate Table"], "Migrate Table FakeDB")
	// 	console.log(["Executing Seed"], "Initialize Seed FakeDB")
	// 	var seedFakeDBPATH = path.join(__dirname, "seed-fakedb.data.json")
	// 	console.log(["Finding FakeDB Seed"], seedFakeDBPATH)
	// 	var seedFakeDB = require(seedFakeDBPATH)
	// 	console.log(["FakeDB Seed Size"], seedFakeDB.length)
	// 	console.log(["Begin Process Seed Migration Fake DB"])
	// 	seedFakeDB.map(function (data, dataIndex){
	// 			FakeDB.create({
	// 				"createdAt": new Date(),
	// 				"updateAt": new Date(),
	// 				"no": dataIndex,
	// 				"name": data.name,
	// 				"firstName": data.firstName,
	// 				"lastName": data.lastName,
	// 				"gender": data.gender,
	// 				"email": data.email,
	// 				"address": data.address,
	// 				"city": data.city,
	// 				"transactionDate": data.transactionDate,
	// 				"month": data.month,
	// 				"year": data.year,
	// 				"code": data.code,
	// 				"code2": data.code2,
	// 				"code3": data.code3,
	// 				"price": data.price,
	// 				"phone": data.phone,
	// 				"state": data.state,
	// 				"ein": data.ein,
	// 				"street": data.street,
	// 				"country": data.country,
	// 				"postal": data.postal,
	// 				"taxNumber": data.taxNumber,
	// 				"company": data.company,
	// 				"alphaCode": data.alphaCode,
	// 				"date": data.date
	// 		}, function (err, done){
	// 		})
	// 	});
	// 	console.log(["Complete Process Seed Migration Fake DB"])
	// });
};
