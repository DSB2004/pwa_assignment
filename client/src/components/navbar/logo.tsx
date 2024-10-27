import React from "react";
import { FaReact } from "react-icons/fa6";
export default function Logo() {
  return (
    <div className="flex items-center gap-3 my-5 mx-4 ">
      <FaReact className="w-8 h-8" />
      <h1 className="text-base font-semibold">Admin Dashboard</h1>
    </div>
  );
}
