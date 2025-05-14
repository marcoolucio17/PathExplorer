import React from 'react';
import styles from './CustomScrollbar.module.css';

const CustomScrollbar = ({ children, className = '', maxHeight = '100%', style = {}, fadeBackground = 'glass' }) => {
  const fadeClass = fadeBackground === 'transparent' ? styles.fadeBottomTransparent : styles.fadeBottom;
  
  return (
    <div 
      className={`${styles.scrollWrapper} ${className}`}
      style={{ maxHeight, ...style }}
    >
      <div className={styles.scrollContainer}>
        <div className={styles.scrollContent}>
          {children}
        </div>
      </div>
      <div className={fadeClass}></div>
    </div>
  );
};

export default CustomScrollbar;