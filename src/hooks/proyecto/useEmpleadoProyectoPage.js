import { useState, useRef } from 'react';
import useModalControl from '../useModalControl';

/**
 * Custom hook for EmpleadoProyectoPage
 * Manages all state and logic for the project details page
 */
const useEmpleadoProyectoPage = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  // Project data - this will be easy to replace with API data
  const [projectData] = useState({
    id: 1,
    title: "Project Pepsi",
    startDate: "4/8/2025",
    estimatedFinishDate: "4/20/2025",
    progress: 67,
    goal: "Build a mobile app that acts like a social network for Pepsi customers — to share photos, connect, and stay updated.",
    deliverables: [
      "Android & iOS mobile app",
      "Backend to manage user data & posts",
      "Secure database",
      "Admin web portal"
    ],
    client: {
      name: "Pepsi Co.",
      logo: "/img/pepsi-logo.png"
    },
    people: [
      {
        id: 1,
        name: "Roberto Gomez",
        role: "Creador de Proyecto",
        avatar: "/img/fotogabo.jpg"
      },
      {
        id: 2,
        name: "Felicia Martina",
        role: "Project Manager",
        avatar: "/img/fotogabo.jpg"
      }
    ],
    members: [
      { id: 1, name: 'Gabriel Martinez', avatar: '/img/fotogabo.jpg', role: 'Frontend Developer' },
      { id: 2, name: 'Sofia Rodriguez', avatar: '/img/fotogabo.jpg', role: 'Backend Developer' },
      { id: 3, name: 'Carlos Hernandez', avatar: '/img/fotogabo.jpg', role: 'UI/UX Designer' },
    ],
    requiredSkills: [
      { name: "JavaScript", isUserSkill: true },
      { name: "C++", isUserSkill: false },
      { name: "Java", isUserSkill: false },
      { name: "AI", isUserSkill: false },
      { name: "Agile", isUserSkill: true },
      { name: "HR", isUserSkill: false },
      { name: "Figma", isUserSkill: true },
      { name: "Photoshop", isUserSkill: false },
    ],
    availableRoles: [
      'Frontend Developer',
      'Backend Developer', 
      'UI/UX Designer',
      'Project Manager',
      'QA Engineer',
      'DevOps Engineer'
    ]
  });

  // User skills for compatibility calculation
  const [userSkills] = useState([
    "JavaScript",
    "Agile", 
    "Figma"
  ]);

  // Actions
  const handleShowApplication = () => {
    openModal('application');
  };

  const handleSubmitApplication = async (applicationData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsApplied(true);
      closeModal('application');
      
      // TODO: Replace with actual API call
      console.log('Application submitted:', {
        projectId: projectData.id,
        ...applicationData
      });
    } catch (error) {
      console.error('Error submitting application:', error);
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

  const handleShowAllSkills = () => {
    openModal('allSkills');
  };

  const handleMemberSelect = (member) => {
    console.log('Selected member:', member);
    // TODO: Implement member selection logic (filter, view profile, etc.)
  };

  // Calculate compatibility percentage
  const calculateCompatibilityPercentage = () => {
    const totalSkills = projectData.requiredSkills.length;
    const matchingSkills = projectData.requiredSkills.filter(skill => 
      userSkills.includes(skill.name)
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