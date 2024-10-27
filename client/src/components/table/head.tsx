import { ReactNode } from "react";

export default function Head({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-2   font-semibold text-3">
      {children}
    </th>
  );
}
