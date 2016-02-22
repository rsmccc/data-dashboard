// Load the necessary servers.
var sys = require("sys"),
http = require("http"),
fs = require( "fs" ),
url = require("url"),
path = require("path"),
baseDirectory = __dirname; // /../.../data-dashboard

// Create our HTTP server.
var server = http.createServer(
	function( request, response ) { 
		
	});

// Point the HTTP server to port 8080.
server.listen( 8080 );

// For logging....
console.log( "Server is running on 8080" );