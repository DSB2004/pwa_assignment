import React from "react";
import { LuMenu } from "react-icons/lu";
import { useMenu } from "../../provider/menuProvider";
export default function Menu() {
  const { toggleMenu, isOpen } = useMenu();
  return (
    <button
      className={` hover:bg-4 rounded-md transition-all duration-300 p-1 ${isOpen ? "bg-4" : ""
        }`}
      onClick={() => toggleMenu((prev) => !prev)}
    >
      <LuMenu className="w-6 h-6" />
    </button>
  );
}
