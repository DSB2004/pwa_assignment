import React, { ButtonHTMLAttributes, Children, FC } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FC<IPROPS> = ({ className, children, ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`text-xs outline-none focus:outline-none p-1 border-2 rounded-md m-1 flex  items-center gap-1 duration-200 transition-all text-3 ${className}`}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
