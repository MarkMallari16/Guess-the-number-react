

import { useEffect } from 'react';
import './App.css'
import useGuessingGame from './hooks/useGuessingGame';
import Modal from './components/Modal';
import IntroComponent from './components/IntroComponent';
import Confetti from 'react-confetti'
import usePlay from './hooks/usePlay';
import useWindowSize from './hooks/useWindowSize';
import Audio from './components/Audio';
import NavBar from './components/NavBar';

function App() {

  const { isPlay, handlePlay } = usePlay()
  const {
    userGuess,
    setUserGuess,
    message,
    lives,
    isGameOver,
    isUserGuessed,
    handleUserGuess,
    handleKeyDown,
    handleTryAgain, } = useGuessingGame();

  useEffect(() => {
    if (isGameOver || isUserGuessed) {
      const modal = document.getElementById("modal")
      modal.showModal();
    }
  }, [isGameOver, isUserGuessed])

  const windowSize = useWindowSize();
  return (
    <>
    <NavBar />
      <div className='grid mt-32  max-w-2xl mx-auto '>
      
        {!isPlay ? (
          <IntroComponent onPlay={handlePlay} />
        ) : (
          <div >
            <div className=' p-10 rounded-2xl'>
              <div className='text-xl font-medium text-right mb-3'>Lives: {lives} {lives === 0 ? '💔' : '❤️'}</div>
              <div className='text-center text-3xl lg:text-4xl font-bold uppercase stroke-slate-950'>Guess the Number?</div>
              <div className='mt-5'>
                <input type="text" className='input input-bordered w-full' placeholder='Enter your guess' value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyDown={handleKeyDown} disabled={isGameOver || isUserGuessed} max={20} />
              </div>
              <div>
                <button className='btn btn-accent w-full mt-5' onClick={handleUserGuess} disabled={isGameOver || isUserGuessed}>Guess</button>
              </div>
              {(isGameOver || isUserGuessed) && (
                <div>
                  <button className='btn btn-primary w-full mt-5 ' onClick={handleTryAgain}>Try Again</button>
                </div>
              )}


            </div>

            <Modal message={message} handleTryAgain={handleTryAgain} />
          </div>
        )}
        {isUserGuessed &&
          <Confetti width={windowSize.width} height={windowSize.height} />
        }
      </div>

    </>
  )
}

export default App
