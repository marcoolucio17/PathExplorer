import React, { useState, useEffect, useRef } from "react";
import Button from "../shared/Button";
import styles from "./SearchHeader.module.css";

//custom icon components
const PeopleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.customIcon} viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.customIcon} viewBox="0 0 16 16">
    <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/>
  </svg>
);

const CertificatesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.customIcon} viewBox="0 0 16 16">
    <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
  </svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.customIcon} viewBox="0 0 16 16">
    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
  </svg>
);

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
 * @param {boolean} props.inSearchBar - Parameter to indicate if this is being used in the search bar (affects styling)
 * @param {Function} props.onSearchResultClick - Function to call when a search result is clicked
 * @param {Array} props.searchCategories - Array of search categories with their icons and labels
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
  onSearchResultClick,
  searchCategories = [
    { key: 'people', label: 'People', icon: 'people' },
    { key: 'projects', label: 'Projects', icon: 'projects' },
    { key: 'certificates', label: 'Certificates', icon: 'certificates' },
    { key: 'skills', label: 'Skills', icon: 'skills' }
  ]
}) => {
  //state to track input focus
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);
  
  //check if there are any active filters
  const hasActiveFilters = activeFilters && 
    Object.values(activeFilters).some(
      filterGroup => filterGroup && filterGroup.values && filterGroup.values.length > 0
    );

  //check if search term exists and immediately show results
  useEffect(() => {
    if (inSearchBar && searchTerm && searchTerm.length > 0) {
      setShowResults(true);
    } else if (inSearchBar) {
      setShowResults(false);
    }
  }, [searchTerm, inSearchBar]);

  //handle click outside to close dropdown
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

  //function to render the appropriate icon
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'people':
        return <PeopleIcon />;
      case 'projects':
        return <ProjectsIcon />;
      case 'certificates':
        return <CertificatesIcon />;
      case 'skills':
        return <SkillsIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.searchHeaderWrapper} ${inSearchBar ? styles.inSearchBar : ''}`}>
      <div className={`${styles.searchHeader} ${inSearchBar ? styles.inSearchBarHeader : ''}`}>
        <div 
          className={`${styles.searchContainer} ${isFocused ? styles.searchContainerFocused : ''} ${inSearchBar ? styles.inSearchBarContainer : ''}`}
          style={{
            width: inSearchBar ? (isFocused ? '350px' : '280px') : (isFocused ? '300px' : '250px')
          }}
          ref={dropdownRef}
        >
          <i className={`bi bi-search ${inSearchBar ? styles.searchIconNavbar : ''}`}></i>
          <input
            type="text"
            value={searchTerm}
            name={searchName}
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
            onKeyUp={(e) => {
              if (inSearchBar && searchTerm.length > 0) {
                setShowResults(true);
              }
            }}
          />
          
          {/* Search Results Dropdown */}
          {inSearchBar && showResults && searchTerm.length > 0 && (
            <div className={styles.searchResultsDropdown}>
              {/* Dynamically render search categories */}
              {searchCategories.map((category) => (
                <div 
                  key={category.key}
                  className={styles.searchResultItem} 
                  onClick={() => onSearchResultClick(searchTerm, category.key)}
                >
                  <div className={styles.iconWrapper}>
                    {renderIcon(category.icon)}
                  </div>
                  <span>{searchTerm} in {category.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {!inSearchBar && (
          <div className={styles.sortContainer}>
            {/* Custom buttons with dropdown support */}
            {customButtons.map((button, index) => (
              <Button
                key={`custom-btn-${index}`}
                type={button.type || "primary"}
                icon={button.icon}
                onClick={button.onClick}
                className={button.className}
                hasDropdown={button.hasDropdown}
                dropdownItems={button.dropdownItems}
                onDropdownItemClick={button.onDropdownItemClick}
                isFilterButton={button.isFilterButton}
              >
                {button.label}
              </Button>
            ))}
            
            {/* Sort/Filter label */}
            {labelText && <h2 className={styles.sortLabel}>{labelText}</h2>}
            
            {/* Filter buttons */}
            {filterButtons.map((button, index) => {
              const isCompatibilityButton = 
                button.label === "Compatibility" || 
                button.label === "Compability";
              
              return (
                <Button
                  key={`filter-btn-${index}`}
                  type={button.type === 'primary' ? 'primary' : 'secondary'}
                  variant={isCompatibilityButton ? 'compatibility' : 'default'}
                  isActive={button.isActive}
                  isLoading={button.isLoading}
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
                  const container = document.querySelector(`.${styles.gridContainer}`) || 
                                    document.querySelector(`.${styles.listContainer}`);
                  

                  if (container) {
                    container.style.opacity = '0';
                    container.style.transform = 'translateY(8px) scale(0.98)';
                    
                    //  view mode after short delay for animation
                    setTimeout(() => {
                      setViewMode(newMode);
                      

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
          <span className={styles.activeFiltersLabel}>Active filters:</span>
          <div className={styles.activeFiltersList}>
            {Object.entries(activeFilters).map(([filterType, filterGroup]) => {
              if (!filterGroup || !filterGroup.values || filterGroup.values.length === 0) {
                return null;
              }
              
              return filterGroup.values.map((value, index) => (
                <div 
                  key={`${filterType}-${index}`} 
                  className={styles.activeFilterItem}
                >
                  <span className={styles.filterType}>{filterGroup.label}:</span>
                  {value}
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
          <button 
            className={styles.clearAllButton}
            onClick={onClearFilters}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;