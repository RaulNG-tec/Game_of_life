let board;
let columns;
let rows;
let cell_size = 10;
var countM = 0; // contador de muertes
var countN = 0; // contador de nacimientos
var countV = 0; // contador de vidas
var countG = 0; // contador de generaciones
var cambiarColor = true;
var R = 0;
var G = 0;
var B = 0;

function setup() {
  createCanvas(120, 120);
  
}

function draw() {
  background(255,0,0);
  text(key, 60, 80);
}



function setup() {
  createCanvas(700, 400);
  textSize(19);
  textAlign(LEFT, BOTTOM);
  fill(0);
  
  columns = width/cell_size;
  rows = (height - 20)/cell_size;
  board = createBoard(columns, rows);
  for(let x = 1; x < columns-1; x++){
    for(let y = 1; y < rows-1; y++){
      board[x][y] = floor(random(2));
      if (board[x][y] == 1)
        countV += 1;
    }
  }
}

function draw() {
  background(220);
  colorBoard();
  next();
  
}

function colorBoard(){
  if (cambiarColor){
    R = floor(random(255));
    G = floor(random(255));
    B = floor(random(255));
  }
  fill(R,G,B);
    stroke(0);
    for(let x = 0; x < columns; x++){
      for(let y = 0; y < rows; y++){
        let posx = x*cell_size;
        let posy = y*cell_size;
        if(board[x][y] == 1){
          rect(posx,posy,cell_size);
        }
      }
    }
}

function next(){
  let next_board = createBoard(columns, rows);
  for(let x = 1; x < columns-1; x++){
    for(let y = 1; y < rows-1; y++){
      let cell = board[x][y];
      let neighbors = 0;
      neighbors = countNeighbors(x,y);
      if(cell == 0 && neighbors == 3){
        next_board[x][y] = 1;
        countN += 1;
      }else if(cell == 1 && (neighbors > 3 || neighbors < 2)){
        next_board[x][y] = 0;
        countM += 1;
        countG += 1;
      }else{
        next_board[x][y] = cell;
      }
    }
  }
  countV = countV + countN - countM;
  mostrarContadores();
  countN = 0;
  countM = 0;
  board = next_board;
}

function countNeighbors(x,y){
  let sum_neighbors = 0;
  sum_neighbors += board[x-1][y-1];
  sum_neighbors += board[x][y-1];
  sum_neighbors += board[x+1][y-1];
  sum_neighbors += board[x-1][y];
  sum_neighbors += board[x+1][y];
  sum_neighbors += board[x-1][y+1];
  sum_neighbors += board[x][y+1];
  sum_neighbors += board[x+1][y+1];
  return sum_neighbors;
}

function mostrarContadores(){
  fill(0);
  text('Vivas: ',0, height - 5);
  text(countV, 58, height - 5);
  text('Muertes: ',110, height - 5);
  text(countM, 190, height - 5);
  text('Nacimientos: ',245, height - 5);
  text(countN, 360, height - 5);
  text('Generaciones: ',420, height - 5);
  text(countG, 550, height - 5);
}

function createBoard(cols,rws){
  let board = new Array(cols);
  for(let i = 0; i < board.length; i++){
    board[i] = new Array(rws);
  }
  return board;
}

function mousePressed(){
  cambiarColor = !cambiarColor;
}

function touchStarted(){
  cambiarColor = !cambiarColor;
}