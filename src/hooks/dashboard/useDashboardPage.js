import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboardData from './useDashboardData';
import useListPage from '../useListPage';
import useModalControl from '../useModalControl';
import useToggleState from '../useToggleState';

/**
 *
 * 
 * @returns {Object} Complete state and functions for the Dashboard page
 */
export const useDashboardPage = () => {
  const navigate = useNavigate();
  
  const dashboardData = useDashboardData();
  
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
  
  const toggleViewMode = useCallback(() => {
    // Toggle view mod
    listPage.toggleViewMode();
    
    setTimeout(() => {
      // Reset any placeholders immediately
      if (listPage.resetAnimation) {
        listPage.resetAnimation();
      }
      
      //trigger a full animation sequence after a short delay
      setTimeout(() => {
        if (listPage.triggerAnimationSequence) {
          listPage.triggerAnimationSequence();
        }
      }, 50);
    }, 50);
  }, [listPage]);
  
  const toggleSkillsFilterModal = () => {
    toggleModal('skillsFilter');
  };

  const handleViewApplicants = () => {
    navigate('/manager/applicants');
  };
  
  const getTabProjects = () => {
    return dashboardData.sortProjects(
      listPage.activeTab === 'All' 
        ? dashboardData.projects 
        : dashboardData.projects.filter(project => project.status === listPage.activeTab),
      listPage.sortOption
    );
  };
  
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
  
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'skills') {
      dashboardData.removeSkillFilter(value);
    }
  };
  
  const handleClearFilters = () => {
    dashboardData.clearAllSkillFilters();
    listPage.handleClearFilters();
  };
  
  
  const displayProjects = dashboardData.flattenProjectsForList(getTabProjects());
  
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
    
    //calculate flattened projects (roles) for each tab
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
    toggleViewMode,
    tabCounts: correctedTabCounts
  };
};

export default useDashboardPage;