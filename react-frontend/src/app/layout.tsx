import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // 1. Importe a Lato
import "./globals.css";

// 2. Configure a fonte Lato
const lato = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto", // Define a variável CSS para a nova fonte
  // A Lato tem vários pesos, estes são os mais comuns:
  weight: ['300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: "Twelfth",
  description: "Futebol, apenas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Aplique a nova variável no className */}
      <body className={`${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}