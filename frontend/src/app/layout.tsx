"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={storeRef.current}>
          
          <ThemeProvider attribute="class" defaultTheme="system">
            
            <Navbar />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
