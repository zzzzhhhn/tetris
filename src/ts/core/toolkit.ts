export class Toolkit {
    static get matrix() {
        return MatrixToolkit;
    }
}
export interface matrixObj {
    matrix: number[][],
    w: number,
    h: number
}
/**
 * 生成矩阵工具类
 * @type {{}}
 */
const MatrixToolkit = {
    /**
     * 生成一维数组工具
     * @param {number} v  值
     * @param {number} l  长度
     * @returns {number[]}
     */
    makeRow(v: number = 0, l: number = 10): number[] {
        const arr = new Array(l);
        arr.fill(v);
        return arr;
    },
    /**
     * 生成二位数组矩阵工具
     * @param {number} v 值
     * @param {number} l1 横向长度
     * @param {number} l2 纵向长度
     * @returns {number[][]}
     */
    makeMatrix(v: number = 0, l1: number = 10, l2: number = 20): number[][] {
        // const arr = new Array(l2);
        // arr.map(value => this.makeRow(v,l1));
        const arr = Array.from({length: l2}, () => this.makeRow(v,l1));
        return arr;
    },

    /**
     * 矩阵顺时针旋转90°解决方案
     * @param {number[][]} matrix
     * @returns {number[][]}
     */
    turnMatrix(matrix: matrixObj): matrixObj {
        let _matrix = {
            matrix: this.makeMatrix(0,4,4),
            w: 0,
            h: 0
        };
        _matrix.matrix = _matrix.matrix.map((rV, rI) =>
            rV.map((cV, cI) => matrix.matrix[3 - cI][rI]
        ));
        _matrix.w = matrix.h;
        _matrix.h = matrix.w;
        return _matrix;
    }
    
}

export default Toolkit;