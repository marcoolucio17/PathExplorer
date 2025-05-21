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
  projects, 
  viewMode, 
  showCompatibility, 
  selectedSkillFilters = [],
  userSkills = [],
  calculateMatchPercentage,
  onClearFilters,
  isLoading = false
}) => {
  // If no projects, show empty state
  if (projects.length === 0) {
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

  // Container class based on viewMode
  const containerClass = viewMode === 'grid' ? styles.gridContainer : styles.listContainer;

  return (
    <div className={containerClass}>
      {projects.map((item, index) => {
        // Calculate match percentage if function is provided
        const matchPercentage = calculateMatchPercentage ? 
          calculateMatchPercentage(item.project, item.proyecto_rol) : 0;
        
        // Calculate delay for staggered animation
        const staggerDelay = `${50 + (index * 80)}ms`;
        
        return (
          <div 
            key={`${item.project.idproyecto}-${item.proyecto_rol.idrol}`}
            className={`${styles.item} ${isLoading ? styles.loading : styles.loaded}`}
            style={{ '--stagger-delay': staggerDelay }}
          >
            <ProjectCard
              project={item.project}
              proyecto_rol={item.proyecto_rol}
              viewMode={viewMode}
              showCompatibility={showCompatibility}
              matchPercentage={matchPercentage}
              selectedSkillFilters={selectedSkillFilters}
              userSkills={userSkills}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;