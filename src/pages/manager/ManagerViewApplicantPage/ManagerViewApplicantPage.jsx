import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProgressCircle } from '../../../components/ProgressCircle';
import CustomScrollbar from '../../../components/CustomScrollbar';
import { Tabs } from '../../../components/Tabs';
import { CVModal } from 'src/components/Modals/CVModal';

// Import modular CSS files
import pageStyles from './ManagerViewApplicantPage.module.css';
import profileStyles from './ApplicantProfile.module.css';
import cvStyles from './CurriculumVitae.module.css';
import motivationStyles from './MotivationLetter.module.css';
import skillsStyles from './SkillsSection.module.css';
import compatibilityStyles from './CompatibilitySection.module.css';
import contactStyles from './ContactSection.module.css';

/**
 * Manager View Applicant Page
 * Detailed view of an individual applicant including CV, motivation letter, skills, and actions
 */
export const ManagerViewApplicantPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // States
  const [applicant, setApplicant] = useState(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matchingSkills, setMatchingSkills] = useState([]);
  const [projectSkills, setProjectSkills] = useState([]);
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Tabs configuration
  const tabs = ['Overview', 'Motivation', 'CV', 'Contact'];
  const handleTabClick = (tabName) => setActiveTab(tabName);
  
  // Fetch applicant data
  useEffect(() => {
    // This would be replaced with a real API call in production
    // Example: fetchApplicantData(id).then(data => setApplicant(data));
    
    // Simulate loading delay
    setTimeout(() => {
      const dummyApplicant = {
        id: id || 'app-1',
        name: 'Gabriel Martinez',
        role: 'Full Stack Developer',
        avatar: '/img/fotogabo.jpg',
        email: 'gabriel.martinez@example.com',
        phone: '+52 55 1234 5678',
        location: 'Monterrey, Mexico',
        experience: '5 years',
        education: 'B.S. Computer Science, ITESM',
        appliedDate: '2025-05-10',
        skills: [
          { id: 1, name: 'JavaScript' },
          { id: 2, name: 'React' },
          { id: 3, name: 'Node.js' },
          { id: 4, name: 'TypeScript' },
          { id: 5, name: 'MongoDB' },
          { id: 6, name: 'Git' },
          { id: 7, name: 'Docker' },
          { id: 8, name: 'AWS' }
        ],
        project: {
          id: 'proj-1',
          name: 'Project Pathfinder',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
        },
        referral: {
          name: 'Miguel Rodriguez',
          role: 'Senior Developer',
          avatar: '/img/fotogabo.jpg'
        },
        motivationLetter: `I am excited to apply for the Full Stack Developer position on the Pathfinder project. With 5 years of experience in web development, I believe I can make significant contributions to your team.

Throughout my career, I've focused on building scalable applications using React and Node.js. I've worked on similar projects in the past and understand the challenges involved in creating robust, user-friendly applications.

I'm particularly interested in this project because it aligns with my passion for creating impactful software solutions. I'm eager to join your team and help drive the success of this project.`
      };
      
      setApplicant(dummyApplicant);
      
      // Calculate matching skills
      const matching = dummyApplicant.skills
        .filter(skill => dummyApplicant.project.skills.includes(skill.name))
        .map(skill => skill.name);
      
      setMatchingSkills(matching);
      setProjectSkills(dummyApplicant.project.skills);
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  // Navigate back to applicants list
  const handleBackToApplicants = () => {
    navigate('/manager/applicants');
  };
  
  // Toggle CV Modal
  const toggleCVModal = () => {
    setCvModalOpen(!cvModalOpen);
  };
  
  // Calculate compatibility percentage
  const calculateCompatibility = () => {
    if (!projectSkills.length) return 0;
    return Math.round((matchingSkills.length / projectSkills.length) * 100);
  };
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'Overview':
        return (
          <>
            {/* Application Details */}
            <div className={pageStyles.card}>
              <h3 className={pageStyles.sectionTitle}>
                <i className="bi bi-file-earmark-text"></i> Application Details
              </h3>
              <div className={profileStyles.infoRow}>
                <span className={profileStyles.infoLabel}>Applied For:</span>
                <span className={profileStyles.infoValue}>{applicant.project.name}</span>
              </div>
              <div className={profileStyles.infoRow}>
                <span className={profileStyles.infoLabel}>Date Applied:</span>
                <span className={profileStyles.infoValue}>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
              </div>
              <div className={profileStyles.infoRow}>
                <span className={profileStyles.infoLabel}>Experience:</span>
                <span className={profileStyles.infoValue}>{applicant.experience}</span>
              </div>
              <div className={profileStyles.infoRow}>
                <span className={profileStyles.infoLabel}>Education:</span>
                <span className={profileStyles.infoValue}>{applicant.education}</span>
              </div>
            </div>

            {/* Employee Referral Card */}
            {applicant.referral && (
              <div className={pageStyles.card}>
                <h3 className={pageStyles.sectionTitle}>
                  <i className="bi bi-person-check"></i> Employee Referral
                </h3>
                <div className={profileStyles.referralCard}>
                  <img 
                    src={applicant.referral.avatar} 
                    alt={`${applicant.referral.name} avatar`} 
                    className={profileStyles.referralAvatar}
                  />
                  <div className={profileStyles.referralInfo}>
                    <h4 className={profileStyles.referralName}>{applicant.referral.name}</h4>
                    <p className={profileStyles.referralRole}>{applicant.referral.role}</p>
                  </div>
                  <div className={profileStyles.referralBadge}>Internal</div>
                </div>
              </div>
            )}
          </>
        );
      
      case 'Motivation':
        return (
          <div className={pageStyles.card}>
            <h3 className={pageStyles.sectionTitle}>
              <i className="bi bi-chat-quote"></i> Motivation Letter
            </h3>
            <p className={motivationStyles.motivationText}>{applicant.motivationLetter}</p>
          </div>
        );
      
      case 'CV':
        return (
          <div className={pageStyles.card}>
            <h3 className={pageStyles.sectionTitle}>
              <i className="bi bi-file-earmark-person"></i> Curriculum Vitae
            </h3>
            <img 
              src="/imagesUser/Computer-Science-Resume-Example.png" 
              alt="CV Preview" 
              className={cvStyles.cvPreview}
              onClick={toggleCVModal}
            />
            <button 
              className={cvStyles.viewFullButton}
              onClick={toggleCVModal}
            >
              View Full CV
            </button>
          </div>
        );
      
      case 'Contact':
        return (
          <div className={pageStyles.card}>
            <h3 className={pageStyles.sectionTitle}>
              <i className="bi bi-person-lines-fill"></i> Contact Information
            </h3>
            <div className={contactStyles.contactInfo}>
              <div className={contactStyles.contactDetail}>
                <i className="bi bi-envelope"></i>
                <span className={contactStyles.contactValue}>{applicant.email}</span>
              </div>
              <div className={contactStyles.contactDetail}>
                <i className="bi bi-telephone"></i>
                <span className={contactStyles.contactValue}>{applicant.phone}</span>
              </div>
              <div className={contactStyles.contactDetail}>
                <i className="bi bi-geo-alt"></i>
                <span className={contactStyles.contactValue}>{applicant.location}</span>
              </div>
            </div>
            <div className={pageStyles.divider}></div>
            <div className={profileStyles.contactButtons}>
              <button className={profileStyles.contactButton}>
                <i className="bi bi-envelope"></i> Email
              </button>
              <button className={profileStyles.contactButton}>
                <i className="bi bi-telephone"></i> Call
              </button>
              <button className={`${profileStyles.contactButton} ${profileStyles.primary}`}>
                <i className="bi bi-chat-dots"></i> Message
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Tab content not found</div>;
    }
  };
  
  if (isLoading) {
    return (
      <div className={pageStyles.applicantDetailContainer}>
        <div className={pageStyles.loadingState}>
          <h1>Loading Applicant Details...</h1>
        </div>
      </div>
    );
  }
  
  if (!applicant) {
    return (
      <div className={pageStyles.applicantDetailContainer}>
        <div className={pageStyles.errorState}>
          <h1>Applicant Not Found</h1>
          <p>The applicant you're looking for could not be found.</p>
          <button 
            className={`${profileStyles.contactButton} ${profileStyles.primary}`}
            onClick={handleBackToApplicants}
          >
            Return to Applicants List
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={pageStyles.applicantDetailContainer}>
      <div className={pageStyles.dashboardContent}>
        {/* Page header with back button */}
        <div className={pageStyles.pageHeader}>
          <button 
            className={pageStyles.backButton}
            onClick={handleBackToApplicants}
          >
            <i className="bi bi-arrow-left"></i> Back to Applicants
          </button>
        </div>
        
        {/* Main content area */}
        <div className={pageStyles.applicantDetail}>
          {/* Left Column with tabs */}
          <div className={pageStyles.mainContent}>
            {/* Applicant header */}
            <div className={pageStyles.applicantHeader}>
              <img 
                src={applicant.avatar} 
                alt={`${applicant.name} profile`} 
                className={profileStyles.applicantAvatar}
              />
              <div className={profileStyles.applicantInfo}>
                <h2 className={profileStyles.applicantName}>{applicant.name}</h2>
                <p className={profileStyles.applicantRole}>{applicant.role}</p>
              </div>
            </div>
            
            {/* Tabs navigation */}
            <Tabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onTabClick={handleTabClick} 
            />
            
            {/* Tab content area with scrolling */}
            <div className={pageStyles.tabContent}>
              <CustomScrollbar fadeHeight={20}>
                {renderTabContent()}
              </CustomScrollbar>
            </div>
          </div>
          
          {/* Right Column - Sidebar split into 2 sections */}
          <div className={pageStyles.sidebar}>
            {/* Top sidebar section - Compatibility and Skills */}
            <div className={pageStyles.sidebarSection}>
              <h3 className={pageStyles.sectionTitle}>
                <i className="bi bi-pie-chart"></i> Project Compatibility
              </h3>
              <div className={compatibilityStyles.compatibilityContainer}>
                <ProgressCircle 
                  value={calculateCompatibility()}
                  size={90} 
                  strokeWidth={8}
                  title="Match"
                />
                <h3 className={compatibilityStyles.compatibilityScore}>{calculateCompatibility()}% Match</h3>
                <p className={compatibilityStyles.compatibilityText}>
                  Matching {matchingSkills.length} of {projectSkills.length} required skills
                </p>
              </div>
              
              <div className={pageStyles.divider}></div>
              
              <h3 className={pageStyles.sectionTitle}>
                <i className="bi bi-braces"></i> Skills
              </h3>
              <div className={pageStyles.sidebarContent}>
                <div className={skillsStyles.skillsContainer}>
                  {applicant.skills.map(skill => (
                    <div 
                      key={skill.id}
                      className={`${skillsStyles.skillTag} ${matchingSkills.includes(skill.name) ? skillsStyles.match : ''}`}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bottom sidebar section - Action buttons */}
            <div className={pageStyles.sidebarSection}>
              <h3 className={pageStyles.sectionTitle}>
                <i className="bi bi-check2-square"></i> Application Actions
              </h3>
              <div className={profileStyles.actionButtons}>
                <button className={`${profileStyles.actionButton} ${profileStyles.primary}`}>
                  <i className="bi bi-check-circle"></i> Accept Application
                </button>
                <button className={`${profileStyles.actionButton} ${profileStyles.secondary}`}>
                  <i className="bi bi-calendar"></i> Schedule Interview
                </button>
                <button className={`${profileStyles.actionButton} ${profileStyles.neutral}`}>
                  <i className="bi bi-x-circle"></i> Decline
                </button>
                <button className={`${profileStyles.actionButton} ${profileStyles.neutral}`}>
                  <i className="bi bi-archive"></i> Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CV Modal */}
      {cvModalOpen && (
        <div className={cvStyles.modalBackdrop} onClick={toggleCVModal}>
          <div className={cvStyles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={cvStyles.closeButton} onClick={toggleCVModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className={cvStyles.modalHeader}>
              <h3 className={cvStyles.title}>Curriculum Vitae</h3>
              <p className={cvStyles.subtitle}>{applicant.name}</p>
            </div>
            
            <div className={cvStyles.modalBody}>
              <img 
                src="/imagesUser/Computer-Science-Resume-Example.png" 
                alt="Full CV" 
                className={cvStyles.cvFull}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};