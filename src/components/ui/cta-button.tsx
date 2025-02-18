import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  fullWidth?: boolean;
  label: string;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'primary', size = 'default', fullWidth, label, children, ...props }, ref) => {
    const baseStyles = {
      primary: 'bg-[var(--swiss-red)] hover:bg-[var(--swiss-red)]/90 text-white',
      secondary: 'bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90 text-white',
      outline: 'border-2 border-current hover:bg-accent',
    };

    return (
      <Button
        ref={ref}
        className={cn(
          baseStyles[variant],
          fullWidth && 'w-full',
          'transition-all duration-200',
          className
        )}
        size={size}
        aria-label={label}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

CTAButton.displayName = 'CTAButton';