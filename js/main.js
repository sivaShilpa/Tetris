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
originRow = 0
originCol = 4


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
let pieceObj = {'topLeft': [column, row], 'topRight': [column+nOfColsInM-1, row], 'bottomRight': [column+nOfColsInM-1, row+nOfRowsInM-1], 'bottomLeft': [column, row+nOfRowsInM-1]}

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
               
        for(let c = pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
            for(let r = pieceObj.topLeft[1]; r<=pieceObj.bottomLeft[1]; r++){
                let bRow = pieceObj.bottomLeft[1] + 1
                bottomCells.push(board[c][bRow])
                cells.push(board[c][r])
            }
            
        }
        if(cells.every(cell=>{return cell!=='b'}) && bottomCells.every(cell=>{return cell==='b'})){
            dropPiece()
            row = pieceObj.topLeft[1]+1 
        }
        render()
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
    column = pieceObj.bottomLeft[0]
    row = pieceObj.topLeft[1]
    
    if(row+1 !== 20 && row-1 !== -1){
        for(let c=pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
            for(let r=pieceObj.topLeft[1]; r<=pieceObj.bottomLeft[1]; r++){
                board[c][r+1]=board[c][r]
                board[c][r] = board[c][r-1]                             
            }            
        }
    }
    else if(row === 0){
        for(let c=pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
            for(let r=pieceObj.topLeft[1]; r<=pieceObj.bottomLeft[1]; r++){
                board[c][r+1]=board[c][r]
                board[c][r] = board[c][0]                               
            } 
            board[c][0] = 'b'                     
        }           
    }else{
        isOldPieceDone = true
        return
    }

    // board[column].forEach((eachRow, rIdx)=>{
    //     if(rIdx >= prevRow+nOfRowsInM){
    //         if(board[column][rIdx]!=='b'|| rIdx === 19){
    //             row = rIdx - nOfRowsInM
    //         }
    //     }
    // })
    // console.log(column, row)
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
    column = originCol
    row = originRow

    if(isOldPieceDone === true){
        for(let c = column; c < nOfColsInM+column; c++){
            for(let r = row; r < nOfRowsInM+row; r++){
                mArray.forEach(el => board[c][r] = el)
                    
            }
        }
    }   
    
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

