import { ReactNode, useRef, useState } from "react";
import Button from "../../../../components/button/simple_button";
import Form from "./form";
import { CiEdit } from "react-icons/ci";
export default function Update({ id }: { id: string }) {
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
    <div className="relative">
      <CiEdit onClick={toggleDialog} className="w-6 h-6 fill-yellow-500" />
      <dialog
        onClose={() => setIsOpen(false)}
        ref={dialogRef}
        className={`w-80 text-3 sm:w-96 md:w-112 min-h-96 bg-2 z-20 rounded-lg transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
      >
        <h1 className='text-lg  m-3 mb-0 font-medium'>Task Overview</h1>
        {
          isOpen ? <>
            <Form closeAction={() => { toggleDialog(); setIsOpen(false) }} id={id} />
          </> : <></>
        }
      </dialog>
    </div>
  );
}
