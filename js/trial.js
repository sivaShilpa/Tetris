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
  let cells = []
  let bottomCells = []
  let leftCells = []
  let rightCells = []
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
      render() 
      nextpiece()
         
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
          findBottomCells()
          if(cells.some(cell=>{return cell!=='b'}) && bottomCells.every(cell=>{return cell==='b'})){
              isOldPieceDone = false
              dropPiece()            
          }
          if(pieceObj.bottomLeft[1] === 19 || bottomCells.some(cell=>{return cell!=='b'})){
              isOldPieceDone = true
              isRowFilled()
              nextpiece()
          }
          render()
      }
      else if(evt.key === "ArrowLeft"){
          column = pieceObj.topLeft[0]
          row = pieceObj.topLeft[1]
          findBottomCells()
          if(bottomCells.every(cell=>cell==='b')){
            cells = []
            leftCells = []

            for(let r = pieceObj.topLeft[1]; r<=pieceObj.bottomRight[1]; r++){
                let c = pieceObj.topLeft[0]
                let lCol = c - 1
                if(c > 0){
                    leftCells.push(board[lCol][r])
                    cells.push(board[c][r]) 
                }                                       
            }
            
            if(column > 0 && isOldPieceDone === false && pieceObj.bottomLeft[1] !== 19 && leftCells.every(cell=>cell==='b')){
                for(let c = column; c<=pieceObj.topRight[0]; c++){
                    for(let r = row; r<= pieceObj.bottomLeft[1]; r++){                    
                        board[c-1][r] = board[c][r]
                        board[c][r] = 'b'
                        column = c-1                    
                    }                
                }            
            }
            else{
                return
            }
            column = column-1
            cornerCalculator()
            // if(pieceObj.bottomLeft[1] === 19 || isOldPieceDone===true || board[column][pieceObj.bottomLeft[1]+1]!=='b'){
            //     isOldPieceDone = true
            //     isRowFilled()
            //     nextpiece()
            // }
            render()        
          }else{
            isOldPieceDone = true
          }
          
      }else if(evt.key === "ArrowRight"){
          column = pieceObj.topLeft[0]
          row = pieceObj.topLeft[1]
          findBottomCells()
          if(bottomCells.every(cell=>cell==='b')){
            cells = []
            rightCells = []
                    
            for(let r = pieceObj.topLeft[1]; r<=pieceObj.bottomRight[1]; r++){
                let c = pieceObj.topRight[0]
                let rCol = c + 1   
                if(c<9){
                    rightCells.push(board[rCol][r])
                    cells.push(board[c][r]) 
                }         
                                        
            }
    
            if(pieceObj.topRight[0]+nOfColsInM-1 <= 9 && isOldPieceDone === false && pieceObj.bottomLeft[1] !== 19 && rightCells.every(cell=>cell==='b')){
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
            // if(pieceObj.bottomLeft[1] === 19 || isOldPieceDone===true || board[column][pieceObj.bottomLeft[1]+1]!=='b'){
            //     isOldPieceDone = true
            //     isRowFilled()
            //     nextpiece()
            // }
            render() 
          }else{
            isOldPieceDone = true
          }
               
      }
  }
  function dropPiece(){
      isOldPieceDone = false
      row = pieceObj.topLeft[1]
      column = pieceObj.topLeft[0]
      findBottomCells()
  
      if(pieceObj.bottomLeft[1] !== 19 && row !== 0){
          for(let c=pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
              for(let r=pieceObj.bottomLeft[1]; r>=pieceObj.topLeft[1]; r--){
                  board[c][r+1]=board[c][r]
                  prevRow = r                                    
              } 
              board[c][prevRow] = 'b'                       
          }
      }
      else if(row === 0 && bottomCells.every(cell=>cell==='b')){
          for(let c=pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
              for(let r=pieceObj.bottomLeft[1]; r>=pieceObj.topLeft[1]; r--){
                  board[c][r+1]=board[c][r]                                                             
              } 
              board[c][0] = 'b'                                 
          } }
    //   }else if(pieceObj.bottomLeft[1] === 19 || isOldPieceDone===true || bottomCells.some(cell=>cell!=='b')){
    //     console.log("A")
    //       isRowFilled()
    //       nextpiece()
    //   }
      row = row+1
      cornerCalculator()
    //   isOldPieceDone = false
          
  }
  function pieceAppear(){
      nOfRowsInM = 0
      nOfColsInM = 0
      mArray = []
      piece = shapeMatrices.O
      
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
      isOldPieceDone = false  
      cornerCalculator()
      findBottomCells()
      if(bottomCells.some(cell=>cell!=='b') && pieceObj.topLeft[1]===0){
        gameOver = true
      }
      render()
  }
  function isRowFilled(){
      let rowFilled
      filledRows = []
      for(let r = 0; r<=19; r++){
          for(let c = 0; c<=9; c++){
              if(board[c][r]!=='b'){
                  rowFilled = true
              }
              else{
                  rowFilled = false
                  break
              }            
          }
          if(rowFilled){
              filledRows.push(r)
          }              
      }
        
      if(filledRows.length>0 && isOldPieceDone===true){
          filledRows.push(19)
          disappearRow()
      }    
  }
  function disappearRow(){
    for(let j = filledRows.length-2; j>=0; j--){
        for(let r = filledRows[j]; r>filledRows[j-1]; r--){
            if(r>0){
                    for(let c = 0; c<=9; c++){
                     board[c][r] = board[c][r-1]
                }
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
  function nextpiece(){
      if(isOldPieceDone === true){
        //   isRowFilled()
          pieceAppear()
      }    
      isOldPieceDone = false
  }
  function findBottomCells(){
    cells = []
    bottomCells = []
                 
    for(let c = pieceObj.bottomLeft[0]; c<=pieceObj.bottomRight[0]; c++){
        let r = pieceObj.bottomLeft[1]
        let bRow = r + 1   
        if(r < 19){
            bottomCells.push(board[c][bRow])
            cells.push(board[c][r])   
        }                                    
    }
  }
  init()
  