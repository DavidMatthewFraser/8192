document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    let cells = []
    const width = 4
    let score = 0

    //create the layout
    function createGrid() {
        for (let i = 0; i < Math.pow(width, 2); i++) {
            cell = document.createElement('div')
            cell.innerHTML = 0
            gridDisplay.appendChild(cell)
            cells.push(cell)
        }
        generateNum()
        generateNum()
    }
    createGrid()

    //generate a new number
    function generateNum() {
        const numbers = [2, 4]; //holds the random numbers that can put on the board
        randomNumber = Math.floor(Math.random() * cells.length)
        if (cells[randomNumber].innerHTML == 0) {
            cells[randomNumber].innerHTML = numbers[Math.floor(Math.random() * numbers.length)] //adds random number chosen to put on a random avaliable space on the board
            checkForGameOver()
        } else {
            generateNum()
        }
    }

    function swipeRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let first = cells[i].innerHTML
                let second = cells[i + 1].innerHTML
                let third = cells[i + 2].innerHTML
                let fourth = cells[i + 3].innerHTML
                let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)]

                let filteredRow = row.filter(num => num)
                let missingZeros = 4 - filteredRow.length
                let zeroArray = Array(missingZeros).fill(0)
                let newRow = zeroArray.concat(filteredRow)

                cells[i].innerHTML = newRow[0]
                cells[i + 1].innerHTML = newRow[1]
                cells[i + 2].innerHTML = newRow[2]
                cells[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function swipeLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let first = cells[i].innerHTML
                let second = cells[i + 1].innerHTML
                let third = cells[i + 2].innerHTML
                let fourth = cells[i + 3].innerHTML
                let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)]

                let filteredRow = row.filter(num => num)
                let missingZeros = 4 - filteredRow.length
                let zerosArray = Array(missingZeros).fill(0)
                let newRow = filteredRow.concat(zerosArray)

                cells[i].innerHTML = newRow[0]
                cells[i + 1].innerHTML = newRow[1]
                cells[i + 2].innerHTML = newRow[2]
                cells[i + 3].innerHTML = newRow[3]
            }
        }
    }


    function swipeUp() {
        for (let i = 0; i < 4; i++) {
            let first = cells[i].innerHTML
            let second = cells[i + width].innerHTML
            let third = cells[i + (width * 2)].innerHTML
            let fourth = cells[i + (width * 3)].innerHTML
            let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)]

            let filteredColumn = column.filter(num => num)
            let missingZeros = 4 - filteredColumn.length
            let zerosArray = Array(missingZeros).fill(0)
            let newColumn = filteredColumn.concat(zerosArray)

            cells[i].innerHTML = newColumn[0]
            cells[i + width].innerHTML = newColumn[1]
            cells[i + (width * 2)].innerHTML = newColumn[2]
            cells[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    function swipeDown() {
        for (let i = 0; i < 4; i++) {
            let first = cells[i].innerHTML
            let second = cells[i + width].innerHTML
            let third = cells[i + (width * 2)].innerHTML
            let fourth = cells[i + (width * 3)].innerHTML
            let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)]

            let filteredColumn = column.filter(num => num)
            let missingZeros = 4 - filteredColumn.length
            let zerosArray = Array(missingZeros).fill(0)
            let newColumn = zerosArray.concat(filteredColumn)

            cells[i].innerHTML = newColumn[0]
            cells[i + width].innerHTML = newColumn[1]
            cells[i + (width * 2)].innerHTML = newColumn[2]
            cells[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (cells[i].innerHTML === cells[i + 1].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i + 1].innerHTML)
                cells[i].innerHTML = combinedTotal
                cells[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (cells[i].innerHTML === cells[i + width].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i + width].innerHTML)
                cells[i].innerHTML = combinedTotal
                cells[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    window.addEventListener('keydown', moveSomething)
    //assign functions to keyCodes
    function moveSomething(e) {
        if (e.keyCode === 37) {
            swipeLeft()
            combineRow()
            swipeLeft()
            generateNum()
        } else if (e.keyCode === 38) {
            swipeUp()
            combineColumn()
            swipeUp()
            generateNum()
        } else if (e.keyCode === 39) {
            swipeRight()
            combineRow()
            swipeRight()
            generateNum()
        } else if (e.keyCode === 40) {
            swipeDown()
            combineColumn()
            swipeDown()
            generateNum()
        }
    }


    //check for the number 8192 in the squares to win
    function checkForWin() {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 8192) {
                resultDisplay.innerHTML = 'You WIN'
                updateHistory();
                document.removeEventListener('keydown', moveSomething)
                //setTimeout(() => clear(), 3000)
            }
        }
    }

    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You LOSE'
             updateHistory();
            document.removeEventListener('keydown', moveSomething)
            //setTimeout(() => clear(), 3000)
        }
    }

    //add to game history
    function updateHistory(){
        var node = document.createElement('li');
        node.appendChild(document.createTextNode(score));

        document.querySelector('#history').appendChild(node);    
    }

    //add colours
    function addColours() {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 0) cells[i].style.backgroundColor = 'gray'
            else if (cells[i].innerHTML == 2) cells[i].style.backgroundColor = 'white'
            else if (cells[i].innerHTML == 4) cells[i].style.backgroundColor = 'beige'
            else if (cells[i].innerHTML == 8) cells[i].style.backgroundColor = 'orange'
            else if (cells[i].innerHTML == 16) cells[i].style.backgroundColor = 'yellow'
            else if (cells[i].innerHTML == 32) cells[i].style.backgroundColor = 'green'
            else if (cells[i].innerHTML == 64) cells[i].style.backgroundColor = 'blue'
            else if (cells[i].innerHTML == 128) cells[i].style.backgroundColor = 'purple'
            else if (cells[i].innerHTML == 256) cells[i].style.backgroundColor = 'red'
            else if (cells[i].innerHTML == 512) cells[i].style.backgroundColor = 'teal'
            else if (cells[i].innerHTML == 1024) cells[i].style.backgroundColor = 'pink'
            else if (cells[i].innerHTML == 2048) cells[i].style.backgroundColor = 'seagreen'


            }
        }
        addColours()

        setInterval(addColours, 50)

    })


// document.addEventListener('DOMContentLoaded', ()=> {
//     const gridDisplay = document.querySelector('.grid');
//     const scoreDisplay = document.querySelector('#score');
//     const resultDisplay = document.querySelector('#result');
//     const width = 4;
//     let squares = [];
//     let score = 0;

//     //creates the board
//     function createBoard() {
//         for (let i = 0; i < Math.pow(width,2); i++) {
//             var square = document.createElement('div');
//             square.innerHTML = 0;
//             gridDisplay.appendChild(square);
//             squares.push(square);
//             //console.log(squares.length)
//         }
//         generateNum();
//         //generateNum();
//     }
//     createBoard();

//     //make random number on the board 
//     function generateNum() {
//         const numbers = [2, 4]; //chooses between 4 or 2 to be the random number on the grid
//         let randomNumber = Math.floor(Math.random() * squares.length);
//         if (squares[randomNumber].innerHTML == 0) {
//             squares[randomNumber].innerHTML = numbers[Math.floor(Math.random() * numbers.length)]
//         } else {
//             generateNum();
//         }
//     }



//     //swipe up
//     function swipeUp() {
//         for (let i=0; i < 4; i++) {
//             let first = squares[i].innerHTML;
//             let second = squares[i+(width)].innerHTML;
//             let third = squares[i+(width*2)].innerHTML;
//             let fourth = squares[i+(width*3)].innerHTML;


//             let column = [parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];


//             let filteredColumn = column.filter(num => num)
//             let missingNums = 4 - filteredColumn.length;
//             let numZero =Array(missingNums).fill(0);

//             let newColumn = filteredColumn.concat(numZero);
//             console.log(newColumn)

//             squares[i].innerHTML = newColumn[0];
//             squares[i+(width)].innerHTML = newColumn[1];
//             squares[i+(width*2)].innerHTML = newColumn[2];
//             squares[i+(width*3)].innerHTML = newColumn[3];


//         }
//     }
//     //swipe right
//     function swipeRight() {
//         for (let i =0; i < Math.pow(width,2); i++) {
//             if (i % 4 === 0) {
//                 let first = squares[i].innerHTML;
//                 let second = squares[i+1].innerHTML;
//                 let third = squares[i+2].innerHTML;
//                 let fourth = squares[i+3].innerHTML;
//                 let row = [parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];

//                 let filteredRow = row.filter(num => num)

//                 let missingNums = 4 - filteredRow.length;
//                 let numZero =Array(missingNums).fill(0);

//                 let newRow = numZero.concat(filteredRow);

//                 squares[i].innerHTML = newRow[0];
//                 squares[i+1].innerHTML = newRow[1];
//                 squares[i+2].innerHTML = newRow[2];
//                 squares[i+3].innerHTML = newRow[3];



//             }
//         }
//     }
//     // swipeRight();

//     //swipe left
//     function swipeLeft() {
//         for (let i =0; i < Math.pow(width,2); i++) {
//             if (i % 4 === 0) {
//                 let first = squares[i].innerHTML;
//                 let second = squares[i+1].innerHTML;
//                 let third = squares[i+2].innerHTML;
//                 let fourth = squares[i+3].innerHTML;
//                 let row = [parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];


//                 let filteredRow = row.filter(num => num)


//                 let missingNums = 4 - filteredRow.length;
//                 let numZero =Array(missingNums).fill(0);

//                 let newRow = filteredRow.concat(numZero);
//                 console.log(newRow)

//                 squares[i].innerHTML = newRow[0];
//                 squares[i+1].innerHTML = newRow[1];
//                 squares[i+2].innerHTML = newRow[2];
//                 squares[i+3].innerHTML = newRow[3];



//             }
//         }
//     }
//     //swipeLeft();

//     //swipe down
//     function swipeDown() {
//         for (let i=0; i < 4; i++) {
//             let first = squares[i].innerHTML;
//             let second = squares[i+(width)].innerHTML;
//             let third = squares[i+(width*2)].innerHTML;
//             let fourth = squares[i+(width*3)].innerHTML;


//             let column = [parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];


//             let filteredColumn = column.filter(num => num)
//             let missingNums = 4 - filteredColumn.length;
//             let numZero =Array(missingNums).fill(0);

//             let newColumn = numZero.concat(filteredColumn);
//             squares[i].innerHTML = newColumn[0];
//             squares[i+(width)].innerHTML = newColumn[1];
//             squares[i+(width*2)].innerHTML = newColumn[2];
//             squares[i+(width*3)].innerHTML = newColumn[3];

//         }
//     }

//     function combineRow() {
//         for (let i = 0; i < 15; i++) {
//             if ((i %4 !==3) && squares[i].innerHTML === squares[i+1].innerHTML) {
//                 let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
//                 squares[i].innerHTML = combinedTotal;
//                 squares[i+1].innerHTML = 0;
//                 score += combinedTotal;
//                 scoreDisplay.innerHTML = score;

//             }
//         }
//     }

//     function combineColumn() {
//         for (let i = 0; i < 12; i++) {
//             if (squares[i].innerHTML === squares[i+width].innerHTML) {
//                 let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
//                 squares[i].innerHTML = combinedTotal;
//                 squares[i+width].innerHTML = 0;
//                 score += combinedTotal;
//                 scoreDisplay.innerHTML = score;

//             }
//         }
//     }

//     document.addEventListener("keydown", moveSomething);
//     function moveSomething(e) {
//         switch(e.keyCode) {
//             case 37:
//             // left key pressed
//                 swipeLeft();
//                 combineRow();
//                 checkWin();
//                 swipeLeft();
//                 generateNum();
//             case 38:
//             // up key pressed
//                 swipeUp();
//                 combineColumn();
//                 checkWin();
//                 swipeUp();
//                 generateNum();

//             case 39:
//             // right key pressed
//                 swipeRight();
//                 combineRow();
//                 checkWin();
//                 swipeRight();
//                 generateNum();
//             case 40:
//             // down key pressed
//                 swipeDown();
//                 combineColumn();
//                 checkWin();
//                 swipeDown();

//                 generateNum();
//             }

//     }

//     function checkWin() {
//         for (let i =0; i < squares.length; i++ ) {
//             if (squares[i].innerHTML == 2048) {
//                 resultDisplay.innerHTML = "YOU WON!";
//                 document.removeEvenetListener('keydown', moveSomething);
//             } 
//         }
//     }

//     function checkGameOver() {
//         let zeros = 0;
//         for (let i = 0; i < squares.length; i++) {
//             if (squares[i].innerHTML == 0) {
//                 zeros++;
//             }
//         }
//     }

//     function addColours() {
//         for (let i=0; i < squares.length; i++) {
//             if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = 'gray'
//             else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = 'sand'
//             else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = 'orange'
//             else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = 'yellow'
//             else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = 'pink'
//             else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor =  'green'
//             else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor =  'violet'
//             else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = 'red'
//             else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = 'brown'
//             else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor =  'beige'
//             else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = 'blue'
//             else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor =  'gray'
//         }
//     }
//     addColours()




// })

