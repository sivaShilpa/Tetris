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
const shapeMatrices = {
    'T' : [
            ['p', 'p', 'p'],
            ['b', 'p', 'b']
          ],
    'L' : [
            ['q', 'b'],
            ['q', 'b'],
            ['q', 'q']
          ],
    'J' : [
            ['b', 'r'], 
            ['b', 'r'],
            ['r', 'r']
          ],
    'S' : [
            ['b', 's', 's'],
            ['s', 's', 'b']
          ],
    'Z' : [
            ['t', 't', 'b'],
            ['b', 't', 't']
          ],
    'O' : [
            ['u', 'u'],
            ['u', 'u']
          ],
    'I' : [
            ['v'],
            ['v'],
            ['v'],
            ['v']
          ]
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
let filledRows = []
let nOfRowsInM
let nOfColsInM
let mArray
let prevCol
let prevRow

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
    piece = shapeMatrices.O
    
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
        let cells = []
        let bottomCells = []
        let bottomRow
        if(row === 0){
            for(let c=column; c<column+nOfColsInM; c++){
                for(let r=row; r<row+nOfRowsInM; r++){
                    cells.push(board[c][r])
                    bottomRow = r+1
                    // console.log(board[c][r])
                    // console.log(board[c][r+1])
                }
                bottomCells.push(board[c][bottomRow])
            }
            if(cells.every(cell=>{return cell!=='b'}) && bottomCells.every(cell=>{return cell==='b'})){
                console.log("I am here")
            }
        }
        // if(row === 0){
        //     let cell = board[column][row]
        //     let cell1 = board[column][row+1]
        //     if(cell!=='b'&& cell1==='b'){
        //         dropPiece()
        //     }
        // }        
    }
    else if(evt.key === "ArrowLeft"){
        if(column > 0){
            column = column - 1
            board[column][0] = piece[0]
            board[column+1][0] = 'b'
        }
        else{
            return
        }
        render()        
    }else if(evt.key === "ArrowRight"){
        if(column < 9){
            column = column + 1
            board[column][0] = piece[0]
            board[column-1][0] = 'b'
        }
        else{
            return
        }
        render()  
    }
}
function dropPiece(){
    isOldPieceDone = false
    prevCol = column
    prevRow = row
    console.log(column, row)
    // board[column].forEach((eachRow, rIdx) =>{
    //     if(rIdx > 0){
    //         if(board[column][rIdx]!=='b'|| rIdx===19){
    //             endRowIndex = rIdx
    //             if(endRowIndex === 19 && board[column][endRowIndex]==='b'){
    //                 board[column][endRowIndex]=piece[0]
    //                 row = endRowIndex
    //                 board[column][0] = 'b'
    //                 isOldPieceDone = true                    
    //             }
    //             else{
    //                 endRowIndex = endRowIndex-1
    //                 board[column][endRowIndex]=piece[0]
    //                 row = endRowIndex
    //                 board[column][0] = 'b'
    //                 if(board[column][endRowIndex+1]!=='b'){
    //                     isOldPieceDone = true
    //                 }
    //                 else{
    //                     isOldPieceDone = false
    //                 }
                    
    //                 if(endRowIndex===1){
    //                     gameOver = true
    //                 }
    //             }
    //             isRowFilled()                 
    //         }
    //     }
    // })
    // isOldPieceDone = true
    // if(isOldPieceDone === true){
    //     pieceAppear()
    // }
    // if(gameOver === true){
    //     renderMessage()
    // }
}
function pieceAppear(){
    nOfRowsInM = 0
    nOfColsInM = 0
    mArray = []
    piece.forEach((eachCol, cIdx)=>{
        nOfColsInM++
        piece.forEach((eachRow, rIdx)=>{
            nOfRowsInM++
            mArray.push(piece[cIdx][rIdx])
        })
    })
    nOfRowsInM = nOfRowsInM/nOfColsInM
    
    if(isOldPieceDone === true){
        if(nOfColsInM === 2 && nOfRowsInM === 2){
            column = 4
            row = 0
            
            for(let c = column; c < nOfColsInM+column; c++){
                for(let r = row; r < nOfRowsInM+row; r++){
                    mArray.forEach(el => board[c][r] = el)
                    
                }
            }
        }
    }   
    // console.log(column, row)
    render()
}
function isRowFilled(){
    let rowFilled
    for(let c = 0; c<=9; c++){
        if(board[c][row]!=='b'){
            rowFilled = true
        }
        else{
            rowFilled = false
            break
        }
        
    }
    if(rowFilled){
        disappearRow()
    }    
}
function disappearRow(){
    for(let c = 0; c<=9; c++){
        if(row>0){
            for(let r = row; r>0; r--){
                board[c][r] = board[c][r-1]                
            }
                
        }
    }
    render()
}
init()

