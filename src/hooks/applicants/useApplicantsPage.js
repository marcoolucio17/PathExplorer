import { useState, useEffect } from 'react';
import useApplicantsData from './useApplicantsData';
import useListPage from '../useListPage';
import { sortApplicants } from '../../utils/sortApplicants';

/**
 * 
 * 
 * @returns {Object} Complete state and functions for the Applicants page
 */
export const useApplicantsPage = () => {
  //search term will be managed by the list page hook
  const [searchTerm, setSearchTerm] = useState('');
  
  //get applicant data
  const {
    applicants,
    setApplicants,
    projectOptions,
    skillOptions,
    calculateMatchPercentage,
    refreshMatchPercentages
  } = useApplicantsData(searchTerm);

  //tab names for the page
  const tabNames = ['Pending', 'In Review', 'Accepted', 'Denied'];

  //setup list page logic
  const listPage = useListPage({
    data: applicants,
    defaultSortOption: 'date_desc',
    defaultViewMode: 'grid',
    tabConfig: { 
      defaultTab: 'Pending', 
      tabNameField: 'status' 
    },
    filterConfig: { 
      skillsField: 'skills', 
      projectField: 'project' 
    },
    sortFunction: sortApplicants,
    baseUrl: '/manager/dashboard'
  });

  //update search term when ListPage updates it
  useEffect(() => {
    setSearchTerm(listPage.searchTerm);
  }, [listPage.searchTerm]);

  //compatibility effect
  useEffect(() => {
    if (listPage.showCompatibility && !listPage.compatibilityLoading) {
      refreshMatchPercentages();
    }
  }, [listPage.showCompatibility, listPage.compatibilityLoading]);

  //additional applicant-specific handlers
  const handleAcceptDeniedApplicant = (applicant) => {
    setApplicants(prevApplicants => 
      prevApplicants.map(app => 
        app.id === applicant.id ? { ...app, status: 'In Review' } : app
      )
    );
    listPage.closeModal('denialReason');
  };
  
  const handleAppealDeniedApplicant = (applicant, appealReason) => {
    console.log(`Appeal submitted for ${applicant.name}: ${appealReason}`);
    listPage.closeModal('denialReason');
  };

  //generate active filters for header
  const getActiveFilters = () => {
    const filters = {};
    
    const { selectedProject, selectedSkills } = listPage.filterStates;
    
    if (selectedProject && selectedProject !== 'All Projects') {
      filters.projects = {
        label: 'Project',
        values: [selectedProject],
        color: 'rgba(74, 158, 204, 0.2)',
        borderColor: 'rgba(74, 158, 204, 0.5)'
      };
    }
    
    if (selectedSkills && selectedSkills.length > 0) {
      filters.skills = {
        label: 'Skill',
        values: selectedSkills,
        color: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.5)'
      };
    }
    
    return filters;
  };

  //custom handler for viewing applicants with special handling for denied ones
  const handleViewApplicant = (applicantId) => {
    const applicant = applicants.find(app => app.id === applicantId);
    if (applicant && applicant.status === 'Denied') {
      listPage.setSelectedItem(applicant);
      listPage.openModal('denialReason');
    } else {
      listPage.handleViewItem(applicantId);
    }
  };

  //a wrapper for calculate match percentage that includes showCompatibility
  const calculateApplicantMatchPercentage = (applicant) => {
    return calculateMatchPercentage(applicant, listPage.showCompatibility);
  };

  return {
    ...listPage,
    projectOptions,
    skillOptions,
    calculateMatchPercentage: calculateApplicantMatchPercentage,
    handleAcceptDeniedApplicant,
    handleAppealDeniedApplicant,
    getActiveFilters,
    handleViewApplicant,
    tabNames
  };
};

export default useApplicantsPage;
