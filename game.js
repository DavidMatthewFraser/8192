var howToAnimId = 0

document.addEventListener('DOMContentLoaded', () => {

    /************************************************
    Start of game js
    ************************************************/
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    let cells = []
    const width = 5
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
        for (let i = 0; i < 25; i++) {
            if (i % 5 === 0) {
                let first = cells[i].innerHTML
                let second = cells[i + 1].innerHTML
                let third = cells[i + 2].innerHTML
                let fourth = cells[i + 3].innerHTML
                let fifth = cells[i + 4].innerHTML
                let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth),parseInt(fifth)]

                let filteredRow = row.filter(num => num)
                let missingZeros = 5 - filteredRow.length
                let zeroArray = Array(missingZeros).fill(0)
                let newRow = zeroArray.concat(filteredRow)

                cells[i].innerHTML = newRow[0]
                cells[i + 1].innerHTML = newRow[1]
                cells[i + 2].innerHTML = newRow[2]
                cells[i + 3].innerHTML = newRow[3]
                cells[i + 4].innerHTML = newRow[4]
            }
        }
    }

    function swipeLeft() {
        for (let i = 0; i < 25; i++) {
            if (i % 5 === 0) {
                let first = cells[i].innerHTML
                let second = cells[i + 1].innerHTML
                let third = cells[i + 2].innerHTML
                let fourth = cells[i + 3].innerHTML
                let fifth = cells[i + 4].innerHTML
                let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth), parseInt(fifth)]

                let filteredRow = row.filter(num => num)
                let missingZeros = 5 - filteredRow.length
                let zerosArray = Array(missingZeros).fill(0)
                let newRow = filteredRow.concat(zerosArray)

                cells[i].innerHTML = newRow[0]
                cells[i + 1].innerHTML = newRow[1]
                cells[i + 2].innerHTML = newRow[2]
                cells[i + 3].innerHTML = newRow[3]
                cells[i + 4].innerHTML = newRow[4]
            }
        }
    }


    function swipeUp() {
        for (let i = 0; i < 5; i++) {
            let first = cells[i].innerHTML
            let second = cells[i + width].innerHTML
            let third = cells[i + (width * 2)].innerHTML
            let fourth = cells[i + (width * 3)].innerHTML
            let fifth = cells[i + (width * 4)].innerHTML
            let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth), parseInt(fifth)]

            let filteredColumn = column.filter(num => num)
            let missingZeros = 5 - filteredColumn.length
            let zerosArray = Array(missingZeros).fill(0)
            let newColumn = filteredColumn.concat(zerosArray)

            cells[i].innerHTML = newColumn[0]
            cells[i + width].innerHTML = newColumn[1]
            cells[i + (width * 2)].innerHTML = newColumn[2]
            cells[i + (width * 3)].innerHTML = newColumn[3]
            cells[i + (width * 4)].innerHTML = newColumn[4]
        }
    }

    function swipeDown() {
        for (let i = 0; i < 4; i++) {
            let first = cells[i].innerHTML
            let second = cells[i + width].innerHTML
            let third = cells[i + (width * 2)].innerHTML
            let fourth = cells[i + (width * 3)].innerHTML
            let fifth = cells[i + (width * 4)].innerHTML
            let column = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth), parseInt(fifth)]

            let filteredColumn = column.filter(num => num)
            let missingZeros = 5 - filteredColumn.length
            let zerosArray = Array(missingZeros).fill(0)
            let newColumn = zerosArray.concat(filteredColumn)

            cells[i].innerHTML = newColumn[0]
            cells[i + width].innerHTML = newColumn[1]
            cells[i + (width * 2)].innerHTML = newColumn[2]
            cells[i + (width * 3)].innerHTML = newColumn[3]
            cells[i + (width * 4)].innerHTML = newColumn[4]
        }
    }

    function combineRow() {
        for (let i = 0; i < 24; i++) {
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
        for (let i = 0; i < 20; i++) {
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
        /*******************************************
        End of game js
        *******************************************/


    })


        // toggle showing the user how to play the game
        function toggleHowTo() {
          var x = document.getElementById("how_to")
          if (x.style.display === "none") {
            x.style.display = "block"
            howToAnimId = setInterval(change_image, 2000)

          } else {
            x.style.display = "none"
            clearInterval(howToAnimId)
            document.getElementById('change_image').src = 'images/board0.jpg'
            document.getElementById('animation_explanation').innerHTML="Start"
          }
        }

        // Animate an example of game play
        function change_image() {

           var url = document.getElementById('change_image').src

           if (url.match('images/board0.jpg') !== null) {
               document.getElementById('change_image').src = 'images/board1.jpg'
               document.getElementById('animation_explanation').innerHTML="Slide Up"
           } else if (url.match('images/board1.jpg') !== null){
               document.getElementById('change_image').src = 'images/board2.jpg'
               document.getElementById('animation_explanation').innerHTML="Slide Left"
           } else if (url.match('images/board2.jpg') !== null){
               document.getElementById('change_image').src = 'images/board3.jpg'
               document.getElementById('animation_explanation').innerHTML="Slide Down"
           } else if (url.match('images/board3.jpg') !== null){
               document.getElementById('change_image').src = 'images/board4.jpg'
               document.getElementById('animation_explanation').innerHTML="Slide Up"
           } else if (url.match('images/board4.jpg') !== null){
                document.getElementById('change_image').src = 'images/board5.jpg'
                document.getElementById('animation_explanation').innerHTML="Slide Right"
           } else {
               document.getElementById('change_image').src = 'images/board0.jpg'
               document.getElementById('animation_explanation').innerHTML="Start"
           } 
        }





