'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Mail, Phone } from 'lucide-react';

interface ForAuthenticatedUserProps {
    phoneNumber: string;
    ownerEmail: string;
}

export const ForAuthenticatedUser: React.FC<ForAuthenticatedUserProps> = ({ phoneNumber, ownerEmail } ) => {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    return (
      <>
        {isAuthenticated ? (
          <div className="space-y-3 text-gray-900">
            <div className="flex-col items-center space-y-3 lg:flex-row">
                <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {ownerEmail}
                    </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium text-gray-900">
                      {phoneNumber}
                    </p>
                </div>
              </div>
              
              
              
            </div>
          </div>
        ) : (
          <div className=" text-neutral-700 flex-col space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                <span className="text-gray-400">
                  Inicia sesión para ver el correo electrónico
                </span>
                </div>
              </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <span className="text-gray-400">
                  Inicia sesión para ver el número de contacto
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

