import Local from './core/local';
import Remote from './core/remote';

const local = new Local();
const remote = new Remote();
let time = 0;
setInterval(() => {
    time++;
    $('#m').text(Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60));
    $('#s').text(time % 60 < 10 ? '0' + time % 60 : time % 60);
    // if(time % 3 === 0) {
    //     local.game.disturb();
    // }
},1000);

$('#prepare').show();

