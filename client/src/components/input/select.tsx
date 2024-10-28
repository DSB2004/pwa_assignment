import React, { SelectHTMLAttributes, FC, forwardRef } from 'react';

interface IPROPS extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}

const Select: FC<IPROPS> = forwardRef<HTMLSelectElement, IPROPS>(({ children, className, error, ...props }, ref) => {
    return (
        <div className={`flex flex-col p-1 relative ${className}`}>
            {error && <span className="text-red-500 text-xs absolute -top-3.5">{error}</span>}
            <select
                ref={ref} // Attach the ref to the select
                {...props}
                className={`w-full text-xs p-2 border-2 ${error ? "border-red-500" : ""} bg-1 rounded-md outline-none focus:outline-none`}
            >
                {children}
            </select>
        </div>
    );
});

export default Select;
