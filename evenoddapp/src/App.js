import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import StartCard from './images/holdingStartCard.jpg'
import Holding from './images/closedHolding.jpg'
import Wager from './images/handsManyMarbles.jpeg'
import Ground from './images/marblesInDirt.png'

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
    //start the game
    introScreen: true,


    //current number of marbles held by each player
    player1Total: 10,
    player2Total: 10,

    //which player won the match
    matchWinner: '',
    //which player won the game
    gameWinner: ''
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
          currentTurn: 1,
          introScreen: false,
        })
      }
      else {
        setGameState({
          ...gameState,
          currentTurn: 2,
          introScreen: false,
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


  const handleSelectBet = (event) => {
    // handles the dropdown change for player bets
    setGameState({
      ...gameState,
      playerBet: parseInt(event),
    })
  }

  const handleSelectGuess = (event) => {
    //handles the dropdown changes for even/odd guesses
    setGameState({
      ...gameState,
      evenOddGuess: event
    })
  }

  const handleSelectMarbleHold = (event) => {
    setGameState({
      ...gameState,
      evenOddHeld: parseInt(event)
    })
  }


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
        choice = 'EVEN'
      } else {
        choice = 'ODD'
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
  };

  const newGame = () => {
    window.location.reload(false)
  }

  const genMarbleDrop = () => {
    //creates a dropdown list of available marbles for both players
    let arr = []
    for (let i = 1; i <= gameState.player1Total; i++) {
      arr.push(
        <Dropdown.Item key={i} eventKey={i} value={i}>{i}</Dropdown.Item>
      )
    }
    return arr
  };

  useEffect(() => {
    //watch for a winner
    if (gameState.player1Total <= 0) {
      setGameState({
        ...gameState,
        gameOver: true,
        gameWinner: 2,
      })
    } else if (gameState.player2Total <= 0) {
      setGameState({
        ...gameState,
        gameOver: true,
        gameWinner: 1,
      })
    }
  })


  const handleSubmitBet = (event) => {
    //runs after player 1 makes a wager
    event.preventDefault()
    if (gameState.playerBet !== '') {
      let num = generateMarbleNum()
      if (num % 2 === 0) {
        setGameState({
          ...gameState,
          readyBet: true,
          evenOddHeld: 'EVEN'
        })
      } else {
        setGameState({
          ...gameState,
          readyBet: true,
          evenOddHeld: 'ODD'
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
        evenOddHeld: 'EVEN',
        marblesHeld: true,
        playerBet: comBet,
        evenOddGuess: comEvenOddGuess,
        revealingOutcome: true,
      })
    } else {
      setGameState({
        ...gameState,
        evenOddHeld: 'ODD',
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
    <Container fluid>
      {/* Intro Screen */}
      {gameState.introScreen === true ? (
        <Container fluid className='text-center'>
          <Row className='squid-row'>
            <img className='start-card' src={StartCard} alt=''></img>
            <Button onClick={handleTurn} variant='info'>START GAME</Button>
          </Row>
        </Container>
      ) : (<></>)}

      {/* Player 1's turn */}
      {gameState.currentTurn === 1 ? (
        <div>
          {/* human is placing bet */}
          {gameState.readyBet === false ? (
            <Container fluid>
              <Row className='squid-row'>
                <Row>
                  <img src={Ground} alt="" className='game-card'></img>
                </Row>
                <Form className='game-form' onSubmit={handleSubmitBet}>
                  <Form.Label className='game-form-label'>HOW MANY MARBLES DO YOU WANT TO WAGER?</Form.Label>

                  <Row className='justify-content-center'>
                    <Col className='squid-col'>
                      <DropdownButton
                        variant='success'
                        title={gameState.playerBet === '' ?
                          ('CHOOSE WISELY') : (<>WAGER {gameState.playerBet} MARBLES</>)}
                        onSelect={handleSelectBet}
                      >
                        {genMarbleDrop()}
                      </DropdownButton>
                    </Col>

                    <Col className='squid-col'>
                      <Button variant="success" type="submit">WAGER</Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Container>
          ) : (<></>)}

          {/* human is guessing even or odd */}
          {gameState.readyBet === true && gameState.revealingOutcome === false ? (
            <Container fluid>
              <Row className='squid-row'>
                <Row>
                  <img src={Holding} alt='' className='game-card'></img>
                </Row>
                <Row>
                  <Form className='game-form' onSubmit={handleEvenOddGuess}>
                    <Form.Label className='game-form-label'>IS YOUR OPPONENT HOLDING AN EVEN OR ODD NUMBER OF MARBLES</Form.Label>

                    <Row className='justify-content-center'>
                      <Col className='squid-col'>
                        <DropdownButton
                          variant='success'
                          title={gameState.evenOddGuess === '' ?
                            ('CHOOSE WISELY') : (<>{gameState.evenOddGuess}</>)}
                          onSelect={handleSelectGuess}
                        >
                          <DropdownItem eventKey='EVEN'>'EVEN'</DropdownItem>
                          <DropdownItem eventKey='ODD'>'ODD'</DropdownItem>
                        </DropdownButton>
                      </Col>

                      <Col className='squid-col'>
                        <Button variant="success" type="submit">GUESS</Button>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Row>
            </Container>
          ) : (
            <></>)}
        </div>

      ) : (

        // player 2's turn
        <div>
          {/* human is deciding what to hold */}
          {gameState.currentTurn === 2 && gameState.marblesHeld === false ? (
            <Container fluid>
              <Row className='squid-row'>
                <Row>
                  <img src={Wager} alt='' className='game-card'></img>
                </Row>
                <Row>
                  <Form className='game-form' onSubmit={handleHoldReady}>

                    <Form.Label className='game-form-label'>HOLD MARBLES FOR YOUR OPPONENT TO GUESS</Form.Label>


                    <Row className='justify-content-center'>
                      <Col className='squid-col'>
                        <DropdownButton
                          variant='success'
                          title={gameState.evenOddHeld === '' ?
                            ('HOLD WISELY') : (<>HOLD {gameState.evenOddHeld} MARBLES</>)}
                          onSelect={handleSelectMarbleHold}
                        >
                          {genMarbleDrop()}
                        </DropdownButton>
                      </Col>
                      <Col className='squid-col'>
                        <Button variant="success" type="submit">HOLD THESE</Button>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Row>
            </Container>
          ) : (<></>)}
          {/* this div closes the else statement for being player 2's turn! */}
        </div>
      )}

      {gameState.revealingOutcome === true ? (
        // instead of a button, I can make determine winner happen automatically after a few seconds. I think.
        <div>
          <button onClick={determineWinner}>SHOW WINNER</button>
          {gameState.determineWinnerClicked === true ? (
            <div>
              {gameState.gameOver === false ? (
                <div>
                  THE WINNER IS {gameState.matchWinner}
                  <button onClick={handleTurn}>NEXT ROUND</button>
                </div>
              ) : (
                <div>
                  {gameState.gameWinner} GETS TO LIVE
                  <button onClick={newGame}>PLAY AGAIN</button>
                </div>
              )}
            </div>
          ) : (<></>)}

        </div>
      ) : (<></>)}
      {/* <div>You have {gameState.player1Total} marbles</div>
      <div>Your opponent has {gameState.player2Total} marbles</div> */}



    </Container>
  )
}



export default App;
