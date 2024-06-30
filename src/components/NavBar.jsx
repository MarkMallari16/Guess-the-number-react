import React from 'react'
import Audio from './Audio'
import { FaGithub } from "react-icons/fa";

function NavBar() {
    return (
        <div className="navbar bg-base-100 max-w-7xl mx-auto">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">GuessTheNumber</a>
            </div>
            <div className="flex items-center">
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