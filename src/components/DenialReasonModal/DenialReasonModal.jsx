import React, { useState, useEffect } from 'react';
import styles from './DenialReasonModal.module.css';
import CustomScrollbar from '../CustomScrollbar';

export const DenialReasonModal = ({ isOpen, onClose, applicant, onAccept, onAppeal }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [appealReason, setAppealReason] = useState('');
  const [showAppealForm, setShowAppealForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      // Set a default reason - would be replaced with real data from the backend
      setReason("The applicant's experience level doesn't match the project requirements. The role requires a minimum of 5 years in React development, but the applicant only has 3 years. Additionally, the candidate is missing essential skills required for this position: TypeScript and GraphQL experience.");
    }
  }, [isOpen, applicant]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
      setShowAppealForm(false);
      setAppealReason('');
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleAccept = () => {
    onAccept(applicant);
    handleClose();
  };

  const handleAppealClick = () => {
    setShowAppealForm(true);
  };

  const handleSubmitAppeal = () => {
    onAppeal(applicant, appealReason);
    handleClose();
  };

  return (
    <div
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Application Denied</h2>
          <p className={styles.subtitle}>Review the denial reason for this applicant</p>
        </div>

        <div className={styles.applicantHeader}>
          {applicant && (
            <>
              <img 
                src={applicant.avatar} 
                alt={`${applicant.name} avatar`} 
                className={styles.applicantAvatar}
              />
              <div className={styles.applicantInfo}>
                <h3 className={styles.applicantName}>{applicant.name}</h3>
                <p className={styles.applicantRole}>{applicant.role}</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.reasonSection}>
          <h4 className={styles.reasonTitle}>Denial Reason:</h4>
          <div className={styles.reasonContent}>
            <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
              <p>{reason}</p>
            </CustomScrollbar>
          </div>
        </div>

        {showAppealForm ? (
          <div className={styles.appealFormSection}>
            <h4 className={styles.appealTitle}>Appeal Reason:</h4>
            <textarea
              className={styles.appealTextarea}
              placeholder="Enter your reason for appealing this denial..."
              value={appealReason}
              onChange={(e) => setAppealReason(e.target.value)}
            />
          </div>
        ) : (
          <div className={styles.deniedInfo}>
            <i className="bi bi-exclamation-triangle-fill"></i>
            <p>This applicant was denied on <span>{applicant && applicant.lastActive}</span></p>
          </div>
        )}

        <div className={styles.buttonGroup}>
          {showAppealForm ? (
            <>
              <button onClick={() => setShowAppealForm(false)} className={styles.cancelButton}>
                Cancel Appeal
              </button>
              <button 
                onClick={handleSubmitAppeal} 
                className={styles.saveButton}
                disabled={!appealReason.trim()}
              >
                <i className="bi bi-check-lg"></i>
                Submit Appeal
              </button>
            </>
          ) : (
            <>
              <button onClick={handleAccept} className={styles.acceptButton}>
                <i className="bi bi-check-lg"></i>
                Accept Anyway
              </button>
              <button onClick={handleAppealClick} className={styles.appealButton}>
                <i className="bi bi-arrow-clockwise"></i>
                Appeal Decision
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
