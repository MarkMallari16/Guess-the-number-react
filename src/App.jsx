import { useState } from 'react'

import './App.css'

function App() {
  const RANDOM_NUMBERS = Math.floor((Math.random() * 10) + 1)

  const [randomNumber] = useState(RANDOM_NUMBERS);
  const [userGuess, setUserGuess] = useState("")
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(3);
  console.log(RANDOM_NUMBERS)

  function validateGuess(guess) {
    if (isNaN(userGuess)) {
      return "You must enter valid number";
    } else if (guess < 1 || guess > 10) {
      return "You must guess number ranged 1 - 10 only";
    }

    return null
  }

  function checkGuess(guess) {
    if (randomNumber === guess) {
      return "You guess the message!"
    } else {
      setLives((prevLive) => prevLive - 1);

      if (lives - 1 === 0) {
        return `Game over! The guess number was ${guess}`;
      }
      return "Sorry, you did not guess the number! Try Again."
    }
  }
  const handleUserGuess = () => {
    const guess = parseInt(userGuess, 10);
    const validationMessage = validateGuess(guess);

    if (validationMessage) {
      setMessage(validationMessage)
    } else {
      setMessage(checkGuess(guess));
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserGuess();
    }
  }
  return (
    <>
      <div className='min-h-screen grid place-items-center max-w-7xl mx-auto'>
        <div className=' p-10 rounded-2xl'>
          <div className='text-xl font-medium text-right mb-3'>Lives: {lives} {lives === 0 ? '💔' : '❤️' }</div>
          <div className='text-center text-3xl lg:text-4xl font-bold uppercase'>Guess the Number?</div>
          <div className='mt-5'>
            <input type="text" className='input input-bordered w-full' placeholder='Enter your guess' value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyDown={handleKeyDown} disabled={lives === 0} />
          </div>
          <div>
            <button className='btn btn-accent w-full mt-5' onClick={handleUserGuess} disabled={lives === 0}>Guess</button>
          </div>

          <div className='mt-5 text-center text-2xl'>
            {message}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
