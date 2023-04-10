import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex md:justify-center w-screen min-h-screen bg-gray-200 p-8">
      {children}
    </main>
  );
}