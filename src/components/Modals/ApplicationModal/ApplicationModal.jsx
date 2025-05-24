import React, { useState, useEffect } from 'react';
import modalStyles from 'src/styles/Modals/Modal.module.css';
import styles from './ApplicationModal.module.css';
import CustomScrollbar from '../../CustomScrollbar';

export const ApplicationModal = ({ 
  isOpen, 
  onClose, 
  projectData,
  onSubmitApplication,
  isLoading = false
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Form state
  const [selectedRole, setSelectedRole] = useState('');
  const [referralEmployee, setReferralEmployee] = useState('');
  const [applicationReason, setApplicationReason] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      // Reset form
      setSelectedRole('');
      setReferralEmployee('');
      setApplicationReason('');
      setFormErrors({});
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!selectedRole.trim()) {
      errors.role = 'Please select a role';
    }
    
    if (!applicationReason.trim()) {
      errors.reason = 'Please provide a reason for applying';
    } else if (applicationReason.trim().length < 20) {
      errors.reason = 'Please provide at least 20 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const applicationData = {
      role: selectedRole,
      referral: referralEmployee || null,
      reason: applicationReason,
      timestamp: new Date().toISOString()
    };

    onSubmitApplication(applicationData);
  };

  const availableRoles = projectData?.availableRoles || [
    'Frontend Developer',
    'Backend Developer', 
    'UI/UX Designer',
    'Project Manager',
    'QA Engineer',
    'DevOps Engineer'
  ];

  return (
    <div
      className={`${modalStyles.modalBackdrop} ${isClosing ? modalStyles.closing : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`${modalStyles.modalContent} ${isClosing ? modalStyles.closing : ''}`}
        style={{ maxWidth: '600px' }}
      >
        <button className={modalStyles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.title}>Apply to {projectData?.title}</h2>
          <p className={modalStyles.subtitle}>Tell us about your interest in this project</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={modalStyles.modalBody} style={{ height: 'calc(100% - 200px)' }}>
            <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
              <div className={styles.applicationContent}>
                {/* Role Selection */}
                <div className={styles.formSection}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-person-badge"></i>
                    Role you're applying for *
                  </label>
                  <select 
                    className={`${styles.formSelect} ${formErrors.role ? styles.error : ''}`}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Select a role...</option>
                    {availableRoles.map((role, index) => (
                      <option key={index} value={role}>{role}</option>
                    ))}
                  </select>
                  {formErrors.role && (
                    <span className={styles.errorText}>{formErrors.role}</span>
                  )}
                </div>

                {/* Referral */}
                <div className={styles.formSection}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-people"></i>
                    Employee referral (optional)
                  </label>
                  <input 
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter employee name or email..."
                    value={referralEmployee}
                    onChange={(e) => setReferralEmployee(e.target.value)}
                  />
                  <span className={styles.helpText}>
                    If you were referred by a current employee, enter their name or email
                  </span>
                </div>

                {/* Application Reason */}
                <div className={styles.formSection}>
                  <label className={styles.formLabel}>
                    <i className="bi bi-chat-text"></i>
                    Why do you want to join this project? *
                  </label>
                  <textarea 
                    className={`${styles.formTextarea} ${formErrors.reason ? styles.error : ''}`}
                    placeholder="Explain why you're interested in this project, what you can contribute, and what you hope to learn..."
                    rows={6}
                    value={applicationReason}
                    onChange={(e) => setApplicationReason(e.target.value)}
                    maxLength={500}
                  />
                  <div className={styles.characterCount}>
                    {applicationReason.length} / 500 characters
                    {formErrors.reason && (
                      <span className={styles.errorText}>{formErrors.reason}</span>
                    )}
                  </div>
                </div>
              </div>
            </CustomScrollbar>
          </div>

          <div className={modalStyles.buttonGroup}>
            <button 
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className={modalStyles.cancelButton}
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className={modalStyles.saveButton}
            >
              {isLoading && <i className="bi bi-arrow-clockwise" style={{ animation: 'spin 1s linear infinite' }}></i>}
              {isLoading ? 'Submitting...' : 'Apply to Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};