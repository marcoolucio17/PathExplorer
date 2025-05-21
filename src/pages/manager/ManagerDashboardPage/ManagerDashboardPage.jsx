import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import ProjectList from '../../../components/GridList/Project/ProjectList';
import CustomScrollbar from '../../../components/CustomScrollbar';
import { SkillsModal } from "../../../components/Modals/SkillsModal";
import { SearchHeader } from "../../../components/SearchHeader";
import { Tabs } from "../../../components/Tabs";
import Button from '../../../components/shared/Button';

// Hooks
import { useGetFetch } from '../../../hooks/useGetFetch';

// CSS
import styles from "src/styles/Pages/GridList/GridListDashboard.module.css";

/**
 * Dashboard component for Manager role
 */
export const ManagerDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse search param from URL
  const searchParams = new URLSearchParams(location.search);
  const searchFromURL = searchParams.get('search') || '';
  
  // States for search and filtering
  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [skillSelected, setSkillSelected] = useState('Skills');
  const [showCompatibility, setShowCompatibility] = useState(true);
  const [skillsFilterModalOpen, setSkillsFilterModalOpen] = useState(false);
  const [selectedSkillFilters, setSelectedSkillFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [projectFilterModalOpen, setProjectFilterModalOpen] = useState(false);
  const [userSkills, setUserSkills] = useState(['C#', 'React', 'Node.js']); // Example user skills
  
  // State for sorting
  const [sortOption, setSortOption] = useState('date_desc'); // Default sort: Newest First
  
  // Tab functionality
  const [activeTab, setActiveTab] = useState('Active');
  const tabNames = ['Active', 'Upcoming', 'Completed', 'All'];

  // Animation state for project cards
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Update URL when search term changes
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
  }, [searchTerm, navigate, location.pathname]);
  
  // Update search term when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam && searchParam !== searchTerm) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);
  
  // Fetch data for projects and skills
  const { data: data_projects, error } = useGetFetch({ 
    rutaApi: `projects`, 
    nombre: searchTerm, 
    condicion1: skillSelected,
    condicion2: projectFilter !== 'All Projects' ? projectFilter : ''
  });
  
  const { data: data_skills, error: error2 } = useGetFetch({ 
    rutaApi: `skills`, 
    nombre: '', 
    condicion1: 'Skills' 
  });

  // Filter projects based on selected skills, search term, and active tab
  useEffect(() => {
    if (data_projects) {
      // Always start with loading state for proper animation
      setIsLoading(true); 
      
      // When there are no filters, populate with dummy data
      if (selectedSkillFilters.length === 0 && !searchTerm) {
        // Using dummy data for now
        const sampleProjects = Array(8).fill().map((_, index) => ({
          idproyecto: index + 1,
          pnombre: `Project ${index + 1}`,
          descripcion: `Description for Project ${index + 1}`,
          imagen: "/images/ImagenProyectoDefault.png",
          cliente: { clnombre: `Client ${(index % 4) + 1}` },
          status: index % 4 === 0 ? 'Active' : (index % 4 === 1 ? 'Upcoming' : (index % 4 === 2 ? 'Completed' : 'All')),
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
        setFilteredProjects(sampleProjects);
      } else {
        // Start with all projects (or dummy data since we don't have real data)
        let baseProjects = data_projects;
        if (!baseProjects || baseProjects.length === 0) {
          baseProjects = Array(8).fill().map((_, index) => ({
            idproyecto: index + 1,
            pnombre: `Project ${index + 1}`,
            descripcion: `Description for Project ${index + 1}`,
            imagen: "/images/ImagenProyectoDefault.png",
            cliente: { clnombre: `Client ${(index % 4) + 1}` },
            status: index % 4 === 0 ? 'Active' : (index % 4 === 1 ? 'Upcoming' : (index % 4 === 2 ? 'Completed' : 'All')),
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
        }
        
        let filtered = [...baseProjects];
        
        // Apply search filter
        if (searchTerm) {
          filtered = filtered.filter(project => 
            project.pnombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.cliente.clnombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.proyecto_roles.some(rol => 
              rol.roles.nombrerol.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
        
        // Filter by skills if any selected
        if (selectedSkillFilters.length > 0) {
          filtered = filtered.filter(project => 
            project.proyecto_roles.some(proyecto_rol => 
              proyecto_rol.roles.requerimientos_roles.some(req_rol => 
                selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre)
              )
            )
          );
        }
        
        setFilteredProjects(filtered);
      }

      // Longer delay for initial load animation
      setTimeout(() => {
        setShouldAnimate(true);
        setIsLoading(false);
      }, 500);
    }
  }, [data_projects, selectedSkillFilters, searchTerm]);

  // Trigger animation when tab changes
  useEffect(() => {
    // Animate cards when tab changes
    setShouldAnimate(false);
    setIsLoading(true);
    
    // Clear any existing timeouts to prevent animation conflicts
    clearTimeout(window.tabAnimationTimer);
    
    // Use a short delay to allow the state to update
    window.tabAnimationTimer = setTimeout(() => {
      setShouldAnimate(true);
      setIsLoading(false);
    }, 300);
    
    return () => {
      clearTimeout(window.tabAnimationTimer);
    };
  }, [activeTab]);

  // Update view when filteredProjects changes
  useEffect(() => {
    // First set loading to true to ensure animation runs
    setIsLoading(true);
    
    // Then set to false after a delay to trigger animation
    setTimeout(() => {
      setIsLoading(false);
    }, 300); // Increased delay for better animation timing
    
    // Check if we need to refresh the current tab view
    // This helps when filters change but we stay on the same tab
    const tabProjects = filteredProjects.filter(project => project.status === activeTab);
    if (tabProjects.length === 0 && filteredProjects.length > 0 && activeTab !== 'All') {
      // We have projects but none in the current tab,
      // maybe we should switch to a tab that has projects
      const tabsWithProjects = tabNames.filter(tab => 
        tab === 'All' || filteredProjects.some(project => project.status === tab)
      );
      
      if (tabsWithProjects.length > 0) {
        // Switch to the first tab that has projects
        handleTabChange(tabsWithProjects[0]);
      }
    }
  }, [filteredProjects]);
  
  // Use useLayoutEffect for filter changes to ensure DOM updates before paint
  useLayoutEffect(() => {
    // When project filter or search term changes, trigger animation sequence
    triggerAnimationSequence();
  }, [searchTerm]);

  // Toggle skills filter modal
  const toggleSkillsFilterModal = () => {
    setSkillsFilterModalOpen(!skillsFilterModalOpen);
  };

  // Toggle compatibility view
  const toggleCompatibility = () => {
    setShowCompatibility(!showCompatibility);
  };

  // Toggle view mode (grid/list)
  const toggleViewMode = () => {
    // Set loading state to true to trigger animation
    setIsLoading(true);
    
    // Toggle the view mode
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    
    // After a short delay, turn off loading to animate cards in
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
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

  // Handle tab change
  const handleTabChange = (tabName) => {
    // Don't do anything if it's already the active tab
    if (tabName === activeTab) return;
    
    // Cancel any previous animations
    clearTimeout(window.tabChangeTimeout);
    clearTimeout(window.opacityTimeout);
    
    // Set loading state first to trigger animations
    setIsLoading(true);
    setShouldAnimate(false);
    
    // Change the tab
    window.tabChangeTimeout = setTimeout(() => {
      // Change the active tab
      setActiveTab(tabName);
      
      // Delay setting filtered projects to allow for animation
      setTimeout(() => {
        // Turn off loading and enable animations after a delay
        setTimeout(() => {
          setShouldAnimate(true);
          setIsLoading(false);
        }, 300);
      }, 100);
    }, 100);
  };

  // Function to calculate matching percentage (would be replaced with real data from backend)
  const calculateMatchPercentage = (project, proyecto_rol) => {
    if (!project || !proyecto_rol) return 0;
    
    // This is a placeholder implementation
    // In a real app, you would compare user skills with project requirements
    return Math.floor(Math.random() * 101); // Random value between 0-100 for demo
  };
  
  // Navigate to applicants page
  const handleViewApplicants = () => {
    navigate('/manager/applicants');
  };

  // Get filtered and sorted projects for the current tab
  const getTabProjects = () => {
    // Filter projects for the current tab
    const tabProjects = activeTab === 'All' 
      ? filteredProjects 
      : filteredProjects.filter(project => project.status === activeTab);
    
    // Apply sorting based on selected sort option
    return sortProjects(tabProjects, sortOption);
  };

  // Function to sort projects based on sort option
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

  // Animation sequence - call this when changing tabs or filters
  const triggerAnimationSequence = () => {
    // First, set loading to true to hide cards
    setIsLoading(true);
    setShouldAnimate(false);
    
    // Clear any previous animation timers
    clearTimeout(window.animationTimer);
    
    // Delay to ensure DOM updates
    window.animationTimer = setTimeout(() => {
      // Then turn off loading to begin staggered animation
      setIsLoading(false);
      setShouldAnimate(true);
    }, 400); // Increased delay for better animation sequencing
  };

  // Handle Clear Filters from the empty state
  const handleClearFilters = () => {
    clearAllSkillFilters();
  };

  // Get count of projects for each tab (for badges)
  const getTabCounts = () => {
    const counts = {
      'Active': 0,
      'Upcoming': 0,
      'Completed': 0,
      'All': filteredProjects.length
    };
    
    filteredProjects.forEach(project => {
      if (project.status && counts[project.status] !== undefined) {
        counts[project.status]++;
      }
    });
    
    return counts;
  };

  const tabCounts = getTabCounts();

  // Organize active filters for SearchHeader component
  const getActiveFilters = () => {
    const filters = {};
    
    if (selectedSkillFilters.length > 0) {
      filters.skills = {
        label: 'Skill',
        values: selectedSkillFilters,
        color: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.5)'
      };
    }
    
    return filters;
  };
  
  // Handle removing a specific filter
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'skills') {
      removeSkillFilter(value);
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

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Project Dashboard</h1>
        </div>
        
        <SearchHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by Name..."
          searchName="searchProjects"
          labelText=""
          viewToggle={true}
          viewMode={viewMode}
          setViewMode={toggleViewMode}
          activeFilters={getActiveFilters()}
          onRemoveFilter={handleRemoveFilter}
          onClearFilters={handleClearFilters}
          customButtons={[
            {
              label: "View Applicants",
              type: "primary",
              icon: "bi-people-fill",
              onClick: handleViewApplicants
            },
            {
              label: "Filter By",
              type: "secondary",
              icon: "bi-funnel",
              hasDropdown: true,
              isFilterButton: true,
              dropdownItems: [
                { 
                  label: 'Skills', 
                  action: 'skills', 
                  icon: 'bi-tools'
                }
              ],
              onDropdownItemClick: (item) => {
                if (item.action === 'skills') {
                  toggleSkillsFilterModal();
                }
              }
            },
            {
              label: "Sort By",
              type: "secondary",
              icon: "bi-sort-down",
              hasDropdown: true,
              isFilterButton: true,
              dropdownItems: [
                { label: 'Name (A to Z)', value: 'name_asc', icon: 'bi-sort-alpha-down' },
                { label: 'Name (Z to A)', value: 'name_desc', icon: 'bi-sort-alpha-down-alt' },
                { label: 'Newest First', value: 'date_desc', icon: 'bi-calendar-date' },
                { label: 'Oldest First', value: 'date_asc', icon: 'bi-calendar2-date' },
                { label: 'Compatibility (High to Low)', value: 'match_desc', icon: 'bi-star-fill' },
                { label: 'Compatibility (Low to High)', value: 'match_asc', icon: 'bi-star' }
              ],
              onDropdownItemClick: (item) => {
                setSortOption(item.value);
                console.log('Sort by:', item.value);
              }
            }
          ]}
          filterButtons={[
            {
              label: "Compatibility",
              onClick: toggleCompatibility,
              type: 'primary',
              variant: 'compatibility',
              isActive: showCompatibility
            }
          ]}
        />

        {/* Use the enhanced Tabs component */}
        <Tabs 
          tabs={tabNames.map(tab => ({
            name: tab,
            notificationCount: tabCounts[tab]
          }))}
          activeTab={activeTab}
          onTabClick={handleTabChange}
        />

        <div className={styles.cardsContainer}>
          <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
            <ProjectList 
              projects={flattenProjectsForList(getTabProjects())}
              viewMode={viewMode}
              showCompatibility={showCompatibility}
              selectedSkillFilters={selectedSkillFilters}
              userSkills={userSkills}
              calculateMatchPercentage={calculateMatchPercentage}
              onClearFilters={handleClearFilters}
              isLoading={isLoading}
            />
          </CustomScrollbar>
        </div>
      </div>

      {/* Using the existing SkillsModal component for filtering */}
      <SkillsModal 
        isOpen={skillsFilterModalOpen}
        onClose={() => setSkillsFilterModalOpen(false)}
        userSkills={selectedSkillFilters}
        onUpdateSkills={handleApplySkillFilters}
      />
    </div>
  );
};