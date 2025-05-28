import { useState, useRef, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useModalControl from '../useModalControl';
import { useFetch } from 'src/hooks/useFetch';


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


function transformBackendProject(projectData) {
  
  
  if (!projectData) {
    console.log('projectData is not being sent or has nothing');
    return null;
  }

  let project;
  if (Array.isArray(projectData)) {
    if (projectData.length === 0) {

      return null;
    }
    project = projectData[0];
  } else {
    // projectData is already the project object
    project = projectData;
  }

  const requiredSkills = [];
  const availableRoles = [];
  let primaryRole = null;

  //transform roles array 
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

  //transform skills array 
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

  //transform members array
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


//format date for viewing
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // More robust check for invalid date
  return date.toLocaleDateString();
}
//calculate progress
function calculateProgress(startDate, endDate) {
  if (!startDate || !endDate) return 0; //default value

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0; 

  if (now < start) return 0;
  if (now > end) return 100;

  const total = end.getTime() - start.getTime();
  if (total <= 0) return 100; 
  const elapsed = now.getTime() - start.getTime();

  return Math.round((elapsed / total) * 100);
}


function extractDeliverables(description) {
  if (!description) return [
    "Project documentation",
    "Development deliverables",
    "Testing and validation",
    "Final deployment"
  ];

  return [
    "Android & iOS mobile app",
    "Backend to manage user data & posts",
    "Secure database",
    "Admin web portal"
  ];
}

//remove duplicate skills
function removeDuplicateSkills(skills) {
  const seen = new Set();
  return skills.filter(skill => {
    const skillName = skill.name; 
    if (seen.has(skillName)) {
      return false;
    }
    seen.add(skillName);
    return true;
  });
}

//check if user has specific skills
function checkUserSkills(requiredSkills, userSkills) {
  const userSkillsSet = new Set(userSkills); 
  return requiredSkills.map(skill => ({
    ...skill,
    isUserSkill: userSkillsSet.has(skill.name)
  }));
}

//Custom hook for EmpleadoProyectoPageManages all state and logic for the project details page

const useEmpleadoProyectoPage = () => {

  const { projectId } = useParams();

  //API call to fetch project data
  const { data, error, loading } = useFetch(`projects?idproyecto=${projectId || '87'}`); //remove 87

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

  //transform backend data to frontend format
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
      //replace with actual API call to submit application
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsApplied(true);
      closeModal('application');

      console.log('Application submitted:', {
        projectId: projectData?.id,
        ...applicationData
      });
    } catch (err) {
      console.error('Error submitting application:', err);
    } finally {
      setIsLoadingApplication(false);
    }
  }, [projectData?.id, closeModal]); 

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

  }, []);
  
  //calculate compatibility percentage
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
    loading, 
    error,  

    // State
    isApplied,
    isLoadingApplication, 

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