import React, { createContext, useContext, useEffect, useState } from 'react'

const PlayContext = createContext();

function PlayProvider({ children }) {
    const [isPlay, setIsplay] = useState(() => {
        const storedValue = localStorage.getItem("play");

        return storedValue === "true" ? true : false;
    });

    const handlePlay = () => {
        setIsplay(true);
    }
    useEffect(() => {
        localStorage.setItem("play", isPlay);
    }, [isPlay]);
    
    return (

        <PlayContext.Provider value={{ isPlay, handlePlay }}>
            {children}
        </PlayContext.Provider>
    )
}

export const usePlay = () => useContext(PlayContext);

export default PlayProvider