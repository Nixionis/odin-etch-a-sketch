const sketchContainer = document.querySelector('.sketch-container');
const sizeSlider = document.querySelector('#size-slider');
const sliderLabel = document.querySelector('#slider-label');

const BOARD_WIDTH = 300;

let gridSize = 16;
let mouseDown = false;
let randomColors = false;

function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
}

function colorCell(event) {
    if (!mouseDown)
        return;

    event.target.style['background-color'] = (randomColors) ? getRandomColor() : 'rgb(0,0,0)';
}

function placeCells(amount) {
    let cells = sketchContainer.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++)
        cells[i].remove();

    for (let i = 0; i < amount; i++) {
        for (let j = 0; j < amount; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.dataset.cellNumber = `${i}-${j}`;
            newCell.style.width = `${BOARD_WIDTH / amount}px`;
            newCell.style.height = `${BOARD_WIDTH / amount}px`;


            newCell.addEventListener('mouseenter', colorCell);

            newCell.addEventListener('mousedown', (e) => {
                mouseDown = true;
                colorCell(e);
            });

            sketchContainer.appendChild(newCell);
        }
    }
}

sketchContainer.style['width'] = `${BOARD_WIDTH}px`;
sketchContainer.style['height'] = `${BOARD_WIDTH}px`;
placeCells(gridSize);

window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);

document.querySelector('#btn-random').addEventListener('click', (event) => {
    event.target.classList.toggle('pressed');

    randomColors = !randomColors;
});

document.querySelector('#btn-clear').addEventListener('click', () => placeCells(gridSize));

sizeSlider.addEventListener('input', (event) => {
    console.log('slide');
    sliderLabel.textContent = `Grid Size: ${event.target.value}x${event.target.value}`;
});

sizeSlider.addEventListener('change', (event) => {
    gridSize = Number(event.target.value);
    placeCells(gridSize);
});
