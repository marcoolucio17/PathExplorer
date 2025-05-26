import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for managing tabbed data with counts
 * @param {Array} data - The complete data array
 * @param {Object} options - Configuration options for tabs
 * @returns {Object} - Tab state and filtered data
 */
const useTabbedData = (data = [], options = {}) => {
  const { defaultTab = 'Pending', tabNameField = 'status' } = options;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tabCounts, setTabCounts] = useState({});
  
  // Get unique tab names from data
  const tabNames = useMemo(() => {
    if (!data || data.length === 0) {
      return ['Pending', 'In Review', 'Accepted', 'Denied']; // Default tabs
    }
    
    const uniqueTabs = [...new Set(data.map(item => item[tabNameField]))];
    return uniqueTabs.length > 0 ? uniqueTabs : ['Pending', 'In Review', 'Accepted', 'Denied'];
  }, [data, tabNameField]);
  
  // Apply filters based on active tab
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.filter(item => item[tabNameField] === activeTab);
  }, [data, activeTab, tabNameField]);
  
  // Calculate counts for each tab
  useEffect(() => {
    if (!data || data.length === 0) {
      setTabCounts({});
      return;
    }
    
    const counts = {};
    
    // Initialize all tabs with zero count
    tabNames.forEach(tab => {
      counts[tab] = 0;
    });
    
    // Count items for each tab
    data.forEach(item => {
      const tabValue = item[tabNameField];
      if (tabValue) {
        counts[tabValue] = (counts[tabValue] || 0) + 1;
      }
    });
    
    setTabCounts(counts);
  }, [data, tabNames, tabNameField]);
  
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };
  
  return {
    activeTab,
    setActiveTab: handleTabChange,
    tabCounts,
    filteredData,
    tabNames
  };
};

export default useTabbedData;