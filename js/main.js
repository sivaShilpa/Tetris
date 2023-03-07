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
let gameOver = false;
let board;
let endRowIdx = 20;
let piece;
let nextPiece = true


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
   
    pieceAppear(piece)
    
   
    // isGameOver(piece)
      
    
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
        board.forEach((eachCol, cIdx)=>{
            board.forEach((eachRow, rIdx)=>{
                if(rIdx === 0){
                    let cell = board[cIdx][rIdx]
                    let cell1 = board[cIdx][rIdx+1]
                    if(cell!=='b'&& cell1==='b'){
                      dropPiece(cIdx,rIdx, piece)
                    }
                }else{
                    return
                }
            })
        })
        
    }
    else if(evt.key === "ArrowLeft"){
        if(gameOver === false){
            let colIdx = findNewPieceColumn()
            console.log(colIdx)
            render()
        }
       
        
    }else if(evt.key === "ArrowRight"){
        
    }
}
function dropPiece(colIdx,rowIdx,piece){
    let endRowIndex;
    board[colIdx].forEach((eachRow, rIdx) =>{
        if(rIdx > rowIdx){
            if(board[colIdx][rIdx]!=='b'|| rIdx===19){
                endRowIndex = rIdx
                if(endRowIndex === 19 && board[colIdx][endRowIndex]==='b'){
                    board[colIdx][endRowIndex]=piece
                    board[colIdx][rowIdx] = 'b'
                    if(endRowIndex===1){
                        gameOver = true
                    }
                }
                else{
                    endRowIndex = endRowIndex-1
                    board[colIdx][endRowIndex]=piece
                    board[colIdx][rowIdx] = 'b'
                    if(endRowIndex===1){
                        gameOver = true
                    }
                }               
                render()
            }
        }
    })
    pieceAppear(piece)
    
    if(gameOver === true){
        renderMessage()
    }
}
function isGameOver(){
    messageEl.innerText = "GAME OVER!!!"
}        
    
function pieceAppear(piece){
    board[4][0] = piece
    if(board[4][1]!=='b'){
        board[4][0] = piece
        isGameOver()
        render()
    }
    
    render()
}
function findNewPieceColumn(){
    board.forEach((eachCol, cIdx) => {
        if(cIdx === 4 || cIdx === 5){
            board.forEach((eachRow, rIdx) =>{
                if(board[cIdx][rIdx]!=='b' && rIdx === 0){
                    return cIdx
                }
                else{
                    return
                }
            })
        }
        
    })
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

