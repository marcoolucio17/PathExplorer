import React from 'react';
import { GlassCard } from 'src/components/shared/GlassCard';
import { ProgressCircle } from 'src/components/ProgressCircle';
import SkillChip from 'src/components/SkillChip/SkillChip';
import styles from 'src/styles/GridList/GridListCard.module.css';
import customStyles from 'src/styles/GridList/ProjectCard.module.css'; // Import our custom override styles

/**
 * ProjectCard component for displaying project information in grid or list view
 * 
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {Object} props.proyecto_rol - Project role data
 * @param {string} props.viewMode - Display mode: 'grid' or 'list'
 * @param {boolean} props.showCompatibility - Whether to show compatibility circle
 * @param {number} props.matchPercentage - Compatibility match percentage
 * @param {Array} props.selectedSkillFilters - Array of selected skill filters to highlight
 * @param {Array} props.userSkills - Array of skills that the current user has
 */
const ProjectCard = ({
  project,
  proyecto_rol,
  viewMode,
  showCompatibility,
  matchPercentage,
  selectedSkillFilters = [],
  userSkills = []
}) => {
  // Determine the class based on view mode
  const cardClass = viewMode === 'grid' 
    ? styles.cardGrid
    : `${styles.cardList} ${customStyles.cardList}`;
  
  // Prepare sample data to ensure visualization
  const ensureRoleData = () => {
    // Get current role data
    return {
      roleName: proyecto_rol.roles?.nombrerol || 'Developer',
      projectName: project.pnombre || 'Project',
      // Generate random duration 3-18 months
      duration: Math.floor(Math.random() * 16) + 3
    };
  };
  
  // Prepare sample skills to ensure visualization
  const ensureSkillsData = () => {
    // Every card should have at least 2 skills for demo
    if (!proyecto_rol.roles?.requerimientos_roles || proyecto_rol.roles.requerimientos_roles.length === 0) {
      // Generate demo skills if none exist
      return [
        { id: 'demo-1', name: 'JavaScript', isUser: true },
        { id: 'demo-2', name: 'React', isUser: false },
        { id: 'demo-3', name: 'Python', isUser: false },
        { id: 'demo-4', name: 'Node.js', isUser: true }
      ];
    }
    
    // Use real skills data
    return proyecto_rol.roles.requerimientos_roles.map(req_rol => ({
      id: req_rol.requerimientos.habilidades.idhabilidad,
      name: req_rol.requerimientos.habilidades.nombre,
      isUser: userSkills.includes(req_rol.requerimientos.habilidades.nombre) || 
              selectedSkillFilters.includes(req_rol.requerimientos.habilidades.nombre)
    }));
  };
  
  // Get role data
  const roleData = ensureRoleData();
  
  // Get skills data
  const skillsData = ensureSkillsData();
  
  // Render skills with consistent display
  const renderSkills = () => {
    // Always show 2 skills maximum, and a "+ more" button if there are more
    const showMoreButton = skillsData.length > 2;
    const visibleSkills = skillsData.slice(0, showMoreButton ? 2 : Math.min(3, skillsData.length));
    
    return (
      <>
        {visibleSkills.map((skill) => (
          <SkillChip
            key={`skill-${skill.id}`}
            text={skill.name}
            isUserSkill={skill.isUser}
            iconClass={skill.isUser ? "bi bi-check" : null}
          />
        ))}
        
        {showMoreButton && (
          <SkillChip
            key="more-skills"
            text={`+${skillsData.length - 2}`}
            isExpandTag={true}
          />
        )}
      </>
    );
  };
  
  // Grid view content
  const gridContent = (
    <>
      {/* Show match percentage when enabled */}
      {showCompatibility && (
        <div className={styles.statusCircle}>
          <ProgressCircle 
            value={matchPercentage}
            size={60}
            fontSize="1.1rem" 
            strokeWidth={6}
            fontWeight="light"
          />
        </div>
      )}
      
      <div className={styles.cardHeader}>
        <img 
          className={styles.cardAvatar} 
          src={project.imagen || "/images/ImagenProyectoDefault.png"} 
          alt={`${project.pnombre} logo`}
        />
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{roleData.roleName}</h3>
          <p className={styles.cardSubtitle}>for {roleData.projectName}</p>
        </div>
      </div>
      
      {/* Project Description */}
      <div className={`${styles.cardDescription} ${styles.reducedMargin}`}>
        <p className={styles.descriptionText}>
          {project.descripcion || 'This project aims to develop a comprehensive solution that meets client requirements while leveraging modern technologies...'}
        </p>
      </div>
      
      <div className={styles.cardDetails}>
        {/* Show estimated duration instead of roles */}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-clock"></i> Duration:
          </span>
          <span className={styles.detailValue}>
            {roleData.duration} months
          </span>
        </div>
      </div>
      
      <div className={styles.cardSkills}>
        {renderSkills()}
      </div>
    </>
  );
  
  // List view content with completely redesigned layout
  const listContent = (
    <>
      {/* Avatar area */}
      <div className={styles.cardHeader}>
        <img 
          className={styles.cardAvatar} 
          src={project.imagen || "/images/ImagenProyectoDefault.png"} 
          alt={`${project.pnombre} logo`}
        />
      </div>
      
      {/* Title and project name only */}
      <div className={customStyles.titleContainer}>
        <h3 className={styles.cardTitle}>{roleData.roleName}</h3>
        <p className={styles.cardSubtitle}>for {roleData.projectName}</p>
      </div>
      
      {/* Floating description in the middle */}
      <div className={customStyles.floatingDescription}>
        <p className={styles.descriptionText}>
          Description for Project {project.pnombre || '5'}
        </p>
      </div>
      
      {/* Skills and Circle container */}
      <div className={customStyles.skillsCircleContainer}>
        {/* Skills */}
        <div className={`${styles.cardSkills} ${customStyles.cardSkills}`}>
          {renderSkills()}
        </div>
        
        {/* Compatibility Circle */}
        {showCompatibility && (
          <div className={`${styles.statusCircle} ${customStyles.statusCircle}`}>
            <ProgressCircle 
              value={matchPercentage}
              size={60} 
              strokeWidth={6}
              fontSize="1rem"
              fontWeight="light"
            />
          </div>
        )}
      </div>
      
      {/* Duration info - using hardcoded styles to ensure font consistency */}
      <div className={customStyles.durationColumn}>
        <span className={styles.detailLabel}>
          <i className="bi bi-clock"></i> Duration
        </span>
        <span className={customStyles.durationValue}>
          {roleData.duration} months
        </span>
      </div>
    </>
  );
  
  // Grid view - wrap the content in a GlassCard
  if (viewMode === 'grid') {
    return (
      <GlassCard className={cardClass}>
        {gridContent}
      </GlassCard>
    );
  }
  
  // List view - custom layout for horizontal display
  return (
    <GlassCard className={cardClass}>
      {listContent}
    </GlassCard>
  );
};

export default ProjectCard;