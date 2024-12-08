'use client';
import localFont from "next/font/local";
import Navbar from "./components/navbar";
import "./globals.css";
import { ApolloProvider } from '@apollo/client';
import client from '@/app/lib/apolloClient';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


// Wrap apollo provider in aplication to access client
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <ApolloProvider client={client}>{children}</ApolloProvider>
        
      </body>
    </html>
  );
}
