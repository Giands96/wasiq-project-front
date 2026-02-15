import { Navbar } from '@/shared/components/ui/Navbar'
import React from 'react'

export default function PublicLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {children}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-50">
        © 2026  Wasiq Inmobiliaria. Todos los derechos reservados.
      </footer>
    </div>
  )
}
