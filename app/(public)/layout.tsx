import React from 'react'
import { NavbarServer } from '@/shared/components/ui/NavbarServer'
import { FooterComponent } from '@/shared/components/ui/home/footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarServer />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <FooterComponent />
    </div>
  )
}
