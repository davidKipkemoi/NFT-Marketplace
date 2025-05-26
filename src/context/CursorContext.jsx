import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import throttle from 'lodash.throttle';

const CursorContext = createContext();

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within a CursorProvider');
  return context;
};

export const CursorProvider = ({ children, customVariants = {} }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const handleMouseMove = throttle((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }, 16);

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, isTouchDevice]);

  const enterHover = (variant = 'hover') => {
    setIsHovering(true);
    setCursorVariant(variant);
  };

  const leaveHover = () => {
    setIsHovering(false);
    setCursorVariant('default');
  };

  const handleClick = () => {
    setCursorVariant('click');
    setTimeout(() => setCursorVariant('default'), 100);
  };

  const baseVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(148, 163, 184, 0.1)',
      borderColor: 'rgba(148, 163, 184, 0.2)',
      borderWidth: '1px',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: '48px',
      height: '48px',
      backgroundColor: 'rgba(148, 163, 184, 0.15)',
      borderColor: 'rgba(226, 232, 240, 0.3)',
      borderWidth: '1.5px',
    },
    button: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      width: '64px',
      height: '64px',
      backgroundColor: 'rgba(226, 232, 240, 0.1)',
      borderColor: 'rgba(226, 232, 240, 0.4)',
      borderWidth: '2px',
      mixBlendMode: 'difference',
    },
    click: {
      scale: 0.8,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transition: { duration: 0.1 },
    },
  };

  const mergedVariants = { ...baseVariants, ...customVariants };

  const renderCursor = () => (
    <motion.div
      className="fixed rounded-full pointer-events-none backdrop-blur-sm z-50 border @media (prefers-reduced-motion: reduce) { opacity: 0; }"
      animate={cursorVariant}
      variants={mergedVariants}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  );

  const contextValue = useMemo(
    () => ({
      mousePosition,
      isHovering,
      enterHover,
      leaveHover,
      handleClick,
      cursorVariant,
      setCursorVariant,
      isTouchDevice,
    }),
    [mousePosition, isHovering, cursorVariant, isTouchDevice]
  );

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
      {!isTouchDevice && renderCursor()}
    </CursorContext.Provider>
  );
};

export default CursorContext;