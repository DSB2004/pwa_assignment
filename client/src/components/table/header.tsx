import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return <thead className="bg-2 rounded-lg w-full">{children}</thead>;
}
