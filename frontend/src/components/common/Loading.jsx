import React from 'react';

const Loading = ({ size = 'md', fullScreen = false, text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const containerClasses = `flex items-center justify-center ${fullScreen ? 'h-screen w-full' : ''}`;
  
  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
        {text && <p className="text-gray-600">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
