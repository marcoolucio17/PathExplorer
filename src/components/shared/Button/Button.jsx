import React, { useState, useRef, useEffect } from 'react';
import styles from './Button.module.css';
import CustomScrollbar from '../../CustomScrollbar';

/**
 * Button component with primary/secondary types and variants
 * 
 * @param {Object} props
 * @param {string} props.type - Button type: 'primary' or 'secondary'
 * @param {string} props.variant - Button variant: 'default', 'view', 'alert', 'compatibility'
 * @param {string} props.icon - Icon class (Bootstrap Icons class name, e.g. 'bi-search')
 * @param {boolean} props.isActive - Whether button is in active state
 * @param {boolean} props.isLoading - Whether button is in loading state (for compatibility variant)
 * @param {boolean} props.isToggle - Whether button is a toggle button (square icon button)
 * @param {string} props.toggleMode - For toggle buttons: 'grid' or 'list'
 * @param {function} props.onToggle - For toggle buttons: function to call when toggled (receives new mode)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.rounded - Whether button should have rounded corners
 * @param {string} props.className - Additional CSS class
 * @param {boolean} props.hasDropdown - Whether the button has a dropdown menu
 * @param {Array} props.dropdownItems - Array of items for the dropdown
 * @param {function} props.onDropdownItemClick - Function to call when dropdown item is clicked
 * @param {boolean} props.isFilterButton - Whether this is a filter button (changes dropdown appearance)
 */
const Button = ({
  type = 'primary',
  variant = 'default',
  icon,
  isActive = false,
  isLoading = false,
  isToggle = false,
  toggleMode,
  onToggle,
  fullWidth = false,
  rounded = false,
  className = '',
  children,
  onClick,
  hasDropdown = false,
  dropdownItems = [],
  onDropdownItemClick,
  isFilterButton = false,
  ...rest
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setActiveSubmenu(null);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

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

  // Handle button click - either open dropdown or call onClick
  const handleButtonClick = (e) => {
    if (hasDropdown) {
      setDropdownOpen(!dropdownOpen);
    } else if (isToggle) {
      handleToggleClick(e);
    } else if (onClick) {
      onClick(e);
    }
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (item, e) => {
    if (item.subMenu) {
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
    } else {
      if (onDropdownItemClick) {
        onDropdownItemClick(item, e);
      }
      setDropdownOpen(false);
      setActiveSubmenu(null);
    }
  };

  // Handle submenu item click
  const handleSubmenuItemClick = (item, e) => {
    if (onDropdownItemClick) {
      onDropdownItemClick(item, e);
    }
    setDropdownOpen(false);
    setActiveSubmenu(null);
  };
  
  // Build class name based on props
  const buttonClasses = [
    styles.button,
    styles[type],
    variant !== 'default' && styles[variant],
    isActive && styles.active,
    isLoading && styles.loading,
    isToggle && styles.toggle,
    isToggle && toggleMode === 'grid' && styles.gridActive,
    isToggle && toggleMode === 'list' && styles.listActive,
    fullWidth && styles.fullWidth,
    rounded && styles.rounded,
    hasDropdown && styles.hasDropdown,
    className
  ].filter(Boolean).join(' ');

  // For toggle buttons, determine the icon based on current mode
  const buttonIcon = isToggle && toggleMode 
    ? `bi-${toggleMode === 'grid' ? 'list' : 'grid-3x3-gap'}`
    : icon;

  return (
    <div className={styles.buttonContainer} ref={buttonRef}>
      <button 
        className={buttonClasses} 
        onClick={handleButtonClick} 
        {...rest}
      >
        {buttonIcon && <i className={`bi ${buttonIcon}`}></i>}
        {children}
        {hasDropdown && <i className={`bi bi-chevron-down ${styles.dropdownIcon} ${dropdownOpen ? styles.open : ''}`}></i>}
      </button>

      {hasDropdown && dropdownOpen && (
        <div 
          className={`${styles.dropdown} ${isFilterButton ? styles.filterDropdown : ''}`}
          ref={dropdownRef}
        >
          <div className={styles.dropdownHeader}>
            {isFilterButton ? `${children}:` : ''}
          </div>
          <div className={styles.dropdownMenuContainer}>
            <CustomScrollbar 
              maxHeight="300px" 
              fadeBackground="#1d1d37" 
              fadeHeight={30}
              showFade={true}
            >
              <ul className={styles.dropdownMenu}>
                {dropdownItems.map((item, index) => (
                  <li key={index} className={styles.dropdownItem}>
                    <button 
                      onClick={(e) => handleDropdownItemClick(item, e)}
                      className={`${styles.dropdownButton} ${item.subMenu ? styles.dropdownButtonWithSubmenu : ''} ${activeSubmenu === item.label ? styles.active : ''}`}
                    >
                      {item.icon && <i className={`bi ${item.icon}`}></i>}
                      {item.label}
                      {item.subMenu && <i className={`bi bi-chevron-right ${styles.submenuIcon} ${activeSubmenu === item.label ? styles.open : ''}`}></i>}
                    </button>
                    {item.subMenu && activeSubmenu === item.label && (
                      <div className={styles.submenuContainer}>
                        <CustomScrollbar 
                          maxHeight="250px" 
                          fadeBackground="#19192f" 
                          fadeHeight={25}
                          showFade={true}
                        >
                          <ul className={styles.submenu}>
                            {item.options.map((subItem, subIndex) => (
                              <li key={`${index}-${subIndex}`} className={styles.submenuItem}>
                                <button 
                                  onClick={(e) => handleSubmenuItemClick(subItem, e)}
                                  className={styles.submenuButton}
                                >
                                  {subItem.icon && <i className={`bi ${subItem.icon}`}></i>}
                                  {subItem.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </CustomScrollbar>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CustomScrollbar>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;