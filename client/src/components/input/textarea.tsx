import React, { FC, TextareaHTMLAttributes, forwardRef } from "react";

interface IPROPS extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const TextArea: FC<IPROPS> = forwardRef<HTMLTextAreaElement, IPROPS>(({ className, error, ...props }, ref) => {
    return (
        <div className={`flex flex-col p-1 relative ${className}`}>
            {error && <span className="text-red-500 text-xs absolute -top-3.5">{error}</span>}
            <textarea
                ref={ref} // Attach the ref to the textarea
                {...props}
                className={`w-full text-xs p-2 ${error ? "border-red-500" : ""} bg-1 rounded-md border-2 outline-none focus:outline-none`}
            />
        </div>
    );
});

export default TextArea;
