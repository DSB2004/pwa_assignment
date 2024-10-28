import React, { FC, InputHTMLAttributes, forwardRef } from "react";

interface IPROPS extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: FC<IPROPS> = forwardRef<HTMLInputElement, IPROPS>(({ className, error, ...props }, ref) => {
  return (
    <div className={`flex flex-col p-1 relative ${className}`}>
      {error && <span className="text-red-500 text-xs absolute -top-3.5">{error}</span>}
      <input
        ref={ref} // Attach the ref to the input
        {...props}
        className={`w-full text-xs p-2 ${error ? "border-red-500" : ""} bg-1 rounded-md border-2 outline-none focus:outline-none `}
      />
    </div>
  );
});

export default Input;
