// const cellEls = [...document.querySelectorAll(".cell")]
// cellEls.forEach(cellEl => cellEl.addEventListener("click", init))
// for(let i = 20; i>0; i--){
    //     // console.log(gameOver)
    //     if(gameOver === false){
    //         setTimeout(() =>{ dropPiece(piece, i)}, 1000)
    //     }        
    // }

// board[4][0] = piece
    // board[4].forEach((eachRow, rowIdx)=> {
    //     if(rowIdx < endRowIdx){
    //         setTimeout(() => {
    //             if(board[4][rowIdx]!=='b'){
    //                 return
    //             }                
    //             board[4][rowIdx] = piece
    //             board[4][rowIdx-1] ='b'
    //             if(rowIdx-1 === -1){
    //                     gameOver = true
    //             }
    //             if(board[4][rowIdx+1]!=='b'||rowIdx+1 === 20){
    //                 endRowIdx = rowIdx
    //             }                
    //             renderBoard()
    //        }, 500*(rowIdx+1))
    //     }            
    // })
    // function handleDrop(evt){
        //     let currentSpot = evt.target
        //     const colIdx = markerEls.indexOf(currentSpot)
        //     if(colIdx === -1){
        //         return
        //     }else{
        //         const colArr = board[colIdx]
        //         const rowIdx = colArr.indexOf(0)
        //         colArr[rowIdx]= turn
        //         turn *= -1
        //         winner = getWinner(colIdx, rowIdx)
        //         render()
        //     }
        // }
    // function startGame(evt){
//     let currentSpot = evt.target
//     // console.log(currentSpot)
//     if(gameOver === false){
//         if(currentSpot.tagName !== "DIV"){
//             console.log(currentSpot.getAttribute("class"))
//             return
//         }else{
//             currentSpot.style.backgroundColor = colors.tShape
//         }
//         // isRowFilled(currentSpot)
//         if(isRowFilled(currentSpot)){
//             clearRow(boardEl)
//         }
//     }
//     else{
//         resultEl.textContent = "GAME OVER!"
//     }
   
// } 

// function isRowFilled(evt){
//     let state = false
//     let currentRow = evt.parentElement
//     let currentRowCells = [...currentRow.children]
//     // console.log(state)
//     currentRowCells.forEach(eachCell => {
//         // console.log(eachCell.style.backgroundColor)
//         if(eachCell.style.backgroundColor === "rgb(242, 131, 160)"){
//             state = true            
//         }
//         else{
//             state = false
//             return           
//         }        
//     })
//     return state
// }
// function clearRow(board){
//     let rows = [...board.children]
//     // console.log(rows)
//     for(let i=19; i>=0; i--){
//         let childrn = [...rows[i].children]
//         // console.log(childrn)
//         if(i===0){
//             childrn.forEach(kid =>{
//                 kid.style.backgroundColor === "black"
//                 // console.log(kid)
//             } )
            
//         }
//         else{
//             let nextChildrn = [...rows[i-1].children]
//                 for(let j=0; j<childrn.length; j++){
//                     childrn[j].style.backgroundColor = nextChildrn[j].style.backgroundColor
//                 }
            
            
//         }
//         //if there are more than one row filled then the code should be adjusted to get the multiple filled rows deleted and move the other rows down.
//     }

// }
// function gameOver(){
//     //check if last piece is in the row1, if yes then return true and 
// }
