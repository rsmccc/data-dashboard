// Load the necessary servers.
var sys = require( "sys" );
var http = require( "http" );
var fs = require( "fs" );
 
// Create our HTTP server.
var server = http.createServer(
	function( request, response ){
	 
	 
	// Create a SUPER SIMPLE response.
	response.writeHead( 200, {"content-type": "text/html"} );
	// response.write( "Hellow world from AWS!\n" );
	response.end( fs.readFileSync('index.html') );
	 
	 
	}
);
 
// Point the HTTP server to port 8080.
server.listen( 8080 );
 
// For logging....
console.log( "Server is running on 8080" );