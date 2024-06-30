import React from 'react'

function DifficultyDropdown({ difficulty, onSelectDifficulty, isGameOver, isUserGuessed }) {
    return (
        <div className='flex items-center gap-2'>
            <div>Difficulty:</div>
            <div className="dropdown dropdown-bottom dropdown-end flex justify-end">
                <select role="button" className="btn m-1 px-2" value={difficulty} onChange={(e) => onSelectDifficulty(e.target.value)} disabled={isGameOver || isUserGuessed}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="intermediate">Intermediate</option>
                </select>

            </div>
        </div>
    )
}

export default DifficultyDropdown