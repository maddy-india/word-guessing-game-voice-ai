import { forwardRef } from 'react';

const variants = {
  primary: `
    bg-peppa-pink hover:bg-peppa-pink/90
    text-white
    border-4 border-muddy-brown
    shadow-[0_6px_0_#C74C74]
    hover:shadow-[0_4px_0_#C74C74]
    active:shadow-[0_2px_0_#C74C74]
    active:translate-y-1
  `,
  secondary: `
    bg-white hover:bg-gray-50
    text-daddy-blue
    border-4 border-daddy-blue
    shadow-[0_6px_0_#3A8BC9]
    hover:shadow-[0_4px_0_#3A8BC9]
    active:shadow-[0_2px_0_#3A8BC9]
    active:translate-y-1
  `,
  blue: `
    bg-daddy-blue hover:bg-daddy-blue/90
    text-white
    border-4 border-muddy-brown
    shadow-[0_6px_0_#3A8BC9]
    hover:shadow-[0_4px_0_#3A8BC9]
    active:shadow-[0_2px_0_#3A8BC9]
    active:translate-y-1
  `,
  orange: `
    bg-mummy-orange hover:bg-mummy-orange/90
    text-white
    border-4 border-muddy-brown
    shadow-[0_6px_0_#E67320]
    hover:shadow-[0_4px_0_#E67320]
    active:shadow-[0_2px_0_#E67320]
    active:translate-y-1
  `,
  ghost: `
    bg-transparent hover:bg-gray-100
    text-gray-600
    border-2 border-gray-300
  `,
  icon: `
    bg-white hover:bg-gray-50
    text-muddy-brown
    border-4 border-muddy-brown
    shadow-[0_4px_0_#6B5A47]
    hover:shadow-[0_3px_0_#6B5A47]
    active:shadow-[0_1px_0_#6B5A47]
    active:translate-y-0.5
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-xl rounded-2xl',
  xl: 'px-10 py-5 text-2xl rounded-3xl',
  icon: 'p-3 rounded-full',
  'icon-lg': 'p-4 rounded-full',
};

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={`
        font-peppa font-bold
        transition-all duration-150
        hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:translate-y-0
        no-select
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});
