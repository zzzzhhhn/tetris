import SquareFactory from './squareFactory';

export default class Square {
    public x: number;
    public y: number;
    public matrix: number[][];

    constructor(matrix: number[][]) {
    this.x = 2;
    this.y = 0;
    this.matrix = matrix;
    }

    /**
     * 下降
     * @param {number[][]} matrix
     */
    down() {
        this.y ++;
    }


}