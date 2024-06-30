import { useCallback, useEffect, useState } from "react";
import { usePlay } from "../provider/PlayProvider";


function useGuessingGame() {
    const getInitialDifficulty = () => localStorage.getItem("difficulty") || "easy"
    const getInitialRangeAndLives = (difficulty) => getRangeAndLives(difficulty);

    const { handleQuit } = usePlay();


    const [difficulty, setDifficulty] = useState(getInitialDifficulty);
    const { newRange, newLives } = getInitialRangeAndLives(difficulty);

    const [userGuess, setUserGuess] = useState("")
    const [message, setMessage] = useState("");
    const [lives, setLives] = useState(newLives);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isUserGuessed, setIsUserGuessed] = useState(false);
    const [hint, setHint] = useState('');

    const [range, setRange] = useState(5);
    const [randomNumber, setRandomNumber] = useState(() => generateRandomNumbers(difficulty, newRange));

    useEffect(() => {
        const { newRange, newLives } = getRangeAndLives(difficulty);
        setRange(newRange);
        setLives(newLives);

        setRandomNumber(generateRandomNumbers(difficulty, newRange))

        localStorage.setItem("difficulty", difficulty);
    }, [difficulty])

    function generateRandomNumbers(difficulty, range) {
        const minimumNumber = 1;

        return Math.floor((Math.random() * range) + minimumNumber)
    }

    function getRangeAndLives(difficulty) {
        switch (difficulty) {
            case "easy":
                return { newRange: 5, newLives: 8 };
            case "medium":
                return { newRange: 10, newLives: 6 };
            case "hard":
                return { newRange: 50, newLives: 4 };
            case "intermediate":
                return { newRange: 100, newLives: 3 };
            default:
                return { newRange: 5, newLives: 8 }
        }
    }
    function validateGuess() {
        if (isNaN(userGuess) || userGuess.trim() === "") {
            return "You must enter valid number";
        }
        return null
    }

    function checkGuess(guess) {
        if (randomNumber === guess) {
            setIsUserGuessed(true);
            return "You guess the number!";

        } else {
            const updatedLives = lives - 1;
            const newHint = guess < randomNumber ? 'Try Higher!' : 'Try Lower!';

            setLives(updatedLives);
            setHint(newHint);
            setUserGuess("");
            if (guess > range) {
                setHint(`Opss! 1 - ${range} only`)
            }
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
    const resetGameState = (newRange, newLives) => {
        setUserGuess("")
        setMessage("")
        setHint("")
        setLives(newLives)
        setRange(newRange)
        setIsGameOver(false)
        setIsUserGuessed(false)
    }
    const handleResetAndQuit = () => {
        const { newRange, newLives } = getRangeAndLives(difficulty);
        handleQuit();

        setRandomNumber(generateRandomNumbers(difficulty, newRange));
        resetGameState(newRange, newLives);
        setDifficulty(localStorage.getItem("difficulty")) || "easy";
    }
    //handle try again
    const handleTryAgain = useCallback(() => {
        const { newRange, newLives } = getRangeAndLives(difficulty)

        setRandomNumber(generateRandomNumbers(difficulty, newRange));
        resetGameState(newRange, newLives);
        setDifficulty(localStorage.getItem("difficulty")) || "easy";
    }, [difficulty])


    return {
        userGuess,
        message,
        lives,
        isGameOver,
        isUserGuessed,
        hint,
        difficulty,
        range,
        setDifficulty,
        setUserGuess,
        handleResetAndQuit,
        handleUserGuess,
        handleKeyDown,
        handleTryAgain,
    };
}

export default useGuessingGame  