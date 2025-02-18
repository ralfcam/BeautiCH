import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = 'https://placehold.co/400x300?text=Image+Not+Found',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
      className={cn('object-cover w-full h-full', className)}
      {...props}
    />
  );
}