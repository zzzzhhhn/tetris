import SquareFactory from './squareFactory';
import Toolkit from '../core/toolkit';
import Square from './square';

/**
 * 生成游戏面板
 */
export class Game {
    private _gameMatrix: number[][];
    private _nextMatrix: number[][];
    private _user: string;
    private _currentSquare: Square;
    private _gameSquare: SquareFactory;
    private _nextSquare: SquareFactory;
    private _speed: number;

    constructor(user: string) {
        this._user = user;
        this._speed = 3000;
    }

    /**
     * 初始化游戏
     */
    public init() {
        this._gameMatrix = Toolkit.matrix.makeMatrix(0,10,20);
        this._nextMatrix = Toolkit.matrix.makeMatrix(1,4,4);
        this._currentSquare = new Square(this._nextMatrix);
        this.build();
    }

    /**
     * 刷新主体
     */
    public refreshGame() {
        this._gameMatrix = Toolkit.matrix.makeMatrix(0,10,20);
        this._currentSquare.matrix.forEach((rV, rI) => {
            rV.forEach((cV, cI) => {
                this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI] = cV;
            })
        })
        this.refresh(1);
    }

    /**
     * 刷新预览
     * @param {number[][]} nextMatrix
     */
    public refreshNext(nextMatrix: number[][]) {
        this._nextMatrix = nextMatrix;
        this.refresh(2);
    }

    /**
     * 生成dom
     */
    private build() {
        this._gameSquare = new SquareFactory(this._gameMatrix, $('#panel-' + this._user));
        this._gameSquare.build();
       this._nextSquare = new SquareFactory(this._nextMatrix, $('#next-' + this._user));
        this._nextSquare.build();
    }

    refresh(val: number) {
        if(val === 1) {
            this._gameSquare.refresh(this._gameMatrix);
        } else {
            this._nextSquare.refresh(this._nextMatrix);
        }
    }

    /**
     * 循环游戏
     */
    loop() {
        setInterval(() => {
            this._currentSquare.down();
            this.refreshGame();
        },this._speed);
    }

}


export default Game;