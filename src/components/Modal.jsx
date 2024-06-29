import React from 'react'

function Modal({ message, handleTryAgain }) {
    return (
        <dialog id="modal" className="modal">
            <div className="modal-box py-10">
                <form method="dialog">

                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>

                    <h3 className="font-bold text-2xl text-center">{message}</h3>


                    <div className='text-right mt-10'>
                        <button className='btn btn-accent ' onClick={handleTryAgain}>Try Again</button>
                    </div>
                </form>


            </div>
        </dialog>
    )
}

export default Modal