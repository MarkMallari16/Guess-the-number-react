import React, { createContext, useContext, useEffect, useState } from 'react'

const PlayContext = createContext();

function PlayProvider({ children }) {
    const initialPlay = () => {
        const storedValue = localStorage.getItem("play");

        return storedValue === "true" ? true : false;
    }
    const [isPlay, setIsplay] = useState(initialPlay);

    const handlePlay = () => {
        setIsplay(true);
    }
    const handleQuit = () => {
        setIsplay(false)
    }
    useEffect(() => {
        localStorage.setItem("play", isPlay);
    }, [isPlay]);

    return (

        <PlayContext.Provider value={{ isPlay, handlePlay, handleQuit }}>
            {children}
        </PlayContext.Provider>
    )
}

export const usePlay = () => useContext(PlayContext);

export default PlayProvider