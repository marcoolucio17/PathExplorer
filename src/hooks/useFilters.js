import { useState, useEffect, useMemo } from 'react';

/**
 * 
 * @param {Array} data - The data array to filter
 * @param {Object} options - Filter options and configuration
 * @returns {Object} - Filter state and filtered data
 */
const useFilters = (data = [], options = {}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const { searchTerm = '', skillsField = 'skills', projectField = 'project' } = options;
  
  const safeData = Array.isArray(data) ? data : [];

  //filtering logic for skills
  const filterBySkills = useMemo(() => {
    if (selectedSkills.length === 0) return safeData;
    
    return safeData.filter(item => {
      if (!item || !item[skillsField] || !Array.isArray(item[skillsField])) {
        return false;
      }
      
      const itemSkills = item[skillsField].map(skill => {
        if (typeof skill === 'string') return skill.toLowerCase();
        if (skill && skill.nombre) return skill.nombre.toLowerCase();
        return '';
      }).filter(Boolean);
      
      return selectedSkills.some(skill => 
        skill && itemSkills.includes(skill.toLowerCase())
      );
    });
  }, [safeData, selectedSkills, skillsField]);
  
  //filtering logic for project
  const filterByProject = useMemo(() => {
    if (!selectedProject || selectedProject === 'All Projects') return filterBySkills;
    
    const lowerProject = selectedProject.toLowerCase();
    
    return filterBySkills.filter(item => {
      if (!item) return false;
      
      //check direct project field
      if (item[projectField] && 
          typeof item[projectField] === 'string' && 
          item[projectField].toLowerCase() === lowerProject) {
        return true;
      }
      
      //check in applications if available
      if (item.applications && Array.isArray(item.applications)) {
        return item.applications.some(app => {
          if (!app) return false;
          
          if (app.proyecto && typeof app.proyecto === 'string' && 
              app.proyecto.toLowerCase() === lowerProject) {
            return true;
          }
          
          if (app.proyecto && app.proyecto.pnombre && 
              typeof app.proyecto.pnombre === 'string' && 
              app.proyecto.pnombre.toLowerCase() === lowerProject) {
            return true;
          }
          
          return false;
        });
      }
      
      return false;
    });
  }, [filterBySkills, selectedProject, projectField]);
  
  //filtering logic for search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return filterByProject;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return filterByProject.filter(item => {
      if (!item) return false;
      
      //check name
      if (item.name && typeof item.name === 'string' && 
          item.name.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      //check email
      if (item.email && typeof item.email === 'string' && 
          item.email.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      //check role
      if (item.role && typeof item.role === 'string' && 
          item.role.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      //check project
      if (item[projectField] && typeof item[projectField] === 'string' && 
          item[projectField].toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      //check skills
      if (item[skillsField] && Array.isArray(item[skillsField])) {
        return item[skillsField].some(skill => {
          if (typeof skill === 'string' && 
              skill.toLowerCase().includes(lowerSearchTerm)) {
            return true;
          }
          
          if (skill && skill.nombre && typeof skill.nombre === 'string' && 
              skill.nombre.toLowerCase().includes(lowerSearchTerm)) {
            return true;
          }
          
          return false;
        });
      }
      
      return false;
    });
  }, [filterByProject, searchTerm, skillsField, projectField]);
  
  const resetFilters = () => {
    setSelectedSkills([]);
    setSelectedProject('All Projects');
  };
  
  return {
    selectedSkills,
    setSelectedSkills,
    selectedProject,
    setSelectedProject,
    filteredData,
    resetFilters
  };
};

export default useFilters;