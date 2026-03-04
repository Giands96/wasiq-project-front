'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Phone } from 'lucide-react';

interface ForAuthenticatedUserProps {
    phoneNumber: string;
}

export const ForAuthenticatedUser: React.FC<ForAuthenticatedUserProps> = ({ phoneNumber }) => {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    console.log('Is authenticated:', isAuthenticated);
    console.log('Phone number:', phoneNumber);

    return(
        <>
            {isAuthenticated ? (
                <div className='space-y-3'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-gray-100 rounded-lg'>
                                            <Phone className='w-4 h-4 text-gray-600' />
                                        </div>
                                        <div>
                                            <p className='text-sm text-gray-500'>Teléfono</p>
                                            <a href={`tel:${phoneNumber}`} className='font-medium '>
                                                {phoneNumber}
                                            </a>
                                        </div>
                                    </div>
                </div>
            ) : (
                <div className=' text-neutral-700'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-gray-100 rounded-lg'>
                                <Phone className='w-4 h-4 text-gray-600' />
                            </div>
                            <div>
                                 <p className='text-sm text-gray-500'>Teléfono</p>
                                <span className='text-gray-400'>
                                    Inicia sesión para ver el número de contacto
                                </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

