import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDataFetching from '../useDataFetching';
import useListPage from '../useListPage';
import useModalControl from '../useModalControl';

/**
 * 
 * 
 * @returns {Object} Dashboard data and related functions
 */
export const useDashboardData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  //search param from URL
  const searchParams = new URLSearchParams(location.search);
  const searchFromURL = searchParams.get('search') || '';
  
  //searchand filter state
  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [skillSelected, setSkillSelected] = useState('Skills');
  const [selectedSkillFilters, setSelectedSkillFilters] = useState([]);
  const [userSkills, setUserSkills] = useState(['C#', 'React', 'Node.js']); // Example user skills
  
  //mock current user ID (this would come from authentication context in real app)
  const currentUserId = 1;
  
  //URL management for search
  useEffect(() => {
    if (searchTerm) {
      const params = new URLSearchParams(location.search);
      params.set('search', searchTerm);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    } else if (searchFromURL) {
      // If search term is cleared, remove it from URL
      const params = new URLSearchParams(location.search);
      params.delete('search');
      navigate(`${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
    }
  }, [searchTerm, navigate, location.pathname, location.search, searchFromURL]);
  
  //Update search term when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam && searchParam !== searchTerm) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  //fetch data
  const { data } = useDataFetching(
    {
      projects: { 
        rutaApi: 'projects', 
        nombre: searchTerm, 
        condicion1: skillSelected,
        condicion2: ''
      }
    }
    
  );

 
  //apply skills filters
  const handleApplySkillFilters = (selectedSkills) => {
    setSelectedSkillFilters(selectedSkills);
    
    //update the Skills button text based on selected skills
    if (selectedSkills.length > 0) {
      setSkillSelected(`${selectedSkills.length} skills`);
    } else {
      setSkillSelected('Skills');
    }
  };

  //remove a specific skill filter
  const removeSkillFilter = (skillToRemove) => {
    const updatedSkills = selectedSkillFilters.filter(skill => skill !== skillToRemove);
    handleApplySkillFilters(updatedSkills);
  };

  //clear all skill filters
  const clearAllSkillFilters = () => {
    handleApplySkillFilters([]);
  };

  //calculate matching percentage
  const calculateMatchPercentage = (project, proyecto_rol) => {
    if (!project || !proyecto_rol) return 0;
    
    //placeholder implementation
    return Math.floor(Math.random() * 101); 
  };

  //sort projects function
  const sortProjects = (projects, option) => {
    const sorted = [...projects];
    
    switch(option) {
      case 'name_asc': // Name: A to Z
        return sorted.sort((a, b) => a.pnombre.localeCompare(b.pnombre));
        
      case 'name_desc': // Name: Z to A
        return sorted.sort((a, b) => b.pnombre.localeCompare(a.pnombre));
        
      case 'date_desc': // Newest First
        return sorted.sort((a, b) => b.idproyecto - a.idproyecto);
        
      case 'date_asc': // Oldest First
        return sorted.sort((a, b) => a.idproyecto - b.idproyecto);
        
      case 'match_desc': // Compatibility: High to Low
        return sorted.sort((a, b) => {
          const matchA = calculateMatchPercentage(a);
          const matchB = calculateMatchPercentage(b);
          return matchB - matchA;
        });
        
      case 'match_asc': // Compatibility: Low to High
        return sorted.sort((a, b) => {
          const matchA = calculateMatchPercentage(a);
          const matchB = calculateMatchPercentage(b);
          return matchA - matchB;
        });
        
      default:
        return sorted;
    }
  };

  const flattenProjectsForList = (projects) => {
    return projects.flatMap(project => 
      project.proyecto_roles.map(proyecto_rol => ({ 
        project, 
        proyecto_rol,
        hasSelectedSkills: selectedSkillFilters.length === 0 || 
          proyecto_rol.roles.requerimientos_roles.some(req_rol => 
            selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre)
          )
      }))
    ).filter(item => item.hasSelectedSkills);
  };

  return {
    projects: data.projects,
    skills: data.skills,
    searchTerm,
    setSearchTerm,
    selectedSkillFilters,
    userSkills,
    currentUserId,
    handleApplySkillFilters,
    removeSkillFilter,
    clearAllSkillFilters,
    calculateMatchPercentage,
    sortProjects,
    flattenProjectsForList
  };
};

export default useDashboardData;
