import { FC, InputHTMLAttributes } from "react";

interface IPROPS extends InputHTMLAttributes<HTMLInputElement> { }
const Input: FC<IPROPS> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`w-full text-xs p-2  bg-1 rounded-md border-2 outline-none focus:outline-none ${className}`}
    />
  );
};
export default Input;
