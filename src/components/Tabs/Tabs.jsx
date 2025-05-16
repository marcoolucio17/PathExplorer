import React from 'react';
import styles from './Tabs.module.css';

const Tabs = ({ tabs, activeTab, onTabClick, actionButtons }) => {
  return (
    <nav className={styles.profileTabs}>
      <div className={styles.tabsContainer}>
        {tabs.map((tabName) => (
          <button
            key={tabName}
            className={`${styles.tab} ${activeTab === tabName ? styles.active : ''}`}
            onClick={() => onTabClick(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>
      {actionButtons && (
        <div className={styles.actionButtons}>
          {actionButtons}
        </div>
      )}
    </nav>
  );
};

export default Tabs;