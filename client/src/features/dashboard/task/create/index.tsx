import React, { useState, useRef } from 'react'
import Button from '../../../../components/button/simple_button'
import { IoMdAdd } from "react-icons/io";
import Form from './form';
export default function Create() {
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
            <div>
                <Button className="bg-4 font-bold" onClick={() => toggleDialog()}>
                    <IoMdAdd className="w-5 h-5" />
                    <span className="hidden md:inline">Add Task</span>
                </Button>
                <dialog
                    onClose={() => setIsOpen(false)}
                    ref={dialogRef}
                    className={`w-80 text-3 sm:w-96 md:w-112 min-h-96 bg-2 z-20 rounded-lg transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                >
                    <h1 className='text-lg  m-3 mb-0 font-medium'>Create Task</h1>
                    <Form closeAction={() => { toggleDialog(); setIsOpen(false) }} />
                </dialog>
            </div >
        </>

    )
}
