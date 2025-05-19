import React from 'react';
import Button from '../Button';
import styles from './ActiveFilters.module.css';

/**
 * ActiveFilters component that displays active filters with remove buttons
 * 
 * @param {Object} props
 * @param {Object} props.filters - Object containing filter groups (e.g., skills, projects)
 * @param {Function} props.onRemoveFilter - Function called when a filter is removed
 * @param {Function} props.onClearAll - Function called when clearing all filters
 * @param {Boolean} props.animated - Whether to animate the component (default: true)
 */
const ActiveFilters = ({ 
  filters = {}, 
  onRemoveFilter, 
  onClearAll,
  animated = true 
}) => {
  // Check if there are any active filters
  const hasFilters = Object.values(filters).some(
    filterGroup => filterGroup && filterGroup.values && filterGroup.values.length > 0
  );

  // If no filters are active, don't render anything
  if (!hasFilters) return null;

  return (
    <div className={`${styles.container} ${animated ? styles.animated : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Active Filters</h3>
        <Button 
          type="secondary" 
          onClick={onClearAll}
          className={styles.clearButton}
        >
          Clear All
        </Button>
      </div>
      
      <div className={styles.filtersList}>
        {Object.entries(filters).map(([filterType, filterGroup]) => {
          if (!filterGroup || !filterGroup.values || filterGroup.values.length === 0) {
            return null;
          }
          
          return filterGroup.values.map((value, index) => (
            <div 
              key={`${filterType}-${index}`} 
              className={styles.filterChip}
              style={{ 
                background: filterGroup.color || 'rgba(74, 158, 204, 0.2)',
                borderColor: filterGroup.borderColor || 'rgba(74, 158, 204, 0.5)'
              }}
            >
              {filterGroup.label && <span className={styles.filterLabel}>{filterGroup.label}:</span>}
              <span className={styles.filterValue}>{value}</span>
              <button 
                className={styles.removeButton}
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
  );
};

export default ActiveFilters;