'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Home } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = useCallback((index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
    }, []);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Manejar teclado: flechas y Escape
    useEffect(() => {
        if (!lightboxOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    goNext();
                    break;
                case 'ArrowLeft':
                    goPrev();
                    break;
            }
        };

        // Bloquear scroll del body cuando el lightbox está abierto
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, closeLightbox, goNext, goPrev]);

    if (images.length === 0) {
        return (
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                    <Home className="w-16 h-16 text-gray-400" />
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ─── Galería en grid ─── */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 gap-2 p-2">
                    {/* Imagen principal */}
                    <div
                        className="col-span-2 relative h-96 group cursor-pointer"
                        onClick={() => openLightbox(0)}
                    >
                        <img
                            src={images[0]}
                            alt={title}
                            className="object-cover rounded-lg w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                        {/* Overlay sutil al hover */}
                        <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                <ZoomIn className="w-6 h-6 text-gray-700" />
                            </div>
                        </div>
                    </div>

                    {/* Imágenes secundarias */}
                    {images.slice(1, 4).map((image, index) => (
                        <div
                            key={index}
                            className="relative h-48 group cursor-pointer"
                            onClick={() => openLightbox(index + 1)}
                        >
                            <img
                                src={image}
                                alt={`${title} - ${index + 2}`}
                                className="object-cover rounded-lg w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                    <ZoomIn className="w-4 h-4 text-gray-700" />
                                </div>
                            </div>

                            {/* Badge "Ver más" en la última imagen si hay más de 4 */}
                            {index === 2 && images.length > 4 && (
                                <div className="absolute inset-0 rounded-lg bg-black/40 flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">
                                        +{images.length - 4} más
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contador de imágenes */}
                {images.length > 1 && (
                    <div className="px-4 pb-3 flex justify-end">
                        <button
                            onClick={() => openLightbox(0)}
                            className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                            <ZoomIn className="w-4 h-4" />
                            Ver todas las fotos ({images.length})
                        </button>
                    </div>
                )}
            </div>

            {/* ─── Lightbox Modal ─── */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Vista completa de imágenes"
                >
                    {/* Fondo oscuro — click para cerrar */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fade-in"
                        onClick={closeLightbox}
                    />

                    {/* Barra superior */}
                    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 sm:px-6 z-100">
                        <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
                            {currentIndex + 1} / {images.length}
                        </span>
                        <button
                            onClick={closeLightbox}
                            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2.5 transition-all cursor-pointer"
                            aria-label="Cerrar vista completa"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Imagen actual */}
                    <div className="relative z-10 flex items-center justify-center w-full h-full px-16 py-20">
                        <img
                            src={images[currentIndex]}
                            alt={`${title} - ${currentIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg animate-scale-in select-none"
                            draggable={false}
                        />
                    </div>

                    {/* Flecha izquierda */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-3 sm:left-6 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all cursor-pointer"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}

                    {/* Flecha derecha */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-3 sm:right-6 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all cursor-pointer"
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}

                    {/* Thumbnails en la parte inferior */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-2 max-w-[90vw] overflow-x-auto">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${index === currentIndex
                                        ? 'border-white scale-110 shadow-lg'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    aria-label={`Ir a imagen ${index + 1}`}
                                >
                                    <img
                                        src={image}
                                        alt={`Miniatura ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        draggable={false}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
