import React from "react";

//missing from juan

// Custom Hooks
import useEmpleadoDashboardPage from '../../../hooks/dashboard/useEmpleadoDashboardPage';
import useEmpleadoDashboardHeaderConfig from '../../../hooks/dashboard/useEmpleadoDashboardHeaderConfig';

// Components
import ProjectList from '../../../components/GridList/Project/ProjectList';
import CustomScrollbar from '../../../components/CustomScrollbar';
import { SkillsModal } from "../../../components/Modals/SkillsModal";
import { SearchHeader } from "../../../components/SearchHeader";
import { Tabs } from "../../../components/Tabs";

// CSS
import styles from "src/styles/Pages/GridList/GridListDashboard.module.css";


export const EmpleadoDashboardPage = () => {
  //use the employee-specific dashboard hook
  const dashboardPage = useEmpleadoDashboardPage();
  
  //get employee-specific header configuration 
  const headerProps = useEmpleadoDashboardHeaderConfig(dashboardPage);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Project Dashboard</h1>
        </div>
        
        {/* Search header with filters */}
        <SearchHeader {...headerProps} />
        
        {/* Tabs for different project statuses */}
        <Tabs 
          tabs={dashboardPage.tabNames.map(tab => ({
            name: tab,
            notificationCount: dashboardPage.tabCounts[tab] || 0
          }))}
          activeTab={dashboardPage.activeTab}
          onTabClick={dashboardPage.setActiveTab}
        />

        {/* Main content area with projects list */}
        <div className={styles.cardsContainer}>
          <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showHorizontalScroll={false}>
            <ProjectList 
              projects={dashboardPage.displayProjects}
              viewMode={dashboardPage.viewMode}
              showCompatibility={dashboardPage.showCompatibility}
              selectedSkillFilters={dashboardPage.selectedSkillFilters}
              userSkills={dashboardPage.userSkills}
              calculateMatchPercentage={dashboardPage.calculateMatchPercentage}
              onClearFilters={dashboardPage.handleClearFilters}
              isLoading={dashboardPage.isLoading}
            />
          </CustomScrollbar>
        </div>
      </div>

      {/* Modals */}
      <SkillsModal 
        isOpen={dashboardPage.modals.skillsFilter}
        onClose={() => dashboardPage.closeModal('skillsFilter')}
        userSkills={dashboardPage.selectedSkillFilters}
        onUpdateSkills={dashboardPage.handleApplySkillFilters}
      />
    </div>
  );
};

export default EmpleadoDashboardPage;