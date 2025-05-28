import { useState, useEffect, useMemo } from 'react';

/**
 * 
 * @param {Array} data - The complete data array
 * @param {Object} options - Configuration options for tabs
 * @returns {Object} - Tab state and filtered data
 */
const useTabbedData = (data = [], options = {}) => {
  const { defaultTab = 'Pending', tabNameField = 'status' } = options;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tabCounts, setTabCounts] = useState({});
  
  //get unique tab names from data
  const tabNames = useMemo(() => {
    if (!data || data.length === 0) {
      return ['Pending', 'In Review', 'Accepted', 'Denied']; 
    }
    
    const uniqueTabs = [...new Set(data.map(item => item[tabNameField]))];
    return uniqueTabs.length > 0 ? uniqueTabs : ['Pending', 'In Review', 'Accepted', 'Denied'];
  }, [data, tabNameField]);
  
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.filter(item => item[tabNameField] === activeTab);
  }, [data, activeTab, tabNameField]);
  
  //calculate counts
  useEffect(() => {
    if (!data || data.length === 0) {
      setTabCounts({});
      return;
    }
    
    const counts = {};
    
    tabNames.forEach(tab => {
      counts[tab] = 0;
    });
    

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