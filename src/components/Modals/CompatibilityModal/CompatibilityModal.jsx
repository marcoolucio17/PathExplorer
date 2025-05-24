import React, { useState, useEffect } from 'react';
import modalStyles from 'src/styles/Modals/Modal.module.css';
import styles from './CompatibilityModal.module.css';
import SkillChip from '../../SkillChip/SkillChip';
import { ProgressCircle } from '../../ProgressCircle';
import CustomScrollbar from '../../CustomScrollbar';

export const CompatibilityModal = ({ 
  isOpen, 
  onClose, 
  projectSkills = [], 
  userSkills = [], 
  compatibilityPercentage = 0 
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

  const matchingSkills = projectSkills.filter(skill => 
    userSkills.includes(skill.name)
  );
  
  const missingSkills = projectSkills.filter(skill => 
    !userSkills.includes(skill.name)
  );

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
          <h2 className={modalStyles.title}>Project Compatibility</h2>
          <p className={modalStyles.subtitle}>Your skill match analysis</p>
        </div>

        <div className={modalStyles.modalBody} style={{ height: 'calc(100% - 200px)' }}>
          <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
            <div className={styles.compatibilityContent}>
              {/* Overall Compatibility Score */}
              <div className={styles.compatibilityScore}>
                <h3 className={styles.scoreTitle}>Your Compatibility Score</h3>
                <div className={styles.progressCircleWrapper}>
                  <ProgressCircle 
                    value={compatibilityPercentage}
                    maxValue={100}
                    size={120}
                    strokeWidth={10}
                    fontWeight="medium"
                  />
                </div>
                <p className={styles.scoreDescription}>
                  Based on matching skills with project requirements
                </p>
              </div>

              {/* Matching Skills */}
              {matchingSkills.length > 0 && (
                <div className={styles.skillsSection}>
                  <h4 className={styles.sectionTitle}>
                    <i className="bi bi-check-circle-fill"></i>
                    Skills You Have ({matchingSkills.length})
                  </h4>
                  <div className={styles.skillsList}>
                    {matchingSkills.map((skill, index) => (
                      <SkillChip 
                        key={index}
                        text={skill.name} 
                        isUserSkill={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {missingSkills.length > 0 && (
                <div className={styles.skillsSection}>
                  <h4 className={styles.sectionTitle}>
                    <i className="bi bi-exclamation-circle-fill"></i>
                    Skills to Develop ({missingSkills.length})
                  </h4>
                  <div className={styles.skillsList}>
                    {missingSkills.map((skill, index) => (
                      <SkillChip 
                        key={index}
                        text={skill.name} 
                        isUserSkill={false}
                      />
                    ))}
                  </div>
                  <p className={styles.missingSkillsNote}>
                    Consider developing these skills to improve your compatibility with similar projects.
                  </p>
                </div>
              )}

              {/* Recommendations */}
              <div className={styles.recommendations}>
                <h4 className={styles.sectionTitle}>
                  <i className="bi bi-lightbulb-fill"></i>
                  Recommendations
                </h4>
                {compatibilityPercentage >= 70 ? (
                  <p className={styles.recommendationGood}>
                    Great match! Your skills align well with this project's requirements. 
                    Consider applying to gain valuable experience.
                  </p>
                ) : compatibilityPercentage >= 50 ? (
                  <p className={styles.recommendationModerate}>
                    Moderate match. You could still contribute to this project while 
                    learning new skills along the way.
                  </p>
                ) : (
                  <p className={styles.recommendationLow}>
                    Lower compatibility, but don't let that discourage you! This could be 
                    a great learning opportunity to develop new skills.
                  </p>
                )}
              </div>
            </div>
          </CustomScrollbar>
        </div>

        <div className={modalStyles.buttonGroup}>
          <button onClick={handleClose} className={modalStyles.cancelButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};