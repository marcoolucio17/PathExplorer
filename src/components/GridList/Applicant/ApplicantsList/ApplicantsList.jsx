import React from 'react';
import ApplicantCard from 'src/components/GridList/Applicant/ApplicantCard';
import styles from 'src/styles/GridList/GridListContainer.module.css';

/**
 * ApplicantsList component to display applicants in grid or list view
 * 
 * @param {Object} props
 * @param {Array} props.applicants - Array of applicant objects to display
 * @param {string} props.viewMode - 'grid' or 'list' display mode
 * @param {boolean} props.showCompatibility - Whether to show compatibility circle
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.calculateMatchPercentage - Function to calculate match percentage
 * @param {Function} props.onViewRequest - Function called when View Request button is clicked
 * @param {Function} props.onViewReason - Function called when View Reason button is clicked
 * @param {Function} props.onClearFilters - Function called when Clear Filters button is clicked
 */
const ApplicantsList = ({ 
  applicants, 
  viewMode, 
  showCompatibility, 
  activeTab,
  isLoading,
  calculateMatchPercentage,
  onViewRequest,
  onViewReason,
  onClearFilters
}) => {
  // If loading, show loader
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  // If no applicants, show empty state
  if (applicants.length === 0) {
    return (
      <div className={styles.emptyStateContainer}>
        <div className={styles.noItemsMessage}>
          <i className="bi bi-people" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
          <p>No {activeTab.toLowerCase()} applicants match your selected filters</p>
          <button 
            className={styles.clearFiltersButton}
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  // Container class based on viewMode
  const containerClass = viewMode === 'grid' ? styles.gridContainer : styles.listContainer;

  // Create a unique key for the container to force re-render and animation restart
  const containerKey = `container-${activeTab}-${viewMode}`;

  return (
    <div 
      key={containerKey}
      className={containerClass}
    >
      {applicants.map((applicant, index) => {
        // Calculate match percentage
        const matchPercentage = calculateMatchPercentage(applicant);
        
        // Force cards to always re-render when tab or filter changes with a unique key
        const renderKey = `${applicant.id}-${activeTab}-${index}`;
        
        return (
          <div key={renderKey} className={styles.item}>
            <ApplicantCard
              applicant={applicant}
              viewMode={viewMode}
              showCompatibility={showCompatibility}
              matchPercentage={matchPercentage}
              activeTab={activeTab}
              onViewRequest={onViewRequest}
              onViewReason={onViewReason}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ApplicantsList;