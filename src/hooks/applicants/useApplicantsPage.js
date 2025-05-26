import { useState, useEffect } from 'react';
import useApplicantsData from './useApplicantsData';
import useListPage from '../useListPage';
import { sortApplicants } from '../../utils/sortApplicants';

/**
 * Main hook for the Applicants page, combining all functionality
 * 
 * @returns {Object} Complete state and functions for the Applicants page
 */
export const useApplicantsPage = () => {
  // Search term will be managed by the list page hook
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get applicant data
  const {
    applicants,
    setApplicants,
    projectOptions,
    skillOptions,
    calculateMatchPercentage,
    refreshMatchPercentages
  } = useApplicantsData(searchTerm);

  // Tab names for the page
  const tabNames = ['Pending', 'In Review', 'Accepted', 'Denied'];

  // Setup list page logic
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

  // Update search term when ListPage updates it
  useEffect(() => {
    setSearchTerm(listPage.searchTerm);
  }, [listPage.searchTerm]);

  // Compatibility effect - recalculate match percentages when enabled
  useEffect(() => {
    if (listPage.showCompatibility && !listPage.compatibilityLoading) {
      refreshMatchPercentages();
    }
  }, [listPage.showCompatibility, listPage.compatibilityLoading]);

  // Additional applicant-specific handlers
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

  // Generate active filters for header
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

  // Custom handler for viewing applicants with special handling for denied ones
  const handleViewApplicant = (applicantId) => {
    const applicant = applicants.find(app => app.id === applicantId);
    if (applicant && applicant.status === 'Denied') {
      listPage.setSelectedItem(applicant);
      listPage.openModal('denialReason');
    } else {
      listPage.handleViewItem(applicantId);
    }
  };

  // Provide a wrapper for calculate match percentage that includes showCompatibility
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
