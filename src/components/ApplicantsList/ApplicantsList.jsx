import React, { useState, useEffect, useRef } from 'react';
import ApplicantCard from '../shared/ApplicantCard';
import styles from './ApplicantsList.module.css';


/**
 * ApplicantsList component to display applicants in grid or list view
 * 
 * @param {Object} props
 * @param {Array} props.applicants - Array of applicant objects to display
 * @param {string} props.viewMode - 'grid' or 'list' display mode
 * @param {boolean} props.showCompatibility - Whether to show compatibility circle
 * @param {string} props.activeTab - Currently active tab
 * @param {boolean} props.isLoading - Whether the list is in loading state
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
  // Ref to track mount status
  const isMounted = useRef(false);
  // Local loading state for initial animation
  const [localLoading, setLocalLoading] = useState(true);
  // Ref to track container
  const containerRef = useRef(null);

  // Handle initial load animation
  useEffect(() => {
    // Set flag that component has mounted
    isMounted.current = true;
    
    // Initial loading state
    setLocalLoading(true);
    
    // Animate in after a delay on first mount
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setLocalLoading(false);
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = 'translateY(0)';
        }
      }
    }, 300);
    
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, []);
  
  // Handle tab changes, parent loading state, and view mode changes
  useEffect(() => {
    if (!isMounted.current) return;
    
    // Sync with parent loading state or when viewMode changes
    if (isLoading) {
      setLocalLoading(true);
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
        containerRef.current.style.transform = 'translateY(20px)';
      }
    } else {
      // Delay before showing
      const timer = setTimeout(() => {
        if (isMounted.current) {
          setLocalLoading(false);
          if (containerRef.current) {
            containerRef.current.style.opacity = '1';
            containerRef.current.style.transform = 'translateY(0)';
          }
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, activeTab, viewMode]);

  // If no applicants, show empty state
  if (applicants.length === 0) {
    return (
      <div className={styles.emptyApplicantsState}>
        <div className={styles.noApplicantsMessage}>
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
  const containerClass = viewMode === 'grid' ? styles.applicantsGrid : styles.applicantsList;

  // This forces the animations to reset when the container changes
  const containerKey = `container-${activeTab}-${viewMode}-${isLoading}`;

  return (
    <div 
      ref={containerRef}
      key={containerKey}
      className={containerClass}
      style={{ 
        opacity: 0, 
        transform: 'translateY(20px)',
        transition: 'opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      {applicants.map((applicant, index) => {
        // Calculate match percentage
        const matchPercentage = calculateMatchPercentage(applicant);
        
        // Calculate delay for staggered animation (50ms + 80ms per card for pop-up effect)
        const staggerDelay = `${50 + (index * 80)}ms`;
        
        // Force cards to always re-render when tab or filter changes
        const renderKey = `${applicant.id}-${activeTab}-${index}-${isLoading}`;
        
        return (
          <ApplicantCard
            key={renderKey}
            applicant={applicant}
            viewMode={viewMode}
            showCompatibility={showCompatibility}
            matchPercentage={matchPercentage}
            activeTab={activeTab}
            onViewRequest={onViewRequest}
            onViewReason={onViewReason}
            isLoading={localLoading}
            staggerDelay={staggerDelay}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default ApplicantsList;