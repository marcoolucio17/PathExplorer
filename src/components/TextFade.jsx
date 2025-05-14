import React from 'react';
import styles from './TextFade.module.css';

/**
 * TextFade component provides various text fading effects
 * @param {Object} props
 * @param {React.ReactNode} props.children - The text content to fade
 * @param {('horizontal'|'vertical'|'singleLine'|'multiLine')} props.type - Type of fade effect
 * @param {boolean} props.transparent - Use transparent background variant
 * @param {('short'|'medium'|'long')} props.fadeLength - Length of the fade effect
 * @param {boolean} props.hoverReveal - Reveal full text on hover
 * @param {number} props.lines - Number of lines for multiLine type
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
export const TextFade = ({ 
  children, 
  type = 'horizontal',
  transparent = false,
  fadeLength = 'medium',
  hoverReveal = false,
  lines = 3,
  className = '',
  style = {}
}) => {
  const getClasses = () => {
    const classes = [styles.textFadeContainer];
    
    switch (type) {
      case 'horizontal':
        classes.push(transparent ? styles.textFadeHorizontalTransparent : styles.textFadeHorizontal);
        break;
      case 'vertical':
        classes.push(transparent ? styles.textFadeVerticalTransparent : styles.textFadeVertical);
        break;
      case 'singleLine':
        classes.push(styles.singleLineFade);
        break;
      case 'multiLine':
        classes.push(styles.multiLineFade);
        break;
    }
    
    // Add fade length class
    if (fadeLength === 'short') classes.push(styles.fadeShort);
    if (fadeLength === 'long') classes.push(styles.fadeLong);
    
    // Add hover effect
    if (hoverReveal) classes.push(styles.textFadeHover);
    
    // Add custom className
    if (className) classes.push(className);
    
    return classes.join(' ');
  };
  
  const getStyle = () => {
    const combinedStyle = { ...style };
    
    if (type === 'multiLine' && lines) {
      combinedStyle['WebkitLineClamp'] = lines;
    }
    
    return combinedStyle;
  };
  
  return (
    <div className={getClasses()} style={getStyle()}>
      {children}
    </div>
  );
};

// Export individual style classes for direct use
export const textFadeStyles = styles;