import React from 'react';
import ProjectCard from 'src/components/GridList/Project/ProjectCard';
import styles from 'src/styles/GridList/GridListContainer.module.css';

/**
 * ProjectList component to display projects in grid or list view
 * 
 * @param {Object} props
 * @param {Array} props.projects - Array of project objects to display
 * @param {string} props.viewMode - 'grid' or 'list' display mode
 * @param {boolean} props.showCompatibility - Whether to show compatibility circle
 * @param {Array} props.selectedSkillFilters - Array of selected skill filters to highlight
 * @param {Array} props.userSkills - Array of skills that the current user has
 * @param {Function} props.calculateMatchPercentage - Function to calculate match percentage
 * @param {Function} props.onClearFilters - Function called when Clear Filters button is clicked
 * @param {boolean} props.isLoading - Whether items are currently loading
 */
const ProjectList = ({ 
  projects = [], 
  viewMode, 
  showCompatibility, 
  selectedSkillFilters = [],
  userSkills = [],
  calculateMatchPercentage,
  onClearFilters,
  isLoading = false
}) => {
  // Safety check
  const safeProjects = Array.isArray(projects) ? projects : [];
  
  //loading, show loader
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  //no projects, show empty state
  if (safeProjects.length === 0) {
    return (
      <div className={styles.emptyStateContainer}>
        <div className={styles.noItemsMessage}>
          <i className="bi bi-briefcase" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
          <p>No projects match your selected filters</p>
          <button 
            className={styles.clearFiltersButton}
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  //container class viewMode
  const containerClass = viewMode === 'grid' ? styles.gridContainer : styles.listContainer;
  
  //create a unique key for the container to force re-render and animation restart
  const containerKey = `container-projects-${viewMode}`;

  return (
    <div 
      key={containerKey}
      className={containerClass}
    >
      {safeProjects.map((item, index) => {
        if (!item || !item.project || !item.proyecto_rol) {
          console.warn('Invalid project item structure:', item);
          return null; 
        }
        
        const matchPercentage = calculateMatchPercentage ? 
          calculateMatchPercentage(item.project, item.proyecto_rol) : 0;
        
        const renderKey = `${item.project.idproyecto || 'unknown'}-${item.proyecto_rol.idrol || 'unknown'}-${index}`;
        
        return (
          <div 
            key={renderKey}
            className={styles.item}
          >
            <ProjectCard
              project={item.project}
              proyecto_rol={item.proyecto_rol}
              viewMode={viewMode}
              showCompatibility={showCompatibility}
              matchPercentage={matchPercentage}
              selectedSkillFilters={selectedSkillFilters}
              userSkills={userSkills}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;