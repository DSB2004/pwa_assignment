import { ReactNode } from "react";

export default function Body({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}
