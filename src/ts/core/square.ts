/**
 * 当前方块解决方案
 */
import Toolkit, {matrixObj} from '../core/toolkit';
import {Game} from "../ui/game";

export default class Square {
    public _x: number;                     //横向位置
    public _y: number;                     //纵向位置
    private _matrix: matrixObj;          //当前方块的数据
    private _nextMatrix: matrixObj;     //下一个方块的数据
    private _leftWall: boolean;         //是否到达左边界
    private _rightWall: boolean;        //是否到达右边界


    constructor() {
        this._x = 2;
        this._y = 0;
        this._matrix = this.createMatrix();
        this._nextMatrix = this.createMatrix();
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get w() {
        return this._matrix.w;
    }

    get h() {
        return this._matrix.h;
    }

    get matrix() {
        return this._matrix.matrix;
    }

    get matrixObj() {
        return this._matrix;
    }

    get nextMatrix() {
        return this._nextMatrix.matrix;
    }

    /**
     * 是否可以左移状态修改接口
     * @param {boolean} able
     */
    set leftWall(able: boolean) {
        this._leftWall = able;
    }

    /**
     * 是否可以右移状态修改接口
     * @param {boolean} able
     */
    set rightWall(able: boolean) {
        this._rightWall = able;
    }
    /**
     * 下降
     */
    down() {
        this._y ++;
    }

    /**
     * 旋转
     */
    turn(game: Game) {
        this._matrix = game.checkTurn();
    }


    /**
     * 左移
     */
    left() {
        if(!this._leftWall) {
            this._x--;
        }
    }

    /**
     * 右移
     */
    right() {
        if(!this._rightWall) {
            this._x++;
        }
    }

    /**
     * 迅速落地
     */
    drop(game: Game) {
        while (game.checkDown()){this._y ++}
    }

    /**
     * 落地
     */
    done() {
        this._x = 2;
        this._y = 0;
        this._matrix = this._nextMatrix;
        this._nextMatrix = this.createMatrix();
    }

    /**
     * 生成七种矩阵数据
     */
    createMatrix(): matrixObj {
        const matrixes = [
            {
                matrix:[
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 4,
                h: 1
            },
            {
                matrix:[
                    [1,0,0,0],
                    [1,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 3,
                h: 2
            },
            {
                matrix:[
                    [0,0,1,0],
                    [1,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 3,
                h: 2
            },
            {
                matrix:[
                    [1,1,0,0],
                    [1,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 2,
                h: 2
            },
            {
                matrix:[
                    [0,1,1,0],
                    [1,1,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 3,
                h: 2
            },
            {
                matrix:[
                    [0,1,0,0],
                    [1,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 3,
                h: 2
            },
            {
                matrix:[
                    [1,1,0,0],
                    [0,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                w: 3,
                h: 2
            },
        ];
        let matrix = matrixes[Math.floor(Math.random() * 7)];
        if (Math.random() > 0.5) {
            matrix = Toolkit.matrix.turnMatrix(matrix);
        }

        return matrix;
        // return matrixes[3];
    }

}