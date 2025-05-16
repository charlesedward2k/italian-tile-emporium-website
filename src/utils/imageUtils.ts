
/**
 * Utility functions for optimizing image handling
 */

import { useEffect, useState } from 'react';

// Image format support detection
export const supportsWebp = (): boolean => {
  const elem = document.createElement('canvas');
  if (elem.getContext && elem.getContext('2d')) {
    // Firefox, Chrome, Opera, Safari 9+
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

export const supportsAvif = (): boolean => {
  // This is a simplified check - in production, you might use a more robust solution
  return 'HTMLImageElement' in window && 'decode' in HTMLImageElement.prototype;
};

// Generate srcset for responsive images
export const generateSrcSet = (baseUrl: string, sizes: number[] = [320, 640, 1024, 1600]): string => {
  // For external URLs (like Unsplash), we can use their sizing parameters
  if (baseUrl.includes('unsplash.com')) {
    return sizes.map(size => `${baseUrl}?w=${size}&q=80&fm=webp&fit=crop 
${size}w`).join(', ');
  }
  
  // For our own CDN or other services, you would implement appropriate URL patterns
  return sizes.map(size => `${baseUrl}?width=${size} ${size}w`).join(', ');
};

// Get appropriate sizes attribute based on breakpoints
export const getSizesAttribute = (type: 'thumbnail' | 'hero' | 'gallery'): string => {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    default:
      return '100vw';
  }
};

// Generate blurred placeholder SVG
export const createBlurredPlaceholder = (
  width: number = 100, 
  height: number = 100, 
  color: string = '#f1f5f9'
): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <filter id="b" x="0" y="0">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" filter="url(#b)" opacity="0.5" fill="${color}"/>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Custom hook for lazy-loading images with IntersectionObserver
export function useImageLazyLoading(ref: React.RefObject<HTMLImageElement>, src: string, options = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded) {
          // Start loading the image
          setCurrentSrc(src);
          setIsLoaded(true);
          // Disconnect observer once loaded
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px', // Start loading before it's in viewport
      ...options
    });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, src, isLoaded, options]);
  
  return { isLoaded, currentSrc };
}

// Helper to determine image type for fallbacks
export const getImageType = (url: string): string => {
  if (url.includes('.webp')) return 'webp';
  if (url.includes('.avif')) return 'avif';
  if (url.includes('.png')) return 'png';
  if (url.includes('.gif')) return 'gif';
  return 'jpeg';
};

// Convert an image URL to WebP if supported
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    return `${url}${url.includes('?') ? '&' : '?'}fm=webp&q=85${width ? `&w=${width}` : ''}`;
  }
  
  // For other image URLs, you would implement your CDN's transformation parameters
  return url;
};
