import React from 'react';
import styles from './SkillChip.module.css';

const SkillChip = ({ text, iconClass, isUserSkill, isExpandTag, onClick }) => {
  const chipClasses = [
    styles.skillChip,
    isUserSkill && styles.userSkill,
    isExpandTag && styles.expandTag
  ].filter(Boolean).join(' ');

  return (
    <button className={chipClasses} onClick={onClick}>
      {iconClass && <i className={iconClass} />}
      {text}
    </button>
  );
};

export default SkillChip;