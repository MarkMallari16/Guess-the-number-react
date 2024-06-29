

import { useEffect } from 'react';
import './App.css'
import useGuessingGame from './hooks/useGuessingGame';
import Modal from './components/Modal';
import IntroComponent from './components/IntroComponent';
import Confetti from 'react-confetti'
import { usePlay } from './provider/PlayProvider';

import useWindowSize from './hooks/useWindowSize';
import NavBar from './components/NavBar';

import GameOverBg from './assets/gameoverbg.mp3';
import WinnerBg from './assets/winnerbg.mp3';
import DifficultyDropdown from './components/DifficultyDropdown';
function App() {


  const {
    userGuess,
    setUserGuess,
    message,
    lives,
    isGameOver,
    isUserGuessed,
    hint,
    difficulty,
    setDifficulty,
    range,
    handleUserGuess,
    handleKeyDown,
    handleTryAgain, } = useGuessingGame();

  useEffect(() => {
    if (isGameOver || isUserGuessed) {
      const modal = document.getElementById("modal")
      modal.showModal();
    }
  }, [isGameOver, isUserGuessed])

  const { isPlay } = usePlay();

  const windowSize = useWindowSize();

  const handleDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  }

  return (
    <>
      <NavBar />
      <div className='grid  max-w-2xl mx-auto '>
        {!isPlay ? (
          <IntroComponent />
        ) : (
          <div >
            <div className=' p-10 rounded-2xl'>
              <div className='flex  justify-center items-center lg:justify-end  gap-5 text-xl font-medium mb-5'>
                <div>
                  <DifficultyDropdown difficulty={difficulty} onSelectDifficulty={handleDifficulty} />
                </div>
                <div>Lives: {lives} {lives === 0 ? '💔' : '❤️'}</div>
              </div>
              <div className='text-center text-3xl lg:text-4xl font-bold uppercase stroke-slate-950'>Guess the Number?</div>
              <div className='text-center mt-1 mb-2'>1 to {range}</div>
              <div className='mt-5'>
                <input type="text" className='input input-bordered w-full' placeholder='Enter your guess' value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyDown={handleKeyDown} disabled={isGameOver || isUserGuessed} max={20} />
                <div className='mt-1'>{hint}</div>
              </div>
              <div>
                <button className='btn btn-primary w-full mt-5' onClick={handleUserGuess} disabled={isGameOver || isUserGuessed}>Guess</button>
              </div>
              {(isGameOver || isUserGuessed) && (
                <div>
                  <button className='btn btn-accent w-full mt-5 ' onClick={handleTryAgain}>Try Again</button>
                </div>
              )}
            </div>
            <Modal message={message} handleTryAgain={handleTryAgain} />
          </div>
        )}
        {isGameOver && <audio src={GameOverBg} autoPlay />}
        {isUserGuessed &&
          <>
            <Confetti width={windowSize.width} height={windowSize.height} />
            <audio src={WinnerBg} autoPlay />
          </>
        }
      </div>

    </>
  )
}

export default App
