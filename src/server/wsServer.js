var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;
var playerCount = 0;
var readyCount = 0;
var readySockets = {};

app.listen(PORT);

io.on('connect', function(socket) {
    playerCount++;
    socket.nickname = '玩家' + playerCount;

    console.log(socket.nickname + '进入游戏。');
    //注册昵称
    socket.on('nickname', function(data) {
        socket.nickname = data.name;
        if(!!data.name) {
            console.log('玩家' + playerCount + '更改昵称为：' + data.name);
        }
    });
    // socket.emit('nickname', {nickname: socket.nickname});
    socket.on('start', function() {
        readyCount++;
        readySockets[readyCount] = socket;
        console.log('玩家' + socket.nickname + '准备完毕。');
        if(readyCount % 2 !== 1) {
            socket.emit('start',{remoteName: readySockets[readyCount - 1].nickname});
            readySockets[readyCount - 1].emit('start', {remoteName: socket.nickname});
            console.log('玩家' + socket.nickname + '与玩家' + readySockets[readyCount - 1].nickname + '进入对局。');
            socket.remoteIndex = readyCount - 1;
        }else {
            socket.remoteIndex = readyCount + 1;
        }

    });

    socket.on('win', function () {
        if (readySockets[socket.remoteIndex]){
            readySockets[socket.remoteIndex].emit('lose');
        }
    });

    socket.on('lose', function () {
        if(readySockets[socket.remoteIndex]) {
            readySockets[socket.remoteIndex].emit('win');
        }
    });

    socket.on('playing', function (data) {
        if(readySockets[socket.remoteIndex]) {
            readySockets[socket.remoteIndex].emit('playing', data);
        }
    });


    socket.on('disconnect', function () {
        console.log('玩家' + socket.nickname + '离开游戏。');
    })

});

console.log('wsServer is running')