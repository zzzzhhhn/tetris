export class Toolkit {
    static get matrix() {
        return MatrixToolkit;
    }
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
    }
    
}

export default Toolkit;