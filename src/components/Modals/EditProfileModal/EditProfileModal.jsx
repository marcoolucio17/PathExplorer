import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import modalStyles from './EditProfileModal.module.css';

export const EditProfileModal = ({ isOpen, onClose, onEditSection }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
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

  const handleSectionClick = (section) => {
    if (onEditSection) {
      onEditSection(section);
    }
    handleClose();
  };

  const editSections = [
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Edit email, phone, LinkedIn, and GitHub profiles',
      icon: 'bi-person-lines-fill',
      color: 'var(--purple-progress-1)'
    },
    {
      id: 'experience',
      title: 'Work Experience',
      description: 'Add, edit, or remove work experience entries',
      icon: 'bi-briefcase-fill',
      color: 'var(--blue-progress-1)'
    },
    {
      id: 'objectives',
      title: 'Career Objectives',
      description: 'Manage your professional goals and targets',
      icon: 'bi-bullseye',
      color: 'var(--green-progress-1)'
    },
    {
      id: 'profile',
      title: 'Profile Details',
      description: 'Update name, title, company, location, and profile picture',
      icon: 'bi-card-heading',
      color: 'var(--orange-progress-1)'
    }
  ];

  return (
    <div 
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} style={{ maxWidth: '500px' }}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Edit Profile</h2>
          <p className={styles.subtitle}>Choose which section you'd like to edit</p>
        </div>

        <div className={styles.modalBody}>
          <div className={modalStyles.sectionsGrid}>
            {editSections.map((section) => (
              <button
                key={section.id}
                className={modalStyles.sectionCard}
                onClick={() => handleSectionClick(section.id)}
              >
                <div 
                  className={modalStyles.sectionIcon}
                  style={{ backgroundColor: section.color }}
                >
                  <i className={section.icon}></i>
                </div>
                <div className={modalStyles.sectionContent}>
                  <h3 className={modalStyles.sectionTitle}>{section.title}</h3>
                  <p className={modalStyles.sectionDescription}>{section.description}</p>
                </div>
                <div className={modalStyles.sectionArrow}>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleClose} className={styles.cancelButton}>
            <i className="bi bi-x-lg"></i>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};