import React from 'react';
import styles from './Tabs.module.css';

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <nav className={styles.profileTabs}>
      {tabs.map((tabName) => (
        <button
          key={tabName}
          className={`${styles.tab} ${activeTab === tabName ? styles.active : ''}`}
          onClick={() => onTabClick(tabName)}
        >
          {tabName}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;