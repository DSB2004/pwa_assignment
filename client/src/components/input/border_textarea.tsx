import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface IPROPS extends TextareaHTMLAttributes<HTMLTextAreaElement> { }
const TextArea: FC<IPROPS> = ({ className, ...props }) => {
    return (
        <textarea
            {...props}
            className={`w-full text-xs p-2   bg-1 rounded-md border-2 outline-none focus:outline-none ${className}`}
        />
    );
};
export default TextArea;
