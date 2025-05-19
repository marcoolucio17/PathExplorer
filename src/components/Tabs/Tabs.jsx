import React, { useRef, useEffect, useState } from 'react';
import styles from './Tabs.module.css';

/**
 * Tabs component with smooth animations, notification badges and customizable border style
 * 
 * @param {Array} tabs - Array of tab names or tab objects with format { name: 'TabName', notificationCount: 5 }
 * @param {string} activeTab - Currently active tab name
 * @param {function} onTabClick - Function called when tab is clicked
 * @param {React.ReactNode} actionButtons - Optional action buttons to display on the right
 * @param {string} borderStyle - Controls the tab border style: 'full' for full-width border or 'tab-only' for border only below the tabs area
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
  
  // Refs for the tabs to calculate indicator position
  const tabRefs = useRef([]);
  
  // State for indicator style
  const [indicatorStyle, setIndicatorStyle] = useState({});
  
  // Update indicator position when the active tab changes
  useEffect(() => {
    if (tabRefs.current.length === 0) return;
    
    const activeTabIndex = isObjectTabs
      ? tabs.findIndex(tab => tab.name === activeTab)
      : tabs.findIndex(tabName => tabName === activeTab);
    
    if (activeTabIndex === -1 || !tabRefs.current[activeTabIndex]) return;
    
    const activeTabElement = tabRefs.current[activeTabIndex];
    
    // Calculate position based on active tab
    const { offsetLeft, offsetWidth } = activeTabElement;
    
    setIndicatorStyle({
      left: `${offsetLeft}px`,
      width: `${offsetWidth}px`
    });
  }, [activeTab, tabs, isObjectTabs]);
  
  // Initialize refs array when tabs change
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);
  
  return (
    <div 
      className={styles.profileTabs}
      data-border-style={borderStyle}
    >
      <div className={styles.tabsContainer}>
        <div className={`${styles.tabList} ${borderStyle === 'tab-only' ? styles.borderBottom : ''}`}>
          {isObjectTabs 
            ? tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  ref={el => tabRefs.current[index] = el}
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
            : tabs.map((tabName, index) => (
                <button
                  key={tabName}
                  ref={el => tabRefs.current[index] = el}
                  className={`${styles.tab} ${activeTab === tabName ? styles.active : ''}`}
                  onClick={() => onTabClick(tabName)}
                >
                  <span className={styles.tabContent}>{tabName}</span>
                </button>
              ))
          }
          {/* Animated indicator */}
          <div className={styles.tabIndicator} style={indicatorStyle}></div>
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