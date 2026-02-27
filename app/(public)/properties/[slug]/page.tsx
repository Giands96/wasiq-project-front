import { PropertyService } from '@/modules/properties/services/property.service';
import { notFound } from 'next/navigation';
import React from 'react';
import { Home, Bed, Bath, Maximize, MapPin, Calendar, Mail, User, ExternalLink, Share2, Heart } from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { PropertyOwnerControls } from '@/modules/properties/components/PropertyOwnerControls';
import { ForAuthenticatedUser } from '@/modules/properties/components/ForAuthenticatedUser';

interface PropertyDetailsPageProps {
    params: {
        slug: string;
    }
}



export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
    const { slug } = await params;
    const property = await PropertyService.getPropertyBySlug(slug);
    

    if (property == null) {
        return notFound();
    }


    // Formatear precio
    const formattedPrice = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 0
    }).format(property.price);

    console.log('Property details:', property);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='container mx-auto p-4 md:p-6 lg:p-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Columna izquierda - Imágenes y detalles principales */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* Galería de imágenes */}
                        <div className='bg-white rounded-lg overflow-hidden shadow-sm'>
                            {property.images && property.images.length > 0 ? (
                                <div className='grid grid-cols-2 gap-2 p-2'>
                                    {/* Imagen principal */}
                                    <div className='col-span-2 relative h-96'>
                                        <img
                                            src={property.images[0]}
                                            alt={property.title}
                                            className='object-cover rounded-lg w-full h-full'
                                            
                                        />
                                    </div>
                                    {/* Imágenes secundarias */}
                                    {property.images.slice(1, 4).map((image, index) => (
                                        <div key={index} className='relative h-48'>
                                            <img
                                                src={image}
                                                alt={`${property.title} - ${index + 2}`}
                                                className='object-cover rounded-lg w-full h-full'
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='h-96 bg-gray-200 flex items-center justify-center'>
                                    <Home className='w-16 h-16 text-gray-400' />
                                </div>
                            )}
                        </div>

                        {/* Información principal */}
                        <div className='bg-white rounded-lg p-6 shadow-sm'>
                            <div className='flex items-start justify-between mb-4'>
                                <div>
                                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                                        {property.title}
                                    </h1>
                                    <div className='flex items-center text-gray-600 mb-4'>
                                        <MapPin className='w-4 h-4 mr-2' />
                                        <span>{property.address}</span>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                                        <Share2 className='w-5 h-5 text-gray-600' />
                                    </button>
                                    <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                                        <Heart className='w-5 h-5 text-gray-600' />
                                    </button>
                                    <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                                        <ExternalLink className='w-5 h-5 text-gray-600' />
                                    </button>
                                </div>
                            </div>

                            {/* Características principales */}
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-blue-50 rounded-lg'>
                                        <Bed className='w-5 h-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Habitaciones</p>
                                        <p className='font-semibold text-gray-900'>{property.bedrooms}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-blue-50 rounded-lg'>
                                        <Bath className='w-5 h-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Baños</p>
                                        <p className='font-semibold text-gray-900'>{property.bathrooms}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-blue-50 rounded-lg'>
                                        <Maximize className='w-5 h-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Área</p>
                                        <p className='font-semibold text-gray-900'>{property.area} m²</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='p-2 bg-blue-50 rounded-lg'>
                                        <Home className='w-5 h-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500'>Tipo</p>
                                        <p className='font-semibold text-gray-900'>{property.propertyType}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className='mt-6'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                                    Acerca de {property.title}
                                </h2>
                                <p className='text-gray-600 leading-relaxed whitespace-pre-line'>
                                    {property.description}
                                </p>
                            </div>

                            {/* Detalles adicionales */}
                            <div className='mt-6 grid grid-cols-2 gap-4'>
                                <div className='p-4 bg-gray-50 rounded-lg'>
                                    <p className='text-sm text-gray-500 mb-1'>Tipo de Operación</p>
                                    <p className='font-semibold text-gray-900'>{property.operationType}</p>
                                </div>
                                <div className='p-4 bg-gray-50 rounded-lg'>
                                    <p className='text-sm text-gray-500 mb-1'>Estado</p>
                                    <p className={`font-semibold ${property.available ? 'text-green-600' : 'text-red-600'}`}>
                                        {property.available ? 'Disponible' : 'No disponible'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Card de contacto y precio */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-lg p-6 shadow-sm sticky top-6 space-y-6'>
                            {/* Precio y tipo */}
                            <div>
                                <div className='flex items-baseline justify-between mb-2'>
                                    <h3 className='text-3xl font-bold text-gray-900'>
                                        {formattedPrice}
                                    </h3>
                                    <span className='text-gray-500 text-sm'>
                                        /{property.operationType === 'RENT' ? 'mes' : 'total'}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-500'>
                                    {property.propertyType} • {property.operationType}
                                </p>
                            </div>

                            {/* Información del propietario */}
                            <div className='border-t border-gray-200 pt-6'>
                                <h4 className='font-semibold text-gray-900 mb-4'>Información del Propietario</h4>
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-gray-100 rounded-lg'>
                                            <User className='w-4 h-4 text-gray-600' />
                                        </div>
                                        <div>
                                            <p className='text-sm text-gray-500'>Propietario</p>
                                            <p className='font-medium text-gray-900'>{property.ownerName}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-gray-100 rounded-lg'>
                                            <Mail className='w-4 h-4 text-gray-600' />
                                        </div>
                                        <div>
                                            <p className='text-sm text-gray-500'>Email</p>
                                            <a href={`mailto:${property.ownerEmail}`} className='font-medium text-blue-600 hover:underline'>
                                                {property.ownerEmail}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <PropertyOwnerControls ownerId={property.ownerId} slug={property.slug}/>
                            <ForAuthenticatedUser phoneNumber={property.ownerPhone} />

                            {/* Badge de disponibilidad */}
                            <div className={`text-center py-2 px-4 rounded-lg ${
                                property.available 
                                    ? 'bg-beige text-primary-button' 
                                    : 'bg-red-50 text-red-700'
                            }`}>
                                <p className='text-sm font-semibold'>
                                    {property.available ? '✓ Disponible Ahora' : '✗ No Disponible'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}