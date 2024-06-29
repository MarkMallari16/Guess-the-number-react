import React from 'react'

function IntroComponent({ onPlay }) {
    return (
        <div>
            <div className='text-5xl header-font uppercase text-center'>Guess the number ?</div>
            <button className='btn btn-primary w-full mt-5' onClick={onPlay}>Play</button>
        </div>
    )
}

export default IntroComponent