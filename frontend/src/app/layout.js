import { Geist, Geist_Mono } from "next/font/google";
import "@/components/Nav";
import "../globals.css";
import Nav from "@/components/Nav";
import { AuthProvider } from "@/context/authContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Campus Companion",
  description: "A companion app for students to settle into university and city life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
              <Nav />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
