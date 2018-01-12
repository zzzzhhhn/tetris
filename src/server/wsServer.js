var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;
var count = 0;
var sockets = {};

app.listen(PORT);

io.on('connect', function(socket) {
    count++;console.log(count)
    sockets[count] = socket;
    //注册昵称
    socket.on('nickname', function(data) {
        socket.nickname = data;
    });
    socket.emit('nickname', {nickname: socket.nickname});
    socket.on('start', function() {
        if(count % 2 !== 1) {
            socket.emit('start',{});
            sockets[count - 1].emit('start', {});
        }
    });


});

console.log('wsServer is running')