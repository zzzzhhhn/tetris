import Game from '../ui/game';
import Socket = SocketIOClient.Socket;
interface start {
    remoteName: string,
}

export default class Local {

    private _game: Game;
    private _socket: Socket;

    constructor() {
        this._game = new Game('local');
        this._game.init();
        this._game.loop();
        this.bindEvent();
        this._socket = io('http://localhost:3000');
        this._socket.on('start', (data: start) => {
            $('#prepare').hide();
            $('#win').hide();
            $('#lose').hide();
            $('#name-remote').text(data.remoteName);
            this._game.start = true;
            this._game.gameover = false;
        });

        this._socket.on('win', () => {
           this._game.onWin();
        });

        this._socket.on('lose', () => {
            this._game.onLose();
        });


    }

    get game() {
        return this._game;
    }

    get socket() {
        return this._socket;
    }

    /**
     * 绑定键盘事件
     */
    bindEvent() {
        $(document).on('keydown', e => {
            if(this._game.gameover) {
               return;
            }
            if(e.keyCode === 38) {
                this._game.currentSquare.turn(this._game);
            }else if(e.keyCode === 37) {
                this._game.currentSquare.left();
            }else if(e.keyCode === 39) {
                this._game.currentSquare.right();
            }else if(e.keyCode === 40) {
                this._game.currentSquare.down();
            }else if(e.keyCode === 32) {
                this._game.currentSquare.drop(this._game);
            }
            this._game.refreshGame();
        });

        this.bindStart('start');
        this.bindStart('win-again');
        this.bindStart('lose-again');

        $('#btn-name').on('click', () => {
           const name = $('#ipt-name').val();
           if(!!name) {
               $('#name-local').text(<string>name);
           }
           this._socket.emit('nickname',{name: name});
           $('#panel-name').hide();
           $('#prepare').show();
        });
    }

    /**
     * 绑定开始游戏事件工具
     * @param {string} id
     */
    bindStart(id: string): void {
        $('#' + id).on('click',() => {
            $('#' + id).addClass('disabled');
            $('#' + id).text('等待对手确认...');
            //TODO 点击准备按钮发送准备
            this._socket.emit('start',{});
        });
    };
}

