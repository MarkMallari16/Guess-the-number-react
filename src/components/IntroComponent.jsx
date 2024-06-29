import React from 'react'
import { usePlay } from '../provider/PlayProvider'
import useGuessingGame from '../hooks/useGuessingGame';

function IntroComponent() {
    const { handlePlay } = usePlay();

    return (
        <div>
            <div className='text-4xl lg:text-6xl header-font uppercase text-center'>Guess the number ?</div>
            <div className='text-center mt-2'>Created by: Mark</div>
            <button className='btn btn-primary w-full mt-5' onClick={handlePlay}>Play</button>

           
        </div>
    )
}

export default IntroComponent