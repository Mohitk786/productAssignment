
// import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <Nav />
        {children} 
      </body>
    </html>
  );
}
