import React, { useRef } from 'react';
import { GlassCard } from '../../../components/shared/GlassCard';
import { ProgressBar } from '../../../components/ProgressBar';
import { MembersDropdown } from '../../../components/MembersDropdown';
// Import page-specific styles
import pageStyles from './EmpleadoProyectoPage.module.css';
// Import styles for specific sections
import detailsStyles from './ProjectDetails.module.css';
import peopleStyles from './PeopleSection.module.css';
import skillsStyles from './SkillsSection.module.css';

// Placeholder images
const pepsiLogo = '/img/pepsi-logo.png';
const user1 = '/img/fotogabo.jpg';
const user2 = '/img/fotogabo.jpg';
const user3 = '/img/fotogabo.jpg';

export const EmpleadoProyectoPage = () => {
  // Reference to the entire "People" section container
  const peopleSectionRef = useRef(null);

  // Example list of members
  const members = [
    { id: 1, name: 'Gabriel Martinez', avatar: user1, role: 'Frontend Developer' },
    { id: 2, name: 'Sofia Rodriguez', avatar: user2, role: 'Backend Developer' },
    { id: 3, name: 'Carlos Hernandez', avatar: user3, role: 'UI/UX Designer' },
  ];

  return (
    <div className={pageStyles.empleadoProyectoContainer}>
      <div className={pageStyles.proyectoMainContent}>
        {/* Left Column */}
        <div className={pageStyles.proyectoDetails}>
          <h1 className={detailsStyles.cardTitle}>Project Pepsi</h1>
          <div className={detailsStyles.proyectoHeader}>
            <img src={pepsiLogo} alt="Pepsi" className={detailsStyles.pepsiLogo} />
          </div>
          <div className={detailsStyles.proyectoDates}>
            <span>Start Date: 4/8/2025</span>
            <span>Est. Finish Date: 4/20/2025</span>
          </div>
          <div className={detailsStyles.proyectoProgress}>
            <ProgressBar percentage={67} />
          </div>

          {/* Description Section */}
          <div className={detailsStyles.proyectoDescription}>
            <div className={detailsStyles.proyectoDescriptionContent}>
              {/* Project Goal */}
              <div className={detailsStyles.descriptionSection}>
                <div className={detailsStyles.sectionHeader}>
                  <div className={detailsStyles.iconContainer}>
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h2 className={detailsStyles.sectionTitle}>Project Goal</h2>
                </div>
                <p className={detailsStyles.sectionText}>
                  Build a mobile app that acts like a social network for Pepsi customers —
                  to share photos, connect, and stay updated.
                </p>
              </div>

              {/* Deliverables */}
              <div className={detailsStyles.descriptionSection}>
                <div className={detailsStyles.sectionHeader}>
                  <div className={detailsStyles.iconContainer}>
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <h2 className={detailsStyles.sectionTitle}>Deliverables</h2>
                </div>
                <ul className={detailsStyles.deliverablesList}>
                  <li><i className={`bi bi-check-lg ${detailsStyles.checkmarkIcon}`}></i> Android & iOS mobile app</li>
                  <li><i className={`bi bi-check-lg ${detailsStyles.checkmarkIcon}`}></i> Backend to manage user data & posts</li>
                  <li><i className={`bi bi-check-lg ${detailsStyles.checkmarkIcon}`}></i> Secure database</li>
                  <li><i className={`bi bi-check-lg ${detailsStyles.checkmarkIcon}`}></i> Admin web portal</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={detailsStyles.proyectoActions}>
            <button className={`${detailsStyles.btn} ${detailsStyles.btnSecondary}`}>
              Compatibility
            </button>
            <button className={`${detailsStyles.btn} ${detailsStyles.btnPrimary}`}>
              <i className="bi bi-check-circle-fill"></i>
              Apply to Project
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className={pageStyles.proyectoSidebar}>
          <GlassCard className={pageStyles.sidebarSection}>
            <div className={peopleStyles.peopleSection} ref={peopleSectionRef}>
              <h2 className={detailsStyles.cardTitle} style={{ fontSize: '1.35rem' }}>People</h2>
              <div className={peopleStyles.person}>
                <img src={user1} alt="Roberto Gomez" className={peopleStyles.personAvatar} />
                <div>
                  <span className={peopleStyles.personName}>Roberto Gomez</span>
                  <span className={peopleStyles.personRole}>Creador de Proyecto</span>
                </div>
              </div>
              <div className={peopleStyles.person}>
                <img src={user2} alt="Felicia Martina" className={peopleStyles.personAvatar} />
                <div>
                  <span className={peopleStyles.personName}>Felicia Martina</span>
                  <span className={peopleStyles.personRole}>Project Manager</span>
                </div>
              </div>
              <div className={peopleStyles.person}>
                <img src={pepsiLogo} alt="Pepsi Co." className={peopleStyles.personAvatar} />
                <div>
                  <span className={peopleStyles.personName}>Pepsi Co.</span>
                  <span className={peopleStyles.personRole}>Cliente</span>
                </div>
              </div>

              <MembersDropdown members={members} peopleSectionRef={peopleSectionRef} />
            </div>
          </GlassCard>

          {/* Skills Section */}
          <GlassCard className={pageStyles.sidebarSection}>
            <div className={skillsStyles.skillsSection}>
              <h2 className={detailsStyles.cardTitle} style={{ fontSize: '1.35rem' }}>Skills Required</h2>
              <div className={skillsStyles.skillsContainer}>
                <div className={skillsStyles.skillsList}>
                  <span className={`${skillsStyles.skillTag} ${skillsStyles.userSkill}`}>JavaScript</span>
                  <span className={skillsStyles.skillTag}>C++</span>
                  <span className={skillsStyles.skillTag}>Java</span>
                  <span className={skillsStyles.skillTag}>AI</span>
                  <span className={`${skillsStyles.skillTag} ${skillsStyles.userSkill}`}>Agile</span>
                  <span className={skillsStyles.skillTag}>HR</span>
                  <span className={`${skillsStyles.skillTag} ${skillsStyles.userSkill}`}>Figma</span>
                  <span className={skillsStyles.skillTag}>Photoshop</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};