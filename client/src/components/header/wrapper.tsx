import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full">
        <header className="bg-2 rounded-lg h-14 p-2  m-3 flex gap-2 items-center justify-between">
          {children}
        </header>
      </div>
    </>
  );
}
