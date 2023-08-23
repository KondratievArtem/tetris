import { PLAYFIELD_ROWS, PLAYFIELD_COLUMNS, TETROMINOES, TETROMINO_NAMES, getRandomElement, setRotateMatrix } from './utilities.js';

export class Tetris {
	constructor() {
		this.playfield;
		this.tetromino;
		this.isGameOver = false;
		this.init();
	}

	init() {
		this.generatePlayfield();
		this.generateTetromino();
	}

	generatePlayfield() {
		this.playfield = new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
	}

	generateTetromino() {
		const name = getRandomElement(TETROMINO_NAMES);
		const matrix = TETROMINOES[name];

		const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
		const row = -2;

		this.tetromino = {
			name,
			matrix,
			row,
			column,
			ghostColumn: column,
			ghostRow: row,
		};

		this.calculateGhostPosition();
	}

	moveTetrominoDown() {
		this.tetromino.row += 1;
		if (!this.isValid()) {
			this.tetromino.row -= 1;
			this.playTetromino();
		}
	}

	moveTetrominoLeft() {
		this.tetromino.column -= 1;
		if (!this.isValid()) {
			this.tetromino.column += 1;
		} else {
			this.calculateGhostPosition();
		}
	}
	moveTetrominoRight() {
		this.tetromino.column += 1;
		if (!this.isValid()) {
			this.tetromino.column -= 1;
		} else {
			this.calculateGhostPosition();
		}
	}
	rotateTetromino() {
		const oldMatrix = this.tetromino.matrix;
		const rotateMatrix = setRotateMatrix(this.tetromino.matrix);
		this.tetromino.matrix = rotateMatrix;
		if (!this.isValid()) {
			this.tetromino.matrix = oldMatrix;
		} else {
			this.calculateGhostPosition();
		}
	}

	dropTetrominoDown() {
		this.tetromino.row = this.tetromino.ghostRow;
		this.playTetromino();
	}

	isValid() {
		const matrixSize = this.tetromino.matrix.length;
		for (let row = 0; row < matrixSize; row++) {
			for (let col = 0; col < matrixSize; col++) {
				if (!this.tetromino.matrix[row][col]) continue;
				if (this.isOutsideGameBoard(row, col)) return false;
				if (this.isCollides(row, col)) return false;
			}
		}
		return true;
	}

	isOutsideGameBoard(row, col) {
		return this.tetromino.column + col < 0 || this.tetromino.column + col >= PLAYFIELD_COLUMNS || this.tetromino.row + row >= this.playfield.length;
	}

	isCollides(row, col) {
		return this.playfield[this.tetromino.row + row]?.[this.tetromino.column + col];
	}

	playTetromino() {
		const matrixSize = this.tetromino.matrix.length;
		for (let row = 0; row < matrixSize; row++) {
			for (let col = 0; col < matrixSize; col++) {
				if (!this.tetromino.matrix[row][col]) continue;
				if (this.isOutsideOfTopBoard(row)) {
					this.isGameOver = true;
					return;
				}
				this.playfield[this.tetromino.row + row][this.tetromino.column + col] = this.tetromino.name;
			}
		}
		this.processFilledRow();
		this.generateTetromino();
	}

	isOutsideOfTopBoard(row) {
		return this.tetromino.row + row < 0;
	}

	processFilledRow() {
		const filledLine = this.findFilledRows();
		this.removeFilledRows(filledLine);
	}
	findFilledRows() {
		const filledRows = [];
		for (let row = 0; row < PLAYFIELD_ROWS; row++) {
			if (this.playfield[row].every((cell) => Boolean(cell))) {
				filledRows.push(row);
			}
		}
		return filledRows;
	}

	removeFilledRows(filledRows) {
		filledRows.forEach((row) => {
			this.dropRowsAbove(row);
		});
	}

	dropRowsAbove(rowToDelete) {
		for (let row = rowToDelete; row > 0; row--) {
			this.playfield[row] = this.playfield[row - 1];
		}
		this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
	}

	calculateGhostPosition() {
		const tetrominoRow = this.tetromino.row;
		this.tetromino.row++;
		while (this.isValid()) {
			this.tetromino.row++;
		}
		this.tetromino.ghostRow = this.tetromino.row - 1;
		this.tetromino.ghostColumn = this.tetromino.column;
		this.tetromino.row = tetrominoRow;
	}
}
