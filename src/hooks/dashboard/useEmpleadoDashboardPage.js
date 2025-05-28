import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboardData from './useDashboardData';
import useListPage from '../useListPage';
import useModalControl from '../useModalControl';
import useToggleState from '../useToggleState';

/**
 * 
 * 
 * 
 * @returns {Object} Complete state and functions for the Employee Dashboard page
 */
export const useEmpleadoDashboardPage = () => {
  const navigate = useNavigate();
  
  //get dashboard data
  const dashboardData = useDashboardData();
  
  //employee-specific tab names
  const tabNames = ['All', 'Applied to'];
  
  // Modal controls
  const { 
    modals, 
    openModal, 
    closeModal, 
    toggleModal 
  } = useModalControl({
    skillsFilter: false
  });
  
  //toggle for compatibility view
  const { 
    state: showCompatibility,
    toggle: toggleCompatibility 
  } = useToggleState(false);
  
  //setup list page logic
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
    baseUrl: '/empleado/dashboard'
  });
  
  //override toggleViewMode because animation wasnt really workin
  const toggleViewMode = useCallback(() => {
    //toggle view mode
    listPage.toggleViewMode();
    
    //force animation refresh for 
    setTimeout(() => {
      //reset any placeholders
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
  
  //helper to toggle skills filter modal
  const toggleSkillsFilterModal = () => {
    toggleModal('skillsFilter');
  };
  
  //get filtered projects for the current tab
  const getTabProjects = () => {
    let filteredProjects;
    
    switch (listPage.activeTab) {
      case 'All':
        filteredProjects = dashboardData.projects;
        break;
      case 'Applied to':
        //projects where the user has applied to a role
        filteredProjects = dashboardData.projects.filter(project => 
          project.userHasApplied === true
        );
        break;
      default:
        filteredProjects = dashboardData.projects;
    }
    
    return dashboardData.sortProjects(filteredProjects, listPage.sortOption);
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
      return { 'All': 0, 'Applied to': 0 };
    }
    
    // Initial counts
    const counts = {
      'All': 0, 
      'Applied to': 0
    };
    
    counts['All'] = 0;
    
    const appliedToProjects = dashboardData.projects.filter(project => 
      project.userHasApplied === true
    );
    counts['Applied to'] = dashboardData.flattenProjectsForList(appliedToProjects).length;
    
    return counts;
  }, [dashboardData.projects, dashboardData.flattenProjectsForList]);

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
    getActiveFilters,
    handleRemoveFilter,
    handleClearFilters,
    toggleViewMode,
    tabCounts: correctedTabCounts
  };
};

export default useEmpleadoDashboardPage;