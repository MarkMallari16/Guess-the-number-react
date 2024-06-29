import React from 'react'
import Audio from './Audio'

function NavBar() {
    return (
        <div className="navbar bg-base-100 max-w-7xl mx-auto">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">GuessTheNumber</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Audio />
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default NavBar