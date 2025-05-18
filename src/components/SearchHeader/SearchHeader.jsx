import React, { useState } from "react";
import styles from "./SearchHeader.module.css";

/**
 * SearchHeader component
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search term value
 * @param {function} props.setSearchTerm - Function to update search term
 * @param {string} props.placeholder - Placeholder text for search input
 * @param {string} props.searchName - Name attribute for the search input
 * @param {string} props.labelText - Label text for sort/filter options (e.g., "Sort by:" or "Filter by:")
 * @param {Array} props.filterButtons - Array of filter button config objects
 * @param {boolean} props.viewToggle - Whether to show the view toggle button
 * @param {string} props.viewMode - Current view mode ("grid" or "list")
 * @param {function} props.setViewMode - Function to update view mode
 * @param {Array} props.customButtons - Array of custom button config objects to render before filter buttons
 * @returns {JSX.Element}
 */
export const SearchHeader = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  searchName = "search",
  labelText = "Filter by:",
  filterButtons = [],
  viewToggle = true,
  viewMode = "grid",
  setViewMode,
  customButtons = []
}) => {
  // State to track input focus
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle view mode toggle
  const toggleViewMode = () => {
    // Get the current container based on view mode
    const container = document.querySelector(`.${styles.gridContainer}`) || 
                      document.querySelector(`.${styles.listContainer}`);
    
    // Apply fade out effect if container exists
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(8px) scale(0.98)';
      
      // Change view mode after short delay for animation
      setTimeout(() => {
        setViewMode(viewMode === 'grid' ? 'list' : 'grid');
        
        // Fade in the new container
        setTimeout(() => {
          const newContainer = document.querySelector(`.${styles.gridContainer}`) || 
                              document.querySelector(`.${styles.listContainer}`);
          if (newContainer) {
            newContainer.style.opacity = '1';
            newContainer.style.transform = 'translateY(0) scale(1)';
          }
        }, 80);
      }, 300);
    } else {
      // Direct change if no container found
      setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    }
  };

  return (
    <div className={styles.searchHeader}>
      <div 
        className={`${styles.searchContainer} ${isFocused ? styles.searchContainerFocused : ''}`}
        style={{
          // Use inline style for consistent behavior
          width: isFocused ? '300px' : '250px', 
          transition: 'width 0.25s ease'
        }}
      >
        <i className="bi bi-search"></i>
        <input
          type="text"
          value={searchTerm}
          name={searchName}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
      <div className={styles.sortContainer}>
        {/* Optional custom buttons before the label */}
        {customButtons.map((button, index) => (
          <button
            key={`custom-btn-${index}`}
            className={`${styles.viewApplicantsButton} ${button.className || ''}`}
            onClick={button.onClick}
          >
            {button.icon && <i className={button.icon}></i>}
            {button.icon && " "}
            {button.label}
          </button>
        ))}
        
        {/* Sort/Filter label */}
        {labelText && <h2 className={styles.sortLabel}>{labelText}</h2>}
        
        {/* Filter buttons */}
        {filterButtons.map((button, index) => {
          // Check if this is the compatibility button
          const isCompatibilityButton = 
            button.label === "Compatibility" || 
            button.label === "Compability";
          
          // Apply proper styling based on button type
          let buttonClass = styles.filterButton;
          
          // Add compatibility class if primary type or compatibility label
          if (button.type === 'primary' || isCompatibilityButton) {
            buttonClass += ` ${styles.compabilityButton}`;
          } else {
            buttonClass += ` ${styles.skillsButton}`;
          }
          
          // Add active class if button is active
          if (button.isActive) {
            buttonClass += ` ${styles.activeButton}`;
          }
          
          return (
            <button
              key={`filter-btn-${index}`}
              className={buttonClass}
              onClick={button.onClick}
              title={isCompatibilityButton ? "Toggle compatibility mode" : button.label}
            >
              {button.label}
              {button.badgeCount > 0 && (
                <span className={styles.filterBadge}>{button.badgeCount}</span>
              )}
            </button>
          );
        })}
        
        {/* View toggle button */}
        {viewToggle && setViewMode && (
          <button 
            className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.listActive : styles.gridActive}`}
            onClick={toggleViewMode}
            title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
          >
            <i className={`bi bi-${viewMode === 'grid' ? 'list' : 'grid-3x3-gap'}`}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;