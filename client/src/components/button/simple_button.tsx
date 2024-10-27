import React, { ButtonHTMLAttributes, Children, FC } from "react";

interface IPROPS extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FC<IPROPS> = ({ className, children, ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`p-2 outline-none focus:outline-none font-base text-sm shadow-sm rounded-sm md:rounded-md flex gap-2 items-center duration-200 transition-all  ${className}`}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
