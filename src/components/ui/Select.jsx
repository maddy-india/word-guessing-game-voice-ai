import { forwardRef } from 'react';

export const Select = forwardRef(function Select(
  { label, options, className = '', ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-lg font-body font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full
          px-4 py-3
          text-lg font-body
          bg-white
          border-4 border-muddy-brown
          rounded-2xl
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-peppa-pink focus:border-peppa-pink
          transition-all duration-200
          appearance-none
          bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238B7355%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
          bg-no-repeat
          bg-[position:right_12px_center]
          pr-12
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});
