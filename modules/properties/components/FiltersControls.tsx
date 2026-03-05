import React from 'react';
import SearchInput from './SearchInput';

function FiltersControls() {
    return (
        <aside className="rounded-2xl border border-border-light bg-white p-5 lg:col-span-3 lg:h-fit">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">Filtros</h2>
            <div className='my-3'>
                <SearchInput />
            </div>
            <div className="space-y-3">
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Tipo de propiedad
              </button>
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Tipo de operación
              </button>
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Rango de precio
              </button>
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Habitaciones
              </button>
            </div>
          </aside>
    )
}

export default FiltersControls;