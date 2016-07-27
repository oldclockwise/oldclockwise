

# easy_import

	downloads ~.js through ftp when server is starting to share ~.js between multi nodejs servers. 

## Usage

1. config.json

	{
		"easyImport" : {
			"connectionInfo" : { "host" : "xxx", "port" : "21", "user" : "xxx", "password" : "xxx", 
				"secure" : false, "secureOptions" : { }, "connTimeout" : 10000, "pasvTimeout" : 10000, "keepalive" : 10000
			},
			"fileInfo" : [
			    { "src" : "/~/nodejs/common1.js", "dest" : "lib/common1.js", "exclude" : false },
			    { "src" : "/~/common2.js", "dest" : "lib/common2.js", "exclude" : false }
			]
		}
	}	

2. app.js

	var easyImport = require('easy_import');
	var config = require('./config.json');

	var com1, com2;
	easyImport.get(config, main);

	function main() {
	
		com1 = require("./lib/common1");
		com2 = require("./lib/common2");
		console.log("@@@@@@ " + com1.getRnd()); //for test
		console.log("@@@@@@ " + com2.test2());
	
	}

## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
