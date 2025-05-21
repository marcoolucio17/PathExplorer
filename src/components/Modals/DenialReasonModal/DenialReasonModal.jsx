import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import CustomScrollbar from 'src/components/CustomScrollbar';
import ModalScrollbar from 'src/components/Modals/ModalScrollbar';

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
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} style={{ overflow: 'hidden' }}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Application Denied</h2>
          <p className={styles.subtitle}>Review the denial reason for this applicant</p>
        </div>

        <div className={styles.modalBody} style={{ height: 'calc(100% - 200px)' }}>
          {/* Applicant info section */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            marginBottom: '1rem' 
          }}>
            {applicant && (
              <>
                <img 
                  src={applicant.avatar} 
                  alt={`${applicant.name} avatar`} 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--purple-progress-1)'
                  }}
                />
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    margin: '0 0 0.5rem',
                    color: 'var(--text-main)',
                    fontFamily: 'Graphik Medium, sans-serif'
                  }}>{applicant.name}</h3>
                  <p style={{
                    fontSize: '0.95rem',
                    margin: 0,
                    color: 'var(--text-light)',
                    opacity: 0.8,
                    fontFamily: 'Graphik Light, sans-serif'
                  }}>{applicant.role}</p>
                </div>
              </>
            )}
          </div>

          {/* Reason section */}
          <div className={styles.mb3}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              margin: '0 0 0.5rem',
              color: 'var(--text-main)',
              fontFamily: 'Graphik Medium, sans-serif'
            }}>Denial Reason:</h4>
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
              padding: '1rem',
              color: 'var(--text-light)',
              fontFamily: 'Graphik Regular, sans-serif',
              maxHeight: '150px',
              overflow: 'auto'
            }}>
              <p>{reason}</p>
            </div>
          </div>

          {/* Appeal form or denied info */}
          {showAppealForm ? (
            <div className={styles.mb3}>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                margin: '0 0 0.5rem',
                color: 'var(--text-main)',
                fontFamily: 'Graphik Medium, sans-serif'
              }}>Appeal Reason:</h4>
              <textarea
                style={{
                  width: '100%',
                  height: '120px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  padding: '1rem',
                  color: 'var(--text-light)',
                  fontFamily: 'Graphik Regular, sans-serif',
                  resize: 'none'
                }}
                placeholder="Enter your reason for appealing this denial..."
                value={appealReason}
                onChange={(e) => setAppealReason(e.target.value)}
              />
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1.5rem',
              color: '#ff9494'
            }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <p style={{ margin: 0, fontFamily: 'Graphik Regular, sans-serif' }}>
                This applicant was denied on <span style={{ fontWeight: 600 }}>{applicant && applicant.lastActive}</span>
              </p>
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          {showAppealForm ? (
            <>
              <button 
                onClick={() => setShowAppealForm(false)} 
                className={styles.cancelButton}
              >
                Cancel Appeal
              </button>
              <button 
                onClick={handleSubmitAppeal} 
                className={styles.primaryButton}
                disabled={!appealReason.trim()}
              >
                <i className="bi bi-check-lg"></i>
                Submit Appeal
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleAccept} 
                className={styles.secondaryButton}
                style={{ 
                  background: 'rgba(50, 205, 50, 0.8)',
                  boxShadow: '0 4px 15px rgba(50, 205, 50, 0.3)'
                }}
              >
                <i className="bi bi-check-lg"></i>
                Accept Anyway
              </button>
              <button 
                onClick={handleAppealClick} 
                className={styles.primaryButton}
                style={{ 
                  background: 'rgba(255, 140, 0, 0.8)',
                  boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                }}
              >
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