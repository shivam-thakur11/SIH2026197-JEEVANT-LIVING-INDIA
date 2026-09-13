import React from 'react';

/**
 * HeritageCornerMotif
 * Traditional Indian floral & paisley corner line-art illustration
 * Adds authentic handcrafted aesthetic to cards, hero banners, and section dividers.
 */
export const HeritageCornerMotif = ({
  position = 'top-right',
  size = 64,
  color = '#c8952a',
  secondaryColor = '#c85a32',
  className = '',
  opacity = 0.85,
}) => {
  const positionStyles = {
    'top-left': { top: 0, left: 0, transform: 'rotate(0deg)' },
    'top-right': { top: 0, right: 0, transform: 'rotate(90deg)' },
    'bottom-right': { bottom: 0, right: 0, transform: 'rotate(180deg)' },
    'bottom-left': { bottom: 0, left: 0, transform: 'rotate(270deg)' },
  };

  const style = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 1,
    opacity,
    ...positionStyles[position],
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={`heritage-corner-motif ${className}`}
      aria-hidden="true"
    >
      {/* Outer border flourishes */}
      <path
        d="M 6 6 L 6 45 C 6 25, 25 6, 45 6 L 6 6 Z"
        fill={color}
        fillOpacity="0.12"
      />
      <path
        d="M 2 2 L 2 55 C 2 30, 30 2, 55 2"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M 6 6 L 6 42 C 6 22, 22 6, 42 6"
        stroke={secondaryColor}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Traditional Indian Paisley (Kalka / Mango motif) */}
      <path
        d="M 20 20 C 15 28, 16 38, 24 42 C 32 46, 42 38, 38 28 C 35 20, 24 16, 20 20 Z"
        fill={secondaryColor}
        fillOpacity="0.18"
        stroke={secondaryColor}
        strokeWidth="1.2"
      />
      <path
        d="M 24 24 C 28 20, 34 22, 34 28 C 34 32, 28 35, 25 32"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Floral petals */}
      <circle cx="16" cy="16" r="3.5" fill={color} />
      <circle cx="28" cy="12" r="2.5" fill={secondaryColor} />
      <circle cx="12" cy="28" r="2.5" fill={secondaryColor} />
      {/* Delicate dots array */}
      <circle cx="50" cy="8" r="1.5" fill={color} />
      <circle cx="8" cy="50" r="1.5" fill={color} />
      <circle cx="60" cy="4" r="1.2" fill={secondaryColor} />
      <circle cx="4" cy="60" r="1.2" fill={secondaryColor} />
    </svg>
  );
};

export default HeritageCornerMotif;
