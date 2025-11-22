
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
       <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
      <h2 className="mt-4 text-2xl font-bold text-red-700 dark:text-red-400">Oops! Something went wrong.</h2>
      <p className="mt-2 text-md text-red-600 dark:text-red-300 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};
