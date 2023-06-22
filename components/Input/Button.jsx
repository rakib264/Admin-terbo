import React from "react";

const Button = ({ label, size="large", bgColor, textColor, disabled = false }) => {
  return (
    <button
      className={`
      mt-6 block select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
      ${size === 'large' ? 'w-full' : 'w-1/2'} 
      ${bgColor ? `${bgColor}` : 'bg-cyan-500' } 
      ${textColor ? `${textColor}` : 'text-white'}`
    }
      type="button"
      data-ripple-light="true"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
