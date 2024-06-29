import { useCallback, useEffect, useState } from "react";


function useGuessingGame() {

    const [randomNumber, setRandomNumber] = useState(generateRandomNumbers());
    const [userGuess, setUserGuess] = useState("")
    const [message, setMessage] = useState("");
    const [lives, setLives] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isUserGuessed, setIsUserGuessed] = useState(false);

    function generateRandomNumbers() {
        return Math.floor((Math.random() * 10) + 1)
    }
    function validateGuess(guess) {
        if (isNaN(userGuess) || userGuess.trim() === "") {
            return "You must enter valid number";
        } else if (guess < 1 || guess > 10) {
            return "You must guess number ranged 1 - 10 only";
        }

        return null
    }

    function checkGuess(guess) {
        if (randomNumber === guess) {
            setIsUserGuessed(true);
            return "You guess the message!"
        } else {
            const updatedLives = lives - 1;

            setLives(updatedLives);

            if (updatedLives === 0) {
                setIsGameOver(true);
                return `Game over! The correct number was ${randomNumber}.`;

            }
            return "Sorry, you did not guess the number! Try Again.";
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
    const handleTryAgain = useCallback(() => {
        setRandomNumber(generateRandomNumbers());
        setUserGuess("")
        setMessage("")
        setLives(3)
        setIsGameOver(false)
        setIsUserGuessed(false)
    }, [])

    return {
        userGuess,
        setUserGuess,
        message,
        lives,
        isGameOver,
        isUserGuessed,
        handleUserGuess,
        handleKeyDown,
        handleTryAgain,
    };
}

export default useGuessingGame  