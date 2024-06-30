import React from 'react'

function Modal({ message }) {
    return (
        <dialog id="modal" className="modal">
            <div className="modal-box py-10 flex justify-center items-center">
                <form method="dialog">

                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>

                    <h3 className="font-bold text-2xl text-center">{message}</h3>
                </form>
            </div>
        </dialog>
    )
}

export default Modal