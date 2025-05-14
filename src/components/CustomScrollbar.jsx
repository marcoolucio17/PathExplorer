import React from 'react';
import styles from './CustomScrollbar.module.css';

const CustomScrollbar = ({ children, className = '', maxHeight = '100%', style = {} }) => {
  return (
    <div 
      className={`${styles.scrollContainer} ${className}`}
      style={{ maxHeight, ...style }}
    >
      <div className={styles.scrollContent}>
        {children}
      </div>
    </div>
  );
};

export default CustomScrollbar;