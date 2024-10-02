import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Explore your favorite anime - Anime Tv",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2C2C2C" />
      </head>
      <body className={`${inter.className} bg-dark text-white`}>
        <NextTopLoader showSpinner={false} color="#F51E51" />
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
