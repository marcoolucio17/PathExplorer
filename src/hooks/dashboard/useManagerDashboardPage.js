import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboardData from './useDashboardData';
import useListPage from '../useListPage';
import useModalControl from '../useModalControl';
import useToggleState from '../useToggleState';

/**
 * Manager-specific Dashboard hook
 * Tabs: "All", "Applied To", "My Projects"
 * 
 * @returns {Object} Complete state and functions for the Manager Dashboard page
 */
export const useManagerDashboardPage = () => {
  const navigate = useNavigate();
  
  // Get dashboard data
  const dashboardData = useDashboardData();
  
  // Manager-specific tab names
  const tabNames = ['All', 'Applied To', 'My Projects'];
  
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
      defaultTab: 'All', 
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
    let filteredProjects;
    
    switch (listPage.activeTab) {
      case 'All':
        filteredProjects = dashboardData.projects;
        break;
      case 'Applied To':
        // Projects where the user has applied to a role
        filteredProjects = dashboardData.projects.filter(project => 
          project.userHasApplied === true
        );
        break;
      case 'My Projects':
        // Projects managed/owned by the current user
        filteredProjects = dashboardData.projects.filter(project => 
          project.managerId === dashboardData.currentUserId || project.ownerId === dashboardData.currentUserId
        );
        break;
      default:
        filteredProjects = dashboardData.projects;
    }
    
    return dashboardData.sortProjects(filteredProjects, listPage.sortOption);
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
      return { 'All': 0, 'Applied To': 0, 'My Projects': 0 };
    }
    
    // Initial counts
    const counts = {
      'All': 0,
      'Applied To': 0,
      'My Projects': 0
    };
    
    // Calculate flattened projects (roles) for each tab
    // All projects - set to 0 to hide notification badge as requested
    counts['All'] = 0;
    
    // Applied To projects
    const appliedToProjects = dashboardData.projects.filter(project => 
      project.userHasApplied === true
    );
    counts['Applied To'] = dashboardData.flattenProjectsForList(appliedToProjects).length;
    
    // My Projects
    const myProjects = dashboardData.projects.filter(project => 
      project.managerId === dashboardData.currentUserId || project.ownerId === dashboardData.currentUserId
    );
    counts['My Projects'] = dashboardData.flattenProjectsForList(myProjects).length;
    
    return counts;
  }, [dashboardData.projects, dashboardData.flattenProjectsForList, dashboardData.currentUserId]);

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

export default useManagerDashboardPage;