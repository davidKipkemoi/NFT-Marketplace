// Common animation variants for reuse across components

// Fade in from bottom
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

// Fade in
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

// Scale in
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
};

// Stagger children variant
export const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
};

// Hover effects
export const hoverScale = {
    scale: 1.05,
};

export const hoverLift = {
    y: -5,
    boxShadow: "0 10px 25px rgba(148, 163, 184, 0.2)",
};

// Page transitions
export const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    exit: { 
        opacity: 0,
        transition: { 
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

// List item animations
export const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

// Button animations
export const buttonHover = {
    scale: 1.05,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
    }
};

export const buttonTap = {
    scale: 0.95
};

// Card animations
export const cardHover = {
    y: -10,
    boxShadow: "0 10px 25px rgba(148, 163, 184, 0.15)",
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
}; 