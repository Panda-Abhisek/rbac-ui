import { RbacProvider } from "@/contexts/RbacContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RBAC UI",
  description: "Role-Based Access Control User Interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RbacProvider>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </RbacProvider>
      </body>
    </html>
  );
}

