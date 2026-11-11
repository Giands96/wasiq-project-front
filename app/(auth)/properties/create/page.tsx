import React, { Suspense } from 'react'
import { CreatePropertyForm } from '@/modules/properties/components/CreatePropertyForm';
export default function CreatePropertyPage() {
  return (
    <div className="min-h-screen p-4 bg-background">
      
      <Suspense fallback={
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          Cargando formulario...
        </div>
      }>
        <CreatePropertyForm />
      </Suspense>
      
    </div>
  )
}
