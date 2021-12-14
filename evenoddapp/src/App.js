import React, { useEffect, useState } from 'react'

const App = () => {
  const initialState = {
    //whose turn is it anyway
    currentTurn: '',
    //marbles being wagered
    playerBet: '',
    //player guess of even or odd.
    //the player will hold either an even or odd number of marbles
    evenOddHeld: '',
    evenOddGuess: '',

    //player bet officially placed or not
    readyBet: false,
    //hide all forms to show the results
    revealingOutcome: false,
    //the player has decided how  many marbles to hold
    marblesHeld: false,
    //a player has 0 marbles left
    gameOver: false,
    //only allow determineWinner to run once
    determineWinnerClicked: false,


    //current number of marbles held by each player
    player1Total: 10,
    player2Total: 10,

    //which player won the match
    matchWinner: '',
  };

  let [gameState, setGameState] = useState(initialState);

  const randint = (a, b) => {
    return Math.floor(a + Math.random() * (b - a + 1))
  };

  const handleTurn = () => {
    //run when the page first loads to select what the player will do first.
    //then run it again later to switch between 1 and 2
    if (gameState.currentTurn === '') {
      let randNum = randint(1, 100)
      if (randNum < 50) {
        setGameState({
          ...gameState,
          currentTurn: 1
        })
      }
      else {
        setGameState({
          ...gameState,
          currentTurn: 2
        })
      };
    }
    else if (gameState.currentTurn === 1) {
      setGameState({
        ...gameState,
        currentTurn: 2,
        readyBet: false,
        revealingOutcome: false,
        marblesHeld: false,
        determineWinnerClicked: false,
        playerBet: "",
        evenOddGuess: "",
        evenOddHeld: "",
        matchWinner: "",
      })
    } else {
      setGameState({
        ...gameState,
        currentTurn: 1,
        readyBet: false,
        revealingOutcome: false,
        marblesHeld: false,
        determineWinnerClicked: false,
        playerBet: "",
        evenOddGuess: "",
        evenOddHeld: "",
        matchWinner: "",
      })
    }
  };

  useEffect(() => {
    //picks player 1 or 2 to go first randomly
    handleTurn()
  }, []);

  const handleChange = (event) => {
    setGameState({
      ...gameState,
      [event.target.name]: event.target.value
    })
  };


  const determineWinner = () => {
    console.log('winnerWinner')
    if (gameState.determineWinnerClicked === false) {
      let answer = gameState.evenOddHeld
      let guess = gameState.evenOddGuess

      let p1 = parseInt(gameState.player1Total)
      let p2 = parseInt(gameState.player2Total)
      let wager = parseInt(gameState.playerBet)

      if (guess === answer) {
        setGameState({
          ...gameState,
          matchWinner: 1,
          player1Total: p1 + wager,
          player2Total: p2 - wager,
          determineWinnerClicked: true
        })
      } else {
        setGameState({
          ...gameState,
          matchWinner: 2,
          player1Total: p1 - wager,
          player2Total: p2 + wager,
          determineWinnerClicked: true
        })
      }
    }
  };

  const generateEvenOdd = () => {
    //generates either even or odd
    let choice = ''
    if (gameState.player2Total === 1) {
      choice = 'odd'
    }
    else {
      let randNum = randint(1, 100)
      if (randNum < 50) {
        choice = 'even'
      } else {
        choice = 'odd'
      }
    }
    return choice
  };

  const generateMarbleNum = () => {
    //generates a random number of marbles for the program
    let num = ''
    let ctotal = gameState.player2Total
    if (ctotal === 10) {
      num = randint(1, 7)
    }
    else if (ctotal < 10 && ctotal >= 5) {
      num = randint(1, 4)
    }
    else if (ctotal < 5 && ctotal >= 2) {
      num = randint(1, 2)
    } else {
      num = 1
    }
    return num
  }

  const genMarbleDrop = () => {
    //creates a dropdown list of available marbles for both players
    let arr = []
    if (gameState.currentTurn === 1) {
      for (let i = 1; i <= gameState.player1Total; i++) {
        arr.push(<option key={i} value={i}>{i}</option>)
      }
      return arr
    } else {
      for (let i = 1; i <= gameState.player2Total; i++) {
        arr.push(
          <option key={i} value={i}>{i}</option>)
      }
      return arr
    }
  };


  const handleSubmitBet = (event) => {
    //runs after player 1 makes a wager
    event.preventDefault()
    if (gameState.playerBet !== '') {
      let num = generateMarbleNum()
      if (num % 2 === 0) {
        setGameState({
          ...gameState,
          readyBet: true,
          evenOddHeld: 'even'
        })
      } else {
        setGameState({
          ...gameState,
          readyBet: true,
          evenOddHeld: 'odd'
        })
      }
    }
    else {
      alert('please make a wager')
    }
  };



  const handleHoldReady = (event) => {
    event.preventDefault()
    //computer makes a wager
    let comBet = generateMarbleNum()
    //computer guesses even or odd
    let comEvenOddGuess = generateEvenOdd()
    let playerHolding = gameState.evenOddHeld
    if (playerHolding % 2 === 0) {
      //setGameState.evenOddHeld to even
      setGameState({
        ...gameState,
        evenOddHeld: 'even',
        marblesHeld: true,
        playerBet: comBet,
        evenOddGuess: comEvenOddGuess,
        revealingOutcome: true,
      })
    } else {
      setGameState({
        ...gameState,
        evenOddHeld: 'odd',
        marblesHeld: true,
        playerBet: comBet,
        evenOddGuess: comEvenOddGuess,
        revealingOutcome: true,
      })
    }
  };

  const handleEvenOddGuess = (event) => {
    //runs after player 1 makes their guess
    //establishes player 1's even or odd guess
    //hides the guessing form to reveal the outcome
    //determines if player 1 won or not.
    event.preventDefault()

    //only proceed if a guess was made
    if (gameState.evenOddGuess !== '') {
      setGameState({
        ...gameState,
        revealingOutcome: true
      })
    } else {
      alert('Please select even or odd')
    }
  };



  return (
    <div>
      {/* Player 1's turn */}
      {gameState.currentTurn === 1 ? (
        <div>
          {/* human is placing bet */}
          {gameState.readyBet === false ? (
            <div>
              <p>The player is betting</p>
              <form onSubmit={handleSubmitBet}>
                <select
                  value={gameState.playerBet}
                  name='playerBet'
                  onChange={handleChange}
                >
                  <option disabled value='' >Please Select One</option>
                  {genMarbleDrop()}
                </select>
                <button type="submit" >Bet</button>
              </form>
            </div>
          ) : (<></>)}

          {/* human is guessing even or odd */}
          {gameState.readyBet === true && gameState.revealingOutcome === false ? (
            <div>
              The player is ready to guess now
              <form onSubmit={handleEvenOddGuess}>
                <select
                  value={gameState.evenOddGuess}
                  name='evenOddGuess'
                  onChange={handleChange}
                >
                  <option disabled value='' >Please Select One</option>
                  <option onChange={handleChange} value='even' >Even</option>
                  <option onChange={handleChange} value='odd' >Odd</option>
                </select>
                <button type='submit' >Guess</button>
              </form>
            </div>
          ) : (
            <></>)}


        </div>
      ) : (
        // player 2's turn
        <div>
          {/* human is deciding what to hold */}
          {gameState.currentTurn === 2 && gameState.marblesHeld === false ? (
            <div>
              The player will now decide how many marbles to hold, and the computer will guess even or odd
              <form onSubmit={handleHoldReady}>
                <select
                  value={gameState.evenOddHeld}
                  name='evenOddHeld'
                  onChange={handleChange}
                >
                  <option disabled value='' >Please Select One</option>
                  {genMarbleDrop()}
                </select>
                <button type="submit"  >Hold These</button>
              </form>
            </div>
          ) : (<></>)}
          {/* this div closes the else statement for being player 2's turn! */}
        </div>
      )}

      {gameState.revealingOutcome === true ? (
        // instead of a button, I can make determine winner happen automatically after a few seconds. I think.
        <div>
          <button onClick={determineWinner}>Show Winner</button>
          {gameState.determineWinnerClicked === true ? (
            <div>
              The winner is {gameState.matchWinner}
              </div>
          ):(<></>)}
          
        </div>
      ) : (<></>)}
    </div>
  )
}



export default App;
