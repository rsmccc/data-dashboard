// Load the necessary servers.
var fs	= require('fs'),
	express = require('express'),
	dns = require('dns'),
	baseDirectory = __dirname; // /../.../data-dashboard

var app = express();

app.use(express.static(__dirname));

console.log( dns.getServers() );

// Point the HTTP server to port 8080.
app.listen( 8080, function() {
	console.log( "Server is running on 8080" );
} );