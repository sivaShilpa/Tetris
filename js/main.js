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
let piece
let isOldPieceDone = true
let column = 0
let row = 0
let filledRows = []
let nOfRowsInM
let nOfColsInM
let mArray
let pieceObj = {'topLeft': [], 'topRight': [], 'bottomRight': [], 'bottomLeft': []}

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
    if(isOldPieceDone === true){
        pieceAppear()
        isOldPieceDone = false
    }   
    
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
        column = pieceObj.topLeft[0]
        row = pieceObj.topLeft[1]
        
        if(column >= 0 && isOldPieceDone === false && pieceObj.bottomLeft[1] !== 19){
            console.log("A")
            for(let c = column; c<=pieceObj.topRight[0]; c++){
                for(let r = row; r<= pieceObj.bottomLeft[1]; r++){                    
                    board[c-1][r] = board[c][r]
                    board[c][r] = 'b'
                    column = c-1                    
                }                
            }            
        }
        else{
            console.log("B")
            return
        }
        column = column-1
        cornerCalculator()
        render()        
    }else if(evt.key === "ArrowRight"){
        column = pieceObj.topLeft[0]
        row = pieceObj.topLeft[1]

        if(pieceObj.topRight[0] <= 9 && isOldPieceDone === false && pieceObj.bottomLeft[1] !== 19){
            for(let c = pieceObj.topRight[0]; c>=pieceObj.topLeft[0]; c--){
                for(let r = row; r<= pieceObj.bottomLeft[1]; r++){                    
                    board[c+1][r] = board[c][r]
                    board[c][r] = 'b'                                        
                }                
            }            
        }
        else{
            return
        }
        column = column+1
        cornerCalculator()
        render()      
    }
}
function dropPiece(){
    isOldPieceDone = false
    row = pieceObj.topLeft[1]
    column = pieceObj.topLeft[0]

    if(pieceObj.bottomLeft[1] !== 19 && row !== 0){
        for(let c=pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
            for(let r=pieceObj.bottomLeft[1]; r>=pieceObj.topLeft[1]; r--){
                board[c][r+1]=board[c][r]
                prevRow = r                                    
            } 
            board[c][prevRow] = 'b'                       
        }
    }
    else if(row === 0){
        for(let c=pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
            for(let r=pieceObj.bottomLeft[1]; r>=pieceObj.topLeft[1]; r--){
                board[c][r+1]=board[c][r]
                // board[c][r] = board[c][0]                                               
            } 
            board[c][0] = 'b'                                 
        }           
    }else{
        isOldPieceDone = true
        return
    }
    // isOldPieceDone = true
    row = row+1
    cornerCalculator()    
}
function pieceAppear(){
    nOfRowsInM = 0
    nOfColsInM = 0
    mArray = []
    piece.forEach((eachCol, cIdx)=>{
        nOfColsInM++
        eachCol.forEach((eachRow, rIdx)=>{
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
    cornerCalculator()
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
function cornerCalculator(){
    pieceObj.topLeft =  [column, row]
    pieceObj.topRight = [column+nOfColsInM-1, row]
    pieceObj.bottomRight = [column+nOfColsInM-1, row+nOfRowsInM-1]
    pieceObj.bottomLeft = [column, row+nOfRowsInM-1]
}
function randomPieceGenerator(){
    let randomNumber = Math.floor(Math.random()*6)
    let pieceShape = shapes[randomNumber]
    piece = shapeMatrices[pieceShape]
    
    return piece
}
init()

