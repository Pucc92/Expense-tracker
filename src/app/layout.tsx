import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Gestore spese con scadenzario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-900">
          <nav className="w-full bg-gray-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              {/* Logo / Brand */}
              <Link href="/dashboard" className="text-xl font-semibold">
                Expense Tracker
              </Link>
              {/* Links */}
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href="/transactions"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    Transactions
                  </Link>
                </li>

                <li>
                  <Link
                    href="/login"
                    className="hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {" "}
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <main className="max-w-6xl mx-auto px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
