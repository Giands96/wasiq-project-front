import React, { Suspense } from 'react'
import { CreatePropertyForm } from '@/modules/properties/components/CreatePropertyForm';
export default function CreatePropertyPage() {
  return (
    <div className="min-h-screen p-4 bg-linear-to-tr from-beige to-orange-500/4">
      
      <Suspense fallback={
        <div className="flex justify-center items-center h-64 text-text-secondary">
          Cargando formulario...
        </div>
      }>
        <CreatePropertyForm />
      </Suspense>
      
    </div>
  )
}
