import React from 'react';

// Custom Hooks
import useEmpleadoHomePage from '../../../hooks/useEmpleadoHomePage';

// Components
import { GlassCard } from '../../../components/shared/GlassCard';
import { ProgressCircle } from '../../../components/ProgressCircle/ProgressCircle';
import { SkillChip } from '../../../components/SkillChip';
import Button from '../../../components/shared/Button';
import CustomScrollbar from '../../../components/CustomScrollbar';

// Modals
import { SkillsModal } from "../../../components/Modals/SkillsModal";
import { ApplicationModal } from "../../../components/Modals/ApplicationModal";
import { CertificateModal } from "../../../components/Modals/CertificateModal";

// CSS
import styles from "src/styles/Pages/Home/EmpleadoHomePage.module.css";

/**
 * Employee Home Page component
 */
export const EmpleadoHomePage = () => {
  // Use the custom hook to handle all logic
  const homePage = useEmpleadoHomePage();
  const { 
    userData, 
    recommendedProjects, 
    announcements, 
    quickActions,
    modals,
    selectedProject,
    isApplying
  } = homePage;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        {/* Left Column - Main Content */}
        <div className={styles.mainContent}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <h1 className={styles.mainTitle}>Welcome Back, {userData.name}</h1>
            <p className={styles.subtitle}>Ready to explore your next big project?</p>
          </div>

          {/* Progress Section */}
          <div className={styles.progressSection}>
            <div className={styles.progressItem}>
              <ProgressCircle 
                value={userData.goalProgress.current} 
                maxValue={userData.goalProgress.total} 
                title="Goal Progress"
                size={90}
                strokeWidth={8}
              />
            </div>
            
            <div className={styles.progressItem}>
              <ProgressCircle 
                value={userData.projectProgress} 
                maxValue={100} 
                title="Project Progress"
                size={90}
                strokeWidth={8}
              />
            </div>
            
            <div className={styles.recommendedSection}>
              <h3 className={styles.recommendedTitle}>Recommended:</h3>
              <div className={styles.recommendedButtons}>
                <Button 
                  type="primary"
                  onClick={homePage.handleShowSkills}
                >
                  Skills
                </Button>
                <Button 
                  type="primary"
                  onClick={homePage.handleShowCertificates}
                >
                  Certificates
                </Button>
              </div>
            </div>
          </div>

          {/* Project Recommendations Section */}
          <div className={styles.recommendationsSection}>
            <h3 className={styles.recommendationsHeader}>
              Based on your profile, you'd be a great fit for these projects:
            </h3>
            
            <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
              <div className={styles.projectsGrid}>
                {recommendedProjects.map((project) => (
                  <GlassCard 
                    key={project.idproyecto} 
                    className={styles.projectCard}
                    onClick={() => homePage.handleApplyToProject(project)}
                  >
                    <h4 className={styles.projectName}>{project.pnombre}</h4>
                    <div className={styles.matchPercentage}>{project.matchPercentage}%</div>
                    <div className={styles.skillsContainer}>
                      {project.skills.map((skill, idx) => (
                        <SkillChip 
                          key={idx}
                          text={skill}
                          isUserSkill={false}
                        />
                      ))}
                    </div>
                    <div className={styles.projectActions}>
                      <Button 
                        type="primary"
                        icon="bi-check-circle-fill"
                        onClick={(e) => {
                          e.stopPropagation();
                          homePage.handleApplyToProject(project);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </CustomScrollbar>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className={styles.sidebar}>
          {/* Quick Actions Card */}
          <GlassCard className={`${styles.sidebarCard} ${styles.quickActionsCard}`}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.quickActionsList}>
              {quickActions.map((action) => (
                <div key={action.id} className={styles.quickActionItem}>
                  <div className={styles.actionInfo}>
                    <i className={`${action.icon} ${styles.actionIcon}`} />
                    <span className={styles.actionTitle}>{action.title}</span>
                  </div>
                  <Button
                    type="secondary"
                    icon="bi-arrow-right-circle-fill"
                    onClick={() => homePage.handleQuickAction(action)}
                    rounded
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Announcements Card */}
          <GlassCard className={`${styles.sidebarCard} ${styles.announcementsCard}`}>
            <h2 className={styles.sectionTitle}>Announcements</h2>
            <CustomScrollbar fadeBackground="transparent" fadeHeight={30} showHorizontalScroll={false}>
              <div className={styles.announcementsContent}>
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={styles.announcementItem}>
                    <i className={`${announcement.icon} ${styles.announcementIcon}`} />
                    <div className={styles.announcementText}>
                      {announcement.text}
                    </div>
                  </div>
                ))}
              </div>
            </CustomScrollbar>
          </GlassCard>
        </div>
      </div>

      {/* Modals */}
      <SkillsModal 
        isOpen={modals.skills}
        onClose={() => homePage.closeModal('skills')}
        userSkills={[]} // TODO: Connect to actual user skills
        onUpdateSkills={() => {}} // TODO: Implement skill update
      />

      <CertificateModal
        isOpen={modals.certificates}
        onClose={() => homePage.closeModal('certificates')}
        certificates={[]} // TODO: Connect to actual user certificates
      />

      <ApplicationModal
        isOpen={modals.applicationModal}
        onClose={() => homePage.closeModal('applicationModal')}
        projectData={selectedProject ? {
          id: selectedProject.idproyecto,
          title: selectedProject.pnombre,
          // Add other necessary project data
        } : null}
        onSubmitApplication={homePage.handleSubmitApplication}
        isLoading={isApplying}
      />
    </div>
  );
};

export default EmpleadoHomePage;
