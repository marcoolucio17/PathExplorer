import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ApplicantsList from "../../../components/ApplicantsList";
import CustomScrollbar from '../../../components/CustomScrollbar';
import { SkillsModal } from "../../../components/SkillsModal";
import { DenialReasonModal } from "../../../components/DenialReasonModal";
import { SearchHeader } from "../../../components/SearchHeader";
import { Tabs } from "../../../components/Tabs";
import Button from '../../../components/shared/Button';

// Hooks
import { useGetFetch } from '../../../hooks/useGetFetch';

// Global CSS is now imported via index.css, no need for CSS modules

/**
 * Applicants component for Manager role
 * Shows all applicants for the manager's projects with tabs for different application statuses
 */
export const ManagerApplicantsPage = () => {
  const navigate = useNavigate();
  
  // States for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [skillSelected, setSkillSelected] = useState('Skills');
  const [showCompatibility, setShowCompatibility] = useState(true);
  const [skillsFilterModalOpen, setSkillsFilterModalOpen] = useState(false);
  const [selectedSkillFilters, setSelectedSkillFilters] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [projectFilterModalOpen, setProjectFilterModalOpen] = useState(false);
  
  // Denial Reason Modal state
  const [denialReasonModalOpen, setDenialReasonModalOpen] = useState(false);
  const [selectedDeniedApplicant, setSelectedDeniedApplicant] = useState(null);
  
  // Tab functionality
  const [activeTab, setActiveTab] = useState('Pending');
  const tabNames = ['Pending', 'In Review', 'Accepted', 'Denied'];

  // Animation state for applicant cards
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  // Fetch data for applicants, skills, and projects
  const { data: data_applicants, error } = useGetFetch({ 
    rutaApi: `applicants`, 
    nombre: searchTerm, 
    condicion1: skillSelected,
    condicion2: projectFilter !== 'All Projects' ? projectFilter : ''
  });
  
  const { data: data_skills, error: error2 } = useGetFetch({ 
    rutaApi: `skills`, 
    nombre: '', 
    condicion1: 'Skills' 
  });

  const { data: data_projects, error: error3 } = useGetFetch({ 
    rutaApi: `projects`, 
    nombre: '', 
    condicion1: 'Projects' 
  });

  // Filter applicants based on selected skills, project, search term, and active tab
  useEffect(() => {
    if (data_applicants) {
      // Always start with loading state for proper animation
      setIsLoading(true); 
      
      // When there are no filters, populate with dummy data
      if (selectedSkillFilters.length === 0 && projectFilter === 'All Projects' && !searchTerm) {
        // Using dummy data for now
        const dummyApplicants = Array(20).fill().map((_, index) => ({
          id: `app-${index + 1}`,
          name: `Applicant ${index + 1}`,
          avatar: "/img/fotogabo.jpg",
          role: `Developer ${(index % 3) + 1}`,
          project: `Project ${(index % 4) + 1}`,
          skills: [
            { nombre: 'JavaScript' },
            { nombre: 'React' },
            { nombre: 'Node.js' },
            { nombre: 'CSS' }
          ],
          applications: [
            { proyecto: { pnombre: `Project ${(index % 4) + 1}` } }
          ],
          experience: `${index + 1} years`,
          lastActive: '2 days ago',
          // Assign status based on index to distribute among tabs
          status: index % 4 === 0 ? 'Pending' : (index % 4 === 1 ? 'In Review' : (index % 4 === 2 ? 'Accepted' : 'Denied'))
        }));
        setFilteredApplicants(dummyApplicants);
      } else {
        // Start with all applicants (or dummy data since we don't have real data)
        let baseApplicants = data_applicants;
        if (!baseApplicants || baseApplicants.length === 0) {
          baseApplicants = Array(20).fill().map((_, index) => ({
            id: `app-${index + 1}`,
            name: `Applicant ${index + 1}`,
            avatar: "/img/fotogabo.jpg",
            role: `Developer ${(index % 3) + 1}`,
            project: `Project ${(index % 4) + 1}`,
            skills: [
              { nombre: 'JavaScript' },
              { nombre: 'React' },
              { nombre: 'Node.js' },
              { nombre: 'CSS' }
            ],
            applications: [
              { proyecto: { pnombre: `Project ${(index % 4) + 1}` } }
            ],
            experience: `${index + 1} years`,
            lastActive: '2 days ago',
            status: index % 4 === 0 ? 'Pending' : (index % 4 === 1 ? 'In Review' : (index % 4 === 2 ? 'Accepted' : 'Denied'))
          }));
        }
        
        let filtered = [...baseApplicants];
        
        // Apply search filter
        if (searchTerm) {
          filtered = filtered.filter(applicant => 
            applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.project.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        // Filter by skills if any selected
        if (selectedSkillFilters.length > 0) {
          filtered = filtered.filter(applicant => 
            applicant.skills && applicant.skills.some(skill => 
              selectedSkillFilters.includes(skill.nombre)
            )
          );
        }
        
        // Filter by project if not "All Projects"
        if (projectFilter !== 'All Projects') {
          filtered = filtered.filter(applicant => 
            applicant.project === projectFilter || // Filter by project field
            (applicant.applications && 
             applicant.applications.some(app => 
               app.proyecto.pnombre === projectFilter ||
               app.proyecto === projectFilter
             ))
          );
        }
        
        setFilteredApplicants(filtered);
      }

      // Longer delay for initial load animation
      setTimeout(() => {
        setShouldAnimate(true);
        setIsLoading(false);
      }, 500);
    }
  }, [data_applicants, selectedSkillFilters, projectFilter, searchTerm]);

  // Trigger animation when tab changes
  useEffect(() => {
    // Animate cards when tab changes
    setShouldAnimate(false);
    setIsLoading(true);
    
    // Clear any existing timeouts to prevent animation conflicts
    clearTimeout(window.tabAnimationTimer);
    
    // Use a short delay to allow the state to update
    window.tabAnimationTimer = setTimeout(() => {
      setShouldAnimate(true);
      setIsLoading(false);
    }, 300);
    
    return () => {
      clearTimeout(window.tabAnimationTimer);
    };
  }, [activeTab]);

  // Update view when filteredApplicants changes
  useEffect(() => {
    // First set loading to true to ensure animation runs
    setIsLoading(true);
    
    // Then set to false after a delay to trigger animation
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    // Check if we need to refresh the current tab view
    // This helps when filters change but we stay on the same tab
    const tabApplicants = filteredApplicants.filter(app => app.status === activeTab);
    if (tabApplicants.length === 0 && filteredApplicants.length > 0) {
      // We have applicants but none in the current tab,
      // maybe we should switch to a tab that has applicants
      const tabsWithApplicants = tabNames.filter(tab => 
        filteredApplicants.some(app => app.status === tab)
      );
      
      if (tabsWithApplicants.length > 0) {
        // Switch to the first tab that has applicants
        handleTabChange(tabsWithApplicants[0]);
      }
    }
  }, [filteredApplicants]);
  
  // Use useLayoutEffect for filter changes to ensure DOM updates before paint
  useLayoutEffect(() => {
    // When project filter or search term changes, trigger animation sequence
    triggerAnimationSequence();
  }, [projectFilter, searchTerm]);

  // Toggle skills filter modal
  const toggleSkillsFilterModal = () => {
    setSkillsFilterModalOpen(!skillsFilterModalOpen);
  };

  // Toggle project filter modal
  const toggleProjectFilterModal = () => {
    if (projectFilterModalOpen) {
      // Add closing animation
      const modal = document.querySelector(`.modal-content`);
      const backdrop = document.querySelector(`.modal-backdrop`);
      
      if (modal && backdrop) {
        modal.classList.add('closing');
        backdrop.classList.add('closing');
        
        setTimeout(() => {
          setProjectFilterModalOpen(false);
        }, 300); // Match animation duration
      } else {
        setProjectFilterModalOpen(false);
      }
    } else {
      setProjectFilterModalOpen(true);
    }
  };

  // Toggle compatibility view
  const toggleCompatibility = () => {
    setShowCompatibility(!showCompatibility);
  };

  // Toggle view mode (grid/list)
  const toggleViewMode = () => {
    // Set loading state to true to trigger animation
    setIsLoading(true);
    
    // Toggle the view mode
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    
    // After a short delay, turn off loading to animate cards in
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  // Apply skills filters
  const handleApplySkillFilters = (selectedSkills) => {
    setSelectedSkillFilters(selectedSkills);
    
    // Update the Skills button text based on selected skills
    if (selectedSkills.length > 0) {
      setSkillSelected(`${selectedSkills.length} skills`);
    } else {
      setSkillSelected('Skills');
    }
  };

  // Apply project filter
  const handleSelectProject = (projectName) => {
    setProjectFilter(projectName);
    setProjectFilterModalOpen(false);
    
    // Force refresh of the current tab's content when project filter changes
    setIsLoading(true);
    
    // Use a small timeout to allow the state to update
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  // Remove a specific skill filter
  const removeSkillFilter = (skillToRemove) => {
    const updatedSkills = selectedSkillFilters.filter(skill => skill !== skillToRemove);
    handleApplySkillFilters(updatedSkills);
  };

  // Clear all skill filters
  const clearAllSkillFilters = () => {
    handleApplySkillFilters([]);
  };

  // Clear project filter
  const clearProjectFilter = () => {
    setProjectFilter('All Projects');
  };

  // Handle tab change
  const handleTabChange = (tabName) => {
    // Don't do anything if it's already the active tab
    if (tabName === activeTab) return;
    
    // Cancel any previous animations
    clearTimeout(window.tabChangeTimeout);
    clearTimeout(window.opacityTimeout);
    
    // Set loading state first to trigger animations
    setIsLoading(true);
    setShouldAnimate(false);
    
    // Change the tab
    window.tabChangeTimeout = setTimeout(() => {
      // Change the active tab
      setActiveTab(tabName);
      
      // Delay setting filtered applicants to allow for animation
      setTimeout(() => {
        // Filter applicants based on the selected tab
        const filtered = filteredApplicants.filter(applicant => 
          applicant.status === tabName
        );
        
        // Turn off loading and enable animations after a delay
        setTimeout(() => {
          setShouldAnimate(true);
          setIsLoading(false);
        }, 300);
      }, 100);
    }, 100);
  };

  // Function to calculate matching percentage (would be replaced with real data from backend)
  const calculateMatchPercentage = (applicant) => {
    if (!applicant) return 0;
    
    // This is a placeholder implementation
    // In a real app, you would compare applicant skills with project requirements
    return Math.floor(Math.random() * 101); // Random value between 0-100 for demo
  };
  
  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/manager/dashboard');
  };

  // View applicant details
  const handleViewApplicant = (applicantId) => {
    // If viewing a denied applicant, show the denial reason modal
    const applicant = filteredApplicants.find(app => app.id === applicantId);
    if (applicant && applicant.status === 'Denied') {
      setSelectedDeniedApplicant(applicant);
      setDenialReasonModalOpen(true);
    } else {
      navigate(`/manager/applicants/${applicantId}`);
    }
  };
  
  // Handle accepting a denied applicant
  const handleAcceptDeniedApplicant = (applicant) => {
    const updatedApplicants = filteredApplicants.map(app => {
      if (app.id === applicant.id) {
        return { ...app, status: 'In Review' };
      }
      return app;
    });
    setFilteredApplicants(updatedApplicants);
    // In a real app, you would make an API call to update the applicant status
  };
  
  // Handle appeal for a denied applicant
  const handleAppealDeniedApplicant = (applicant, appealReason) => {
    console.log(`Appeal submitted for ${applicant.name}: ${appealReason}`);
    // In a real app, you would make an API call to submit the appeal
  };

  // Get filtered applicants for the current tab
  const getTabApplicants = () => {
    return filteredApplicants.filter(applicant => applicant.status === activeTab);
  };

  // Animation sequence - call this when changing tabs or filters
  const triggerAnimationSequence = () => {
    // First, set loading to true to hide cards
    setIsLoading(true);
    setShouldAnimate(false);
    
    // Clear any previous animation timers
    clearTimeout(window.animationTimer);
    
    // Delay to ensure DOM updates
    window.animationTimer = setTimeout(() => {
      // Then turn off loading to begin staggered animation
      setIsLoading(false);
      setShouldAnimate(true);
    }, 300);
  };

  // Handle Clear Filters from the empty state
  const handleClearFilters = () => {
    clearAllSkillFilters();
    clearProjectFilter();
  };

  // Get count of applicants for each tab (for badges)
  const getTabCounts = () => {
    const counts = {
      Pending: 0,
      'In Review': 0,
      Accepted: 0,
      Denied: 0
    };
    
    filteredApplicants.forEach(applicant => {
      if (counts[applicant.status] !== undefined) {
        counts[applicant.status]++;
      }
    });
    
    return counts;
  };

  const tabCounts = getTabCounts();

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <Button 
            type="secondary"
            variant="back"
            icon="bi bi-arrow-left"
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          </Button>
          <h1 className="page-title">Project Applicants</h1>
        </div>
        
        <SearchHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by Name..."
          searchName="searchApplicants"
          labelText="Filter by:"
          viewToggle={true}
          viewMode={viewMode}
          setViewMode={toggleViewMode}
          filterButtons={[
            {
              label: projectFilter,
              onClick: toggleProjectFilterModal,
              type: 'secondary',
              isActive: projectFilter !== 'All Projects',
              badgeCount: projectFilter !== 'All Projects' ? 1 : 0
            },
            {
              label: skillSelected,
              onClick: toggleSkillsFilterModal,
              type: 'secondary',
              isActive: selectedSkillFilters.length > 0,
              badgeCount: selectedSkillFilters.length > 0 ? selectedSkillFilters.length : 0
            },
            {
              label: "Compability",
              onClick: toggleCompatibility,
              type: 'primary',
              isActive: showCompatibility,
              badgeCount: 0
            }
          ]}
          activeFilters={{
            projects: {
              label: "Project",
              values: projectFilter !== 'All Projects' ? [projectFilter] : [],
              color: 'rgba(74, 158, 204, 0.2)',
              borderColor: 'rgba(74, 158, 204, 0.5)'
            },
            skills: {
              label: "Skill",
              values: selectedSkillFilters,
              color: 'rgba(139, 92, 246, 0.2)',
              borderColor: 'rgba(139, 92, 246, 0.5)'
            }
          }}
          onRemoveFilter={(filterType, value) => {
            if (filterType === 'projects') {
              clearProjectFilter();
            } else if (filterType === 'skills') {
              removeSkillFilter(value);
            }
          }}
          onClearFilters={handleClearFilters}
        />

        {/* Use the enhanced Tabs component */}
        <Tabs 
          tabs={tabNames.map(tab => ({
            name: tab,
            notificationCount: tabCounts[tab]
          }))}
          activeTab={activeTab}
          onTabClick={handleTabChange}
        />

        <div className="main-content">
          <div className="applicants-grid">
            <ApplicantsList 
              applicants={getTabApplicants()}
              viewMode={viewMode}
              showCompatibility={showCompatibility}
              activeTab={activeTab}
              isLoading={isLoading}
              calculateMatchPercentage={calculateMatchPercentage}
              onViewRequest={handleViewApplicant}
              onViewReason={handleViewApplicant}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>
      
      {/* Project filter modal */}
      {projectFilterModalOpen && (
        <div className="modal-backdrop" onClick={toggleProjectFilterModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={toggleProjectFilterModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className="modal-header">
              <h3 className="modal-title">Select Project</h3>
              <p className="modal-subtitle">Choose a project to filter applicants</p>
            </div>
            
            <div className="p-4">
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search projects..."
                />
              </div>
            </div>
            
            <div className="modal-body">
              <div className="flex flex-col gap-3">
                <div>
                  <button 
                    className={`btn w-full text-left p-4 ${projectFilter === 'All Projects' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleSelectProject('All Projects')}
                  >
                    All Projects
                  </button>
                </div>
                {/* Use dummy data - would be replaced with data_projects */}
                {['Project 1', 'Project 2', 'Project 3', 'Project 4'].map(project => (
                  <div key={project}>
                    <button 
                      className={`btn w-full text-left p-4 ${projectFilter === project ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleSelectProject(project)}
                    >
                      {project}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={toggleProjectFilterModal}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  toggleProjectFilterModal();
                  // Use animation sequence for consistent animation
                  setTimeout(triggerAnimationSequence, 100);
                }}
              >
                Apply Filter <i className="bi bi-check-lg"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Using the existing SkillsModal component for filtering */}
      <SkillsModal 
        isOpen={skillsFilterModalOpen}
        onClose={() => setSkillsFilterModalOpen(false)}
        userSkills={selectedSkillFilters}
        onUpdateSkills={handleApplySkillFilters}
      />

      {/* Modal for denied applicant details */}
      <DenialReasonModal
        isOpen={denialReasonModalOpen}
        onClose={() => setDenialReasonModalOpen(false)}
        applicant={selectedDeniedApplicant}
        onAccept={handleAcceptDeniedApplicant}
        onAppeal={handleAppealDeniedApplicant}
      />
    </div>
  );
};