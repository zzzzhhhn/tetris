var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;
var playerCount = 0;
var readyCount = 0;
var readySockets = {};

app.listen(PORT);

io.on('connect', function(socket) {
    playerCount++;
    socket.playerNumber = playerCount;
    socket.nickname = '玩家' + socket.playerNumber;

    console.log(socket.nickname + '进入游戏。');
    //注册昵称
    socket.on('nickname', function(data) {
        socket.nickname = data.name;
        if(!!data.name) {
            console.log('玩家' + socket.playerNumber + '更改昵称为：' + data.name);
        }
    });
    // socket.emit('nickname', {nickname: socket.nickname});
    socket.on('start', function() {
        readyCount++;
        readySockets[readyCount] = socket;
        socket.readyCount = readyCount;
        console.log('玩家' + socket.nickname + '准备完毕。');
        if(readyCount % 2 !== 1) {
            socket.remoteIndex = readyCount - 1;
            socket.emit('start',{remoteName: readySockets[socket.remoteIndex] ? readySockets[socket.remoteIndex].nickname : ''});
            if(readySockets[socket.remoteIndex]) {
                readySockets[socket.remoteIndex].emit('start', {remoteName: socket.nickname});
            }
            console.log('玩家' + socket.nickname + '与玩家' + (readySockets[socket.remoteIndex] ? readySockets[socket.remoteIndex].nickname : '玩家' + socket.remoteIndex) + '进入对局。');

        }else {
            socket.remoteIndex = readyCount + 1;
        }

    });

    socket.on('win', function () {
        if (readySockets[socket.remoteIndex]){
            readySockets[socket.remoteIndex].emit('lose');
        }
        delete readySockets[socket.readyCount];
        delete readySockets[socket.remoteIndex];
    });

    socket.on('lose', function () {
        if(readySockets[socket.remoteIndex]) {
            readySockets[socket.remoteIndex].emit('win');
        }
        delete readySockets[socket.readyCount];
        delete readySockets[socket.remoteIndex];
    });

    socket.on('playing', function (data) {
        if(readySockets[socket.remoteIndex]) {
            readySockets[socket.remoteIndex].emit('playing', data);
        }
    });

    socket.on('disturb', function (data) {
        if(readySockets[socket.remoteIndex]) {
            readySockets[socket.remoteIndex].emit('disturb', data);
        }
    });

    socket.on('disconnect', function () {
        console.log('玩家' + socket.nickname + '离开游戏。');
        delete readySockets[socket.readyCount];
    })

});

console.log('wsServer is running')