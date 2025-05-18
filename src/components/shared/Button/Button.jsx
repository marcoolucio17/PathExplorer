import React from 'react';
import styles from './Button.module.css';

/**
 * Button component with primary/secondary types and variants
 * 
 * @param {Object} props
 * @param {string} props.type - Button type: 'primary' or 'secondary'
 * @param {string} props.variant - Button variant: 'default', 'view', 'alert', 'compatibility'
 * @param {string} props.icon - Icon class (Bootstrap Icons class name, e.g. 'bi-search')
 * @param {boolean} props.isActive - Whether button is in active state
 * @param {boolean} props.isToggle - Whether button is a toggle button (square icon button)
 * @param {string} props.toggleMode - For toggle buttons: 'grid' or 'list'
 * @param {function} props.onToggle - For toggle buttons: function to call when toggled (receives new mode)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.rounded - Whether button should have rounded corners
 * @param {string} props.className - Additional CSS class
 */
const Button = ({
  type = 'primary',
  variant = 'default',
  icon,
  isActive = false,
  isToggle = false,
  toggleMode,
  onToggle,
  fullWidth = false,
  rounded = false,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  // Handle toggle button click with animation
  const handleToggleClick = (e) => {
    if (isToggle && toggleMode && onToggle) {
      // Switch between grid and list mode
      const newMode = toggleMode === 'grid' ? 'list' : 'grid';
      
      // Call the onToggle function with the new mode
      onToggle(newMode);
    }
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  // Build class name based on props
  const buttonClasses = [
    styles.button,
    styles[type],
    variant !== 'default' && styles[variant],
    isActive && styles.active,
    isToggle && styles.toggle,
    isToggle && toggleMode === 'grid' && styles.gridActive,
    isToggle && toggleMode === 'list' && styles.listActive,
    fullWidth && styles.fullWidth,
    rounded && styles.rounded,
    className
  ].filter(Boolean).join(' ');

  // For toggle buttons, determine the icon based on current mode
  const buttonIcon = isToggle && toggleMode 
    ? `bi-${toggleMode === 'grid' ? 'list' : 'grid-3x3-gap'}`
    : icon;

  return (
    <button 
      className={buttonClasses} 
      onClick={isToggle ? handleToggleClick : onClick} 
      {...rest}
    >
      {buttonIcon && <i className={`bi ${buttonIcon}`}></i>}
      {children}
    </button>
  );
};

export default Button;
