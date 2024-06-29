import { useCallback, useEffect, useState } from "react";


function useGuessingGame() {

    const [userGuess, setUserGuess] = useState("")
    const [message, setMessage] = useState("");
    const [lives, setLives] = useState(5);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isUserGuessed, setIsUserGuessed] = useState(false);

    const [difficulty, setDifficulty] = useState(() => {
        return localStorage.getItem("difficulty") || "easy";
    });
    const [randomNumber, setRandomNumber] = useState();
    const [range, setRange] = useState(10);

    useEffect(() => {
        setRandomNumber(generateRandomNumbers())

        localStorage.setItem("difficulty", difficulty);
    }, [difficulty])

    function generateRandomNumbers() {
        const minimumNumber = 1;
        if (difficulty === "easy") {
            setRange(5)
            setLives(8)
        } else if (difficulty === "medium") {
            setRange(10)
            setLives(6);
        } else if (difficulty === "hard") {
            setRange(50)
            setLives(4)
        } else if (difficulty === "intermediate") {
            setRange(100)
            setLives(3)
        }

        return Math.floor((Math.random() * range) + minimumNumber)
    }
    function validateGuess(guess) {
        if (isNaN(userGuess) || userGuess.trim() === "") {
            return "You must enter valid number";
        } else if (guess < 1 || guess > range) {
            return `You must guess number ranged 1 - ${range} only`;
        }

        return null
    }

    function checkGuess(guess) {
        if (randomNumber === guess) {
            setIsUserGuessed(true);
            return "You guess the number!"
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
        setDifficulty(localStorage.getItem("difficulty")) || "easy";
    }, [difficulty])

    return {
        userGuess,
        setUserGuess,
        message,
        lives,
        isGameOver,
        isUserGuessed,
        difficulty,
        setDifficulty,
        range,
        handleUserGuess,
        handleKeyDown,
        handleTryAgain,
    };
}

export default useGuessingGame  