import React from 'react'
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa'
function Footer() {
    return (
        <div >
            <div className='text-center mb-2'>Follow me on</div>
            <div className='flex justify-center'>
                <div className='flex gap-3'>
                    <a href="https://github.com/MarkMallari16"><FaGithub className='text-2xl' /></a>
                    <a href="https://www.facebook.com/Markccmllari.16/"><FaFacebook className='text-2xl' /></a>
                    <a href="https://www.instagram.com/mrkymllari/"><FaInstagram className='text-2xl' /></a>
                </div>
            </div>

        </div >
    )
}

export default Footer