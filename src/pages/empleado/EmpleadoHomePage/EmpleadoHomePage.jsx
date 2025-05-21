import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import components
import { GlassCard } from "../../../components/shared/GlassCard";
import { ProgressCircle } from "../../../components/ProgressCircle/ProgressCircle";
// Import page-specific styles
import pageStyles from "./EmpleadoHomePage.module.css";
// Import styles for specific sections
import quickActionsStyles from "./QuickActions.module.css";
import announcementsStyles from "./Announcements.module.css";

// Mock data - in a real app, this would come from props or API
const MOCK_RECOMMENDED_PROJECTS = [
  {
    idproyecto: 1,
    pnombre: "Project Pepsi",
    matchPercentage: 98,
    skills: ["Figma", "Figma", "Figma"],
    status: "open"
  },
  {
    idproyecto: 2,
    pnombre: "Project Pepsi",
    matchPercentage: 98,
    skills: ["Figma", "Figma", "Figma"],
    status: "open"
  },
  {
    idproyecto: 3,
    pnombre: "Project Pepsi",
    matchPercentage: 98,
    skills: ["Figma", "Figma", "Figma"],
    status: "open"
  }
];

const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    icon: "bi-megaphone-fill",
    text: "A lot of important announcements are being made right now!",
    type: "important"
  },
  {
    id: 2,
    icon: "bi-star-fill",
    text: "A la bio a la boo a la bim bom bam, Leo Leo RAH RAH RAH!! Come and celebrate Leo right now!!",
    type: "celebration"
  },
  {
    id: 3,
    icon: "bi-info-circle-fill",
    text: "A la bio a la boo a la bim bom bam, Leo Leo RAH RAH RAH!! Come and celebrate Leo right now!!",
    type: "info"
  }
];

export const EmpleadoHomePage = () => {
  const navigate = useNavigate();
  const [recommendedProjects] = useState(MOCK_RECOMMENDED_PROJECTS);
  const [announcements] = useState(MOCK_ANNOUNCEMENTS);
  const [goalProgress] = useState(1); // 1/3
  const [projectProgress] = useState(96); // 96%

  const handleApplyToProject = (projectId) => {
    console.log(`Applying to project ${projectId}`);
    // Handle application logic here
  };

  const quickActions = [
    {
      id: 1,
      icon: "bi-person-fill",
      title: "My Profile",
      path: "/empleado/perfil"
    },
    {
      id: 2,
      icon: "bi-laptop",
      title: "Project Dashboard",
      path: "/empleado/dashboard"
    },
    {
      id: 3,
      icon: "bi-folder-fill",
      title: "My Project",
      path: "/empleado/proyectos"
    }
  ];

  return (
    <div className={pageStyles.homeLayout}>
      <div className={pageStyles.mainContentWrapper}>
        {/* Main Content Area */}
        <div className={pageStyles.contentSection}>
          {/* Header Section */}
          <div className={pageStyles.headerSection}>
            <h1 className={pageStyles.mainTitle}>Welcome Back, Steely Dan</h1>
            <h3 className={pageStyles.subtitle}>Ready to explore your next big project?</h3>
          </div>
          
          {/* Progress Section - No GlassCard wrapper */}
          <div className={pageStyles.progressCard}>
            <div className={pageStyles.progressContent}>
              <div className={pageStyles.progressLeft}>
                <ProgressCircle 
                  value={goalProgress} 
                  maxValue={3} 
                  title="Goal Progress"
                  size={90}
                  strokeWidth={8}
                />
              </div>
              
              <div className={pageStyles.progressCenter}>
                <ProgressCircle 
                  value={projectProgress} 
                  maxValue={100} 
                  title="Project Progress"
                  size={90}
                  strokeWidth={8}
                />
              </div>
              
              <div className={pageStyles.progressRight}>
                <h3 className={pageStyles.recommendedTitle}>Recommended:</h3>
                <button className={pageStyles.recommendedButton}>
                  Skills
                </button>
                <button className={pageStyles.recommendedButton}>
                  Certificates
                </button>
              </div>
            </div>
          </div>

          {/* Project Recommendations Section - Fills remaining height */}
          <div className={pageStyles.recommendationsCard}>
            <h3 className={pageStyles.recommendationTitle}>
              Based on your profile, you'd be a great fit for these projects:
            </h3>
            
            <div className={pageStyles.projectCardsWrapper}>
              {recommendedProjects.map((project) => (
                <GlassCard key={project.idproyecto} className={pageStyles.projectCard}>
                  <h4 className={pageStyles.projectName}>{project.pnombre}</h4>
                  <div className={pageStyles.matchPercentage}>{project.matchPercentage}%</div>
                  <div className={pageStyles.skillsContainer}>
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className={pageStyles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button 
                    className={pageStyles.applyButton}
                    onClick={() => handleApplyToProject(project.idproyecto)}
                  >
                    <i className="bi bi-check-circle-fill" />
                    Apply
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={pageStyles.sidebar}>
          {/* Quick Actions Card - Flexible height */}
          <GlassCard className={pageStyles.sidebarCard}>
            <h2 className={quickActionsStyles.sectionTitle}>Quick Actions</h2>
            <div className={quickActionsStyles.actionsContainer}>
              {quickActions.map((action) => (
                <div key={action.id} className={quickActionsStyles.actionItem}>
                  <div className={quickActionsStyles.actionInfo}>
                    <i className={`${action.icon} ${quickActionsStyles.actionIcon}`} />
                    <span className={quickActionsStyles.actionTitle}>{action.title}</span>
                  </div>
                  <button
                    onClick={() => navigate(action.path)}
                    className={quickActionsStyles.actionButton}
                  >
                    <i className="bi bi-arrow-right-circle-fill" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Announcements Card - Flexible height */}
          <GlassCard className={pageStyles.sidebarCard}>
            <h2 className={announcementsStyles.sectionTitle}>Announcements</h2>
            <div className={announcementsStyles.announcementsContainer}>
              {announcements.map((announcement) => (
                <div key={announcement.id} className={announcementsStyles.announcementItem}>
                  <i className={`${announcement.icon} ${announcementsStyles.announcementIcon}`} />
                  <div className={announcementsStyles.announcementText}>
                    {announcement.text}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
