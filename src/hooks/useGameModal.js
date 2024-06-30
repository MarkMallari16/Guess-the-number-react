import React, { useEffect } from 'react'

function useGameModal(isGameOver, isUserGuessed) {
    useEffect(() => {
        if (isGameOver || isUserGuessed) {
            const modal = document.getElementById("modal")
            modal.showModal();
        }
    }, [isGameOver, isUserGuessed])
}

export default useGameModal