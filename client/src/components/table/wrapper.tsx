import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto mt-8 max-w-full">
      <table className="w-full text-left table-auto border-collapse">
        {children}
      </table>
    </div>
  );
}
