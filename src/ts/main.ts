import Local from './core/local';

interface play {
    game: number[][],
    next: number[][]
}

const local = new Local();

let score = 0;
let time = 0;
setInterval(() => {
    time += 0.1;
    $('#m').text(Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60));
    $('#s').text(time % 60 < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60));

    if(local.game.lose) {
        local.socket.emit('lose');
        local.game.lose = false;
    }
    if(local.game.win) {
        local.socket.emit('win');
        local.game.win = false;
    }

    if(!local.game.gameover) {
        local.socket.emit('playing', {game: local.game.gameMatrix, next: local.game.nextMatrix});
        local.socket.on('playing', (data: play) => {
            local.remote.refreshGame(data.game, data.next);
        });
    }

    if(score !== local.game.score) {
        const count = (local.game.score - score) / 10;
        local.socket.emit('disturb', {count: count});
        score = local.game.score;
    }

},1000);

$('#panel-name').show();

