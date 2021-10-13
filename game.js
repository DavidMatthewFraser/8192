document.addEventListener('DOMContentLoaded', ()=> {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const resultDispaly = document.querySelector('#result');
    const width = 4;
    let squares = [];
    
    //creates the board
    function createBoard() {
        for (let i = 0; i < Math.pow(width,2); i++) {
            var square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
            //console.log(squares.length)
        }
        generateNum();
    }
    createBoard();

    //make random number on the board 
    function generateNum() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML ==0) {
            squares[randomNumber].innerHTML = 2;
        } else {
            generateNum();
        }
    }

    //swipe up

    //swipe right
    function swipeRight() {
        for (let i =0; i < Math.pow(width,2); i++) {
            if (i % 4 == 0) {
                let first = squares[i].innerHTML;
                let second = squares[i+1].innerHTML;
                let third = squares[i+2].innerHTML;
                let fourth = squares[i+3].innerHTML;
                let row = [parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];
                // console.log(row);

                let filteredRow = row.filter(num => num)
                // console.log(filteredRow);

                let missingNums = 4 - filteredRow.length;
                let numZero =Array(missingNums).fill(0);

                let newRow = numZero.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];


                
            }
        }
    }
    // swipeRight();

    //swipe left
    function swipeLeft() {
        for (let i =0; i < Math.pow(width,2); i++) {
            if (i % 4 == 0) {
                let first = squares[i].innerHTML;
                let second = squares[i+1].innerHTML;
                let third = squares[i+2].innerHTML;
                let fourth = squares[i+3].innerHTML;
                let row = [parseInt(first),parseInt(second),parseInt(third),parseInt(fourth)];
            

                let filteredRow = row.filter(num => num)
                

                let missingNums = 4 - filteredRow.length;
                let numZero =Array(missingNums).fill(0);

                let newRow = filteredRow.concat(numZero);
                console.log(newRow)

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];


                
            }
        }
    }
    swipeLeft();
    
    //swipe down


    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML == squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;

            }
        }
    }

    window.addEventListener("keydown", moveSomething, false);
    function moveSomething(e) {
        switch(e.keyCode) {
            case 37:
            // left key pressed
                swipeLeft();
                combineRow();
                swipeLeft();
                generateNum();
            case 38:
            // up key pressed
                
            case 39:
            // right key pressed
                swipeRight();
                combineRow();
                swipeRight();
                generateNum();
            case 40:
            // down key pressed
                
            }
        
    }

})