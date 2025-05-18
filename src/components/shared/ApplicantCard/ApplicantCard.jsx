import React from 'react';
import { GlassCard } from '../GlassCard';
import { ProgressCircle } from '../../ProgressCircle';
import styles from './ApplicantCard.module.css';

/**
 * ApplicantCard component for displaying applicant information in grid or list view
 * 
 * @param {Object} props
 * @param {Object} props.applicant - Applicant data
 * @param {string} props.viewMode - Display mode: 'grid' or 'list'
 * @param {boolean} props.showCompatibility - Whether to show compatibility circle
 * @param {number} props.matchPercentage - Compatibility match percentage
 * @param {string} props.activeTab - Current active tab
 * @param {Function} props.onViewRequest - Function called when View Request button is clicked
 * @param {Function} props.onViewReason - Function called when View Reason button is clicked
 * @param {boolean} props.isLoading - Whether the card is in loading state
 * @param {string} props.staggerDelay - CSS variable for staggered animation
 * @param {number} props.index - Index for one-by-one animation effect
 */
const ApplicantCard = ({
  applicant,
  viewMode,
  showCompatibility,
  matchPercentage,
  activeTab,
  onViewRequest,
  onViewReason,
  isLoading,
  staggerDelay,
  index = 0
}) => {
  // Calculate stagger delay based on index if not provided directly
  const finalStaggerDelay = staggerDelay || `${50 + (index * 80)}ms`;

  // Determine the class based on view mode and loading state
  const cardClass = viewMode === 'grid' 
    ? `${styles.applicantCard} ${isLoading ? styles.loading : styles.loaded}`
    : `${styles.applicantListItem} ${isLoading ? styles.loading : styles.loaded}`;
  
  // Common applicant content for both views
  const applicantContent = (
    <>
      {/* Show match percentage when enabled */}
      {showCompatibility && (
        <div className={styles.compatibilityCircle}>
          <ProgressCircle 
            value={matchPercentage}
            size={60} 
            strokeWidth={6}
            title="Match"
          />
        </div>
      )}
      
      <div className={styles.applicantHeader}>
        <img 
          className={styles.applicantAvatar} 
          src={applicant.avatar || "/img/default-avatar.png"} 
          alt={`${applicant.name} avatar`}
        />
        <div className={styles.applicantInfo}>
          <h3 className={styles.applicantName}>{applicant.name}</h3>
          <p className={styles.applicantRole}>{applicant.role}</p>
        </div>
      </div>
      
      <div className={styles.applicantDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-briefcase"></i> Experience:
          </span>
          <span className={styles.detailValue}>{applicant.experience}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-folder"></i> Applied for:
          </span>
          <span className={styles.detailValue}>{applicant.project}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-clock"></i> {activeTab === 'Pending' ? 'Applied:' : 
                                           activeTab === 'In Review' ? 'Requested:' :
                                           activeTab === 'Accepted' ? 'Accepted By:' :
                                           'Denied On:'}
          </span>
          <span className={styles.detailValue}>
            {activeTab === 'Accepted' ? 'Manager Name' : applicant.lastActive}
          </span>
        </div>
      </div>
      
      <div className={styles.applicantFooter}>
        {activeTab === 'Denied' ? (
          <div className={styles.deniedButtonsGroup}>
            <button 
              className={styles.viewReasonButton}
              onClick={() => onViewReason(applicant.id)}
            >
              <i className="bi bi-exclamation-circle"></i> View Reason
            </button>
            <button 
              className={styles.viewRequestButton}
              onClick={() => onViewRequest(applicant.id)}
            >
              <i className="bi bi-file-earmark-text"></i> View Request
            </button>
          </div>
        ) : (
          <button 
            className={styles.viewRequestButton}
            onClick={() => onViewRequest(applicant.id)}
          >
            <i className="bi bi-file-earmark-text"></i> View Request
          </button>
        )}
      </div>
    </>
  );
  
  // Grid view - wrap the content in a GlassCard
  if (viewMode === 'grid') {
    return (
      <GlassCard 
        className={cardClass}
        style={{ '--stagger-delay': finalStaggerDelay }}
      >
        {applicantContent}
      </GlassCard>
    );
  }
  
  // List view - custom layout for horizontal display
  return (
    <GlassCard 
      className={cardClass}
      style={{ '--stagger-delay': finalStaggerDelay }}
    >
      <div className={styles.applicantHeader}>
        <img 
          className={styles.applicantAvatar} 
          src={applicant.avatar || "/img/default-avatar.png"} 
          alt={`${applicant.name} avatar`}
        />
      </div>
      
      <div className={styles.applicantInfo}>
        <h3 className={styles.applicantName}>{applicant.name}</h3>
        <p className={styles.applicantRole}>{applicant.role}</p>
      </div>
      
      <div className={styles.applicantDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-briefcase"></i> Experience
          </span>
          <span className={styles.detailValue}>{applicant.experience}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-folder"></i> Project
          </span>
          <span className={styles.detailValue}>{applicant.project}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-clock"></i> {activeTab === 'Pending' ? 'Applied' : 
                                            activeTab === 'In Review' ? 'Requested' :
                                            activeTab === 'Accepted' ? 'Accepted By' :
                                            'Denied On'}
          </span>
          <span className={styles.detailValue}>
            {activeTab === 'Accepted' ? 'Manager Name' : applicant.lastActive}
          </span>
        </div>
      </div>
      
      <div className={styles.applicantFooter}>
        {activeTab === 'Denied' ? (
          <div className={styles.deniedButtonsGroup}>
            <button 
              className={styles.viewReasonButton}
              onClick={() => onViewReason(applicant.id)}
            >
              <i className="bi bi-exclamation-circle"></i> View Reason
            </button>
            <button 
              className={styles.viewRequestButton}
              onClick={() => onViewRequest(applicant.id)}
            >
              <i className="bi bi-file-earmark-text"></i> View Request
            </button>
          </div>
        ) : (
          <button 
            className={styles.viewRequestButton}
            onClick={() => onViewRequest(applicant.id)}
          >
            <i className="bi bi-file-earmark-text"></i> View Request
          </button>
        )}
      </div>
      
      {showCompatibility && (
        <div className={styles.compatibilityCircle}>
          <ProgressCircle 
            value={matchPercentage}
            size={60} 
            strokeWidth={6}
            title="Match"
          />
        </div>
      )}
    </GlassCard>
  );
};

export default ApplicantCard;