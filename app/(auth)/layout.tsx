import React from 'react'
import { Toaster } from 'sonner'
import { NavbarServer } from '@/shared/components/ui/NavbarServer'
import FooterComponent from '@/shared/components/ui/home/footer'

export default function AuthLayout ({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex flex-col min-h-screen">
            <NavbarServer />
            <main className="flex-1 pt-20">
                {children}
                <Toaster/>
            </main>
            <FooterComponent />
        </div>
    )
}
