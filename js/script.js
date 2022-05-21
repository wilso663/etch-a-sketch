var color = 'black'
const container = document.querySelector('.board__container');
const colorButtons = document.querySelectorAll('.color-choice');
const clearButton = document.querySelector('.clear');
const userColorPicker = document.querySelector("#input-color");
const slider = document.querySelector('.slider');
//Grid will always be a square, hence only one dimension for length and height
//Resolution will be capped at 100x100 for performance
//Default grid size is 10;

function createGrid (gridDimension) { 

    let gridArea = gridDimension * gridDimension;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${gridDimension}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gridDimension}, 1fr)`;
        container.insertAdjacentElement('beforeend', gridItem);
    } 
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid));
}

//Get value from data-color with dataset.color
//var color is of type string. Will have helper function:colorGrid() to convert string to correct background color
function changeColor(e){
  switch(e.target.dataset.color){
    case 'rainbow':
      color = 'rainbow'; 
      break;
    case 'gray':
      color = 'gray';
      break;
    case 'eraser':
      color = 'eraser';
      break;
    default:
      color = 'black';
      break;
  }
}

function colorGrid(){
  switch(color){
    case 'rainbow':
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      break;
    case 'gray':
      this.style.backgroundColor = 'rgba(0,0,0,0.1)';
      break;
    case 'eraser':
      this.style.backgroundColor = "#ffffff";
      break;
    case 'black':
      this.style.backgroundColor = "#000000";
      break;
    default:
      this.style.backgroundColor = color;
      break;
  }
}

const eraseAllGrid = () => {
  var gridPixels = container.querySelectorAll('div');
  gridPixels.forEach(gridPixel => gridPixel.style.background = "#FFFFFF");
}

function sliderGridSize(){
  let gridPixels = container.querySelectorAll('div');
  gridPixels.forEach(gridPixel => gridPixel.remove());
  createGrid(slider.value);
}

function buttonHover() {
  this.style.border = '1px solid #FFFFFF';
}

function buttonBorder() {
  this.style.border = '1px solid #FF0000';
}

function userColorSelection(event){
  color = event.target.value;
}

clearButton.addEventListener('click', eraseAllGrid);
clearButton.addEventListener('mouseover', buttonHover);
clearButton.addEventListener('mouseout', buttonBorder);
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseover', buttonHover));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseout', buttonBorder));
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);
slider.addEventListener('mouseup', sliderGridSize);
createGrid(10);
  
