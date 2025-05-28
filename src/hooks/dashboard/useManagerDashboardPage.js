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
 * @returns {Object} Complete state and functions for the Manager Dashboard page
 */
export const useManagerDashboardPage = () => {
  const navigate = useNavigate();
  
  //get dashboard data
  const dashboardData = useDashboardData();
  
  //manager-specific tab names
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
    baseUrl: '/manager/dashboard'
  });
  
  const toggleViewMode = useCallback(() => {
    listPage.toggleViewMode();
    
    setTimeout(() => {
      if (listPage.resetAnimation) {
        listPage.resetAnimation();
      }
      
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
    let filteredProjects;
    
    switch (listPage.activeTab) {
      case 'All':
        filteredProjects = dashboardData.projects;
        break;
      case 'Applied To':
        filteredProjects = dashboardData.projects.filter(project => 
          project.userHasApplied === true
        );
        break;
      case 'My Projects':
        filteredProjects = dashboardData.projects.filter(project => 
          project.managerId === dashboardData.currentUserId || project.ownerId === dashboardData.currentUserId
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
      return { 'All': 0, 'Applied To': 0, 'My Projects': 0 };
    }
    
    //initial counts
    const counts = {
      'All': 0,
      'Applied To': 0,
      'My Projects': 0
    };
    
    counts['All'] = 0;
    
    //applied To projects
    const appliedToProjects = dashboardData.projects.filter(project => 
      project.userHasApplied === true
    );
    counts['Applied To'] = dashboardData.flattenProjectsForList(appliedToProjects).length;
    
    //my Projects
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
    toggleViewMode,
    tabCounts: correctedTabCounts
  };
};

export default useManagerDashboardPage;