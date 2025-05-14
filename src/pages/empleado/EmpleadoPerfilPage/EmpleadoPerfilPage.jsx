import React, { useState } from "react";
// Import components
import { ProfileHeaderCard } from "../../../components/ProfileHeaderCard";
import { Tabs } from "../../../components/Tabs";
import { GlassCard } from "../../../components/shared/GlassCard";
import { SkillChip } from "../../../components/SkillChip";
import { CertificateModal } from "../../../components/CertificateModal";
import { CVModal } from "../../../components/CVModal";
import { SkillsModal } from "../../../components/SkillsModal";
import CustomScrollbar from "../../../components/CustomScrollbar";
import { GlassFade } from "../../../components/GlassFade";
// Import page-specific styles
import pageStyles from "./EmpleadoPerfilPage.module.css";
// Import styles for specific sections
import timelineStyles from "./Timeline.module.css";
import contactInfoStyles from "./ContactInfo.module.css";
import objectivesStyles from "./Objectives.module.css";
import certificateStyles from "./Certificates.module.css";
import skillsStyles from "./Skills.module.css";

const TAB_OPTIONS = ["Contact Information", "Experience", "Objectives"];

// Soft skills list for categorization
const SOFT_SKILLS_LIST = [
  "Accountability", "Active Listening", "Adaptability", "Collaboration", "Communication", 
  "Conflict Resolution", "Creativity & Innovation", "Critical Thinking", "Cultural Awareness", 
  "Decision-Making", "Emotional Intelligence", "Empathy", "Facilitation", "Flexibility", 
  "Growth Mindset", "Leadership", "Mentoring & Coaching", "Negotiation", "Networking", 
  "Presentation Skills", "Prioritization", "Problem-Solving", "Public Speaking", "Resilience", 
  "Self-Motivation", "Stakeholder Management", "Stress Management", "Teamwork", 
  "Technical Writing", "Time Management", "Git mastery", "agile practices", 
  "architectural writing", "code reviews"
];

// Mock data - in a real app, this would come from props or context/API
const MOCK_USER = {
  name: "Sammy Garcy",
  title: "Sr. Software Engineer",
  company: "Accenture",
  location: "Monterrey, Nuevo León, Mexico",
  avatarUrl: "/imagesUser/Sammy.png",
  email: "sammy.garcy@accenture.com",
  phone: "+52 81 1234 5678",
  linkedin: "linkedin.com/in/sammygarcy",
  github: "github.com/sammygarcy"
};

const MOCK_EXPERIENCE = [
  {
    id: 1,
    dateStart: "Jun 2019",
    dateEnd: "Present",
    logo: "/imagesUser/golf-logo.png",
    alt: "Project Golf",
    title: "Sr. Software Engineer on Project Golf",
    description: "Led development of 10 000+ production features that now generate ≈ 1 quintillion USD in value."
  },
  {
    id: 2,
    dateStart: "Jan 2018",
    dateEnd: "May 2019",
    logo: "/imagesUser/trump.png",
    alt: "Project Stargate",
    title: "Lead Architect — Project Stargate",
    description: "Directed the full frontback stack and personally deployed 42 000 features for a classified initiative."
  },
  {
    id: 3,
    dateStart: "Jan 2018",
    dateEnd: "May 2019",
    logo: "/imagesUser/trump.png",
    alt: "Project Stargate",
    title: "Lead Architect — Project Stargate",
    description: "Directed the full frontback stack and personally deployed 42 000 features for a classified initiative."
  },
];

const MOCK_CERTIFICATES = [
  {
    id: 1, 
    img: "/imagesUser/JavaScript-logo.png", 
    alt: "JS", 
    title: "JavaScript Connoisseur", 
    issuer: "Accenture",
    skill: "JavaScript",
    fechaObtenido: "15 de marzo, 2023",
    fechaExpirado: "15 de marzo, 2026",
    certificateImage: "/imagesUser/JavaScript-logo.png",
    credentialId: "JS-2023-1234",
    verifyUrl: "https://accenture.com/verify/JS-2023-1234"
  },
  {
    id: 2, 
    img: "/imagesUser/Python-logo.png", 
    alt: "Python", 
    title: "Python Expert", 
    issuer: "Python Software Foundation",
    skill: "Python",
    fechaObtenido: "22 de enero, 2023",
    fechaExpirado: "15 de marzo, 2026",
    certificateImage: "/imagesUser/Python-logo.png",
    credentialId: "PSF-2023-5678",
    verifyUrl: "https://python.org/verify/PSF-2023-5678"
  }
];

export const EmpleadoPerfilPage = () => {
  const [activeTab, setActiveTab] = useState("Contact Information");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [userSkills, setUserSkills] = useState([
    "JavaScript", "React", "Node.js", "Python", "SQL", "Git",
    "Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management"
  ]);
  const [objectives, setObjectives] = useState([
    { id: 1, text: "Complete Q2 performance review self-assessment", completed: false },
    { id: 2, text: "Finish the advanced React course", completed: true },
    { id: 3, text: "Mentor a junior developer on the team", completed: false },
    { id: 4, text: "Contribute to an open-source project", completed: false },
  ]);

  const handleObjectiveToggle = (id) => {
    setObjectives(
      objectives.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsCertificateModalOpen(true);
  };

  const closeCertificateModal = () => {
    setIsCertificateModalOpen(false);
    // Don't clear the certificate immediately - let the modal handle its own cleanup
  };

  const handleCVClick = () => {
    setIsCVModalOpen(true);
  };

  const closeCVModal = () => {
    setIsCVModalOpen(false);
  };

  const handleEditClick = () => {
    // Handle edit functionality
    console.log("Edit profile clicked");
  };

  const handleSkillsClick = () => {
    setIsSkillsModalOpen(true);
  };

  const closeSkillsModal = () => {
    setIsSkillsModalOpen(false);
  };

  const handleUpdateSkills = (newSkills) => {
    setUserSkills(newSkills);
  };

  const user = MOCK_USER;
  const experienceItems = MOCK_EXPERIENCE;
  const certificates = MOCK_CERTIFICATES;

  return (
    <div className={pageStyles.profileLayout}>
      <div className={pageStyles.mainContentWrapper}>
        {/* Left Column */}
        <div className={pageStyles.profileColumnLeft}>
          <ProfileHeaderCard user={user} />

          <Tabs
            tabs={TAB_OPTIONS}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            actionButtons={
              <>
                <button className={pageStyles.actionBtn} onClick={handleCVClick} title="View CV">
                  <i className="bi bi-file-earmark-text" />
                  <span className={pageStyles.buttonText}>CV</span>
                </button>
                <button className={pageStyles.actionBtn} onClick={handleEditClick} title="Edit Profile">
                  <i className="bi bi-pencil-fill" />
                  <span className={pageStyles.buttonText}>Edit</span>
                </button>
              </>
            }
          />

          <div className={pageStyles.tabContentContainer}>
            {activeTab === "Experience" && (
              <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
                <ul className={timelineStyles.timeline}>
                  {experienceItems.map((item, index) => (
                    <li 
                      key={item.id}
                      style={{
                        '--date-top': '0.5rem',
                        '--date-height': 'auto',
                      }}
                    >
                      <span className={timelineStyles.date}>{item.dateStart} - {item.dateEnd}</span>
                      <div className={timelineStyles.bullet}>
                        <img src={item.logo} alt={item.alt} />
                      </div>
                      <div className={timelineStyles.content}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CustomScrollbar>
            )}
            {activeTab === "Contact Information" && (
              <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showSideFades={true} showHorizontalScroll={true}>
                <div className={contactInfoStyles.contactInfoSection}>
                  <div className={contactInfoStyles.contactItem}>
                    <i className={`bi bi-envelope-fill ${contactInfoStyles.contactIcon}`}></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>Email</span>
                      <p className={contactInfoStyles.contactValue}>{user.email}</p>
                    </div>
                  </div>
                  <div className={contactInfoStyles.contactItem}>
                    <i className={`bi bi-telephone-fill ${contactInfoStyles.contactIcon}`}></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>Phone</span>
                      <p className={contactInfoStyles.contactValue}>{user.phone}</p>
                    </div>
                  </div>
                  <div className={contactInfoStyles.contactItem}>
                    <i className={`bi bi-linkedin ${contactInfoStyles.contactIcon}`}></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>LinkedIn</span>
                      <p className={contactInfoStyles.contactValue}>{user.linkedin}</p>
                    </div>
                  </div>
                  <div className={contactInfoStyles.contactItem}>
                    <i className={`bi bi-github ${contactInfoStyles.contactIcon}`}></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>GitHub</span>
                      <p className={contactInfoStyles.contactValue}>{user.github}</p>
                    </div>
                  </div>
                </div>
              </CustomScrollbar>
            )}
            {activeTab === "Objectives" && (
              <div className={objectivesStyles.objectivesSection}>
                <ul className={objectivesStyles.objectivesList}>
                  {objectives.map((obj) => (
                    <li key={obj.id} className={`${objectivesStyles.objectiveItem} ${obj.completed ? objectivesStyles.completed : ''}`}>
                      <input
                        type="checkbox"
                        id={`objective-${obj.id}`}
                        checked={obj.completed}
                        onChange={() => handleObjectiveToggle(obj.id)}
                        className={objectivesStyles.objectiveCheckbox}
                      />
                      <label htmlFor={`objective-${obj.id}`} className={objectivesStyles.objectiveText}>
                        {obj.text}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className={pageStyles.profileSidebar}>
          <GlassCard className={pageStyles.sidebarSection}>
            <div className={skillsStyles.sectionHeader}>
              <h2 className={skillsStyles.sectionTitle}>My Skills</h2>
              <button className={skillsStyles.sectionAddBtn} onClick={handleSkillsClick}>
                <i className="bi bi-plus-lg" />
              </button>
            </div>
            <div style={{ height: '300px', position: 'relative', flex: 1, minHeight: 0 }}>
              <GlassFade fadeType="glass" fadeBackground="glass" fadeHeight="auto" style={{ height: '100%' }}>
                <div className={skillsStyles.skillsContent}>
                  <div className={skillsStyles.skillCategory}>
                    <h3 className={skillsStyles.categoryHeader}>Hard Skills</h3>
                    <div className={skillsStyles.divider}></div>
                    <div className={skillsStyles.skillChipsContainer}>
                      {userSkills.filter(skill => 
                        // Filter hard skills (technical skills)
                        !["Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management", 
                         "Active Listening", "Critical Thinking", "Adaptability", "Creativity & Innovation"].includes(skill)
                      ).map(skill => (
                        <SkillChip key={skill} text={skill} />
                      ))}
                    </div>
                  </div>
                  
                  <div className={skillsStyles.skillCategory}>
                    <h3 className={skillsStyles.categoryHeader}>Soft Skills</h3>
                    <div className={skillsStyles.divider}></div>
                    <div className={skillsStyles.skillChipsContainer}>
                      {userSkills.filter(skill => 
                        // Filter soft skills
                        ["Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management", 
                         "Active Listening", "Critical Thinking", "Adaptability", "Creativity & Innovation"].includes(skill)
                      ).map(skill => (
                        <SkillChip key={skill} text={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassFade>
            </div>
          </GlassCard>
          
          <GlassCard className={pageStyles.sidebarSection}>
            <div className={certificateStyles.sectionHeader}>
              <h2 className={certificateStyles.sectionTitle}>My certificates</h2>
              <button className={skillsStyles.sectionAddBtn}>
                <i className="bi bi-plus-lg" />
              </button>
            </div>
            <div style={{ height: '400px', position: 'relative', flex: 1, minHeight: 0 }}>
              <GlassFade fadeType="glass" fadeBackground="glass" fadeHeight="auto" style={{ height: '100%' }}>
                {certificates.map(cert => (
                  <article 
                    key={cert.id} 
                    className={certificateStyles.certificate}
                    onClick={() => handleCertificateClick(cert)}
                  >
                    <img src={cert.img} alt={cert.alt} />
                    <div>
                      <h3>{cert.title}</h3>
                      <p>by {cert.issuer}</p>
                    </div>
                  </article>
                ))}
              </GlassFade>
            </div>
          </GlassCard>
        </div>
      </div>

      <CertificateModal 
        certificate={selectedCertificate}
        isOpen={isCertificateModalOpen}
        onClose={closeCertificateModal}
        onAnimationComplete={() => setSelectedCertificate(null)}
      />
      
      <CVModal 
        isOpen={isCVModalOpen}
        onClose={closeCVModal}
      />
      
      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={closeSkillsModal}
        userSkills={userSkills}
        onUpdateSkills={handleUpdateSkills}
      />
    </div>
  );
};