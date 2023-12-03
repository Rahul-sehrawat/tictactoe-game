const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restart");
const statusText = document.querySelector("#status");

let currentPlayer = "X";
let running = false;
// running var will decide whether game is running 

// here these all are the winning combo which are stored in 2D array named = winCondition.
 let winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// an empty array is created , it will be used to check few things
// it will be used for to see if the cell is empty or is X or O is placed
// this array will also be used to check the winning combo 
let spaceLeft = ["","","","","","","","",""];


 initialize();

function initialize(){
    running = true;
    cells.forEach(cell => cell.addEventListener("click",cellClicked ));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;

    // here running is true to start the functions
    // cells is the var( it is an array) which is for cell class of div , it includes 9 div 
    // so with .forEach() to apply the changes on each and every elements, we can pass arrow fn/normal fn/ callback.
    // when we click on any div(cell) the cellClick() will apply


}

function cellClicked(){
   const cellIndex = this.getAttribute("cellIndex");
    if(spaceLeft[cellIndex] != ""|| !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();

    // this keyword is used here for the selected div(class = cell)
    // .getAttribute is used to give the value of the attribute
    // in html we create our own attribute(cellIndex) for 9 div(0-8)
    //  this.getAttribute("cellIndex") is will assign the value to the cellIndex
    // if the element in spaceLeft array is not empty thatmeans it is already filled
    // updatecell() take two args . this - slected div , cellIndex = (0-8)

}

function updateCell(cell , index){
    spaceLeft[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // currentPlayer is X/O which we will store it in espaceLeft arr
    // then we change the text content of the div(cell)

}

function changePlayer(){
    currentPlayer = (currentPlayer=="X")? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;

    // here we use trinety operator to change the X and O
    // we also change the statusText
}


function checkWinner(){

  let  roundwon = false;

//   here we first iterate with the first array
// then we take eleement of the outside array and store it in a var arr in every iteration
// note: each element of outer array contain 3 elements so we use new var(arr) to select the elemnts
// then we store the value of spaceLeft arry to 3 differnet variables, the values can be empty/X/O

  for( let i =0; i< winCondition.length;i++){
    let arr = winCondition[i];
    let cellA = spaceLeft[arr[0]];
    let cellB = spaceLeft[arr[1]];
    let cellC = spaceLeft[arr[2]];

    // here we use ||(or) condition thatmeans even one condition is true it will work
    // if any  selected variable is empty , continue(skip)
    if( cellA == ""||cellB == "" ||cellC == ""){
        continue;
    }

    // all are same wheter X or O ,break(loop over)
    else if (cellA == cellB && cellB == cellC){
        roundwon = true;
       break;
    }
}

// showing result win and draw senario
// roundwon is true means we found a match for wincondition
if(roundwon){
    statusText.textContent = `${currentPlayer} wins!!`;
    running = false;
}

// .includes is used to check whether the element exist in the array or not
// if no empty elements exist in the cells  and no match for winconditon then its draw
else if (!spaceLeft.includes("")){
    statusText.textContent = "DRAW !!";
  }
else{
    changePlayer();
  }
}

function restartGame() {
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    spaceLeft = ["","","","","","","","",""];
    cells.forEach(cell => cell.textContent = "");
    running = true;
}