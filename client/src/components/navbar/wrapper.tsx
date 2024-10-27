import React, { ReactNode } from "react";
import { useMenu } from "../../provider/menuProvider";
export default function Wrapper({ children }: { children: ReactNode }) {
  const { isOpen, toggleMenu } = useMenu();
  return (
    <>
      <div
        onClick={() => {
          if (window.innerWidth < 1100) {
            toggleMenu((prev) => !prev);
          }
        }}
        className={`overflow-hidden h-svh fixed top-0 left-0 lg:relative z-30 shadow-lg lg:shadow-none ${isOpen ? "w-80" : "w-0"
          } transition-all duration-300`}
      >
        <nav className="bg-2 w-80 h-full flex flex-col justify-start text-3  ">
          {children}
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-25 z-10 ${isOpen ? "block" : "hidden"
          } lg:hidden`}
      ></div>
    </>
  );
}
