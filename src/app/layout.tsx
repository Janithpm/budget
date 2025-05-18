import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Budget",
  description: "A simple budget tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
