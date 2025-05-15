import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import components
import { GlassCard } from "../../../components/shared/GlassCard";
import { DashboardProjectInfo } from "../../../components/Dashboard/DashboardProjectInfo";
import CustomScrollbar from "../../../components/CustomScrollbar";
import { GlassFade } from "../../../components/GlassFade";
// Import page-specific styles
import pageStyles from "./EmpleadoHomePage.module.css";
// Import styles for specific sections
import quickActionsStyles from "./QuickActions.module.css";
import announcementsStyles from "./Announcements.module.css";
import projectStyles from "./ProjectRecommendations.module.css";

// Mock data - in a real app, this would come from props or API
const MOCK_RECOMMENDED_PROJECTS = [
  {
    idproyecto: 1,
    pnombre: "Proyecto Pepsi",
    matchPercentage: 98,
    skills: ["JavaScript", "C++"],
    userSkills: ["JavaScript"],
    status: "open"
  },
  {
    idproyecto: 2,
    pnombre: "Proyecto Coca-Cola",
    matchPercentage: 85,
    skills: ["React", "Node.js", "MongoDB"],
    userSkills: ["React", "Node.js"],
    status: "open"
  },
  {
    idproyecto: 3,
    pnombre: "Proyecto Nestlé",
    matchPercentage: 75,
    skills: ["Python", "Django", "PostgreSQL"],
    userSkills: ["Python"],
    status: "open"
  }
];

const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    icon: "bi-megaphone-fill",
    text: "A lot of very important announcements are being made right now!",
    type: "important"
  },
  {
    id: 2,
    icon: "bi-chat-dots-fill",
    text: "A la bio a la bau, a la bim bom ba, Leo, Leo, RA RA RA!! Come and celebrate Leo right now!",
    type: "celebration"
  },
  {
    id: 3,
    icon: "bi-info-circle-fill",
    text: "Look at the newest insights from our Accenture Analytics Team on the most trending skills.",
    type: "info"
  }
];

export const EmpleadoHome = () => {
  const navigate = useNavigate();
  const [recommendedProjects] = useState(MOCK_RECOMMENDED_PROJECTS);
  const [announcements] = useState(MOCK_ANNOUNCEMENTS);

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
      icon: "bi-easel",
      title: "Project Dashboard",
      path: "/empleado/dashboard"
    },
    {
      id: 3,
      icon: "bi-clipboard2-check-fill",
      title: "My Projects",
      path: "/empleado/proyectos"
    }
  ];

  return (
    <div className={pageStyles.homeLayout}>
      {/* Header Section */}
      <div className={pageStyles.headerSection}>
        <h1 className={pageStyles.mainTitle}>Welcome back, Steely Dan</h1>
        <h3 className={pageStyles.subtitle}>Ready to explore your next big project?</h3>
      </div>

      <div className={pageStyles.mainContentWrapper}>
        {/* Left Column - Project Recommendations */}
        <div className={pageStyles.homeColumnLeft}>
          <GlassCard className={pageStyles.recommendationsSection}>
            <h2 className={projectStyles.sectionTitle}>Recommended Projects</h2>
            <div style={{ height: '600px', position: 'relative' }}>
              <GlassFade fadeType="glass" fadeBackground="glass" fadeHeight="auto" style={{ height: '100%' }}>
                <div className={projectStyles.projectsContainer}>
                  {recommendedProjects.map((project) => (
                    <div key={project.idproyecto} className={projectStyles.projectCard}>
                      <div className={projectStyles.projectHeader}>
                        <h3 className={projectStyles.projectName}>{project.pnombre}</h3>
                        <span className={projectStyles.matchPercentage}>{project.matchPercentage}%</span>
                      </div>
                      <div className={projectStyles.skillsContainer}>
                        {project.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className={`${projectStyles.skillTag} ${project.userSkills.includes(skill) ? projectStyles.userSkill : ''}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <button 
                        className={projectStyles.applyButton}
                        onClick={() => handleApplyToProject(project.idproyecto)}
                      >
                        <i className="bi bi-check-circle-fill" />
                        <span>Apply to Project</span>
                      </button>
                    </div>
                  ))}
                </div>
              </GlassFade>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Quick Actions & Announcements */}
        <div className={pageStyles.homeSidebar}>
          {/* Quick Actions */}
          <GlassCard className={pageStyles.sidebarSection}>
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

          {/* Announcements */}
          <GlassCard className={pageStyles.sidebarSection}>
            <h2 className={announcementsStyles.sectionTitle}>Announcements</h2>
            <div style={{ height: '300px', position: 'relative' }}>
              <GlassFade fadeType="glass" fadeBackground="glass" fadeHeight="auto" style={{ height: '100%' }}>
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
              </GlassFade>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
