import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDataFetching from '../useDataFetching';
import useListPage from '../useListPage';
import useModalControl from '../useModalControl';

/**
 * Hook for managing dashboard data including project filtering and processing
 * 
 * @returns {Object} Dashboard data and related functions
 */
export const useDashboardData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse search param from URL
  const searchParams = new URLSearchParams(location.search);
  const searchFromURL = searchParams.get('search') || '';
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [skillSelected, setSkillSelected] = useState('Skills');
  const [selectedSkillFilters, setSelectedSkillFilters] = useState([]);
  const [userSkills, setUserSkills] = useState(['C#', 'React', 'Node.js']); // Example user skills
  
  // Mock current user ID (this would come from authentication context in real app)
  const currentUserId = 1;
  
  // URL management for search
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
  
  // Update search term when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam && searchParam !== searchTerm) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  // Fetch data
  const { data } = useDataFetching(
    {
      projects: { 
        rutaApi: 'projects', 
        nombre: searchTerm, 
        condicion1: skillSelected,
        condicion2: ''
      },
      skills: { 
        rutaApi: 'skills', 
        nombre: '', 
        condicion1: 'Skills' 
      }
    },
    {
      projects: () => getDummyProjects(),
      skills: () => []
    }
  );

  // Function to generate dummy projects for testing
  const getDummyProjects = () => {
    return Array(8).fill().map((_, index) => ({
      idproyecto: index + 1,
      pnombre: `Project ${index + 1}`,
      descripcion: `Description for Project ${index + 1}`,
      imagen: "/images/ImagenProyectoDefault.png",
      cliente: { clnombre: `Client ${(index % 4) + 1}` },
      status: index % 4 === 0 ? 'Active' : (index % 4 === 1 ? 'Upcoming' : (index % 4 === 2 ? 'Completed' : 'All')),
      // User application and ownership data
      userHasApplied: index % 3 === 0, // Every 3rd project user has applied to
      managerId: index % 2 === 0 ? currentUserId : index + 10, // User manages every other project
      ownerId: index % 4 === 0 ? currentUserId : index + 20, // User owns every 4th project
      proyecto_roles: [
        {
          idrol: index * 2 + 1,
          roles: {
            nombrerol: `Role ${index * 2 + 1}`,
            descripcionrol: `Description for Role ${index * 2 + 1}`,
            requerimientos_roles: [
              { requerimientos: { habilidades: { idhabilidad: index * 4 + 1, nombre: "JavaScript" } } },
              { requerimientos: { habilidades: { idhabilidad: index * 4 + 2, nombre: "React" } } },
              { requerimientos: { habilidades: { idhabilidad: index * 4 + 3, nombre: "Node.js" } } }
            ]
          }
        },
        {
          idrol: index * 2 + 2,
          roles: {
            nombrerol: `Role ${index * 2 + 2}`,
            descripcionrol: `Description for Role ${index * 2 + 2}`,
            requerimientos_roles: [
              { requerimientos: { habilidades: { idhabilidad: index * 4 + 4, nombre: "CSS" } } },
              { requerimientos: { habilidades: { idhabilidad: index * 4 + 5, nombre: "UI/UX" } } }
            ]
          }
        }
      ]
    }));
  };

  // Apply skills filters
  const handleApplySkillFilters = (selectedSkills) => {
    setSelectedSkillFilters(selectedSkills);
    
    // Update the Skills button text based on selected skills
    if (selectedSkills.length > 0) {
      setSkillSelected(`${selectedSkills.length} skills`);
    } else {
      setSkillSelected('Skills');
    }
  };

  // Remove a specific skill filter
  const removeSkillFilter = (skillToRemove) => {
    const updatedSkills = selectedSkillFilters.filter(skill => skill !== skillToRemove);
    handleApplySkillFilters(updatedSkills);
  };

  // Clear all skill filters
  const clearAllSkillFilters = () => {
    handleApplySkillFilters([]);
  };

  // Calculate matching percentage
  const calculateMatchPercentage = (project, proyecto_rol) => {
    if (!project || !proyecto_rol) return 0;
    
    // Placeholder implementation
    return Math.floor(Math.random() * 101); // Random value between 0-100 for demo
  };

  // Sort projects function
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

  // Flatten the projects to map each role to a project for the ProjectList component
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
