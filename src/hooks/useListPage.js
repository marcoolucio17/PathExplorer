import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchParams from './useSearchParams';
import useAnimatedList from './useAnimatedList';
import useTabbedData from './useTabbedData';
import useFilters from './useFilters';
import useToggleState from './useToggleState';
import useModalControl from './useModalControl';

/**
 * 
 * 
 * @param {Object} options - Configuration options
 * @param {Array} options.data - The data array to display
 * @param {string} options.defaultSortOption - Default sort option
 * @param {string} options.defaultViewMode - Default view mode ('grid' or 'list')
 * @param {Object} options.tabConfig - Configuration for useTabbedData
 * @param {Object} options.filterConfig - Configuration for useFilters
 * @param {Function} options.sortFunction - Function to sort data
 * @param {string} options.baseUrl - Base URL for navigation
 * @param {string} options.itemIdField - Field name to use as item ID
 * @returns {Object} All page state and functions
 */
export const useListPage = ({
  data = [],
  defaultSortOption = 'date_desc',
  defaultViewMode = 'grid',
  tabConfig = {},
  filterConfig = {},
  sortFunction = null,
  baseUrl = '/',
  itemIdField = 'id'
}) => {
  const navigate = useNavigate();
  
  //view mode toggle
  const [viewMode, setViewMode] = useState(defaultViewMode);
  
  //sorting
  const [sortOption, setSortOption] = useState(defaultSortOption);
  
  //search
  const [searchTerm, setSearchTerm] = useSearchParams('');
  
  //tabs
  const {
    activeTab,
    setActiveTab,
    tabCounts,
    filteredData: tabFilteredData
  } = useTabbedData(data, tabConfig);
  
  //filters setup
  const filterResults = useFilters(tabFilteredData, { 
    searchTerm, 
    ...filterConfig 
  });
  
  const { filteredData: filteredByFilters, ...filterStates } = filterResults;
  
  //sort the filtered data
  const sortedData = useMemo(() => {
    return sortFunction ? sortFunction(filteredByFilters, sortOption) : filteredByFilters;
  }, [filteredByFilters, sortOption, sortFunction]);
  
  //animated list 
  const {
    isLoading,
    visibleItems,
    triggerAnimationSequence,
    setIsLoading
  } = useAnimatedList(sortedData, 80, 300);
  
  //toggle view mode with animation
  const toggleViewMode = useCallback(() => {
    setIsLoading(true);
    
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
    
    setTimeout(() => {
      triggerAnimationSequence();
    }, 50);
  }, [triggerAnimationSequence, setIsLoading]);
  
  //compatibility state
  const { 
    state: showCompatibility, 
    isLoading: compatibilityLoading, 
    toggle: toggleCompatibility 
  } = useToggleState(false, 1500);
  
  // Modal controls
  const { modals, openModal, closeModal } = useModalControl({
    skillsFilter: false,
    projectFilter: false,
    denialReason: false,
    details: false
  });
  
  //selected item for modals
  const [selectedItem, setSelectedItem] = useState(null);
  
  //animation trigger
  useEffect(() => {
    const timerId = setTimeout(() => {
      triggerAnimationSequence();
    }, 50);
    return () => clearTimeout(timerId);
  }, [filteredByFilters, sortOption, activeTab, triggerAnimationSequence]);
  
  //navigation functions
  const handleBack = () => {
    navigate(baseUrl || '/');
  };
  
  const handleViewItem = (itemId) => {
    const item = data.find(item => item[itemIdField] === itemId);
    if (item) {
      setSelectedItem(item);
      navigate(`${baseUrl}/${itemId}`);
    }
  };
  
  //filter clearing
  const handleClearFilters = () => {
    Object.entries(filterStates).forEach(([key, value]) => {
      if (typeof value === 'function' && key.startsWith('set')) {
        if (key === 'setSelectedSkills') {
          value([]);
        } else if (key === 'setSelectedProject') {
          value('All Projects');
        } else {
          value('');
        }
      }
    });
    
    setSearchTerm('');
  };
  
  return {
    // States
    viewMode,
    searchTerm,
    activeTab,
    tabCounts,
    sortOption,
    isLoading,
    visibleItems,
    selectedItem,
    modals,
    
    // Compatibility specific
    showCompatibility,
    compatibilityLoading,
    
    // Functions
    setViewMode,
    toggleViewMode,
    setSortOption,
    setSearchTerm,
    setActiveTab,
    openModal,
    closeModal,
    handleBack,
    handleViewItem,
    handleClearFilters,
    toggleCompatibility,
    
    // Filter states
    filterStates,
    
    // Modal helpers
    setSelectedItem
  };
};

export default useListPage;