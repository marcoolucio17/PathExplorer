import React from 'react';
import styles from './SkillList.module.css';

export const SkillList = ({ skills }) => {
  return (
    <ul className={styles.skillList}>
      {skills.map((skill, index) => (
        <li key={index} className={styles.skillItem}>
          <button className={styles.skillButton}>
            <i className={`${skill.iconClass} ${styles.skillIcon}`}></i>
            <span className={styles.skillText}>{skill.text}</span>
            <i className={`bi bi-chevron-right ${styles.chevronIcon}`}></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SkillList;