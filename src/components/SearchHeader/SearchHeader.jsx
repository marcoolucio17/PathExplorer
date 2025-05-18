import React, { useState, useEffect, useRef } from "react";
import Button from "../shared/Button";
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
 * @param {Object} props.activeFilters - Object with active filters data (e.g., {projects: {label, values}, skills: {label, values}})
 * @param {function} props.onRemoveFilter - Function to call when a filter is removed
 * @param {function} props.onClearFilters - Function to call when all filters are cleared
 * @param {Object} props.inSearchBar - Parameter to indicate if this is being used in the search bar (affects styling)
 * @param {Array} props.searchResults - Array of search results to display in dropdown (for inSearchBar mode)
 * @param {Function} props.onSearchResultClick - Function to call when a search result is clicked
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
  customButtons = [],
  activeFilters = {},
  onRemoveFilter,
  onClearFilters,
  inSearchBar = false,
  searchResults = {},
  onSearchResultClick
}) => {
  // State to track input focus
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if there are any active filters
  const hasActiveFilters = activeFilters && 
    Object.values(activeFilters).some(
      filterGroup => filterGroup && filterGroup.values && filterGroup.values.length > 0
    );

  // Check if search term exists and immediately show results
  useEffect(() => {
    if (inSearchBar && searchTerm && searchTerm.length > 0) {
      setShowResults(true);
    } else if (inSearchBar) {
      setShowResults(false);
    }
  }, [searchTerm, inSearchBar]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.searchHeaderWrapper} ${inSearchBar ? styles.inSearchBar : ''}`}>
      <div className={`${styles.searchHeader} ${inSearchBar ? styles.inSearchBarHeader : ''}`}>
        <div 
          className={`${styles.searchContainer} ${isFocused ? styles.searchContainerFocused : ''} ${inSearchBar ? styles.inSearchBarContainer : ''}`}
          style={{
            // Width animation happens via CSS, but we add these inline styles for initial states
            width: inSearchBar ? (isFocused ? '350px' : '280px') : (isFocused ? '300px' : '250px')
          }}
          ref={dropdownRef}
        >
          <i className={`bi bi-search ${inSearchBar ? styles.searchIconNavbar : ''}`}></i>
          <input
            type="text"
            value={searchTerm}
            name={searchName}
            onKeyUp={(e) => {
              // Show results when user types something
              if (inSearchBar && searchTerm.length > 0) {
                setShowResults(true);
              }
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (inSearchBar && e.target.value.length > 0) {
                setShowResults(true);
              } else if (inSearchBar) {
                setShowResults(false);
              }
            }}
            placeholder={placeholder}
            className={`${styles.searchInput} ${inSearchBar ? styles.inSearchBarInput : ''}`}
            aria-label={placeholder}
            onFocus={() => {
              setIsFocused(true);
              if (inSearchBar && searchTerm.length > 0) {
                setShowResults(true);
              }
            }}
            onBlur={() => setIsFocused(false)}
            onClick={() => {
              if (inSearchBar && searchTerm.length > 0) {
                setShowResults(true);
              }
            }}
          />
          
          {/* Search Results Dropdown */}
          {inSearchBar && showResults && searchTerm.length > 0 && (
            <div className={styles.searchResultsDropdown}>
              {/* Always show these categories with the search term */}
              <div className={styles.searchResultItem} onClick={() => onSearchResultClick(searchTerm, 'people')}>
                <i className="bi bi-person-fill"></i>
                <span>{searchTerm} in People</span>
              </div>
              <div className={styles.searchResultItem} onClick={() => onSearchResultClick(searchTerm, 'projects')}>
                <i className="bi bi-folder-fill"></i>
                <span>{searchTerm} in Projects</span>
              </div>
              <div className={styles.searchResultItem} onClick={() => onSearchResultClick(searchTerm, 'certificates')}>
                <i className="bi bi-award-fill"></i>
                <span>{searchTerm} in Certificates</span>
              </div>
              <div className={styles.searchResultItem} onClick={() => onSearchResultClick(searchTerm, 'skills')}>
                <i className="bi bi-tag-fill"></i>
                <span>{searchTerm} in Skills</span>
              </div>
            </div>
          )}
        </div>
        
        {!inSearchBar && (
          <div className={styles.sortContainer}>
            {/* Optional custom buttons before the label */}
            {customButtons.map((button, index) => (
              <Button
                key={`custom-btn-${index}`}
                type="primary"
                icon={button.icon}
                onClick={button.onClick}
                className={button.className}
              >
                {button.label}
              </Button>
            ))}
            
            {/* Sort/Filter label */}
            {labelText && <h2 className={styles.sortLabel}>{labelText}</h2>}
            
            {/* Filter buttons */}
            {filterButtons.map((button, index) => {
              // Check if this is the compatibility button
              const isCompatibilityButton = 
                button.label === "Compatibility" || 
                button.label === "Compability";
              
              return (
                <Button
                  key={`filter-btn-${index}`}
                  type={button.type === 'primary' ? 'primary' : 'secondary'}
                  variant={isCompatibilityButton ? 'compatibility' : 'default'}
                  isActive={button.isActive}
                  onClick={button.onClick}
                  title={isCompatibilityButton ? "Toggle compatibility mode" : button.label}
                  className={button.badgeCount > 0 ? styles.buttonWithBadge : ''}
                >
                  {button.label}
                  {button.badgeCount > 0 && (
                    <span className={styles.filterBadge}>{button.badgeCount}</span>
                  )}
                </Button>
              );
            })}
            
            {/* View toggle button */}
            {viewToggle && setViewMode && (
              <Button 
                type="secondary"
                isToggle={true}
                toggleMode={viewMode}
                onToggle={(newMode) => {
                  // Get the current container based on view mode
                  const container = document.querySelector(`.${styles.gridContainer}`) || 
                                    document.querySelector(`.${styles.listContainer}`);
                  
                  // Apply fade out effect if container exists
                  if (container) {
                    container.style.opacity = '0';
                    container.style.transform = 'translateY(8px) scale(0.98)';
                    
                    // Change view mode after short delay for animation
                    setTimeout(() => {
                      setViewMode(newMode);
                      
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
                    setViewMode(newMode);
                  }
                }}
                title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
              />
            )}
          </div>
        )}
      </div>
      
      {/* Active Filters */}
      {!inSearchBar && hasActiveFilters && (
        <div className={styles.activeFiltersContainer}>
          <div className={styles.activeFiltersHeader}>
            <h3 className={styles.activeFiltersTitle}>Active Filters</h3>
            <Button 
              type="secondary" 
              onClick={onClearFilters}
              className={styles.clearAllButton}
            >
              Clear All
            </Button>
          </div>
          
          <div className={styles.activeFiltersList}>
            {Object.entries(activeFilters).map(([filterType, filterGroup]) => {
              if (!filterGroup || !filterGroup.values || filterGroup.values.length === 0) {
                return null;
              }
              
              return filterGroup.values.map((value, index) => (
                <div 
                  key={`${filterType}-${index}`} 
                  className={styles.activeFilterChip}
                  style={{ 
                    background: filterGroup.color || 'rgba(74, 158, 204, 0.2)',
                    borderColor: filterGroup.borderColor || 'rgba(74, 158, 204, 0.5)'
                  }}
                >
                  {filterGroup.label && (
                    <span className={styles.filterLabel}>{filterGroup.label}:</span>
                  )}
                  <span className={styles.filterValue}>{value}</span>
                  <button 
                    className={styles.removeFilterButton}
                    onClick={() => onRemoveFilter(filterType, value)}
                    aria-label={`Remove ${value} filter`}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;