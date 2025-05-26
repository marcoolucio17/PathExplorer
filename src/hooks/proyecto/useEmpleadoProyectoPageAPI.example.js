import { useState, useRef, useEffect } from 'react';
import useModalControl from '../useModalControl';

/**
 * EXAMPLE: API-integrated version of useEmpleadoProyectoPage
 * This shows how to replace the hardcoded data with API calls
 */
const useEmpleadoProyectoPageAPI = (projectId) => {
  // Modal control
  const { modals, openModal, closeModal } = useModalControl([
    'skills',
    'compatibility'
  ]);

  // Refs
  const peopleSectionRef = useRef(null);

  // State for project application
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  // API-driven state
  const [projectData, setProjectData] = useState(null);
  const [userSkills, setUserSkills] = useState([]);

  // Fetch project data from API
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsDataLoading(true);
        
        // Replace with your actual API calls
        const [projectResponse, userSkillsResponse, applicationStatusResponse] = await Promise.all([
          api.getProject(projectId),
          api.getUserSkills(),
          api.checkApplicationStatus(projectId)
        ]);
        
        // Transform skills to include isUserSkill property
        const enrichedSkills = projectResponse.requiredSkills.map(skill => ({
          ...skill,
          isUserSkill: userSkillsResponse.some(userSkill => userSkill.name === skill.name)
        }));
        
        setProjectData({
          ...projectResponse,
          requiredSkills: enrichedSkills
        });
        setUserSkills(userSkillsResponse);
        setIsApplied(applicationStatusResponse.hasApplied);
        
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError(err.message);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  // API-integrated actions
  const handleApplyToProject = async () => {
    setIsLoading(true);
    try {
      await api.applyToProject(projectData.id);
      setIsApplied(true);
      
      // Optional: Show success notification
      // notificationService.showSuccess('Application submitted successfully!');
      
    } catch (error) {
      console.error('Error applying to project:', error);
      setError('Failed to submit application. Please try again.');
      
      // Optional: Show error notification
      // notificationService.showError('Failed to submit application. Please try again.');
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowCompatibility = () => {
    openModal('compatibility');
  };

  const handleShowSkills = () => {
    openModal('skills');
  };

  // Calculate compatibility percentage
  const calculateCompatibilityPercentage = () => {
    if (!projectData?.requiredSkills?.length || !userSkills?.length) return 0;
    
    const totalSkills = projectData.requiredSkills.length;
    const matchingSkills = projectData.requiredSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.name === skill.name)
    ).length;
    
    return totalSkills > 0 ? Math.round((matchingSkills / totalSkills) * 100) : 0;
  };

  return {
    // Data
    projectData,
    userSkills,
    
    // State
    isApplied,
    isLoading,
    isDataLoading,
    error,
    
    // Refs
    peopleSectionRef,
    
    // Modals
    modals,
    openModal,
    closeModal,
    
    // Actions
    handleApplyToProject,
    handleShowCompatibility,
    handleShowSkills,
    calculateCompatibilityPercentage,
  };
};

// Example API service (replace with your actual API implementation)
const api = {
  async getProject(projectId) {
    const response = await fetch(`/api/projects/${projectId}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },
  
  async getUserSkills() {
    const response = await fetch('/api/user/skills');
    if (!response.ok) throw new Error('Failed to fetch user skills');
    return response.json();
  },
  
  async checkApplicationStatus(projectId) {
    const response = await fetch(`/api/projects/${projectId}/application-status`);
    if (!response.ok) throw new Error('Failed to check application status');
    return response.json();
  },
  
  async applyToProject(projectId) {
    const response = await fetch(`/api/projects/${projectId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId,
        appliedAt: new Date().toISOString()
      })
    });
    
    if (!response.ok) throw new Error('Failed to apply to project');
    return response.json();
  }
};

export default useEmpleadoProyectoPageAPI;