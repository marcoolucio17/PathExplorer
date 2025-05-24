import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchParams from './useSearchParams';
import useAnimatedList from './useAnimatedList';
import useTabbedData from './useTabbedData';
import useFilters from './useFilters';
import useToggleState from './useToggleState';
import useModalControl from './useModalControl';

/**
 * A hook that provides common list page functionality
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
  
  // View mode toggle
  const [viewMode, setViewMode] = useState(defaultViewMode);
  
  // Sorting
  const [sortOption, setSortOption] = useState(defaultSortOption);
  
  // Search
  const [searchTerm, setSearchTerm] = useSearchParams('');
  
  // Tab setup
  const {
    activeTab,
    setActiveTab,
    tabCounts,
    filteredData: tabFilteredData
  } = useTabbedData(data, tabConfig);
  
  // Filters setup
  const filterResults = useFilters(tabFilteredData, { 
    searchTerm, 
    ...filterConfig 
  });
  
  const { filteredData: filteredByFilters, ...filterStates } = filterResults;
  
  // Sort the filtered data
  const sortedData = useMemo(() => {
    return sortFunction ? sortFunction(filteredByFilters, sortOption) : filteredByFilters;
  }, [filteredByFilters, sortOption, sortFunction]);
  
  // Animated list 
  const {
    isLoading,
    visibleItems,
    triggerAnimationSequence,
    setIsLoading
  } = useAnimatedList(sortedData, 80, 300);
  
  // Toggle view mode with animation
  const toggleViewMode = useCallback(() => {
    // Set loading state first to trigger animation
    setIsLoading(true);
    
    // Toggle view mode
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
    
    // Trigger animation sequence with a short delay
    setTimeout(() => {
      triggerAnimationSequence();
    }, 50);
  }, [triggerAnimationSequence, setIsLoading]);
  
  // Compatibility state
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
  
  // Selected item for modals
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Animation trigger for tab/filter/sort changes
  useEffect(() => {
    const timerId = setTimeout(() => {
      triggerAnimationSequence();
    }, 50);
    return () => clearTimeout(timerId);
  }, [filteredByFilters, sortOption, activeTab, triggerAnimationSequence]);
  
  // Navigation functions
  const handleBack = () => {
    navigate(baseUrl || '/');
  };
  
  const handleViewItem = (itemId) => {
    // Custom view logic can be added here
    const item = data.find(item => item[itemIdField] === itemId);
    if (item) {
      setSelectedItem(item);
      navigate(`${baseUrl}/${itemId}`);
    }
  };
  
  // Filter clearing
  const handleClearFilters = () => {
    // Reset all filter states
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