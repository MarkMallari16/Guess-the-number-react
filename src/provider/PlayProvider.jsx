import React, { createContext, useContext, useEffect, useState } from 'react'

//creating context
const PlayContext = createContext();
//separate usePlayState
function usePlayState() {
    const initialPlay = () => {
        const storedValue = localStorage.getItem("play");

        return storedValue === "true" ? true : false;
    }
    const [isPlay, setIsplay] = useState(initialPlay);

    return [isPlay, setIsplay];
}
function PlayProvider({ children }) {
    const [isPlay, setIsplay] = usePlayState();

    const handlePlay = () => {
        setIsplay(true);
    }
    const handleQuit = () => {
        setIsplay(false)
        localStorage.removeItem("play");
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