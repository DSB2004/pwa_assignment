import { ReactNode, useRef, useState } from "react";
import Button from "../../../../components/button/simple_button";
import Form from "./form";
export default function Actions() {
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
      <Button onClick={toggleDialog} className="bg-black text-white px-4">
        Actions
      </Button>

      <dialog
        ref={dialogRef}
        className={`w-80 sm:w-96 md:w-112 min-h-96 bg-white  z-20 rounded-lg transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
      >
        <Form closeAction={toggleDialog} />
      </dialog>
    </div>
  );
}
