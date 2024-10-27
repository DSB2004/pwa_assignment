import { ReactNode } from "react";

export default function Row({ children }: { children: ReactNode }) {
  return (
    <tr className="hover:bg-gray-50 transition cursor-pointer my-2">
      {children}
    </tr>
  );
}
