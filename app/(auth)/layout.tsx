import { Navbar } from '@/shared/components/ui/Navbar'
import React from 'react'

export default function AuthLayout ({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex flex-col min-h-screen ">
              <main className="flex-1 pt-20">
                {children}
              </main>
        </div>
    )

}