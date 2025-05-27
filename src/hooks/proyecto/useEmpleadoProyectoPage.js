import { useState, useRef, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useModalControl from '../useModalControl';
import { useFetch } from 'src/hooks/useFetch';

/**
 * Helper function to determine if a skill is non-technical
 */
function isNonTechnicalSkill(skillName) {
  const nonTechnicalSkills = [
    'responsabilidad', 'comunicación', 'liderazgo', 'teamwork', 
    'leadership', 'communication', 'responsibility', 'agile',
    'scrum', 'project management', 'time management'
  ];
  return nonTechnicalSkills.some(skill => 
    skillName.toLowerCase().includes(skill.toLowerCase())
  );
}

/**
 * Transform backend project data to frontend format
 */
function transformBackendProject(projectData) {
  console.log('🔍 Transform called with:', projectData);
  
  if (!projectData) {
    console.log('❌ projectData is null/undefined');
    return null;
  }

  // Handle both array and object formats
  let project;
  if (Array.isArray(projectData)) {
    if (projectData.length === 0) {
      console.log('❌ projectData is empty array');
      return null;
    }
    project = projectData[0];
  } else {
    // projectData is already the project object
    project = projectData;
  }
  
  console.log('✅ Project object:', project);
  
  if (!project) {
    console.log('❌ project is undefined/null');
    return null;
  } 

  const requiredSkills = [];
  const availableRoles = [];
  let primaryRole = null;

  // Transform roles array (simple strings to objects)
  if (project.roles && Array.isArray(project.roles)) {
    project.roles.forEach((roleName, index) => {
      const roleObj = {
        id: index + 1,
        name: roleName,
        level: "",
        available: true,
      };

      if (index === 0) {
        primaryRole = roleObj;
      }

      availableRoles.push(roleObj);
    });
  }

  // Transform skills array (simple strings to objects)
  if (project.habilidades && Array.isArray(project.habilidades)) {
    project.habilidades.forEach((skillName) => {
      requiredSkills.push({
        name: skillName,
        isUserSkill: false,
        isTechnical: !isNonTechnicalSkill(skillName),
        roleId: null,
        experienceTime: null,
      });
    });
  }

  // Transform members array
  const members = [];
  if (project.miembros && Array.isArray(project.miembros)) {
    project.miembros.forEach((memberName, index) => {
      members.push({
        id: index + 1,
        name: memberName,
        avatar: '/img/fotogabo.jpg',
        role: availableRoles[0]?.name || 'Team Member',
      });
    });
  }

  return {
    id: project.idproyecto,
    title: project.pnombre,
    description: project.descripcion,
    startDate: formatDate(project.fechainicio),
    estimatedFinishDate: formatDate(project.fechafin),
    progress: calculateProgress(project.fechainicio, project.fechafin),
    goal: project.descripcion || "Project goal not specified",
    deliverables: project.projectdeliverables
      ? project.projectdeliverables.split(',').map((d) => d.trim())
      : extractDeliverables(project.descripcion),
    client: {
      name: project.cliente || "Unknown Client",
      logo: "/img/pepsi-logo.png",
    },
    primaryRole: primaryRole,
    people: [
      {
        id: 1,
        name: project.creador || "Project Creator",
        role: "Project Manager",
        avatar: "/img/fotogabo.jpg",
      },
    ],
    members: members,
    requiredSkills: removeDuplicateSkills(requiredSkills),
    availableRoles: availableRoles,
  };
}


/**
 * Helper function to format dates
 */
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // More robust check for invalid date
  return date.toLocaleDateString();
}

/**
 * Calculate project progress based on dates
 */
function calculateProgress(startDate, endDate) {
  if (!startDate || !endDate) return 67; // Default value

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 67; // Handle invalid dates

  if (now < start) return 0;
  if (now > end) return 100;

  const total = end.getTime() - start.getTime();
  if (total <= 0) return 100; // Avoid division by zero or negative duration if start > end
  const elapsed = now.getTime() - start.getTime();

  return Math.round((elapsed / total) * 100);
}

/**
 * Extract deliverables from description
 */
function extractDeliverables(description) {
  if (!description) return [
    "Project documentation",
    "Development deliverables",
    "Testing and validation",
    "Final deployment"
  ];

  // For now return default, you can enhance this later
  return [
    "Android & iOS mobile app",
    "Backend to manage user data & posts",
    "Secure database",
    "Admin web portal"
  ];
}

/**
 * Remove duplicate skills based on name
 */
function removeDuplicateSkills(skills) {
  const seen = new Set();
  return skills.filter(skill => {
    const skillName = skill.name; // Ensure we are checking a consistent property
    if (seen.has(skillName)) {
      return false;
    }
    seen.add(skillName);
    return true;
  });
}

/**
 * Check if user has specific skills
 */
function checkUserSkills(requiredSkills, userSkills) {
  const userSkillsSet = new Set(userSkills); // Optimize lookup
  return requiredSkills.map(skill => ({
    ...skill,
    isUserSkill: userSkillsSet.has(skill.name)
  }));
}

/**
 * Custom hook for EmpleadoProyectoPage
 * Manages all state and logic for the project details page
 */
const useEmpleadoProyectoPage = () => {
  // Get project ID from URL params
  const { projectId } = useParams();

  // API call to fetch project data
  const { data, error, loading } = useFetch(`projects?idproyecto=${projectId || '87'}`);

  // 🔍 DEBUG: Log everything from the API call
  console.log('🚀 ===== API CALL DEBUG =====');
  console.log('📍 Project ID:', projectId);
  console.log('🌐 API Endpoint:', `projects?idproyecto=${projectId || '87'}`);
  console.log('🌐 Full URL would be:', `https://pathexplorer-backend.onrender.com/api/projects?idproyecto=${projectId || '87'}`);
  console.log('📊 Loading state:', loading);
  console.log('❌ Error state:', error);
  console.log('📦 Raw data received:', data);
  console.log('📦 Data type:', typeof data);
  console.log('📦 Data is array?', Array.isArray(data));
  if (data && Array.isArray(data)) {
    console.log('📦 Data length:', data.length);
    console.log('📦 First item:', data[0]);
    if (data[0]) {
      console.log('📦 First item keys:', Object.keys(data[0]));
    }
  }
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    console.log('📦 Data keys:', Object.keys(data));
  }
  if (error) {
    console.log('❌ Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
  }
  console.log('🚀 ===== END API DEBUG =====');

  // Modal control
  const { modals, openModal, closeModal } = useModalControl([
    'skills',
    'compatibility',
    'application',
    'allSkills'
  ]);

  // Refs
  const peopleSectionRef = useRef(null);

  // State for project application
  const [isApplied, setIsApplied] = useState(false);
  const [isLoadingApplication, setIsLoadingApplication] = useState(false); // Renamed to avoid conflict with 'loading' from useFetch

  // Transform backend data to frontend format
  const projectData = useMemo(() => {
    return transformBackendProject(data);
  }, [data]);

  // User skills for compatibility calculation (you might want to fetch this from user profile later)
  const [userSkills] = useState([
    "Python",
    "C#",
    "Figma"
  ]);

  // Update required skills with user skill status
  const enhancedProjectData = useMemo(() => {
    if (!projectData) return null;

    return {
      ...projectData,
      requiredSkills: checkUserSkills(projectData.requiredSkills, userSkills)
    };
  }, [projectData, userSkills]);

  // Actions
  const handleShowApplication = useCallback(() => {
    openModal('application');
  }, [openModal]);

  const handleSubmitApplication = useCallback(async (applicationData) => {
    setIsLoadingApplication(true);
    try {
      // TODO: Replace with actual API call to submit application
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsApplied(true);
      closeModal('application');

      console.log('Application submitted:', {
        projectId: projectData?.id,
        ...applicationData
      });
    } catch (err) { // Changed 'error' to 'err' to avoid conflict with 'error' from useFetch
      console.error('Error submitting application:', err);
    } finally {
      setIsLoadingApplication(false);
    }
  }, [projectData?.id, closeModal]); // Added projectData?.id dependency

  const handleShowCompatibility = useCallback(() => {
    openModal('compatibility');
  }, [openModal]);

  const handleShowSkills = useCallback(() => {
    openModal('skills');
  }, [openModal]);

  const handleShowAllSkills = useCallback(() => {
    openModal('allSkills');
  }, [openModal]);

  const handleMemberSelect = useCallback((member) => {
    console.log('Selected member:', member);
    // TODO: Implement member selection logic (filter, view profile, etc.)
  }, []);
  
  // Calculate compatibility percentage
  const calculateCompatibilityPercentage = useCallback(() => {
    if (!enhancedProjectData?.requiredSkills || enhancedProjectData.requiredSkills.length === 0) {
      return 0;
    }

    const totalSkills = enhancedProjectData.requiredSkills.length;
    const userSkillsSet = new Set(userSkills); // Use the Set for efficient lookup
    const matchingSkills = enhancedProjectData.requiredSkills.filter(skill =>
      userSkillsSet.has(skill.name)
    ).length;

    return Math.round((matchingSkills / totalSkills) * 100);
  }, [enhancedProjectData?.requiredSkills, userSkills]);

  return {
    // Data
    projectData: enhancedProjectData,
    userSkills,

    // API state
    loading, // from useFetch
    error,   // from useFetch

    // State
    isApplied,
    isLoadingApplication, // Renamed state

    // Refs
    peopleSectionRef,

    // Modals
    modals,
    openModal,
    closeModal,

    // Actions
    handleShowApplication,
    handleSubmitApplication,
    handleShowCompatibility,
    handleShowSkills,
    handleShowAllSkills,
    handleMemberSelect,
    calculateCompatibilityPercentage,
  };
};

export default useEmpleadoProyectoPage;