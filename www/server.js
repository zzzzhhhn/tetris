var file = require('./server/fileServer.js');
var socket = require('./server/wsServer');

file.start();
socket.start();