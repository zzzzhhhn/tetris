import SquareFactory from './squareFactory';
import Toolkit, {matrixObj} from '../core/toolkit';
import Square from '../core/square';
import construct = Reflect.construct;

/**
 * 生成游戏解决方案
 */
export class Game {
    private _gameMatrix: number[][];     //主体方块数据
    private _nextMatrix: number[][];      //预览方块数据
    private _user: string;                //当前玩家
    private _currentSquare: Square;       //当前下落方块
    private _gameSquare: SquareFactory;    //主体方块
    private _nextSquare: SquareFactory;    //预览方块
    private _speed: number;  //游戏速度
    private _score: number;   //游戏分数
    private _gameOver: boolean;   //是否游戏结束
    private _start: boolean;     //游戏是否开始
    private _win: boolean;
    private _lose: boolean;

    constructor(user: string) {
        this._user = user;
        this._speed = 1000;
    }

    get  currentSquare() {
        return this._currentSquare;
    }

    get gameover() {
        return this._gameOver;
    }

    set gameover(bool: boolean) {
        this._gameOver = bool;
    }

    set start(bool: boolean) {
        this._start = bool;
    }

    get win() {
        return this._win;
    }

    get lose() {
        return this._lose;
    }

    get gameMatrix() {
        return this._gameMatrix;
    }

    get nextMatrix() {
        return this._nextMatrix;
    }

    /**
     * 初始化游戏
     */
    public init() {
        this._score = 0;
        this._start = false;
        this._gameOver = false;
        this._win = false;
        this._lose = false;
        $('#score-' + this._user).text(this._score);
        this._gameMatrix = Toolkit.matrix.makeMatrix(0,10,20);
        this._nextMatrix = Toolkit.matrix.makeMatrix(1,4,4);
        this._currentSquare = new Square();
        this._nextMatrix = this._currentSquare.nextMatrix;
        this.build();
        this.refreshGame();

    }

    /**
     * 刷新主体
     */
    public refreshGame(gameMatrix: number[][] = Toolkit.matrix.makeMatrix(0,10,20), nextMatrix: number[][] = Toolkit.matrix.makeMatrix(1,4,4)) {
        if(this._user === 'local') {
            let status = 1;
            let left = 3;         //方块最左侧位置
            let right = 0;        //方块最右侧位置
            this._currentSquare.leftWall = false;
            this._currentSquare.rightWall = false;

            //重置面板
            this._gameMatrix.forEach((rV, rI) =>
                rV.forEach((cV, cI) => {
                    if (cV === 1) {
                        this._gameMatrix[rI][cI] = 0;
                    }
                })
            );

            if (!this.checkDown()) {
                status = 2;
            }
            //渲染方块所在位置
            this._currentSquare.matrix.forEach((rV, rI) => {
                rV.forEach((cV, cI) => {
                    if (cV) {
                        if (this._gameMatrix[this._currentSquare.y + rI]) {
                            this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI] = status;
                        }
                        right = cI > right ? cI : right;
                        left = cI < left ? cI : left;
                        //监测是否出界
                        if ((this._gameMatrix[this._currentSquare.y + rI] &&
                                this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI - 1] &&
                                this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI - 1] === 2) ||
                            this._currentSquare.x + left <= 0
                        ) {
                            this._currentSquare.leftWall = true;
                        }
                        if ((this._gameMatrix[this._currentSquare.y + rI] &&
                                this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI + 1] &&
                                this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI + 1] === 2) ||
                            this._currentSquare.x + right >= 9
                        ) {
                            this._currentSquare.rightWall = true;
                        }
                    }
                })
            });


            this.checkClear();
            this.refresh(1);

            if (status === 2) {
                this._currentSquare.done();
                this.refreshNext(this._currentSquare.nextMatrix);
            }
        }
        else {
            this._gameMatrix = gameMatrix;
            this.refresh(1);
            this._nextMatrix = nextMatrix;
            this.refresh(2);
        }
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

    /**
     * 刷新dom
     * @param {number} val
     */
    refresh(val: number) {
        if(val === 1) {
            this._gameSquare.refresh(this._gameMatrix);
        } else {
            this._nextSquare.refresh(this._nextMatrix);
        }
    }

    /**
     * 检测是否可以下降
     * @returns {boolean}
     */
    checkDown(): boolean {
        //判断下一行是否到底或者有方块
        let result = true;
        this._currentSquare.matrix.forEach((rV, rI) => {
            rV.forEach((cV, cI) => {
                if(!!cV) {
                    const next = this._gameMatrix[this._currentSquare.y + rI + 1] ? this._gameMatrix[this._currentSquare.y + rI + 1][this._currentSquare.x + cI] : -1;
                    if (next === 2 || next === -1) {
                        result = false;
                    }
                }
            })
        });
        return result;
    }

    /**
     * 检测是否可以旋转
     * @returns {boolean}
     */
    checkTurn(): matrixObj {
        const matrix = Toolkit.matrix.turnMatrix(this._currentSquare.matrixObj);
        let left = 3;         //方块最左侧位置
        let right = 0;        //方块最右侧位置
        let has_done = false; //旁边是否有done
        matrix.matrix.forEach((rV, rI) => {
            rV.forEach((cV, cI) => {
                if(cV) {
                    right = cI > right ? cI : right;
                    left = cI < left ? cI : left;
                }
                if(this._gameMatrix[this._currentSquare.y + rI] &&
                        this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI] &&
                        this._gameMatrix[this._currentSquare.y + rI][this._currentSquare.x + cI] === 2) {
                    has_done = true;
                }
            })
        });


        //根据是否可以旋转返回矩阵
        if(this._currentSquare.x + left <= 0 || this._currentSquare.x + right >= 9 || has_done) {
            return this._currentSquare.matrixObj;
        }else {
            return matrix;
        }
    }

    /**
     *  检测消除
     */
    checkClear():void {
        let score_count = 0;
        let done_count = 0;
        this._gameMatrix.forEach((rV, rI) => {
            let  count = 0;
            rV.forEach((cV, cI) => {
                if(cV === 2) {
                    count++
                }
            });
            if(count === 10) {
                score_count++;
                this._gameMatrix.splice(rI,1);
                this._gameMatrix.unshift(Toolkit.matrix.makeRow(0,10));
            }
            if(count >= 1) {
                done_count++;
            }
        });

        //判断得分
        switch (score_count) {
            case 1:
                this._score += 10;
                break;
            case 2:
                this._score += 30;
                break;
            case 3:
                this._score += 60;
                break;
            case 4:
                this._score += 100;
                break;
        }

        if(this._score >= 2000) {
            this.onWin();
        }
        //TODO 给对方加速

        //判断游戏结束
        if(done_count >= 19) {
            this.onLose();
        }
        $('#score-' + this._user).text(this._score);
    }

    /**
     * 失败
     */
    onLose() {
        $("#lose").show();
        this._lose = true;
        this._gameOver = true;
    }

    /**
     * 胜利
     */
    onWin() {
        $("#win").show();
        this._win = true;
        this._gameOver = true;
    }

    /**
     * 干扰
     */
    disturb() {
        this._gameMatrix.shift();
        const arr = Array.from({length: 10}, () => Math.random() > 0.5 ? 0 : 2);
        this._gameMatrix.push(arr);console.log(arr)
    }


    /**
     * 循环游戏
     */
    loop() {
        setInterval(() => {
            if(!this._gameOver && this._start) {
                this.refreshGame();
                this._currentSquare.down();
            }
        },this._speed);
    }


}


export default Game;