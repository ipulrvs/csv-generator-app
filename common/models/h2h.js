'use strict';

var json2csv = require('json2csv');
var path = require('path');
var fs = require('fs')

module.exports = function(H2h) {

	H2h.generateFK = function(filename, size, delimiter, sizeChild, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;

			var headerFK = [
				"FK",
				"KD_JENIS_TRANSAKSI",
				"FG_PENGGANTI",
				"NOMOR_FAKTUR",
				"MASA_PAJAK",
				"TAHUN_PAJAK",
				"TANGGAL_FAKTUR",
				"NPWP",
				"NAMA",
				"ALAMAT_LENGKAP",
				"JUMLAH_DPP",
				"JUMLAH_PPN",
				"JUMLAH_PPNBM",
				"ID_KETERANGAN_TAMBAHAN",
				"FG_UANG_MUKA",
				"UANG_MUKA_DPP",
				"UANG_MUKA_PPN",
				"UANG_MUKA_PPNBM",
				"REFERENSI"
			]
			var headerLT = [
				"LT",
				"NPWP",
				"NAMA",
				"JALAN",
				"BLOK",
				"NOMOR",
				"RT",
				"RW",
				"KECAMATAN",
				"KELURAHAN",
				"KABUPATEN",
				"PROPINSI",
				"KODE_POS",
				"NOMOR_TELEPON",
				"",
				"",
				"",
				"",
				""
			]
			var headerOF = [
				"OF",
				"KODE_OBJEK",
				"NAMA",
				"HARGA_SATUAN",
				"JUMLAH_BARANG",
				"HARGA_TOTAL",
				"DISKON",
				"DPP",
				"PPN",
				"TARIFPPNBM",
				"PPNBM",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			]

			var sources = dummyData
			var sourcesIndex = 0;
			var sourcesSize = 0;
			var bigdata = [];
			bigdata.push(headerFK);
			bigdata.push(headerLT);
			bigdata.push(headerOF);
			var sizeOF = sizeChild;
			var reqData = size;
			var reqContainer = [];

			var generateOF = function(){
				var count = 0;
				while(count < reqData){
					var randomOF = Math.floor(Math.random() * sizeOF) + 1;
					reqContainer.push({
						index: count,
						fk: 1,
						of: randomOF
					})
					sourcesSize += randomOF+1;
					count++;
				}
			};
			var generateData = function(){
				reqContainer.map(function(rowReq){
					var ofs = rowReq.of;
					var count = 0;
					var rowOF = [];
					var fkdpp = 0;
					var fkppn = 0;
					while(count < ofs){
						var fake = Math.floor(Math.random() * dummyData.length) + 1;
						var source = sources[fake];
						console.log('OFS', fake, sourcesIndex, source, dummyData.length)
						if(!source){
								var fake = Math.floor(Math.random() * dummyData.length) + 1;
								var source = sources[fake];
								console.log('OFS2', fake, sourcesIndex, source, dummyData.length)
							}
						var random = Math.random() + "";
						var randomSplit = random.split('.');
						var randomString = randomSplit[1];
						var nama = source.firstName + " " + source.lastName;
						nama = nama.toUpperCase();
						var code = source.code + count;
						code = code.toUpperCase();
						var harga = parseInt(randomString.slice(0, 6)) + 100000;
						var dpp = harga;
						var ppn = (harga*10) / 100;
						fkdpp += dpp;
						fkppn += ppn;
						rowOF.push([
							"OF",
							code,
							nama,
							harga,
							1,
							harga,
							0,
							dpp,
							ppn,
							0,
							0,
							"",
							"",
							"",
							"",
							"",
							"",
							"",
							""
						])
						var ofsFinal = ofs - 1;
						if(ofsFinal == count){
							sourcesIndex += 1;
							var fake = Math.floor(Math.random() * dummyData.length) + 1;
							var source = sources[fake];
							console.log('OFSFINAL', fake, sourcesIndex, source, dummyData.length)
							if(!source){
								var fake = Math.floor(Math.random() * dummyData.length) + 1;
								var source = sources[fake];
								console.log('OFSFINAL2', fake, sourcesIndex, source, dummyData.length)
							}
							var nama = source.firstName + " " + source.lastName;
							nama = nama.toUpperCase();
							var alamat = source.street;
							alamat = alamat.toUpperCase();
							var code = source.code;
							code = code.toUpperCase();
							var rowFinal = [];
							var random = Math.random() + "";
							var randomSplit = random.split('.');
							var randomString = randomSplit[1];
							var npwp = randomString.slice(0, 15);
							if(npwp.length < 15){
							  while (npwp.length < 15){
							    npwp += 0;
                }
              }
							var faktur = randomString.slice(0, 13);
              if(faktur.length < 13){
                while (faktur.length < 13){
                  faktur += 0;
                }
              }
							var referensi = randomString.slice(0, 12);
              if(referensi.length < 12){
                while (referensi.length < 12){
                  referensi += 0;
                }
              }
							rowFinal.push([
								"FK",
								"01",
								"0",
								faktur,
								"9",
								"2016",
								"01/09/2016",
								npwp,
								nama,
								alamat,
								fkdpp,
								fkppn,
								"0",
								"",
								"0",
								"0",
								"0",
								"0",
								referensi
							])
							rowFinal = rowFinal.concat(rowOF);
							bigdata = bigdata.concat(rowFinal);
						}
						sourcesIndex++;
						count++;
					}
				})
			}

			generateOF()
			generateData()

			console.log(bigdata)

			var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HFK_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HFK_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateFK', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'sizeChild', type: 'integer'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateFKs = function(filename, size, delimiter, sizeChild) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;

			var headerFK = [
				"FK",
				"KD_JENIS_TRANSAKSI",
				"FG_PENGGANTI",
				"NOMOR_FAKTUR",
				"MASA_PAJAK",
				"TAHUN_PAJAK",
				"TANGGAL_FAKTUR",
				"NPWP",
				"NAMA",
				"ALAMAT_LENGKAP",
				"JUMLAH_DPP",
				"JUMLAH_PPN",
				"JUMLAH_PPNBM",
				"ID_KETERANGAN_TAMBAHAN",
				"FG_UANG_MUKA",
				"UANG_MUKA_DPP",
				"UANG_MUKA_PPN",
				"UANG_MUKA_PPNBM",
				"REFERENSI"
			]
			var headerLT = [
				"LT",
				"NPWP",
				"NAMA",
				"JALAN",
				"BLOK",
				"NOMOR",
				"RT",
				"RW",
				"KECAMATAN",
				"KELURAHAN",
				"KABUPATEN",
				"PROPINSI",
				"KODE_POS",
				"NOMOR_TELEPON",
				"",
				"",
				"",
				"",
				""
			]
			var headerOF = [
				"OF",
				"KODE_OBJEK",
				"NAMA",
				"HARGA_SATUAN",
				"JUMLAH_BARANG",
				"HARGA_TOTAL",
				"DISKON",
				"DPP",
				"PPN",
				"TARIFPPNBM",
				"PPNBM",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""
			]

			var sources = dummyData
			var sourcesIndex = 0;
			var sourcesSize = 0;
			var bigdata = [];
			bigdata.push(headerFK);
			bigdata.push(headerLT);
			bigdata.push(headerOF);
			var sizeOF = sizeChild;
			var reqData = size;
			var reqContainer = [];

			var generateOF = function(){
				var count = 0;
				while(count < reqData){
					var randomOF = Math.floor(Math.random() * sizeOF) + 1;
					reqContainer.push({
						index: count,
						fk: 1,
						of: randomOF
					})
					sourcesSize += randomOF+1;
					count++;
				}
			};
			var generateData = function(){
				reqContainer.map(function(rowReq){
					var ofs = rowReq.of;
					var count = 0;
					var rowOF = [];
					var fkdpp = 0;
					var fkppn = 0;
					while(count < ofs){
						var fake = Math.floor(Math.random() * dummyData.length) + 1;
						var source = sources[fake];
						console.log('OFS', fake, sourcesIndex, source, dummyData.length)
						if(!source){
								var fake = Math.floor(Math.random() * dummyData.length) + 1;
								var source = sources[fake];
								console.log('OFS2', fake, sourcesIndex, source, dummyData.length)
							}
						var random = Math.random() + "";
						var randomSplit = random.split('.');
						var randomString = randomSplit[1];
						var nama = source.firstName + " " + source.lastName;
						nama = nama.toUpperCase();
						var code = source.code + count;
						code = code.toUpperCase();
						var harga = parseInt(randomString.slice(0, 6)) + 100000;
						var dpp = harga;
						var ppn = (harga*10) / 100;
						fkdpp += dpp;
						fkppn += ppn;
						rowOF.push([
							"OF",
							code,
							nama,
							harga,
							1,
							harga,
							0,
							dpp,
							ppn,
							0,
							0,
							"",
							"",
							"",
							"",
							"",
							"",
							"",
							""
						])
						var ofsFinal = ofs - 1;
						if(ofsFinal == count){
							sourcesIndex += 1;
							var fake = Math.floor(Math.random() * dummyData.length) + 1;
							var source = sources[fake];
							console.log('OFSFINAL', fake, sourcesIndex, source, dummyData.length)
							if(!source){
								var fake = Math.floor(Math.random() * dummyData.length) + 1;
								var source = sources[fake];
								console.log('OFSFINAL2', fake, sourcesIndex, source, dummyData.length)
							}
							var nama = source.firstName + " " + source.lastName;
							nama = nama.toUpperCase();
							var alamat = source.street;
							alamat = alamat.toUpperCase();
							var code = source.code;
							code = code.toUpperCase();
							var rowFinal = [];
							var random = Math.random() + "";
							var randomSplit = random.split('.');
							var randomString = randomSplit[1];
							var npwp = randomString.slice(0, 15);
							if(npwp.length < 15){
							  while (npwp.length < 15){
							    npwp += 0;
                }
              }
							var faktur = randomString.slice(0, 13);
              if(faktur.length < 13){
                while (faktur.length < 13){
                  faktur += 0;
                }
              }
							var referensi = randomString.slice(0, 12);
              if(referensi.length < 12){
                while (referensi.length < 12){
                  referensi += 0;
                }
              }
							rowFinal.push([
								"FK",
								"01",
								"0",
								faktur,
								"9",
								"2016",
								"01/09/2016",
								npwp,
								nama,
								alamat,
								fkdpp,
								fkppn,
								"0",
								"",
								"0",
								"0",
								"0",
								"0",
								referensi
							])
							rowFinal = rowFinal.concat(rowOF);
							bigdata = bigdata.concat(rowFinal);
						}
						sourcesIndex++;
						count++;
					}
				})
			}

			generateOF()
			generateData()

			console.log(bigdata)

			var csv = json2csv({ data: bigdata, hasCSVColumnTitle: false, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HFK_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HFK_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
		});
	}
	H2h.generateUnlimitedFK = function (size, volume, cb){
		var require = size;
		var count = 0;
		while(count < require){
			H2h.generateFKs("generate_no"+count, volume, ",", 1)
			count++;
		}
		cb(null, "success")
	};
	H2h.remoteMethod('generateUnlimitedFK', {
		accepts: [
			{arg: 'size', type: 'integer'},
			{arg: 'volume', type: 'integer'},
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateFM = function(filename, size, delimiter, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;
			var count = 0;
			var csvField = ["FM", "KD_JENIS_TRANSAKSI", "FG_PENGGANTI", "NOMOR_FAKTUR", "MASA_PAJAK", "TAHUN_PAJAK", "TANGGAL_FAKTUR", "NPWP", "NAMA", "ALAMAT_LENGKAP", "JUMLAH_DPP", "JUMLAH_PPN", "JUMLAH_PPNBM", "IS_CREDITABLE", "FIELD_TAMBAHAN_1", "FIELD_TAMBAHAN_2", "FIELD_TAMBAHAN_3", "FIELD_TAMBAHAN_4", "FIELD_TAMBAHAN_5"]
			var csvTable = [];
			while(count < generate){
				var fake = Math.floor(Math.random() * dummyData.length) + 1;
				var MASA = Math.floor(Math.random() * 12) + 1;
				var TAHUN = Math.floor(Math.random() * 2017) + 1945;
				var NOMOR_FAKTUR = Math.floor(Math.random() * 10000000000000) + count +""
				if(NOMOR_FAKTUR.length <= 13){
					var NOMOR_FAKTUR_SIZE = NOMOR_FAKTUR.length
					while(NOMOR_FAKTUR_SIZE < 13){
						NOMOR_FAKTUR += 0
						NOMOR_FAKTUR_SIZE++;
					}
				}
				var NPWP = Math.floor(Math.random() * 100000000000000) + count +""
				if(NPWP.length <= 14){
					var NPWP_SIZE = NPWP.length
					while(NPWP_SIZE < 14){
						NPWP += 0
						NPWP_SIZE++;
					}
				}
				var JUMLAH_DPP = Math.floor(Math.random() * 100000) + 1000000000;
				var JUMLAH_PPN = Math.floor(Math.random() * 100000) + 1000000000;
				var JUMLAH_PPNBM = Math.floor(Math.random() * 100000) + 1000000000;
				console.log(dummyData[fake])
				var SAMPLE_DATA = dummyData[fake]
				var NAMA = SAMPLE_DATA.name + "_CD" + count
				csvTable.push({
					"FM": "FM",
					"KD_JENIS_TRANSAKSI": count + 1,
					"FG_PENGGANTI": 0,
					"NOMOR_FAKTUR": NOMOR_FAKTUR,
					"MASA_PAJAK": MASA,
					"TAHUN_PAJAK": TAHUN,
					"TANGGAL_FAKTUR": SAMPLE_DATA.transactionDate,
					"NPWP": NPWP,
					"NAMA": NAMA,
					"ALAMAT_LENGKAP": SAMPLE_DATA.address + "_CD" + count,
					"JUMLAH_DPP": JUMLAH_DPP,
					"JUMLAH_PPN": JUMLAH_PPN,
					"JUMLAH_PPNBM": JUMLAH_PPNBM,
					"IS_CREDITABLE": 1,
					"FIELD_TAMBAHAN_1": "FIELD_TAMBAHAN_1",
					"FIELD_TAMBAHAN_2": "FIELD_TAMBAHAN_2",
					"FIELD_TAMBAHAN_3": "FIELD_TAMBAHAN_3",
					"FIELD_TAMBAHAN_4": "FIELD_TAMBAHAN_4",
					"FIELD_TAMBAHAN_5": "FIELD_TAMBAHAN_5",
				})
				count++;
			}
			var csv = json2csv({ data: csvTable, fields: csvField, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HFM_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HFM_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateFM', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateLT = function(filename, size, delimiter, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;
			var count = 0;
			var csvField = ["LT", "NPWP", "EMAIL,NAMA", "JALAN", "BLOK", "NOMOR", "RT", "RW", "KECAMATAN", "KELURAHAN", "KABUPATEN", "PROPINSI", "KODE_POS", "NOMOR_TELEPON"]
			var csvTable = [];
			while(count < generate){
				var fake = Math.floor(Math.random() * dummyData.length) + 1;
				var NPWP = Math.floor(Math.random() * 100000000000000) + count +""
				if(NPWP.length <= 14){
					var NPWP_SIZE = NPWP.length
					while(NPWP_SIZE < 14){
						NPWP += 0
						NPWP_SIZE++;
					}
				}
				console.log(dummyData[fake])
				var SAMPLE_DATA = dummyData[fake]
				csvTable.push({
					"LT": "LT",
					"NPWP": NPWP,
					"EMAIL,NAMA": "CD_"+count+"_"+SAMPLE_DATA.email,
					"JALAN": "CD_"+count+"_"+SAMPLE_DATA.company,
					"BLOK": "CD_"+count+"_"+SAMPLE_DATA.streat,
					"NOMOR": SAMPLE_DATA.alphaCode+count,
					"RT": count,
					"RW": count,
					"KECAMATAN": count,
					"KELURAHAN": "CD_"+count+"_"+SAMPLE_DATA.state,
					"KABUPATEN": "CD_"+count+"_"+SAMPLE_DATA.street,
					"PROPINSI": "CD_"+count+"_"+SAMPLE_DATA.country,
					"KODE_POS": SAMPLE_DATA.postal + count,
					"NOMOR_TELEPON": SAMPLE_DATA.phone + count
				})
				count++;
			}
			var csv = json2csv({ data: csvTable, fields: csvField, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HLT_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HLT_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateLT', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateLT = function(filename, size, delimiter, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;
			var count = 0;
			var csvField = ["LT", "NPWP", "EMAIL,NAMA", "JALAN", "BLOK", "NOMOR", "RT", "RW", "KECAMATAN", "KELURAHAN", "KABUPATEN", "PROPINSI", "KODE_POS", "NOMOR_TELEPON"]
			var csvTable = [];
			while(count < generate){
				var fake = Math.floor(Math.random() * dummyData.length) + 1;
				var NPWP = Math.floor(Math.random() * 100000000000000) + count +""
				if(NPWP.length <= 14){
					var NPWP_SIZE = NPWP.length
					while(NPWP_SIZE < 14){
						NPWP += 0
						NPWP_SIZE++;
					}
				}
				console.log(dummyData[fake])
				var SAMPLE_DATA = dummyData[fake]
				csvTable.push({
					"LT": "LT",
					"NPWP": NPWP,
					"EMAIL,NAMA": "CD_"+count+"_"+SAMPLE_DATA.email,
					"JALAN": "CD_"+count+"_"+SAMPLE_DATA.company,
					"BLOK": "CD_"+count+"_"+SAMPLE_DATA.streat,
					"NOMOR": SAMPLE_DATA.alphaCode+count,
					"RT": count,
					"RW": count,
					"KECAMATAN": count,
					"KELURAHAN": "CD_"+count+"_"+SAMPLE_DATA.state,
					"KABUPATEN": "CD_"+count+"_"+SAMPLE_DATA.street,
					"PROPINSI": "CD_"+count+"_"+SAMPLE_DATA.country,
					"KODE_POS": SAMPLE_DATA.postal + count,
					"NOMOR_TELEPON": SAMPLE_DATA.phone + count
				})
				count++;
			}
			var csv = json2csv({ data: csvTable, fields: csvField, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HLT_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HLT_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateLT', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateRDKM = function(filename, size, delimiter, type, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;
			var count = 0;
			var csvField = ["RDK_RDM", "JENIS_TRANSAKSI", "KD_JNS_TRANSAKSI", "NOMOR_DOK_RETUR", "TANGGAL_RETUR", "MASA_PAJAK", "TAHUN_PAJAK", "NOMOR_DOK_LAIN", "NPWP", "NAMA", "NILAI_RETUR_DPP", "NILAI_RETUR_PPN", "NILAI_RETUR_PPNBM", "FIELD_TAMBAHAN_1", "FIELD_TAMBAHAN_2", "FIELD_TAMBAHAN_3", "FIELD_TAMBAHAN_4", "FIELD_TAMBAHAN_5"]
			var csvTable = [];
			var rdkORrdm = ["RDK", "RDM"];
			while(count < generate){
				var fake = Math.floor(Math.random() * dummyData.length) + 1;
				var NPWP = Math.floor(Math.random() * 100000000000000) + count +""
				if(NPWP.length <= 14){
					var NPWP_SIZE = NPWP.length
					while(NPWP_SIZE < 14){
						NPWP += 0
						NPWP_SIZE++;
					}
				}
				// Math.round(Math.random() * (max - min)) + min
				var MASA = Math.floor(Math.random() * (12 - 1)) + 1;
				var TAHUN = Math.floor(Math.random() * (2017 - 1945)) + 1945;
				var NILAI_RETUR_DPP = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				var NILAI_RETUR_PPN = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				var NILAI_RETUR_PPNBM = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				console.log(dummyData[fake])
				var SAMPLE_DATA = dummyData[fake]
				csvTable.push({
					"RDK_RDM": rdkORrdm[type],
					"JENIS_TRANSAKSI": SAMPLE_DATA.postal + count,
					"KD_JNS_TRANSAKSI": SAMPLE_DATA.price,
					"NOMOR_DOK_RETUR": SAMPLE_DATA.alphaCode + " " + count,
					"TANGGAL_RETUR": SAMPLE_DATA.date,
					"MASA_PAJAK": MASA,
					"TAHUN_PAJAK": TAHUN,
					"NOMOR_DOK_LAIN": SAMPLE_DATA.code + count,
					"NPWP": NPWP,
					"NAMA": SAMPLE_DATA.name + "_CD_" + count,
					"NILAI_RETUR_DPP": NILAI_RETUR_DPP,
					"NILAI_RETUR_PPN": NILAI_RETUR_PPN,
					"NILAI_RETUR_PPNBM": NILAI_RETUR_PPNBM,
					"FIELD_TAMBAHAN_1": "FIELD_TAMBAHAN_1",
					"FIELD_TAMBAHAN_2": "FIELD_TAMBAHAN_2",
					"FIELD_TAMBAHAN_3": "FIELD_TAMBAHAN_3",
					"FIELD_TAMBAHAN_4": "FIELD_TAMBAHAN_4",
					"FIELD_TAMBAHAN_5": "FIELD_TAMBAHAN_5"
				})
				count++;
			}
			var csv = json2csv({ data: csvTable, fields: csvField, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HRDKRDM_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HRDKRDM_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateRDKM', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'type', type: 'integer'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateVAT = function(filename, size, delimiter, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;
			var count = 0;
			var csvField = ["VAT", "KD_JNS_TRANSAKSI", "JENIS_DOKUMEN", "FG_PENGGANTI", "NOMOR_DOK_LAIN", "TANGGAL_DOK_LAIN", "MASA_PAJAK", "TAHUN_PAJAK", "NO_PASPOR", "NAMA", "JUMLAH_DPP", "JUMLAH_PPN", "JUMLAH_PPNBM", "KETERANGAN", "FIELD_TAMBAHAN_1", "FIELD_TAMBAHAN_2", "FIELD_TAMBAHAN_3", "FIELD_TAMBAHAN_4", "FIELD_TAMBAHAN_5"]
			var csvTable = [];
			var rdkORrdm = ["RDK", "RDM"];
			while(count < generate){
				var fake = Math.floor(Math.random() * dummyData.length) + 1;
				var NPWP = Math.floor(Math.random() * 100000000000000) + count +""
				if(NPWP.length <= 14){
					var NPWP_SIZE = NPWP.length
					while(NPWP_SIZE < 14){
						NPWP += 0
						NPWP_SIZE++;
					}
				}
				// Math.round(Math.random() * (max - min)) + min
				var TYPE = Math.floor(Math.random() * (1 - 0)) + 0;
				var MASA = Math.floor(Math.random() * (12 - 1)) + 1;
				var TAHUN = Math.floor(Math.random() * (2017 - 1945)) + 1945;
				var NILAI_RETUR_DPP = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				var NILAI_RETUR_PPN = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				var NILAI_RETUR_PPNBM = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				console.log(dummyData[fake])
				var SAMPLE_DATA = dummyData[fake]
				csvTable.push({
					VAT: "VAT",
					KD_JNS_TRANSAKSI: SAMPLE_DATA.code + "_CD" + count,
					JENIS_DOKUMEN: SAMPLE_DATA.alphaCode + "_CD" + count,
					FG_PENGGANTI: 0,
					NOMOR_DOK_LAIN: SAMPLE_DATA.code2 + count,
					TANGGAL_DOK_LAIN: SAMPLE_DATA.date,
					MASA_PAJAK: MASA,
					TAHUN_PAJAK: TAHUN,
					NO_PASPOR: SAMPLE_DATA.postal + count,
					NAMA: SAMPLE_DATA.name + "_CD" +count,
					JUMLAH_DPP: NILAI_RETUR_DPP,
					JUMLAH_PPN: NILAI_RETUR_PPN,
					JUMLAH_PPNBM: NILAI_RETUR_PPNBM,
					KETERANGAN: "CSV GENERATOR",
					FIELD_TAMBAHAN_1: "FIELD_TAMBAHAN_1",
					FIELD_TAMBAHAN_2: "FIELD_TAMBAHAN_2",
					FIELD_TAMBAHAN_3: "FIELD_TAMBAHAN_3",
					FIELD_TAMBAHAN_4: "FIELD_TAMBAHAN_4",
					FIELD_TAMBAHAN_5: "FIELD_TAMBAHAN_5",
				})
				count++;
			}
			var csv = json2csv({ data: csvTable, fields: csvField, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HRDKRDM_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HRDKRDM_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateVAT', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'}
		],
		returns: {arg: 'res', type: 'json'}
	});

	H2h.generateDKDM = function(filename, size, delimiter, type, cb) {
		var fakeDB = H2h.app.models.FakeDB;
		var getDummy = new Promise(function (resolve, reject){
			fakeDB.find({}, function (err, result){
				resolve(result)
			})
		})
		getDummy.then(function (dummyData){
			console.log(["Fake Size"], dummyData.length)
			console.log(["Fake"], dummyData[0])
			console.log(["Delimiter"], delimiter)
			var generate = size;
			var count = 0;
			var csvField = ["DK_DM", "JENIS_TRANSAKSI", "JENIS_DOKUMEN", "KD_JNS_TRANSAKSI", "FG_PENGGANTI", "NOMOR_DOK_LAIN_GANTI", "NOMOR_DOK_LAIN", "TANGGAL_DOK_LAIN", "MASA_PAJAK", "TAHUN_PAJAK", "NPWP", "NAMA", "ALAMAT_LENGKAP", "JUMLAH_DPP", "JUMLAH_PPN", "JUMLAH_PPNBM", "KETERANGAN", "FIELD_TAMBAHAN_1", "FIELD_TAMBAHAN_2", "FIELD_TAMBAHAN_3", "FIELD_TAMBAHAN_4", "FIELD_TAMBAHAN_5"]
			var csvTable = [];
			var dkORdm = ["DK", "DM"];
			while(count < generate){
				var fake = Math.floor(Math.random() * dummyData.length) + 1;
				var NPWP = Math.floor(Math.random() * 100000000000000) + count +""
				if(NPWP.length <= 14){
					var NPWP_SIZE = NPWP.length
					while(NPWP_SIZE < 14){
						NPWP += 0
						NPWP_SIZE++;
					}
				}
				// Math.round(Math.random() * (max - min)) + min
				var TYPEX = type
				var MASA = Math.floor(Math.random() * (12 - 1)) + 1;
				var TAHUN = Math.floor(Math.random() * (2017 - 1945)) + 1945;
				var NILAI_RETUR_DPP = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				var NILAI_RETUR_PPN = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				var NILAI_RETUR_PPNBM = Math.floor(Math.random() * (1000000000 - 10000)) + 10000;
				console.log(dummyData[fake])
				var SAMPLE_DATA = dummyData[fake]
				console.log(type)
				console.log(TYPEX)
				console.log(dkORdm[TYPEX])
				csvTable.push({
					"DK_DM": dkORdm[TYPEX],
					"JENIS_TRANSAKSI": SAMPLE_DATA.code + count,
					"JENIS_DOKUMEN": SAMPLE_DATA.code2 + count,
					"KD_JNS_TRANSAKSI": SAMPLE_DATA.code3 + count,
					"FG_PENGGANTI": 0,
					"NOMOR_DOK_LAIN_GANTI": "",
					"NOMOR_DOK_LAIN": SAMPLE_DATA.postal + count,
					"TANGGAL_DOK_LAIN": SAMPLE_DATA.date,
					"MASA_PAJAK": MASA,
					"TAHUN_PAJAK": TAHUN,
					"NPWP": NPWP,
					"NAMA": SAMPLE_DATA.name + "_CD" + count,
					"ALAMAT_LENGKAP": SAMPLE_DATA.address + "_CD" + count,
					"JUMLAH_DPP": NILAI_RETUR_DPP,
					"JUMLAH_PPN": NILAI_RETUR_PPN,
					"JUMLAH_PPNBM": NILAI_RETUR_PPNBM,
					"KETERANGAN": "GENERATED",
					"FIELD_TAMBAHAN_1": "FIELD_TAMBAHAN_1",
					"FIELD_TAMBAHAN_2": "FIELD_TAMBAHAN_2",
					"FIELD_TAMBAHAN_3": "FIELD_TAMBAHAN_3",
					"FIELD_TAMBAHAN_4": "FIELD_TAMBAHAN_4",
					"FIELD_TAMBAHAN_5": "FIELD_TAMBAHAN_5"
				})
				count++;
			}
			var csv = json2csv({ data: csvTable, fields: csvField, del: delimiter });
			var filecode = Math.floor(Math.random() * 1000000000000) + "";
			var csvName = "H2HDKDM_CSV_" + filecode + ".csv";
			if(filename){
				var csvName = "H2HDKDM_CSV_" + filename + "_" + filecode + ".csv";
			}
			var filesFolder = path.join(__dirname, "..", "..", "client", "files", csvName)
			fs.writeFile(filesFolder, csv, function(err) {
				console.log(["Save files in"], filesFolder);
			});
			cb(null, "WORKS");
		});
	}
	H2h.remoteMethod('generateDKDM', {
		accepts: [
			{arg: 'filename', type: 'string'},
			{arg: 'size', type: 'integer'},
			{arg: 'delimiter', type: 'string'},
			{arg: 'type', type: 'integer'},
		],
		returns: {arg: 'res', type: 'json'}
	});

};
