'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';

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
                <div>
                    Número de telefono: {phoneNumber}
                </div>
            ) : (
                <div className='bg-neutral-400 text-neutral-700'>
                    <span>Solo usuarios autenticados pueden ver esta información</span>
                </div>
            )}
        </>
    );
}

