import React, { useState, useEffect } from "react";
// Import components
import { ProgressCircle } from '../../../components/ProgressCircle';
import CustomScrollbar from '../../../components/CustomScrollbar';
import { DashboardSkillsCategory } from "../../../components/Dashboard/DashboardSkillsCategory";
import { SkillsModal } from "../../../components/SkillsModal";

// Import hooks
import { useGetFetch } from '../../../hooks/useGetFetch';

// Import page-specific styles
import styles from "./EmpleadoDashboardPage.module.css";

/**
 * Dashboard component for Empleado role
 */
export const EmpleadoDashboardPage = () => {
  // States for search and filtering
  const [searchProjects, setSearchProjects] = useState('');
  const [skillSelected, setSkillSelected] = useState('Skills');
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [skillsFilterModalOpen, setSkillsFilterModalOpen] = useState(false);
  const [selectedSkillFilters, setSelectedSkillFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data for projects and skills
  const { data: data_projects, error } = useGetFetch({ 
    rutaApi: `projects`, 
    nombre: searchProjects, 
    condicion1: skillSelected 
  });
  
  const { data: data_skills, error: error2 } = useGetFetch({ 
    rutaApi: `skills`, 
    nombre: '', 
    condicion1: 'Skills' 
  });

  // Filter projects based on selected skills
  useEffect(() => {
    if (data_projects) {
      setIsLoading(true); // Set loading to true before filtering
      
      if (selectedSkillFilters.length === 0) {
        // If no skills selected, show all projects
        setFilteredProjects(data_projects);
      } else {
        // Filter projects that have at least one of the selected skills
        const filtered = data_projects.filter(project => {
          return project.proyecto_roles.some(proyecto_rol => {
            return proyecto_rol.roles.requerimientos_roles.some(req_rol => {
              return selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre);
            });
          });
        });
        setFilteredProjects(filtered);
      }
      
      // Add a small delay to allow loading animation
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [data_projects, selectedSkillFilters]);

  // Reset isLoading state when changing view mode
  useEffect(() => {
    // Reset loading state whenever filtered projects change
    setIsLoading(false);
  }, [filteredProjects]);

  // Toggle skill modal (DashboardSkillsCategory)
  const toggleSkillModal = () => {
    setSkillModalOpen(!skillModalOpen);
  };

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
    // Apply a fade-out effect
    const container = document.querySelector(`.${styles.projectsGrid}`) || 
                      document.querySelector(`.${styles.projectsList}`);
    if (container) {
      container.style.opacity = '0';
      
      // Change view mode after a short delay
      setTimeout(() => {
        setViewMode(viewMode === 'grid' ? 'list' : 'grid');
        
        // Fade back in
        setTimeout(() => {
          const newContainer = document.querySelector(`.${styles.projectsGrid}`) || 
                              document.querySelector(`.${styles.projectsList}`);
          if (newContainer) {
            newContainer.style.opacity = '1';
          }
        }, 50);
      }, 200);
    } else {
      // Fallback if container not found
      setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    }
  };

  // Handle applying skill filters
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

  // Function to generate a random progress value
  const getRandomProgress = () => {
    return Math.floor(Math.random() * 101); // Random value between 0-100
  };

  // Render project list or grid item based on current view mode
  const renderProject = (project, proyecto_rol, index, renderMode) => {
    // Generate random progress value for this project
    const compatibilityValue = getRandomProgress();
    
    // Check if this role has any of the selected skills
    const hasSelectedSkills = selectedSkillFilters.length === 0 || 
      proyecto_rol.roles.requerimientos_roles.some(req_rol => 
        selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre)
      );
    
    // Only render if it matches the filter criteria
    if (!hasSelectedSkills) return null;
    
    // Common content for both views
    const projectContent = (
      <>
        {/* Show progress circle when compatibility is toggled */}
        {showCompatibility && (
          <div className={styles.compatibilityCircle}>
            <ProgressCircle 
              value={compatibilityValue}
              size={60} 
              strokeWidth={6}
              title="Match"
            />
          </div>
        )}
        
        <div className={styles.projectHeader}>
          <img 
            className={styles.projectLogo} 
            src={project.imagen || "/images/ImagenProyectoDefault.png"} 
            alt="Project logo"
          />
          <div className={styles.projectInfo}>
            <h3 className={styles.projectTitle}>{project.pnombre}</h3>
            <p className={styles.projectClient}>by {project.cliente.clnombre}</p>
          </div>
        </div>
        
        <div className={styles.projectRole}>
          <h4 className={styles.roleName}>{proyecto_rol.roles.nombrerol}</h4>
          <p className={styles.roleDescription}>{proyecto_rol.roles.descripcionrol}</p>
        </div>
        
        <div className={styles.projectFooter}>
          <div className={styles.projectSkills}>
            {proyecto_rol.roles.requerimientos_roles.map((req_rol) => (
              <div 
                className={`${styles.skillTag} ${selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre) ? styles.highlightedSkill : ''}`} 
                key={`${project.idproyecto}-${proyecto_rol.idrol}-${req_rol.requerimientos.habilidades.idhabilidad}`}
              >
                {req_rol.requerimientos.habilidades.nombre}
              </div>
            ))}
          </div>
          
          <div className={styles.projectParticipants}>
            <img className={styles.participantAvatar} src="/img/fotogabo.jpg" alt="Participant" />
            <img className={styles.participantAvatar} src="/img/fotogabo.jpg" alt="Participant" />
            <img className={styles.participantAvatar} src="/img/fotogabo.jpg" alt="Participant" />
          </div>
        </div>
      </>
    );

    // Calculate delay for staggered animation
    const staggerDelay = `${50 + (index * 80)}ms`;
    const key = `${project.idproyecto}-${proyecto_rol.idrol}`;

    // Return the appropriate component based on the requested render mode
    if (renderMode === 'grid') {
      return (
        <div 
          className={`${styles.projectCard} ${isLoading ? styles.loading : styles.loaded}`}
          key={key}
          style={{ '--stagger-delay': staggerDelay }}
        >
          {projectContent}
        </div>
      );
    } else {
      return (
        <div 
          className={`${styles.projectListItem} ${isLoading ? styles.loading : styles.loaded}`}
          key={key}
          style={{ '--stagger-delay': staggerDelay }}
        >
          {projectContent}
        </div>
      );
    }
  };

  // Flatten projects for animation indexing
  const flattenedProjects = filteredProjects.flatMap(project => 
    project.proyecto_roles.map(proyecto_rol => ({ project, proyecto_rol }))
  );

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.searchHeader}>
          <div className={styles.searchContainer}>
            <i className="bi bi-search"></i>
            <input
              type="text"
              value={searchProjects}
              name="searchDashboard"
              onChange={(e) => setSearchProjects(e.target.value)}
              placeholder="Search..."
              className={styles.searchInput}
              aria-label="Search projects"
            />
          </div>
          
          <div className={styles.sortContainer}>
            <h2 className={styles.sortLabel}>Sort by:</h2>
            <button 
              className={`${styles.filterButton} ${styles.skillsButton} ${selectedSkillFilters.length > 0 ? styles.activeButton : ''}`}
              onClick={toggleSkillsFilterModal}
            >
              {skillSelected}
              {selectedSkillFilters.length > 0 && (
                <span className={styles.filterBadge}>{selectedSkillFilters.length}</span>
              )}
            </button>
            <button 
              className={`${styles.filterButton} ${styles.compabilityButton} ${showCompatibility ? styles.activeButton : ''}`}
              onClick={toggleCompatibility}
            >
              Compability
            </button>
            
            {/* View toggle button */}
            <button 
              className={`${styles.viewToggleButton} ${viewMode === 'list' ? styles.listActive : styles.gridActive}`}
              onClick={toggleViewMode}
              title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              <i className={`bi bi-${viewMode === 'grid' ? 'list' : 'grid-3x3-gap'}`}></i>
            </button>
          </div>
        </div>

        {/* Active filters display */}
        {selectedSkillFilters.length > 0 && (
          <div className={styles.activeFiltersContainer}>
            <div className={styles.activeFiltersHeader}>
              <h3 className={styles.activeFiltersTitle}>Active Filters:</h3>
              <button 
                className={styles.clearAllButton} 
                onClick={clearAllSkillFilters}
              >
                Clear All
              </button>
            </div>
            <div className={styles.activeFiltersList}>
              {selectedSkillFilters.map(skill => (
                <div key={skill} className={styles.activeFilterChip}>
                  {skill}
                  <button 
                    className={styles.removeFilterButton}
                    onClick={() => removeSkillFilter(skill)}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.projectsContainer}>
          <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
            {filteredProjects.length === 0 ? (
              <div className={styles.noProjectsMessage}>
                <i className="bi bi-search" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                <p>No projects match your selected filters</p>
                <button 
                  className={styles.clearFiltersButton}
                  onClick={clearAllSkillFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? styles.projectsGrid : styles.projectsList}>
                {flattenedProjects.map((item, index) => {
                  // Generate random progress value for this project
                  const compatibilityValue = getRandomProgress();
                  
                  // Check if this role has any of the selected skills
                  const hasSelectedSkills = selectedSkillFilters.length === 0 || 
                    item.proyecto_rol.roles.requerimientos_roles.some(req_rol => 
                      selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre)
                    );
                  
                  // Only render if it matches the filter criteria
                  if (!hasSelectedSkills) return null;
                  
                  // Calculate delay for staggered animation
                  const staggerDelay = `${50 + (index * 80)}ms`;
                  
                  // Common content for both views
                  const projectContent = (
                    <>
                      {/* Show progress circle when compatibility is toggled */}
                      {showCompatibility && (
                        <div className={styles.compatibilityCircle}>
                          <ProgressCircle 
                            value={compatibilityValue}
                            size={60} 
                            strokeWidth={6}
                            title="Match"
                          />
                        </div>
                      )}
                      
                      <div className={styles.projectHeader}>
                        <img 
                          className={styles.projectLogo} 
                          src={item.project.imagen || "/images/ImagenProyectoDefault.png"} 
                          alt="Project logo"
                        />
                        <div className={styles.projectInfo}>
                          <h3 className={styles.projectTitle}>{item.project.pnombre}</h3>
                          <p className={styles.projectClient}>by {item.project.cliente.clnombre}</p>
                        </div>
                      </div>
                      
                      <div className={styles.projectRole}>
                        <h4 className={styles.roleName}>{item.proyecto_rol.roles.nombrerol}</h4>
                        <p className={styles.roleDescription}>{item.proyecto_rol.roles.descripcionrol}</p>
                      </div>
                      
                      <div className={styles.projectFooter}>
                        <div className={styles.projectSkills}>
                          {item.proyecto_rol.roles.requerimientos_roles.map((req_rol) => (
                            <div 
                              className={`${styles.skillTag} ${selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre) ? styles.highlightedSkill : ''}`} 
                              key={`${item.project.idproyecto}-${item.proyecto_rol.idrol}-${req_rol.requerimientos.habilidades.idhabilidad}`}
                            >
                              {req_rol.requerimientos.habilidades.nombre}
                            </div>
                          ))}
                        </div>
                        
                        <div className={styles.projectParticipants}>
                          <img className={styles.participantAvatar} src="/img/fotogabo.jpg" alt="Participant" />
                          <img className={styles.participantAvatar} src="/img/fotogabo.jpg" alt="Participant" />
                          <img className={styles.participantAvatar} src="/img/fotogabo.jpg" alt="Participant" />
                        </div>
                      </div>
                    </>
                  );
                  
                  // Apply different styles based on view mode
                  if (viewMode === 'grid') {
                    return (
                      <div 
                        className={`${styles.projectCard} ${isLoading ? styles.loading : styles.loaded}`}
                        key={`${item.project.idproyecto}-${item.proyecto_rol.idrol}`}
                        style={{ '--stagger-delay': staggerDelay }}
                      >
                        {projectContent}
                      </div>
                    );
                  } else {
                    return (
                      <div 
                        className={`${styles.projectListItem} ${isLoading ? styles.loading : styles.loaded}`}
                        key={`${item.project.idproyecto}-${item.proyecto_rol.idrol}`}
                        style={{ '--stagger-delay': staggerDelay }}
                      >
                        {projectContent}
                      </div>
                    );
                  }
                }).filter(Boolean)}
              </div>
            )}
          </CustomScrollbar>
        </div>
      </div>
      
      {/* Original DashboardSkillsCategory modal - keeping it for backward compatibility */}
      <DashboardSkillsCategory 
        data_skills={data_skills} 
        skillModalOpen={skillModalOpen}
        setSkillSelected={setSkillSelected} 
        toggleSkillModal={toggleSkillModal}
      />

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