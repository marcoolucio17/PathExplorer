import React from 'react';
import styles from './Tabs.module.css';

/**
 * Tabs component with optional notification badges
 * 
 * @param {Array} tabs - Array of tab names or tab objects with format { name: 'TabName', notificationCount: 5 }
 * @param {string} activeTab - Currently active tab name
 * @param {function} onTabClick - Function called when tab is clicked
 * @param {React.ReactNode} actionButtons - Optional action buttons to display on the right
 * @param {string} borderStyle - Controls the tab border style: 'full' (default) for full-width border or 'tab-only' for individual tabs
 */
const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabClick, 
  actionButtons,
  borderStyle = 'full' // Default to full-width border
}) => {
  // Check if tabs is an array of strings or objects
  const isObjectTabs = tabs.length > 0 && typeof tabs[0] === 'object';
  
  // Determine container class based on border style
  console.log('Tabs borderStyle:', borderStyle); // Debug log
  const containerClass = borderStyle === 'tab-only' 
    ? `${styles.tabsContainer} ${styles.tabOnlyBorder}`
    : styles.tabsContainer;

  return (
    <div className={styles.profileTabs}>
      <div className={containerClass}>
        <div className={styles.tabList}>
          {isObjectTabs 
            ? tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`${styles.tab} ${activeTab === tab.name ? styles.active : ''}`}
                  onClick={() => onTabClick(tab.name)}
                >
                  <span className={styles.tabContent}>
                    {tab.name}
                    {tab.notificationCount > 0 && (
                      <span className={styles.badgeNotif}>{tab.notificationCount}</span>
                    )}
                  </span>
                </button>
              ))
            : tabs.map((tabName) => (
                <button
                  key={tabName}
                  className={`${styles.tab} ${activeTab === tabName ? styles.active : ''}`}
                  onClick={() => onTabClick(tabName)}
                >
                  <span className={styles.tabContent}>{tabName}</span>
                </button>
              ))
          }
        </div>
        {actionButtons && (
          <div className={styles.actionButtons}>
            {actionButtons}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;