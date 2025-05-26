import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboardData from './useDashboardData';
import useListPage from '../useListPage';
import useModalControl from '../useModalControl';
import useToggleState from '../useToggleState';

/**
 * Main hook for the Dashboard page, combining all functionality
 * 
 * @returns {Object} Complete state and functions for the Dashboard page
 */
export const useDashboardPage = () => {
  const navigate = useNavigate();
  
  // Get dashboard data
  const dashboardData = useDashboardData();
  
  // Tab names for the page
  const tabNames = ['Active', 'Upcoming', 'Completed', 'All'];
  
  // Modal controls
  const { 
    modals, 
    openModal, 
    closeModal, 
    toggleModal 
  } = useModalControl({
    skillsFilter: false
  });
  
  // Toggle for compatibility view
  const { 
    state: showCompatibility,
    toggle: toggleCompatibility 
  } = useToggleState(false);
  
  // Setup list page logic
  const listPage = useListPage({
    data: dashboardData.projects,
    defaultSortOption: 'date_desc',
    defaultViewMode: 'grid',
    tabConfig: { 
      defaultTab: 'Active', 
      tabNameField: 'status' 
    },
    filterConfig: {},
    sortFunction: dashboardData.sortProjects,
    baseUrl: '/manager/dashboard'
  });
  
  // Override toggleViewMode to ensure animation works consistently
  const toggleViewMode = useCallback(() => {
    // Toggle view mode using the original function
    listPage.toggleViewMode();
    
    // Force animation refresh for the newly displayed items
    setTimeout(() => {
      // Reset any placeholders immediately
      if (listPage.resetAnimation) {
        listPage.resetAnimation();
      }
      
      // Trigger a full animation sequence after a short delay
      setTimeout(() => {
        if (listPage.triggerAnimationSequence) {
          listPage.triggerAnimationSequence();
        }
      }, 50);
    }, 50);
  }, [listPage]);
  
  // Helper to toggle skills filter modal
  const toggleSkillsFilterModal = () => {
    toggleModal('skillsFilter');
  };
  
  // Navigate to applicants page
  const handleViewApplicants = () => {
    navigate('/manager/applicants');
  };
  
  // Get filtered projects for the current tab
  const getTabProjects = () => {
    return dashboardData.sortProjects(
      listPage.activeTab === 'All' 
        ? dashboardData.projects 
        : dashboardData.projects.filter(project => project.status === listPage.activeTab),
      listPage.sortOption
    );
  };
  
  // Generate active filters for header
  const getActiveFilters = () => {
    const filters = {};
    
    if (dashboardData.selectedSkillFilters.length > 0) {
      filters.skills = {
        label: 'Skill',
        values: dashboardData.selectedSkillFilters,
        color: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.5)'
      };
    }
    
    return filters;
  };
  
  // Handle removing a specific filter
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'skills') {
      dashboardData.removeSkillFilter(value);
    }
  };
  
  // Handle clear filters action
  const handleClearFilters = () => {
    dashboardData.clearAllSkillFilters();
    listPage.handleClearFilters();
  };
  
  // Compute flattened projects for display
  const displayProjects = dashboardData.flattenProjectsForList(getTabProjects());
  
  // Calculate correct tab counts based on flattened projects
  const correctedTabCounts = useMemo(() => {
    if (!dashboardData.projects || dashboardData.projects.length === 0) {
      return { 'Active': 0, 'Upcoming': 0, 'Completed': 0, 'All': 0 };
    }
    
    // Initial counts
    const counts = {
      'Active': 0,
      'Upcoming': 0,
      'Completed': 0,
      'All': 0
    };
    
    // Calculate flattened projects (roles) for each tab
    tabNames.forEach(tabName => {
      if (tabName === 'All') {
        // For "All" tab, count all flattened projects
        counts['All'] = dashboardData.flattenProjectsForList(dashboardData.projects).length;
      } else {
        // For specific tabs, count projects for that status
        const tabProjects = dashboardData.projects.filter(p => p.status === tabName);
        counts[tabName] = dashboardData.flattenProjectsForList(tabProjects).length;
      }
    });
    
    return counts;
  }, [dashboardData.projects, dashboardData.flattenProjectsForList, tabNames]);

  return {
    ...listPage,
    ...dashboardData,
    displayProjects,
    tabNames,
    showCompatibility,
    toggleCompatibility,
    modals,
    openModal,
    closeModal,
    toggleSkillsFilterModal,
    handleViewApplicants,
    getActiveFilters,
    handleRemoveFilter,
    handleClearFilters,
    // Override toggleViewMode with our custom implementation
    toggleViewMode,
    // Override tab counts with our corrected counts
    tabCounts: correctedTabCounts
  };
};

export default useDashboardPage;