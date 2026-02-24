"use client";

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/shared/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useProperties } from '../hooks/useProperties';
import { ROUTES } from '@/shared/constants/routes';


interface PropertyOwnerControlsProps {
    ownerId: number;
    slug: string;
}


export const PropertyOwnerControls: FC<PropertyOwnerControlsProps> = ({ ownerId, slug }) => {

    const { user } = useAuthStore();
    const router = useRouter();

    const isOwner = user?.id === ownerId;

    if (!isOwner) {
        return null;
    } else {
    }

    

    return (
        <div className="flex gap-4 mt-4 flex-col ">
            <Button className='w-full' variant="outline" size="sm" onClick={() => router.push(ROUTES.PROPERTIES.UPDATE(slug))}>
                <Edit className="mr-2" />
                Editar
            </Button>
            <Button className='w-full' variant="destructive" size="sm" onClick={() => router.push(ROUTES.PROPERTIES.DELETE(slug))}>
                <Trash2 className="mr-2" />
                Eliminar
            </Button>
        </div>
    )

}