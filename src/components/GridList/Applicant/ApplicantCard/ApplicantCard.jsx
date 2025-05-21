import React from 'react';
import { GlassCard } from 'src/components/shared/GlassCard';
import { ProgressCircle } from 'src/components/ProgressCircle';
import styles from 'src/styles/GridList/GridListCard.module.css';
import Button from 'src/components/shared/Button';

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
 */
const ApplicantCard = ({
  applicant,
  viewMode,
  showCompatibility,
  matchPercentage,
  activeTab,
  onViewRequest,
  onViewReason
}) => {
  // Determine the class based on view mode
  const cardClass = viewMode === 'grid' 
    ? styles.cardGrid
    : styles.cardList;
  
  // Common applicant content for both views
  const applicantContent = (
    <>
      {/* Show match percentage when enabled */}
      {showCompatibility && (
        <div className={styles.statusCircle}>
          <ProgressCircle 
            value={matchPercentage}
            size={60}
            fontSize="1.1rem" 
            strokeWidth={6}
            fontWeight="light"
          />
        </div>
      )}
      
      <div className={styles.cardHeader}>
        <img 
          className={styles.cardAvatar} 
          src={applicant.avatar || "/img/default-avatar.png"} 
          alt={`${applicant.name} avatar`}
        />
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{applicant.name}</h3>
          <p className={styles.cardSubtitle}>{applicant.role}</p>
        </div>
      </div>
      
      <div className={styles.cardDetails}>
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
      
      <div className={styles.cardFooter}>
      {activeTab === 'Denied' ? (
          <div className={styles.buttonGroup}>
            <Button 
              type="secondary"
              variant="alert"
              icon="bi-exclamation-circle"
              onClick={() => onViewReason(applicant.id)}
            >
              View Reason
            </Button>
            <Button 
              type="secondary"
              variant="view"
              icon="bi-file-earmark-text"
              onClick={() => onViewRequest(applicant.id)}
            >
              View Request
            </Button>
          </div>
        ) : (
          <Button 
              type="secondary"
              variant="view"
              icon="bi-file-earmark-text"
              onClick={() => onViewRequest(applicant.id)}
            >
              View Request
            </Button>
        )}
      </div>
    </>
  );
  
  // Grid view - wrap the content in a GlassCard
  if (viewMode === 'grid') {
    return (
      <GlassCard className={cardClass}>
        {applicantContent}
      </GlassCard>
    );
  }
  
  // List view - custom layout for horizontal display
  return (
    <GlassCard className={cardClass}>
      <div className={styles.cardHeader}>
        <img 
          className={styles.cardAvatar} 
          src={applicant.avatar || "/img/default-avatar.png"} 
          alt={`${applicant.name} avatar`}
        />
      </div>
      
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{applicant.name}</h3>
        <p className={styles.cardSubtitle}>{applicant.role}</p>
      </div>
      
      <div className={styles.cardDetails}>
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
      
      <div className={styles.cardFooter}>
        {activeTab === 'Denied' ? (
          <div className={styles.buttonGroup}>
            <Button 
              type="secondary"
              variant="alert"
              icon="bi-exclamation-circle"
              onClick={() => onViewReason(applicant.id)}
            >
              View Reason
            </Button>
            <Button 
              type="secondary"
              variant="view"
              icon="bi-file-earmark-text"
              onClick={() => onViewRequest(applicant.id)}
            >
              View Request
            </Button>
          </div>
        ) : (
          <Button 
              type="secondary"
              variant="view"
              icon="bi-file-earmark-text"
              onClick={() => onViewRequest(applicant.id)}
            >
              View Request
            </Button>
        )}
      </div>
      
      {showCompatibility && (
        <div className={styles.statusCircle}>
          <ProgressCircle 
            value={matchPercentage}
            size={60} 
            strokeWidth={6}
            fontSize="1rem"
            fontWeight="light"
          />
        </div>
      )}
    </GlassCard>
  );
};

export default ApplicantCard;