import { ReactNode } from "react";

export default function Data({ children }: { children: ReactNode }) {
  return (
    <td className="px-4 py-2   text-white whitespace-nowrap  overflow-ellipsis">
      {children}
    </td>
  );
}
