import Game from '../ui/game';

export default class Local {
    private _game: Game;
    constructor() {
        this._game = new Game('local');
        this._game.init();
        this._game.loop();
        this.bindEvent();

    }

    get game() {
        return this._game;
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


    }

    /**
     * 绑定开始游戏事件工具
     * @param {string} id
     */
    bindStart(id: string): void {
        $('#' + id).on('click',() => {
            $('#' + id).addClass('disabled');
            //TODO 点击准备按钮发送准备
            this._game.start = true;
        });
    };
}

