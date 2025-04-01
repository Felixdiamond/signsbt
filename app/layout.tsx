import type { Metadata } from "next";
import { Quicksand, Architects_Daughter } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-architects-daughter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: "400",
});

export const metadata: Metadata = {
  title: "SignSBT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${architectsDaughter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
