import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ className = '', size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size] || sizeClasses['md']} animate-spin text-primary`} />
      {text && <span className="mt-2 text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

export function FullPageLoader({ size = 'md', text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <LoadingSpinner size={size} text={text} />
    </div>
  );
}
