/**
 * 传入二维数组生成 div dom
 */
export class SquareFactory {
    private _matrix: number[][];
    private _contain: JQuery;

	constructor(matrix: number[][], $contain: JQuery) {
        this._matrix = matrix;
        this._contain = $contain;
	}

    /**
     * 生成方块dom
     */
	build(): void {
        this._matrix.forEach((row, rowIndex) => {
            const rowDiv = $('<div></div>');
            row.forEach((col, colIndex) => {
                const colDiv = $('<div></div>');
                colDiv.addClass('square');
                colDiv.css({left: colIndex * 30 + 'px', top: rowIndex * 30 + 'px'});
                if(col === 0) {
                    colDiv.addClass('none').removeClass('current').removeClass('done');
                }else if(col == 1) {
                    colDiv.addClass('current').removeClass('none').removeClass('done');
                }else {
                    colDiv.addClass('done').removeClass('none').removeClass('current');
                }
                rowDiv.append(colDiv);
            })
            this._contain.append(rowDiv);
        });

    }

    /**
     * 刷新方块
     */
    refresh(matrix: number[][]) {
        matrix.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                const div = this._contain.find(`div:nth-child(${ rowIndex + 1 })`).find(`div:nth-child(${ colIndex + 1 })`);
                if(col === 0) {
                    div.addClass('none').removeClass('current').removeClass('done');
                }else if(col == 1) {
                    div.addClass('current').removeClass('none').removeClass('done');
                }else {
                    div.addClass('done').removeClass('none').removeClass('current');
                }
            })
        });
    }
}

export default SquareFactory;