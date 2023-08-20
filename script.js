import { Tetris } from './tetris.js';
import { PLAYFIELD_ROWS, PLAYFIELD_COLUMNS, convertPositionToIndex } from './utilities.js';

const tetris = new Tetris();
const cells = document.querySelectorAll('.grid>div');

initKeydown();
draw();

function initKeydown() {
	document.addEventListener('keydown', onKeydown);
}

function onKeydown(event) {
	switch (event.key) {
		case 'ArrowUp':
			rotate();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case 'ArrowLeft':
			moveLeft();
			break;
		case 'ArrowRight':
			moveRight();
			break;

		default:
			break;
	}
}

function moveDown() {
	tetris.moveTetrominoDown();
	draw();
}
function moveLeft() {
	tetris.moveTetrominoLeft();
	draw();
}
function moveRight() {
	tetris.moveTetrominoRight();
	draw();
}
function rotate() {
	tetris.rotateTetromino();
	draw();
}

function draw() {
	cells.forEach((cell) => cell.removeAttribute('class'));
	drawPlayfield();
	drawTetromino();
}

function drawPlayfield() {
	for (let row = 0; row < PLAYFIELD_ROWS; row++) {
		for (let col = 0; col < PLAYFIELD_COLUMNS; col++) {
			if (!tetris.playfield[row][col]) continue;
			const name = tetris.playfield[row][col];
			const cellIndex = convertPositionToIndex(row, col);
			cells[cellIndex].classList.add(name);
		}
	}
}

function drawTetromino() {
	const name = tetris.tetromino.name;
	const tetrominoMatrixSize = tetris.tetromino.matrix.length;
	for (let row = 0; row < tetrominoMatrixSize; row++) {
		for (let col = 0; col < tetrominoMatrixSize; col++) {
			if (!tetris.tetromino.matrix[row][col]) continue;
			if (tetris.tetromino.row + row < 0) continue;
			const cellIndex = convertPositionToIndex(tetris.tetromino.row + row, tetris.tetromino.column + col);
			cells[cellIndex].classList.add(name);
		}
	}
}
