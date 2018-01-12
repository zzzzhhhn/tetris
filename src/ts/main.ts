import Local from './core/local';
import Remote from './core/remote';

interface play {
    game: number[][],
    next: number[][]
}

const local = new Local();
const remote = new Remote();
let time = 0;
setInterval(() => {
    time += 0.1;
    $('#m').text(Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60));
    $('#s').text(time % 60 < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60));
    // if(time % 3 === 0) {
    //     local.game.disturb();
    // }
    if(local.game.lose) {
        local.socket.emit('lose');
    }
    if(local.game.win) {
        local.socket.emit('win');
    }

    local.socket.emit('playing', {game: local.game.gameMatrix, next: local.game.nextMatrix});
    local.socket.on('playing', (data: play) => {
        remote.game.refreshGame(data.game, data.next);
    });
},1000);

$('#panel-name').show();

