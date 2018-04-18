'use strict';

var json2csv = require('json2csv');
var path = require('path');
var fs = require('fs')

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

	Eppt.generateFinalAuto = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak", 
			"Tahun Pajak", 
			"Pembetulan", 
			"Nomor Bukti Potong", 
			"NPWP", 
			"NIK", 
			"Nama", 
			"Alamat", 
			"Email", 
			"Kode Pajak", 
			"Tarif", 
			"Golongan", 
			"Jumlah Bruto", 
			"NPWP Pemotong", 
			"Tanggal Bukti Potong", 
			"Gross Up", 
			"Referensi"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var bpt		    = masa
			if(bpt.split("").length == 1){
				bpt = "0"+bpt
			}
			var bp 			= "1.4-"+bpt+"."+tahun.slice(2,4)+"-"+bpr
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nik 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nama   		= fake.name + "_" + bpr;
			var alamat 		= fake.address + "_" + bpr;
			var email 		= fake.email + "_" + bpr;
			var kodePajaks  = ["21-401-01", "21-401-02", "21-402-01", "21-499-99"]
			var kodePajakr  = Math.floor(Math.random() * (3 - 0 + 1) + 0);
			var kodePajak 	= kodePajaks[kodePajakr]
			var tarif		= 5
			var golongan 	= "I-IV"
			var bruto		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var npwpProfil	= npwp_profile
			var mastTgl		= masa
			if(mastTgl.split("").length == 1){
				mastTgl = "0"+mastTgl
			}
			var tglBp		= "25/"+mastTgl+"/"+tahun
			var grossup		= "N"
			var ref 		= "generated"
			var row = [
				masa,
				tahun,
				pembetulan,
				bp,
				npwp,
				nik,
				nama,
				alamat,
				email,
				kodePajak,
				tarif,
				golongan,
				bruto,
				npwpProfil,
				tglBp,
				grossup,
				ref
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: ''});
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Final_Manual" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Final_Manual_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateFinalAuto', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateFinalManual = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak", 
			"Tahun Pajak", 
			"Pembetulan", 
			"Nomor Bukti Potong", 
			"NPWP", 
			"NIK", 
			"Nama", 
			"Alamat", 
			"Email", 
			"Kode Pajak", 
			"Jumlah Bruto", 
			"Tarif",
			"Jumlah PPh", 
			"NPWP Pemotong", 
			"Tanggal Bukti Potong", 
			"Referensi"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var bpt		    = masa
			if(bpt.split("").length == 1){
				bpt = "0"+bpt
			}
			var bp 			= "1.4-"+bpt+"."+tahun.slice(2,4)+"-"+bpr
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nik 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nama   		= fake.name + "_" + bpr;
			var alamat 		= fake.address + "_" + bpr;
			var email 		= fake.email + "_" + bpr;
			var kodePajaks  = ["21-401-01", "21-401-02", "21-402-01", "21-499-99"]
			var kodePajakr  = Math.floor(Math.random() * (3 - 0 + 1) + 0);
			var kodePajak 	= kodePajaks[kodePajakr]
			var bruto		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var tarif		= 5
			var pph			= Math.floor(Math.random() * (1000000000 - 1 + 1) + 1);
			var npwpProfil	= npwp_profile
			var mastTgl		= masa
			if(mastTgl.split("").length == 1){
				mastTgl = "0"+mastTgl
			}
			var tglBp		= "25/"+mastTgl+"/"+tahun
			var ref 		= "generated"
			var row = [
				masa,
				tahun,
				pembetulan,
				bp,
				npwp,
				nik,
				nama,
				alamat,
				email,
				kodePajak,
				bruto,
				tarif,
				pph,
				npwpProfil,
				tglBp,
				ref
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Final_Manual" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Final_Manual_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateFinalManual', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateDaftarBiaya = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Tahun Pajak",
			"Pembetulan",
			"Gaji Upah",
			"Biaya Transportasi",
			"Biaya Penyusutan Amortisasi",
			"Biaya Sewa",
			"Biaya Bunga Pinjaman",
			"Biaya Sehubungan dengan Jasa",
			"Biaya Utang Tertagih",
			"Biaya Royalti",
			"Biaya Pemasaran",
			"Biaya Lainya",
			"Npwp Pemotong"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			var pembetulan 	= 0;
			var no1		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no2		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no3		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no4		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no5		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no6		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no7		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no8		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no9		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var no10		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var row = [
				tahun,
				pembetulan,
				no1,
				no2,
				no3,
				no4,
				no5,
				no6,
				no7,
				no8,
				no9,
				no10,
				npwp_profile
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Daftar_Biaya" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Daftar_Biaya_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateDaftarBiaya', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateSsp = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak",
			"Tahun Pajak",
			"Pembetulan",
			"NTPN",
			"Tanggal SSP",
			"Jumlah SSP",
			"KAP",
			"KJS",
			"Kode Keterangan",
			"Npwp Pemotong"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var ntpn 		= Math.floor(Math.random() * (9999999999999999 - 1000000000000000 + 1) + 1000000000000000);
			var tgl 		= fake.date
			var jumlah		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var kaps 		= [
				"411121",
				"411127"
			]
			var kapr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0) + "";
			var kap			= kaps[kapr]
			var kjss		= [
				"100",
				"401",
				"402"
			]
			var kjsr		= Math.floor(Math.random() * (2 - 0 + 1) + 0) + "";
			var kjs			= kjss[kjsr]
			if(kap == "411127"){
				kjs = "104"
			}
			var kodes 		= [
				"0",
				"1",
				"2"
			]
			var koder		= Math.floor(Math.random() * (2 - 0 + 1) + 0) + "";
			var kode		= kodes[koder]
			var row = [
				masa,
				tahun,
				pembetulan,
				ntpn,
				tgl,
				jumlah,
				kap,
				kjs,
				kode,
				npwp_profile
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Ssp" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Ssp_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateSsp', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateSatuMasa = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak",
			"Tahun Pajak",
			"Pembetulan",
			"NPWP",
			"Nama",
			"WP Luar Negeri",
			"Kode Negara",
			"Kode Pajak",
			"Jumlah Bruto",
			"Jumlah PPh",
			"NPWP Pemotong"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nama   		= fake.name + "_" + bpr;
			var wpLuarNegeri= "N"
			var kodeNegara	= ""
			var kodePajaks	= [
				"21-100-01",
				"21-100-01"
			]
			var kodePajakr = Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var kodePajak   = kodePajaks[kodePajakr]
			var bruto		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var pph			= Math.floor(Math.random() * (1000000000 - 1 + 1) + 1);
			var row = [
				masa,
				tahun,
				pembetulan,
				npwp,
				nama,
				wpLuarNegeri,
				kodeNegara,
				kodePajak,
				bruto,
				pph,
				npwp_profile
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Satu_Masa" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Satu_Masa_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateSatuMasa', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateTidakFinalManual = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak",
			"Tahun Pajak",
			"Pembetulan",
			"Nomor Bukti Potong",
			"NPWP",
			"NIK",
			"Nama",
			"Alamat",
			"Email",
			"WP Luar Negeri",
			"Kode Negara",
			"Kode Pajak",
			"Jumlah Bruto",
			"Jumlah DPP",
			"Tarif",
			"Jumlah PPh",
			"NPWP Pemotong",
			"Tanggal Bukti Potong",
			"Referensi"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var bpt		    = masa
			if(bpt.split("").length == 1){
				bpt = "0"+bpt
			}
			var bp 			= "1.3-"+bpt+"."+tahun.slice(2,4)+"-"+bpr
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nik 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nama   		= fake.name + "_" + bpr;
			var alamat 		= fake.address + "_" + bpr;
			var email 		= fake.email + "_" + bpr;
			var wpLuarNegeri= "N"
			var kodeNegara  = ""
			var kodePajaks  = [
				"21-100-03",
				"21-100-04",
				"21-100-05",
				"21-100-06",
				"21-100-07",
				"21-100-08",
				"21-100-09",
				"21-100-10",
				"21-100-11",
				"21-100-12",
				"21-100-13",
				"21-100-99",
				"27-100-99",
			]
			var kodePajakr  = Math.floor(Math.random() * (12 - 0 + 1) + 0);
			var kodePajak 	= kodePajaks[kodePajakr]
			var bruto		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var dpp			= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var tarif		= 5
			var pph			= Math.floor(Math.random() * (1000000000 - 1 + 1) + 1);
			var npwpProfil	= npwp_profile
			var mastTgl		= masa
			if(mastTgl.split("").length == 1){
				mastTgl = "0"+mastTgl
			}
			var tglBp		= "25/"+mastTgl+"/"+tahun
			var ref 		= "generated"
			var row = [
				masa,
				tahun,
				pembetulan,
				bp,
				npwp,
				nik,
				nama,
				alamat,
				email,
				wpLuarNegeri,
				kodeNegara,
				kodePajak,
				bruto,
				dpp,
				tarif,
				pph,
				npwpProfil,
				tglBp,
				ref
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Tidak_Final_Manual" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Tidak_Final_Manual_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateTidakFinalManual', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateTidakFinalAuto = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak",
			"Tahun Pajak",
			"Pembetulan",
			"Nomor Bukti Potong",
			"NPWP",
			"NIK",
			"Nama",
			"Alamat",
			"Email",
			"WP Luar Negeri",
			"Kode Negara",
			"Kode Pajak",
			"Tipe Penghasilan", 
			"Dipotong Oleh",
			"Cara Pembayaran",
			"Status PTKP",
			"Jumlah Tanggungan",
			"Jumlah Hari Kerja",
			"Jumlah Bruto",
			"NPWP Pemotong",
			"Tanggal Bukti Potong",
			"Gross Up",
			"Referensi"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var bpt		    = masa
			if(bpt.split("").length == 1){
				bpt = "0"+bpt
			}
			var bp 			= "1.3-"+bpt+"."+tahun.slice(2,4)+"-"+bpr
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nik 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nama   		= fake.name + "_" + bpr;
			var alamat 		= fake.address + "_" + bpr;
			var email 		= fake.email + "_" + bpr;
			var wpLuarNegeri= "N"
			var kodeNegara  = ""
			var kodePajaks  = [
				"21-100-03",
				"21-100-04",
				"21-100-05",
				"21-100-06",
				"21-100-07",
				"21-100-08",
				"21-100-09",
				"21-100-10",
				"21-100-11",
				"21-100-12",
				"21-100-13",
				"21-100-99",
				"27-100-99",
			]
			var kodePajakr  = Math.floor(Math.random() * (12 - 0 + 1) + 0);
			var kodePajak 	= kodePajaks[kodePajakr]
			var tipeP		= "B"
			var dipotongs 		= [
				"SPK",
				"LSPK"
			]
			var dipotongr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var dipotong 		= dipotongs[dipotongr];
			var caraBayar	= "B"
			var ptkp		= "K"
			var jtangungan  = "1"
			var jharikerja  = "30"
			var bruto		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var npwpProfil	= npwp_profile
			var mastTgl		= masa
			if(mastTgl.split("").length == 1){
				mastTgl = "0"+mastTgl
			}
			var tglBp		= "25/"+mastTgl+"/"+tahun
			var grossup		= "Y"
			var ref 		= "generated"
			var row = [
				masa,
				tahun,
				pembetulan,
				bp,
				npwp,
				nik,
				nama,
				alamat,
				email,
				wpLuarNegeri,
				kodeNegara,
				kodePajak,
				tipeP,
				dipotong,
				caraBayar,
				ptkp,
				jtangungan,
				jharikerja,
				bruto,
				npwpProfil,
				tglBp,
				grossup,
				ref
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_Tidak_Final_Auto" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_Tidak_Final_Auto_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateTidakFinalAuto', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateA2 = async (filename, size, delimiter, npwp_profile, month, year, nama_profile, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak",
			"Tahun Pajak",
			"Pembetulan",
			"Nomor Bukti Potong",
			"Masa Perolehan Awal",
			"Masa Perolehan Akhir",
			"NPWP",
			"NIP",
			"NIK",
			"Nama",
			"Pangkat",
			"Golongan",
			"Alamat",
			"Email",
			"Jenis Kelamin",
			"Status PTKP",
			"Jumlah Tanggungan",
			"Nama Jabatan",
			"Kode Pajak",
			"Jumlah 1",
			"Jumlah 2",
			"Jumlah 3",
			"Jumlah 4",
			"Jumlah 5",
			"Jumlah 6",
			"Jumlah 7",
			"Jumlah 8",
			"Jumlah 9",
			"Jumlah 10",
			"Jumlah 11",
			"Jumlah 12",
			"Jumlah 13",
			"Jumlah 14",
			"Jumlah 15",
			"Jumlah 16",
			"Jumlah 17",
			"Jumlah 18",
			"Jumlah 19",
			"Jumlah 20",
			"Jumlah 21",
			"Jumlah 22",
			"Jumlah 23",
			"Jumlah 23a",
			"Jumlah 23b",
			"Status Pindah",
			"Nama Pemotong",
			"Npwp Pemotong",
			"Tanggal Bukti Potong",
			"Referensi"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var bpt		    = masa
			if(bpt.split("").length == 1){
				bpt = "0"+bpt
			}
			var bp 			= "1.2-"+bpt+"."+tahun.slice(2,4)+"-"+bpr
			var awal 		= "1"
			var akhir		= "12"
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nip 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nik 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nama   		= fake.name + "_" + bpr;
			var golongan	= "Ia"
			var pangkat		= "Juru MUda"
			var alamat 		= fake.address + "_" + bpr;
			var email 		= fake.email + "_" + bpr;
			var kelamins	= ["L", "P"]
			var kelaminr	=  Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var kelamin		= kelamins[kelaminr];
			var ptkps		= ["TK", "K", "K/I"]
			var ptkpr		= Math.floor(Math.random() * (2 - 0 + 1) + 0);
			var ptkp		= ptkps[ptkpr]
			var tanggungans = ["0", "1", "2", "3"]
			var tanggunganr = Math.floor(Math.random() * (3 - 0 + 1) + 0);
			var tanggungan  = tanggungans[tanggunganr]
			var jabatan     = "Pegawai"
			var kodePajaks  = [
				"21-100-01",
				"21-100-02"
			]
			var kodePajakr  = Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var kodePajak   = kodePajaks[kodePajakr]
			var jumlah1		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah2		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah3		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah4		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah5		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah6		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah7		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah8		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah9		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah10		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah11		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah12		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah13		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah14		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah15		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah16		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah17		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah18		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah19		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah20		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah21		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah22		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah23		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah23a		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah23b		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var pindah      = ""
			var npwpProfil	= npwp_profile
			var mastTgl		= masa
			if(mastTgl.split("").length == 1){
				mastTgl = "0"+mastTgl
			}
			var tglBp		= "25/"+mastTgl+"/"+tahun
			var ref 		= "generated"
			var row = [
				masa,
				tahun,
				pembetulan, 
				bp,
				awal,
				akhir,
				npwp,
				nip,
				nik,
				nama,
				pangkat,
				golongan, 
				alamat,
				email,
				kelamin,
				ptkp,
				tanggungan,
				jabatan,
				kodePajak,
				jumlah1,
				jumlah2,
				jumlah3,
				jumlah4,
				jumlah5,
				jumlah6,
				jumlah7,
				jumlah8,
				jumlah9,
				jumlah10,
				jumlah11,
				jumlah12,
				jumlah13,
				jumlah14,
				jumlah15,
				jumlah16,
				jumlah17,
				jumlah18,
				jumlah19,
				jumlah20,
				jumlah21,
				jumlah22,
				jumlah23,
				jumlah23a,
				jumlah23b,
				pindah,
				nama_profile,
				npwpProfil,
				tglBp,
				ref
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_A2" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_A2_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateA2', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	Eppt.generateA1 = async (filename, size, delimiter, npwp_profile, month, year, cb) => {
		var fakeDB = Eppt.app.models.FakeDB;
		var dummies = await fakeDB.find({})
		var generate = size;
		var header = [
			"Masa Pajak",
			"Tahun Pajak",
			"Pembetulan",
			"Nomor Bukti Potong",
			"Masa Perolehan Awal",
			"Masa Perolehan Akhir",
			"NPWP",
			"NIK",
			"Nama",
			"Alamat",
			"Email",
			"Jenis Kelamin",
			"Status PTKP",
			"Jumlah Tanggungan",
			"Nama Jabatan",
			"WP Luar Negeri",
			"Kode Negara",
			"Kode Pajak",
			"Jumlah 1",
			"Jumlah 2",
			"Jumlah 3",
			"Jumlah 4",
			"Jumlah 5",
			"Jumlah 6",
			"Jumlah 7",
			"Jumlah 8",
			"Jumlah 9",
			"Jumlah 10",
			"Jumlah 11",
			"Jumlah 12",
			"Jumlah 13",
			"Jumlah 14",
			"Jumlah 15",
			"Jumlah 16",
			"Jumlah 17",
			"Jumlah 18",
			"Jumlah 19",
			"Jumlah 20",
			"Status Pindah",
			"Nama Pemotong",
			"NPWP Pemotong",
			"Tanggal Bukti Potong",
			"Calculate Otomatis",
			"Referensi"
		]
		var bigdata = [];
		var counter = 0;

		bigdata.push(header)

		while(counter < generate){
			var faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
			var fake  		= dummies[faker]
			if(fake == null){
			 	faker 		= Math.floor(Math.random() * (dummies.length - 0 + 1) + 0);
				fake  		= dummies[faker]
			}
			var masa 		= Math.floor(Math.random() * (12 - 1 + 1) + 1) + "";
			if(month){
				masa = month
			}
			var tahun 		= Math.floor(Math.random() * (2018 - 1945 + 1) + 1945);
			if(year){
				tahun = year
			}
			var pembetulan 	= 0;
			var bpr 		= Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
			var bpt		    = masa
			if(bpt.split("").length == 1){
				bpt = "0"+bpt
			}
			var bp 			= "1.1-"+bpt+"."+tahun.slice(2,4)+"-"+bpr
			var awal 		= "1"
			var akhir		= "12"
			var npwps 		= [
				"719547416445000",
				"000000000000000"
			]
			var npwpr 		= Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var npwp 		= npwps[npwpr];
			var nip 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nik 		= Math.floor(Math.random() * (9999999 - 1 + 1) + 1);
			var nama   		= fake.name + "_" + bpr;
			var golongan	= ""
			var pangkat		= ""
			var alamat 		= fake.address + "_" + bpr;
			var email 		= fake.email + "_" + bpr;
			var kelamins	= ["L", "P"]
			var kelaminr	=  Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var kelamin		= kelamins[kelaminr];
			var ptkps		= ["TK", "K", "K/I"]
			var ptkpr		= Math.floor(Math.random() * (2 - 0 + 1) + 0);
			var ptkp		= ptkps[ptkpr]
			var tanggungans = ["0", "1", "2", "3"]
			var tanggunganr = Math.floor(Math.random() * (3 - 0 + 1) + 0);
			var tanggungan  = tanggungans[tanggunganr]
			var jabatan     = "Pegawai"
			var kodePajaks  = [
				"21-100-01",
				"21-100-02"
			]
			var kodePajakr  = Math.floor(Math.random() * (1 - 0 + 1) + 0);
			var kodePajak   = kodePajaks[kodePajakr]
			var jumlah1		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah2		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah3		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah4		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah5		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah6		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah7		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah8		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah9		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah10		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah11		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah12		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah13		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah14		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah15		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah16		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah17		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah18		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah19		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah20		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah21		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah22		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah23		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah23a		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var jumlah23b		= Math.floor(Math.random() * (1000000000000 - 1 + 1) + 1);
			var pindah      = ""
			var npwpProfil	= npwp_profile
			var mastTgl		= masa
			var kodeNegara  = ""
			var calculateOtomatis = "N"
			var jabatan = ""
			var kodeNegara = ""
			var wpLuarNegeri = "N"
			if(mastTgl.split("").length == 1){
				mastTgl = "0"+mastTgl
			}
			var tglBp		= "25/"+mastTgl+"/"+tahun
			var ref 		= "generated"
			var row = [
				masa,
				tahun,
				pembetulan,
				bp,
				awal,
				akhir,
				npwp,
				nik,
				nama,
				alamat,
				email,
				kelamin,
				ptkp,
				tanggungan,
				jabatan,
				wpLuarNegeri,
				kodeNegara,
				kodePajak,
				jumlah1,
				jumlah2,
				jumlah3,
				jumlah4,
				jumlah5,
				jumlah6,
				jumlah7,
				jumlah8,
				jumlah9,
				jumlah10,
				jumlah11,
				jumlah12,
				jumlah13,
				jumlah14,
				jumlah15,
				jumlah16,
				jumlah17,
				jumlah18,
				jumlah19,
				jumlah20,
				pindah,
				nama,
				npwpProfil,
				tglBp,
				calculateOtomatis,
				ref
			]
			bigdata.push(row)
			console.log("[Counter] generate row number = ", counter);
			counter++;
		}
		var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter, quotes: '' });
		var filecode = Math.floor(Math.random() * 1000000000000) + "";
		var csvName = "Csv_Pasal_21_A1" + filecode + ".csv";
		if(filename){
			var csvName = "Csv_Pasal_21_A1_" + filename + "_" + filecode + ".csv";
		}
		var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
		fs.writeFile(filesFolder, csv, function(err) {
			console.log(["File Path = "], filesFolder);
		});
		return cb(null, "ok")
	}
	Eppt.remoteMethod('generateA1', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'npwp', type: 'string'},
			{arg: 'month', type: 'string'},
			{arg: 'year', type: 'string'},
			{arg: 'nama', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

};
