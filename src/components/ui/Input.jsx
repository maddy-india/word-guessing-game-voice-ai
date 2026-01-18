import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, className = '', error, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-lg font-body font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full
          px-4 py-3
          text-lg font-body
          bg-white
          border-4 border-muddy-brown
          rounded-2xl
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-peppa-pink focus:border-peppa-pink
          transition-all duration-200
          ${error ? 'border-error-red' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-red font-body">{error}</p>
      )}
    </div>
  );
});
