import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useModalControl from '../useModalControl';
import useToggleState from '../useToggleState';

/**
 * Main hook for the Profile page
 * 
 * @returns {Object} Complete state and functions for the Profile page
 */
export const useProfilePage = () => {
  const navigate = useNavigate();
  
  //tab names for the profile page
  const tabNames = ['Contact Information', 'Experience', 'Objectives'];
  
  // Modal controls
  const { 
    modals, 
    openModal, 
    closeModal, 
    toggleModal 
  } = useModalControl({
    certificate: false,
    cv: false,
    skills: false,
    addCertificate: false,
    editProfile: false,
    editContact: false,
    editExperience: false,
    editObjectives: false,
    editProfileDetails: false
  });
  
  //profile data states
  const [activeTab, setActiveTab] = useState('Contact Information');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  //user profile data // ALL MOCK
  const [userProfile, setUserProfile] = useState({
    name: "Sammy Garcy",
    title: "Sr. Software Engineer",
    company: "Accenture",
    location: "Monterrey, Nuevo León, Mexico",
    avatarUrl: "/imagesUser/Sammy.png",
    email: "sammy.garcy@accenture.com",
    phone: "+52 81 1234 5678",
    linkedin: "linkedin.com/in/sammygarcy",
    github: "github.com/sammygarcy"
  });
  
  // User skills
  const [userSkills, setUserSkills] = useState([
    "JavaScript", "React", "Node.js", "Python", "SQL", "Git",
    "Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management"
  ]);
  
  // User certificates
  const [userCertificates, setUserCertificates] = useState([
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
  ]);
  
  // User experience
  const [userExperience, setUserExperience] = useState([
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
    }
  ]);
  
  //Enhanced objectives with description and target date
  const [objectives, setObjectives] = useState([
    { 
      id: 1, 
      title: "Complete Q2 Performance Review",
      description: "Complete the self-assessment and gather feedback from peers and supervisors for the quarterly performance review.", 
      targetDate: "2025-06-30",
      completed: false,
      priority: "high"
    },
    { 
      id: 2, 
      title: "Advanced React Course Completion",
      description: "Finish the advanced React course covering React 18 features, concurrent rendering, and advanced patterns.", 
      targetDate: "2025-07-15",
      completed: true,
      priority: "medium"
    },
    { 
      id: 3, 
      title: "Mentor Junior Developer",
      description: "Begin mentoring relationship with a junior developer on the team, providing weekly guidance and code reviews.", 
      targetDate: "2025-08-01",
      completed: false,
      priority: "medium"
    },
    { 
      id: 4, 
      title: "Open Source Contribution",
      description: "Make meaningful contributions to an open-source project, focusing on React or Node.js ecosystems.", 
      targetDate: "2025-09-30",
      completed: false,
      priority: "low"
    },
  ]);
  
  // Soft skills list for categorization -- should move to skill modals- idk why its here im sorry
  const SOFT_SKILLS_LIST = useMemo(() => [
    "Accountability", "Active Listening", "Adaptability", "Collaboration", "Communication", 
    "Conflict Resolution", "Creativity & Innovation", "Critical Thinking", "Cultural Awareness", 
    "Decision-Making", "Emotional Intelligence", "Empathy", "Facilitation", "Flexibility", 
    "Growth Mindset", "Leadership", "Mentoring & Coaching", "Negotiation", "Networking", 
    "Presentation Skills", "Prioritization", "Problem-Solving", "Public Speaking", "Resilience", 
    "Self-Motivation", "Stakeholder Management", "Stress Management", "Teamwork", 
    "Technical Writing", "Time Management", "Git mastery", "agile practices", 
    "architectural writing", "code reviews"
  ], []);
  
  // Categorized skills
  const categorizedSkills = useMemo(() => {
    const hardSkills = userSkills.filter(skill => !SOFT_SKILLS_LIST.includes(skill));
    const softSkills = userSkills.filter(skill => SOFT_SKILLS_LIST.includes(skill));
    
    return { hardSkills, softSkills };
  }, [userSkills, SOFT_SKILLS_LIST]);
  
  // Tab counts (for notification badges)
  const tabCounts = useMemo(() => {
    return {
      'Contact Information': 4, // email, phone, linkedin, github
      'Experience': userExperience.length,
      'Objectives': objectives.filter(obj => !obj.completed).length
    };
  }, [userExperience.length, objectives]);
  
  //handle objective toggle
  const handleObjectiveToggle = useCallback((id) => {
    setObjectives(prev =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  }, []);
  
  // Handle certificate click
  const handleCertificateClick = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    openModal('certificate');
  }, [openModal]);
  
  // Handle skills update
  const handleUpdateSkills = useCallback((newSkills) => {
    setUserSkills(newSkills);
  }, []);
  
  // Handle add certificate
  const handleAddCertificate = useCallback((newCertificate) => {
    setUserCertificates(prev => [...prev, newCertificate]);
  }, []);

  // Handle remove certificate
  const handleRemoveCertificate = useCallback((certificateId) => {
    setUserCertificates(prev => prev.filter(cert => cert.id !== certificateId));
  }, []);
  
  // Modal handlers
  const handleCVClick = useCallback(() => {
    openModal('cv');
  }, [openModal]);
  
  const handleEditClick = useCallback(() => {
    openModal('editProfile');
  }, [openModal]);
  
  const handleSkillsClick = useCallback(() => {
    openModal('skills');
  }, [openModal]);
  
  const handleAddCertificateClick = useCallback(() => {
    openModal('addCertificate');
  }, [openModal]);
  
  //close certificate modal with cleanup
  const closeCertificateModal = useCallback(() => {
    closeModal('certificate');
    //clear selected certificate after a delay to allow modal animation
    setTimeout(() => {
      setSelectedCertificate(null);
    }, 300);
  }, [closeModal]);
  
  //navigate functions
  const handleBack = useCallback(() => {
    navigate('/empleado/dashboard');
  }, [navigate]);
  
  return {
    //Data
    userProfile,
    userSkills,
    userCertificates,
    userExperience,
    objectives,
    categorizedSkills,
    
    // Tab state
    tabNames,
    activeTab,
    setActiveTab,
    tabCounts,
    
    // Search state
    searchTerm,
    setSearchTerm,
    
    // Loading state
    isLoading,
    setIsLoading,
    
    // Modal state
    modals,
    openModal,
    closeModal,
    selectedCertificate,
    
    // Handlers
    handleObjectiveToggle,
    handleCertificateClick,
    handleUpdateSkills,
    handleAddCertificate,
    handleRemoveCertificate,
    handleCVClick,
    handleEditClick,
    handleSkillsClick,
    handleAddCertificateClick,
    closeCertificateModal,
    handleBack,
    
    // Data setters for whne api consumption
    setUserProfile,
    setUserSkills,
    setUserCertificates,
    setUserExperience,
    setObjectives
  };
};

export default useProfilePage;