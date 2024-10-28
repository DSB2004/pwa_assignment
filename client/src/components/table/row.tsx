import { ReactNode } from "react";

export default function Row({ children }: { children: ReactNode }) {
  return (
    <tr className=" transition cursor-pointer my-2">
      {children}
    </tr>
  );
}
