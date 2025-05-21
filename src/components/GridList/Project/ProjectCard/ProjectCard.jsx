import React from 'react';
import { GlassCard } from 'src/components/shared/GlassCard';
import { ProgressCircle } from 'src/components/ProgressCircle';
import SkillChip from 'src/components/SkillChip/SkillChip';
import styles from 'src/styles/GridList/GridListCard.module.css';

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
    : styles.cardList;
  
  // Prepare sample data to ensure visualization
  const ensureRolesData = () => {
    // Every card should have at least 2 roles for demo
    return {
      currentRole: proyecto_rol.roles?.nombrerol || 'Developer',
      otherRoles: project.proyecto_roles && project.proyecto_roles.length > 1 
        ? project.proyecto_roles
            .filter(pr => pr.idrol !== proyecto_rol.idrol)
            .map(pr => pr.roles?.nombrerol || 'Other Role')
        : ['Frontend Developer', 'Backend Developer'], // Default other roles
      totalRoles: project.proyecto_roles?.length || 3
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
  
  // Get roles data
  const rolesData = ensureRolesData();
  
  // Get skills data
  const skillsData = ensureSkillsData();
  
  // Render roles with consistent "+ more" display
  const renderRoles = () => {
    const { currentRole, otherRoles, totalRoles } = rolesData;
    
    // For every other card, show a "+ more" example
    const shouldShowMoreExample = project.idproyecto % 2 === 0 && otherRoles.length > 1;
    
    if (shouldShowMoreExample) {
      return `${currentRole}, ${otherRoles[0]} + ${otherRoles.length - 1} more`;
    }
    
    // If only one other role, just show both
    if (otherRoles.length === 1) {
      return `${currentRole}, ${otherRoles[0]}`;
    }
    
    // If multiple other roles, show one and a "+ more" indicator
    if (otherRoles.length > 1) {
      return `${currentRole}, ${otherRoles[0]} + ${otherRoles.length - 1} more`;
    }
    
    // If no other roles, just show the current role
    return currentRole;
  };
  
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
  
  // Common project content for both views
  const projectContent = (
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
          <h3 className={styles.cardTitle}>{project.pnombre}</h3>
          <p className={styles.cardSubtitle}>by {project.cliente?.clnombre || 'Client'}</p>
        </div>
      </div>
      
      {/* Project Description */}
      <div className={styles.cardDescription}>
        <p className={styles.descriptionText}>
          {project.descripcion || 'This project aims to develop a comprehensive solution that meets client requirements while leveraging modern technologies...'}
        </p>
      </div>
      
      <div className={styles.cardDetails}>
        {/* Show all roles in a single line */}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-people-fill"></i> Roles:
          </span>
          <span className={styles.detailValue}>
            {renderRoles()}
          </span>
        </div>
      </div>
      
      <div className={styles.cardSkills}>
        {renderSkills()}
      </div>
    </>
  );
  
  // Grid view - wrap the content in a GlassCard
  if (viewMode === 'grid') {
    return (
      <GlassCard className={cardClass}>
        {projectContent}
      </GlassCard>
    );
  }
  
  // List view - custom layout for horizontal display
  return (
    <GlassCard className={cardClass}>
      <div className={styles.cardHeader}>
        <img 
          className={styles.cardAvatar} 
          src={project.imagen || "/images/ImagenProyectoDefault.png"} 
          alt={`${project.pnombre} logo`}
        />
      </div>
      
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{project.pnombre}</h3>
        <p className={styles.cardSubtitle}>by {project.cliente?.clnombre || 'Client'}</p>
      </div>
      
      {/* Project Description */}
      <div className={styles.cardDescription}>
        <p className={styles.descriptionText}>
          {project.descripcion || 'This project aims to develop a comprehensive solution that meets client requirements while leveraging modern technologies...'}
        </p>
      </div>
      
      <div className={styles.cardDetails}>
        {/* Show all roles in a single line */}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            <i className="bi bi-people-fill"></i> Roles
          </span>
          <span className={styles.detailValue}>
            {renderRoles()}
          </span>
        </div>
      </div>
      
      <div className={styles.cardSkills}>
        {renderSkills()}
      </div>
      
      {showCompatibility && (
        <div className={styles.statusCircle}>
          <ProgressCircle 
            value={matchPercentage}
            size={60} 
            strokeWidth={6}
            fontSize="1rem"
            fontWeight="light"
          />
        </div>
      )}
    </GlassCard>
  );
};

export default ProjectCard;