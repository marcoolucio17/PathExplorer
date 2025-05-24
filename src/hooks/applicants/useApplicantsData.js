import { useRef, useMemo, useEffect } from 'react';
import useDataFetching from '../useDataFetching';
import { generateDummyApplicants, getUniqueProjects, getUniqueSkills } from '../../utils/dummyData';

/**
 * Hook for managing applicants data including compatibility calculations
 * 
 * @param {string} searchTerm - Current search term
 * @returns {Object} Applicants data and related functions
 */
export const useApplicantsData = (searchTerm) => {
  // Cache for match percentages
  const matchPercentagesRef = useRef({});

  // Setup data fetching
  const { data, setApplicants } = useDataFetching(
    {
      applicants: { 
        rutaApi: 'applicants', 
        nombre: searchTerm, 
        condicion1: 'Skills',
        condicion2: ''
      },
      skills: { 
        rutaApi: 'skills', 
        nombre: '', 
        condicion1: 'Skills' 
      },
      projects: { 
        rutaApi: 'projects', 
        nombre: '', 
        condicion1: 'Projects' 
      }
    },
    {
      applicants: () => generateDummyApplicants(25)
    }
  );

  // Derive project and skill options
  const projectOptions = useMemo(() => {
    if (data.projects && data.projects.length > 0) {
      return data.projects.map(project => project.pnombre || project.nombre);
    }
    return getUniqueProjects(data.applicants);
  }, [data.projects, data.applicants]);
  
  const skillOptions = useMemo(() => {
    if (data.skills && data.skills.length > 0) {
      return data.skills.map(skill => skill.nombre);
    }
    return getUniqueSkills(data.applicants);
  }, [data.skills, data.applicants]);

  // Match percentage calculation
  const calculateMatchPercentage = (applicant, showCompatibility = true) => {
    if (!applicant || !showCompatibility) return 0;
    
    if (matchPercentagesRef.current[applicant.id] !== undefined) {
      return matchPercentagesRef.current[applicant.id];
    }
    
    const percentage = Math.floor(Math.random() * 101);
    matchPercentagesRef.current[applicant.id] = percentage;
    return percentage;
  };

  const refreshMatchPercentages = () => {
    // Clear cache and recalculate
    matchPercentagesRef.current = {};
    
    // Pre-calculate all percentages
    data.applicants.forEach(applicant => {
      if (applicant && applicant.id) {
        matchPercentagesRef.current[applicant.id] = Math.floor(Math.random() * 101);
      }
    });
  };

  return {
    applicants: data.applicants,
    setApplicants,
    projectOptions,
    skillOptions,
    calculateMatchPercentage,
    refreshMatchPercentages,
    matchPercentagesCache: matchPercentagesRef
  };
};

export default useApplicantsData;
