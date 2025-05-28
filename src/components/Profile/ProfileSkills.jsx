import React from "react";
import { GlassCard } from "../shared/GlassCard";
import { SkillChip } from "../SkillChip";
import CustomScrollbar from "../CustomScrollbar";
import styles from "./ProfileSkills.module.css";

/**
 * ProfileSkills componente
 * @param {Object} categorizedSkills - Object with hardSkills and softSkills arrays
 * @param {Function} onSkillsClick - Function to handle skills button click
 * @returns {JSX.Element}
 */
export const ProfileSkills = ({ categorizedSkills = { hardSkills: [], softSkills: [] }, onSkillsClick }) => {
  const { hardSkills, softSkills } = categorizedSkills;
  const hasNoSkills = hardSkills.length === 0 && softSkills.length === 0;

  return (
    <GlassCard className={styles.skillsCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Skills</h2>
        <button className={styles.sectionAddBtn} onClick={onSkillsClick}>
          <i className="bi bi-plus-lg" />
        </button>
      </div>
      <div className={styles.skillsScrollContainer}>
        <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
          <div className={styles.skillsContent}>
            {hasNoSkills ? (
              <div className={styles.placeholder}>
                <i className="bi bi-gear-wide-connected"></i>
                <p>No skills added yet</p>
                <span>Add your technical and soft skills to showcase your expertise</span>
              </div>
            ) : (
              <>
                {hardSkills.length > 0 && (
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryHeader}>Hard Skills</h3>
                    <div className={styles.divider}></div>
                    <div className={styles.skillChipsContainer}>
                      {hardSkills.map((skill, index) => (
                        <SkillChip key={`hard-${skill}-${index}`} text={skill} />
                      ))}
                    </div>
                  </div>
                )}
                
                {softSkills.length > 0 && (
                  <div className={styles.skillCategory}>
                    <h3 className={styles.categoryHeader}>Soft Skills</h3>
                    <div className={styles.divider}></div>
                    <div className={styles.skillChipsContainer}>
                      {softSkills.map((skill, index) => (
                        <SkillChip key={`soft-${skill}-${index}`} text={skill} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CustomScrollbar>
      </div>
    </GlassCard>
  );
};

export default ProfileSkills;