var fs = require("fs"); 
var Q = require('q');
var ftp = require('ftp');

exports.get = function(config, callback) { //ie) config = require('./config.json'), callback = main()
	var _promise = [ ];
	var _addr = config.easyImport.connectionInfo;
	var _files = config.easyImport.fileInfo;
	for (var j = 0; j < _files.length; j++) {
		(function(i) {
			if (_files[i].exclude) {
				//no need to download
			} else {
				_promise.push(
					new Q.promise(function(resolve, reject) {	
						var _ftp = new ftp();	
						_ftp.connect(_addr);	
						_ftp.on('ready', function() {
							_ftp.get(_files[i].src, function(err, stream) {
								if (err) {
									reject(err);
									return;
								}
								stream.once('close', function() { //once => wait until close event triggered 
									_ftp.end();
									resolve();
								}); 
								stream.pipe(fs.createWriteStream("./" + _files[i].dest));
						    });
						});
					})
				);
			}	
		})(j);
	}
	if (_promise.length > 0) {
		Q.all(_promise).then(
			function(results) {
				try {
					callback();
				} catch (ex) {
					console.log(ex.toString());
				}
			},
			function(errors) {
				console.log(errors); 
			},
			function(updates) {
				console.log(updates);
			}
		);
	} else {
		callback();
	}	
};
