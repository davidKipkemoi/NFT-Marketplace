import React from 'react';

const Skeleton = ({ 
  className = '', 
  width, 
  height,
  circle = false,
  animate = true,
  count = 1,
  style = {}
}) => {
  const baseClass = 'bg-slate-700/50 rounded';
  const animationClass = animate ? 'animate-pulse' : '';
  const shapeClass = circle ? 'rounded-full' : 'rounded';
  const dimensionStyle = {
    width: width || '100%',
    height: height || '1rem',
    ...style
  };

  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(
      <span
        key={i}
        className={`${baseClass} ${animationClass} ${shapeClass} ${className} block`}
        style={{
          ...dimensionStyle,
          marginBottom: i !== count - 1 ? '0.5rem' : undefined
        }}
        aria-hidden="true"
      />
    );
  }

  return <>{items}</>;
};

export default Skeleton; 