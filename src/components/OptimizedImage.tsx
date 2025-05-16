
import React, { useState, useRef, useEffect } from 'react';
import { createBlurredPlaceholder, generateSrcSet, getSizesAttribute, getOptimizedImageUrl } from '@/utils/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageType?: 'thumbnail' | 'hero' | 'gallery';
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  width, 
  height,
  className = '',
  imageType = 'thumbnail',
  priority = false,
  objectFit = 'cover'
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Create placeholder
  const placeholder = createBlurredPlaceholder(width || 100, height || 100);
  
  // Generate srcset for responsive loading
  const srcSet = generateSrcSet(src);
  
  // Get appropriate sizes attribute
  const sizes = getSizesAttribute(imageType);
  
  // Calculate aspect ratio for preventing layout shift
  const aspectRatio = width && height ? width / height : undefined;
  
  // Handle image load completion
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  // Handle image load error
  const handleError = () => {
    setIsError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Set up Intersection Observer for below-the-fold images
  useEffect(() => {
    if (!imgRef.current || priority) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When the image comes near viewport
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = getOptimizedImageUrl(src, width);
          // Start loading the srcset
          img.srcset = srcSet;
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px' // Start loading 200px before visible
    });
    
    observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, [src, priority, srcSet]);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        aspectRatio: aspectRatio ? `${aspectRatio}` : 'auto',
      }}
    >
      {/* Blur-up placeholder */}
      {!isLoaded && !isError && (
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover filter blur-sm"
          style={{ backgroundImage: `url(${placeholder})` }}
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      <img 
        ref={imgRef}
        src={priority ? getOptimizedImageUrl(src, width) : placeholder} 
        srcSet={priority ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${objectFit === 'cover' ? 'object-cover' : ''}
        ${objectFit === 'contain' ? 'object-contain' : ''}
        ${objectFit === 'fill' ? 'object-fill' : ''}
        ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
        ${objectFit === 'none' ? 'object-none' : ''}`}
        decoding={priority ? "sync" : "async"}
      />
      
      {/* Fallback for errors */}
      {isError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-200"
          aria-hidden="true"
        >
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
