import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ percentage }) => {
  return (
    <div className={styles.progressBarWrapper}>
      <p className={styles.progressLabel}>{percentage}% Complete</p>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;