import { PLEYFIELD_ROWS, PLEYFIELD_COLUMNS, TETROMINOES, TETROMINO_NAMES, getRandomElement, setRotateMatrix } from './utilities.js';

export class Tetris {
	constructor() {
		this.playfield;
		this.tetromino;
		this.init();
	}

	init() {
		this.generatePlayfield();
		this.generateTetromino();
	}

	generatePlayfield() {
		this.playfield = new Array(PLEYFIELD_ROWS).fill().map(() => new Array(PLEYFIELD_COLUMNS).fill(0));
	}

	generateTetromino() {
		const name = getRandomElement(TETROMINO_NAMES);
		const matrix = TETROMINOES[name];

		const column = PLEYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
		// const row = -2;
		const row = 3;

		this.tetromino = {
			name,
			matrix,
			row,
			column,
		};
	}

	moveTetrominoDown() {
		this.tetromino.row += 1;
		if (!this.isValid()) this.tetromino.row -= 1;
	}

	moveTetrominoLeft() {
		this.tetromino.column -= 1;
		if (!this.isValid()) this.tetromino.column += 1;
	}
	moveTetrominoRight() {
		this.tetromino.column += 1;
		if (!this.isValid()) this.tetromino.column -= 1;
	}
	rotateTetromino() {
		const oldMatrix = this.tetromino.matrix;
		const rotateMatrix = setRotateMatrix(this.tetromino.matrix);
		this.tetromino.matrix = rotateMatrix;
		if (!this.isValid()) this.tetromino.matrix = oldMatrix;
	}

	isValid() {
		const matrixSize = this.tetromino.matrix.length;
		for (let row = 0; row < matrixSize; row++) {
			for (let col = 0; col < matrixSize; col++) {
				if (!this.tetromino.matrix[row][col]) continue;
				if (this.isOutsideGameBoard(row, col)) return false;
			}
		}
		return true;
	}

	isOutsideGameBoard(row, col) {
		return this.tetromino.column + col < 0 || this.tetromino.column + col >= PLEYFIELD_COLUMNS || this.tetromino.row + row >= this.playfield.length;
	}
}
