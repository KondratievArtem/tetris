import { PLEYFIELD_ROWS, PLEYFIELD_COLUMNS, TETROMINOES, TETROMINO_NAMES, getRandomElement } from './utilities.js';

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
}
