import React from 'react';

// Custom Hooks
import useEmpleadoProyectoPage from '../../../hooks/proyecto/useEmpleadoProyectoPage';

// Components
import { GlassCard } from '../../../components/shared/GlassCard';
import { ProgressBar } from '../../../components/ProgressBar';
import SkillChip from '../../../components/SkillChip/SkillChip';
import Button from '../../../components/shared/Button';
import CustomScrollbar from '../../../components/CustomScrollbar';

// Modals
import { SkillsModal } from "../../../components/Modals/SkillsModal";
import { CompatibilityModal } from "../../../components/Modals/CompatibilityModal";
import { ApplicationModal } from "../../../components/Modals/ApplicationModal";
import { AllSkillsModal } from "../../../components/Modals/AllSkillsModal";

// CSS
import styles from "src/styles/Pages/Proyecto/EmpleadoProyectoPage.module.css";
import peopleStyles from "src/styles/Pages/Proyecto/PeopleSection.module.css";
import skillsStyles from "src/styles/Pages/Proyecto/SkillsSection.module.css";


export const EmpleadoProyectoPage = () => {
  const proyectoPage = useEmpleadoProyectoPage();
  const { projectData, userSkills, isApplied, isLoading, loading, error } = proyectoPage;

  // Handle loading state
  if (loading) {
    return (
      <div className={styles.proyectoContainer}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  //error state  
  if (error) {
    return (
      <div className={styles.proyectoContainer}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh', justifyContent: 'center' }}>
          <h2>Error loading project</h2>
          <p>There was an error loading the project details. Please try again later.</p>
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  //if project data is not found
  if (!projectData) {
    return (
      <div className={styles.proyectoContainer}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh', justifyContent: 'center' }}>
          <h2>Project not found</h2>
          <p>The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  const compatibilityPercentage = proyectoPage.calculateCompatibilityPercentage();

  //show max 6 skills
  const maxVisibleSkills = 6;
  const skillsArray = projectData?.requiredSkills || [];
  const visibleSkills = skillsArray.slice(0, maxVisibleSkills);
  const remainingSkillsCount = Math.max(0, skillsArray.length - maxVisibleSkills);

  return (
    <div className={styles.proyectoContainer}>
      <div className={styles.proyectoContent}>
        {/* Left Column - Project Details */}
        <div className={styles.proyectoDetails}>
          <div className={styles.pageHeader}>
            <div className={styles.titleContainer}>
              <h1 className={styles.pageTitle}>
                {projectData.title} - <span className={styles.userRole}>
                  {projectData.primaryRole ? projectData.primaryRole.name : 'Role Not Specified'}
                </span>
              </h1>
            </div>
          </div>
          
          <div className={styles.proyectoDates}>
            <span>Start Date: {projectData.startDate}</span>
            <span>Est. Finish Date: {projectData.estimatedFinishDate}</span>
          </div>
          
          <div className={styles.proyectoProgress}>
            <ProgressBar percentage={projectData.progress} />
          </div>

          {/* Description Section */}
          <div className={styles.proyectoDescription}>
            <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
              <div className={styles.proyectoDescriptionContent}>
                {/* Project Goal */}
                <div className={styles.descriptionSection}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.iconContainer}>
                      <i className="bi bi-bullseye"></i>
                    </div>
                    <h2 className={styles.sectionTitle}>Project Goal</h2>
                  </div>
                  <p className={styles.sectionText}>
                    {projectData.goal}
                  </p>
                </div>

                {/* Deliverables */}
                <div className={styles.descriptionSection}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.iconContainer}>
                      <i className="bi bi-box-seam"></i>
                    </div>
                    <h2 className={styles.sectionTitle}>Deliverables</h2>
                  </div>
                  <ul className={styles.deliverablesList}>
                    {(projectData.deliverables || []).map((deliverable, index) => (
                      <li key={index}>
                        <i className={`bi bi-check-lg ${styles.checkmarkIcon}`}></i>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CustomScrollbar>
          </div>

          {/* Action buttons */}
          <div className={styles.proyectoActions}>
            <Button 
              type="secondary"
              onClick={proyectoPage.handleShowCompatibility}
            >
              Compatibility
            </Button>
            
            <Button 
              type="primary"
              icon={isLoading ? "bi-arrow-clockwise" : isApplied ? "bi-check-circle-fill" : "bi-check-circle-fill"}
              onClick={proyectoPage.handleShowApplication}
              disabled={isLoading || isApplied}
              isLoading={isLoading}
            >
              {isLoading ? "Applying..." : isApplied ? "Applied" : "Apply to Project"}
            </Button>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className={styles.proyectoSidebar}>
          {/* People Section */}
          <GlassCard className={styles.sidebarSection}>
            <div className={peopleStyles.peopleSection} ref={proyectoPage.peopleSectionRef}>
              <h2 className={peopleStyles.peopleTitle}>People</h2>
              <div className={peopleStyles.peopleContent}>
                <CustomScrollbar fadeBackground="transparent" fadeHeight={30} showHorizontalScroll={false}>
                  {(projectData.people || []).map(person => (
                    <div key={person.id} className={peopleStyles.person}>
                      <img 
                        src={person.avatar} 
                        alt={person.name} 
                        className={peopleStyles.personAvatar} 
                      />
                      <div className={peopleStyles.personInfo}>
                        <div className={peopleStyles.personName}>{person.name}</div>
                        <div className={peopleStyles.personRole}>{person.role}</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Client */}
                  {projectData.client && (
                    <div className={peopleStyles.person}>
                      <img 
                        src={projectData.client.logo} 
                        alt={projectData.client.name} 
                        className={peopleStyles.personAvatar} 
                      />
                      <div className={peopleStyles.personInfo}>
                        <div className={peopleStyles.personName}>{projectData.client.name}</div>
                        <div className={peopleStyles.personRole}>Cliente</div>
                      </div>
                    </div>
                  )}
                </CustomScrollbar>
              </div>
              
              <div className={peopleStyles.buttonsContainer}>
                <div className={peopleStyles.buttonsRow}>
                  <Button
                    type="secondary"
                    hasDropdown={true}
                    dropdownItems={(projectData.availableRoles || []).map(role => ({
                      label: `${role.name}`,
                      icon: 'bi-person-badge',
                      roleId: role.id,
                      available: role.available
                    }))}
                    onDropdownItemClick={(item) => console.log('Selected role:', item)}
                    className={peopleStyles.halfButton}
                  >
                    All Roles ({(projectData.availableRoles || []).length})
                  </Button>
                  
                  <Button
                    type="primary"
                    hasDropdown={true}
                    dropdownItems={(projectData.members || []).map(member => ({
                      label: member.name,
                      icon: 'bi-person',
                      avatar: member.avatar,
                      role: member.role
                    }))}
                    onDropdownItemClick={(item) => proyectoPage.handleMemberSelect(item)}
                    className={peopleStyles.halfButton}
                  >
                    Members
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Skills Section */}
          <GlassCard className={styles.sidebarSection}>
            <div className={skillsStyles.skillsSection}>
              <h2 className={skillsStyles.skillsTitle}>Skills Required</h2>
              
              <div className={skillsStyles.skillsContainer}>
                <div className={skillsStyles.skillsList}>
                  {visibleSkills.map((skill, index) => (
                    <SkillChip 
                      key={index}
                      text={skill.name} 
                      isUserSkill={skill.isUserSkill} 
                    />
                  ))}
                  
                  {remainingSkillsCount > 0 && (
                    <SkillChip 
                      text={`+${remainingSkillsCount}`}
                      isExpandTag={true}
                      onClick={proyectoPage.handleShowAllSkills}
                    />
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Modals */}
      <SkillsModal 
        isOpen={proyectoPage.modals.skills}
        onClose={() => proyectoPage.closeModal('skills')}
        userSkills={userSkills}
        onUpdateSkills={() => {}} //read only
      />

      <AllSkillsModal 
        isOpen={proyectoPage.modals.allSkills}
        onClose={() => proyectoPage.closeModal('allSkills')}
        projectSkills={skillsArray}
      />

      <CompatibilityModal 
        isOpen={proyectoPage.modals.compatibility}
        onClose={() => proyectoPage.closeModal('compatibility')}
        projectSkills={skillsArray}
        userSkills={userSkills}
        compatibilityPercentage={compatibilityPercentage}
      />

      <ApplicationModal
        isOpen={proyectoPage.modals.application}
        onClose={() => proyectoPage.closeModal('application')}
        projectData={projectData}
        onSubmitApplication={proyectoPage.handleSubmitApplication}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmpleadoProyectoPage;