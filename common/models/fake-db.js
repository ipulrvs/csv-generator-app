'use strict';

const fs = require('fs')
const path = require('path')

module.exports = function(Fakedb) {

	Fakedb.files = function(filter, cb) {
		var location = path.join(__dirname, "..", "..", "client", "files")
		var fileFolder = []
		fs.readdirSync(location).forEach(file => {
			fileFolder.push({
				name: file
			})
		})
		cb(null, fileFolder);
	}
	Fakedb.remoteMethod('files', {
		accepts: {arg: 'filter', type: 'string'},
		returns: {arg: 'res', type: 'json'}
	});
	
};
