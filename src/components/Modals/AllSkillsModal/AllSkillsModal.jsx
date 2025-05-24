import React, { useState, useEffect } from 'react';
import modalStyles from 'src/styles/Modals/Modal.module.css';
import SkillChip from '../../SkillChip/SkillChip';
import CustomScrollbar from '../../CustomScrollbar';
import styles from './AllSkillsModal.module.css';

export const AllSkillsModal = ({ 
  isOpen, 
  onClose, 
  projectSkills = []
}) => {
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

  return (
    <div
      className={`${modalStyles.modalBackdrop} ${isClosing ? modalStyles.closing : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`${modalStyles.modalContent} ${isClosing ? modalStyles.closing : ''}`}
        style={{ maxWidth: '500px' }}
      >
        <button className={modalStyles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.title}>All Required Skills</h2>
          <p className={modalStyles.subtitle}>Complete list of skills for this project</p>
        </div>

        <div className={modalStyles.modalBody} style={{ height: 'calc(100% - 150px)' }}>
          <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
            <div className={styles.allSkillsContent}>
              <div className={styles.skillsGrid}>
                {projectSkills.map((skill, index) => (
                  <SkillChip 
                    key={index}
                    text={skill.name} 
                    isUserSkill={skill.isUserSkill} 
                  />
                ))}
              </div>
              
              {projectSkills.length === 0 && (
                <div className={styles.noSkillsMessage}>
                  <i className="bi bi-info-circle"></i>
                  <span>No skills required for this project</span>
                </div>
              )}
            </div>
          </CustomScrollbar>
        </div>
      </div>
    </div>
  );
};