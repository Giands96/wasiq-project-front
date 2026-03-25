import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wasiq Inmobiliaria",
  description: "Encuentra tu propiedad ideal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
