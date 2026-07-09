import React from 'react'
import { Toaster } from 'sonner'
import { NavbarServer } from '@/shared/components/ui/NavbarServer'
import FooterComponent from '@/shared/components/ui/home/footer'

export default function AuthLayout ({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex flex-col min-h-screen">
            <header className="hidden md:block">
                <NavbarServer />
            </header>
            <main className="flex-1 md:pt-20">
                {children}
                <Toaster/>
            </main>
            <footer className="hidden md:block">
                <FooterComponent />
            </footer>
        </div>
    )
}
