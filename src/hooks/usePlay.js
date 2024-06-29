import React, { useState } from 'react'

function usePlay() {

    const [isPlay, setIsPlay] = useState(false);

    const handlePlay = () => {
        setIsPlay(true)
    }
    return { isPlay, handlePlay }
}

export default usePlay