  /*----- constants -----*/
const shapes = ['T', 'L', 'J', 'S', 'Z', 'O', 'I']
const colors = {
    'p' : '#F283A0',
    'q' : '#8888FC',
    'r' : '#93E6C6',
    's' : '#FFFD6E',
    't' : '#FAAA70',
    'u' : '#F2D0B1',
    'v' : '#DBB8FC',
    'b' : '#000000'
}


  /*----- state variables -----*/
let gameOver = false
let board
let endRowIndex
let piece
let nextPiece = true
let isOldPieceDone = true
let column = 0
let row = 0


  /*----- cached elements  -----*/

const boardEl = document.querySelector("#board")
const messageEl = document.querySelector("#message")
const playAgainEl = document.querySelector("#playAgain")


  /*----- event listeners -----*/
  

playAgainEl.addEventListener('click', init)
document.addEventListener('keyup', keyBehavior)
  /*----- functions -----*/
function init(){
    board = [
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']
    ]
    gameOver = false
    piece = ['p']
    
    render()
   
    pieceAppear()
}
function render(){
    renderBoard()
    renderMessage()
    renderControls()
}
function renderBoard(){
    board.forEach((colArr, colIdx) => {
        colArr.forEach((cellVal, rowIdx) => {
                let cellId = `r${rowIdx}c${colIdx}`
                let cellEl = document.getElementById(cellId)
                cellEl.style.backgroundColor = colors[cellVal]
        })
    })
}
function renderMessage(){
    if(gameOver === true){
        messageEl.innerText = "GAME OVER!!!"
    }
}
function renderControls(){
    playAgainEl.style.visibility
     = gameOver? 'visible' : 'hidden'
}
function keyBehavior(evt){
    if(evt.key === "ArrowDown"){
        if(row === 0){
            let cell = board[column][row]
            let cell1 = board[column][row+1]
            if(cell!=='b'&& cell1==='b'){
                dropPiece()
            }
        }        
    }
    else if(evt.key === "ArrowLeft"){
        if(column >= 0){
            column = column - 1
            board[column][0] = piece
            board[column+1][0] = 'b'
        }
        render()        
    }else if(evt.key === "ArrowRight"){
        if(column <= 9){
            column = column + 1
            board[column][0] = piece
            board[column-1][0] = 'b'
        }
        render()  
    }
}
function dropPiece(){
    isOldPieceDone = false
    board[column].forEach((eachRow, rIdx) =>{
        if(rIdx > 0){
            if(board[column][rIdx]!=='b'|| rIdx===19){
                endRowIndex = rIdx
                if(endRowIndex === 19 && board[column][endRowIndex]==='b'){
                    board[column][endRowIndex]=piece
                    board[column][0] = 'b'
                    // board[4][19] = 'b'
                    isOldPieceDone = true
                    console.log(column, endRowIndex)
                }
                else{
                    endRowIndex = endRowIndex-1
                    board[column][endRowIndex]=piece
                    board[column][0] = 'b'
                    if(board[column][endRowIndex+1]!=='b'){
                        isOldPieceDone = true
                    }
                    else{
                        isOldPieceDone = false
                    }
                    
                    if(endRowIndex===1){
                        gameOver = true
                    }
                    console.log(column, endRowIndex)
                }               
                render()
            }
        }
    })
    isOldPieceDone = true
    if(isOldPieceDone === true){
        pieceAppear(piece)
    }
    if(gameOver === true){
        renderMessage()
    }
}
function isGameOver(){
    messageEl.innerText = "GAME OVER!!!"
}        
    
function pieceAppear(){
    if(isOldPieceDone === true){
        column = 4
        row = 0
        board[column][row] = piece
        if(board[column][row+1]!=='b'){
            board[column][row] = piece
            isGameOver()
            render()
        }
    }   
    render()
}
function findNewPieceColumn(){
    let cIdxToReturn 
    board.forEach((eachCol, cIdx) => {
        if(cIdx === 4 || cIdx === 5){
            board.forEach((eachRow, rIdx) =>{
                if(board[cIdx][rIdx]!=='b' && rIdx === 0){
                    cIdxToReturn = cIdx
                }
                else{
                    return
                }
            })
        }
        
    })
    return cIdxToReturn
}
    
function moveLeft(cIdx, rIdx, piece){
    for(let col = cIdx; col >=0; col--){
        console.log("type")
        board[col][0] = piece
        board[col+1][0] = 'b'
    }
    
}
function moveRight(){

}
init()

