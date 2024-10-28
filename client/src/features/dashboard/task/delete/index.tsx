import React, { useState, useRef } from 'react'

import { MdDelete } from "react-icons/md";
import Form from './form';
export default function Delete({ id }: { id: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDialog = () => {
        if (dialogRef.current) {
            if (isOpen) {
                dialogRef.current.close();
            } else {
                dialogRef.current.showModal();
            }
            setIsOpen(!isOpen);
        }
    };

    return (
        <>

            <MdDelete onClick={toggleDialog} className="w-6 h-6 fill-red-500" />
            <dialog
                onClose={() => setIsOpen(false)}
                ref={dialogRef}
                className={`w-80 text-3 sm:w-96 md:w-112 min-h-40 bg-2 z-20 rounded-lg transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >

                <h1 className='text-lg mt-5 m-3 font-medium'>Delete Task</h1>
                <Form closeAction={() => { toggleDialog(); setIsOpen(false) }} id={id} />
            </dialog>

        </>

    )
}
