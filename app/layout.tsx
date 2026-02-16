import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/ui/Navbar";

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
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <footer className="py-6 text-center text-sm text-gray-500 bg-gray-50 border-t">
             © 2026 Wasiq Inmobiliaria. Todos los derechos reservados.
          </footer>
        </div>
      </body>
    </html>
  );
}