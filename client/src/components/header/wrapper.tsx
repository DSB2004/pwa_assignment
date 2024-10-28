import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full h-[60px] bg-2 flex items-center">
        <header className=" rounded-lg  p-2 flex gap-2 items-center justify-between">
          {children}
        </header>
      </div>
    </>
  );
}
