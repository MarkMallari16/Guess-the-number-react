

import { useEffect } from 'react';
import './App.css'

import useGuessingGame from './hooks/useGuessingGame';
function App() {

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
      document.getElementById('modal1').showModal();
    }
  }, [isGameOver, isUserGuessed])
  return (
    <>
      <div className='min-h-screen grid place-items-center max-w-7xl mx-auto'>
        <div className=' p-10 rounded-2xl'>
          <div className='text-xl font-medium text-right mb-3'>Lives: {lives} {lives === 0 ? '💔' : '❤️'}</div>
          <div className='text-center text-3xl lg:text-4xl font-bold uppercase stroke-slate-950'>Guess the Number?</div>
          <div className='mt-5'>
            <input type="text" className='input input-bordered w-full' placeholder='Enter your guess' value={userGuess} onChange={(e) => setUserGuess(e.target.value)} onKeyDown={handleKeyDown} disabled={isGameOver || isUserGuessed} />
          </div>
          <div>
            <button className='btn btn-accent w-full mt-5' onClick={handleUserGuess} disabled={isGameOver || isUserGuessed}>Guess</button>
          </div>
          {(isGameOver || isUserGuessed) && (
            <div>
              <button className='btn btn-primary w-full mt-5 ' onClick={handleTryAgain}>Try Again</button>
            </div>
          )}

          <div className='mt-5 text-center text-2xl'>
            {message}
          </div>

        </div>

        <dialog id="modal1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
           
            <div className="modal-action">
              <form method="dialog">
              
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default App
