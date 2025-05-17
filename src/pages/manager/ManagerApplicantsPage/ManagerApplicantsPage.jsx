import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//components
import { ProgressCircle } from '../../../components/ProgressCircle';
import CustomScrollbar from '../../../components/CustomScrollbar';
import { SkillsModal } from "../../../components/SkillsModal";

//hooks
import { useGetFetch } from '../../../hooks/useGetFetch';

//css
import styles from "./ManagerApplicantsPage.module.css";

/**
 * Applicants component for Manager role
 * Shows all applicants for the manager's projects
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

  // Filter applicants based on selected skills and project
  useEffect(() => {
    if (data_applicants) {
      setIsLoading(true); 
      
      // When there are no filters, populate with dummy data
      if (selectedSkillFilters.length === 0 && projectFilter === 'All Projects') {
        // Using dummy data for now
        const dummyApplicants = Array(10).fill().map((_, index) => ({
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
        }));
        setFilteredApplicants(dummyApplicants);
      } else {
        let filtered = [...data_applicants];
        
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
            applicant.applications && applicant.applications.some(app => 
              app.proyecto.pnombre === projectFilter
            )
          );
        }
        
        setFilteredApplicants(filtered);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [data_applicants, selectedSkillFilters, projectFilter]);

  useEffect(() => {
    setIsLoading(false);
  }, [filteredApplicants]);

  // Toggle skills filter modal
  const toggleSkillsFilterModal = () => {
    setSkillsFilterModalOpen(!skillsFilterModalOpen);
  };

  // Toggle project filter modal
  const toggleProjectFilterModal = () => {
    if (projectFilterModalOpen) {
      // Add closing animation
      const modal = document.querySelector(`.${styles.modalContent}`);
      const backdrop = document.querySelector(`.${styles.modalBackdrop}`);
      
      if (modal && backdrop) {
        modal.classList.add(styles.closing);
        backdrop.classList.add(styles.closing);
        
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
    //effect
    const container = document.querySelector(`.${styles.applicantsGrid}`) || 
                      document.querySelector(`.${styles.applicantsList}`);
    if (container) {
      container.style.opacity = '0';
      
      setTimeout(() => {
        setViewMode(viewMode === 'grid' ? 'list' : 'grid');
        setTimeout(() => {
          const newContainer = document.querySelector(`.${styles.applicantsGrid}`) || 
                              document.querySelector(`.${styles.applicantsList}`);
          if (newContainer) {
            newContainer.style.opacity = '1';
          }
        }, 50);
      }, 200);
    } else {
      setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    }
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

  // Function to calculate matching percentage (would be replaced with real data from backend)
  const calculateMatchPercentage = (applicant, project) => {
    if (!applicant || !project) return 0;
    
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
    navigate(`/manager/applicants/${applicantId}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.pageHeader}>
          <button 
            className={styles.backButton}
            onClick={handleBackToDashboard}
          >
            <i className="bi bi-arrow-left"></i> Back to Dashboard
          </button>
          <h1 className={styles.pageTitle}>Project Applicants</h1>
        </div>
        
        <div className={styles.searchHeader}>
          <div className={styles.searchContainer}>
            <i className="bi bi-search"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applicants..."
              className={styles.searchInput}
              aria-label="Search applicants"
            />
          </div>
          
          <div className={styles.filterControls}>
            <span className={styles.filterLabel}>Filter by:</span>
            <button 
              className={`${styles.filterButton} ${projectFilter !== 'All Projects' ? styles.activeFilter : ''}`}
              onClick={toggleProjectFilterModal}
            >
              {projectFilter}
              {projectFilter !== 'All Projects' && (
                <span className={styles.filterBadge}>1</span>
              )}
            </button>
            <button 
              className={`${styles.filterButton} ${selectedSkillFilters.length > 0 ? styles.activeFilter : ''}`}
              onClick={toggleSkillsFilterModal}
            >
              {skillSelected}
              {selectedSkillFilters.length > 0 && (
                <span className={styles.filterBadge}>{selectedSkillFilters.length}</span>
              )}
            </button>
            <button 
              className={`${styles.filterButton} ${showCompatibility ? styles.activeFilter : ''}`}
              onClick={toggleCompatibility}
            >
              Match %
            </button>
            
            {/* View toggle button */}
            <button 
              className={styles.viewToggleButton}
              onClick={toggleViewMode}
              title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              <i className={`bi bi-${viewMode === 'grid' ? 'list' : 'grid-3x3-gap'}`}></i>
            </button>
          </div>
        </div>

        {/* Active filters display */}
        {(selectedSkillFilters.length > 0 || projectFilter !== 'All Projects') && (
          <div className={styles.activeFiltersContainer}>
            <div className={styles.activeFiltersHeader}>
              <h3 className={styles.activeFiltersTitle}>Active Filters:</h3>
              <button 
                className={styles.clearAllButton} 
                onClick={() => {
                  clearAllSkillFilters();
                  clearProjectFilter();
                }}
              >
                Clear All
              </button>
            </div>
            <div className={styles.activeFiltersList}>
              {projectFilter !== 'All Projects' && (
                <div className={styles.activeFilterChip}>
                  Project: {projectFilter}
                  <button 
                    className={styles.removeFilterButton}
                    onClick={clearProjectFilter}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              )}
              
              {selectedSkillFilters.map(skill => (
                <div key={skill} className={styles.activeFilterChip}>
                  {skill}
                  <button 
                    className={styles.removeFilterButton}
                    onClick={() => removeSkillFilter(skill)}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.applicantsContainer}>
          <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
            {filteredApplicants && filteredApplicants.length === 0 ? (
              <div className={styles.emptyApplicantsState}>
                <div className={styles.noApplicantsMessage}>
                  <i className="bi bi-people" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                  <p>No applicants match your selected filters</p>
                  <button 
                    className={styles.clearFiltersButton}
                    onClick={() => {
                      clearAllSkillFilters();
                      clearProjectFilter();
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
                
                {/* Example applicants section - always shown for demo */}
                <div className={styles.exampleSection}>
                  <h3 className={styles.exampleTitle}>Example Applicants</h3>
                  <div className={viewMode === 'grid' ? styles.exampleGrid : styles.exampleList}>
                    {/* Example applicant 1 - Grid View */}
                    {viewMode === 'grid' ? (
                      <div className={`${styles.applicantCard} ${styles.loaded}`}>
                        {showCompatibility && (
                          <div className={styles.compatibilityCircle}>
                            <ProgressCircle 
                              value={87}
                              size={60} 
                              strokeWidth={6}
                              title="Match"
                            />
                          </div>
                        )}
                        
                        <div className={styles.applicantHeader}>
                          <img 
                            className={styles.applicantAvatar} 
                            src="/img/fotogabo.jpg" 
                            alt="Example applicant avatar"
                          />
                          <div className={styles.applicantInfo}>
                            <h3 className={styles.applicantName}>John Anderson</h3>
                            <p className={styles.applicantRole}>Full Stack Developer</p>
                          </div>
                        </div>
                        
                        <div className={styles.applicantDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-briefcase"></i> Experience:
                            </span>
                            <span className={styles.detailValue}>4 years</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-folder"></i> Applied for:
                            </span>
                            <span className={styles.detailValue}>Project Pathfinder</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-clock"></i> Last active:
                            </span>
                            <span className={styles.detailValue}>2 hours ago</span>
                          </div>
                        </div>
                        
                        <div className={styles.applicantFooter}>
                          <div className={styles.applicantSkills}>
                            <div className={styles.skillTag}>React</div>
                            <div className={styles.skillTag}>Node.js</div>
                            <div className={styles.skillTag}>TypeScript</div>
                            <div className={styles.skillTag}>MongoDB</div>
                          </div>
                          
                          <button 
                            className={styles.viewProfileButton}
                            onClick={() => handleViewApplicant('example-1')}
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles.applicantListItem} ${styles.loaded}`}>
                        <div className={styles.applicantHeader}>
                          <img 
                            className={styles.applicantAvatar} 
                            src="/img/fotogabo.jpg" 
                            alt="Example applicant avatar"
                          />
                        </div>
                        
                        <div className={styles.applicantInfo}>
                          <h3 className={styles.applicantName}>John Anderson</h3>
                          <p className={styles.applicantRole}>Full Stack Developer</p>
                        </div>
                        
                        <div className={styles.applicantDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-briefcase"></i> Experience
                            </span>
                            <span className={styles.detailValue}>4 years</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-folder"></i> Project
                            </span>
                            <span className={styles.detailValue}>Project Pathfinder</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-clock"></i> Last active
                            </span>
                            <span className={styles.detailValue}>2 hours ago</span>
                          </div>
                        </div>
                        
                        <div className={styles.applicantFooter}>
                          <div className={styles.applicantSkills}>
                            <div className={styles.skillTag}>React</div>
                            <div className={styles.skillTag}>Node.js</div>
                            <div className={styles.skillTag}>+2</div>
                          </div>
                          
                          <button 
                            className={styles.viewProfileButton}
                            onClick={() => handleViewApplicant('example-1')}
                          >
                            View Profile
                          </button>
                        </div>
                        
                        {showCompatibility && (
                          <div className={styles.compatibilityCircle}>
                            <ProgressCircle 
                              value={87}
                              size={60} 
                              strokeWidth={6}
                              title="Match"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Example applicant 2 */}
                    {viewMode === 'grid' ? (
                      <div className={`${styles.applicantCard} ${styles.loaded}`}>
                        {showCompatibility && (
                          <div className={styles.compatibilityCircle}>
                            <ProgressCircle 
                              value={94}
                              size={60} 
                              strokeWidth={6}
                              title="Match"
                            />
                          </div>
                        )}
                        
                        <div className={styles.applicantHeader}>
                          <img 
                            className={styles.applicantAvatar} 
                            src="/img/fotogabo.jpg" 
                            alt="Example applicant avatar"
                          />
                          <div className={styles.applicantInfo}>
                            <h3 className={styles.applicantName}>Sarah Miller</h3>
                            <p className={styles.applicantRole}>UI/UX Designer</p>
                          </div>
                        </div>
                        
                        <div className={styles.applicantDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-briefcase"></i> Experience:
                            </span>
                            <span className={styles.detailValue}>6 years</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-folder"></i> Applied for:
                            </span>
                            <span className={styles.detailValue}>Visual Redesign</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-clock"></i> Last active:
                            </span>
                            <span className={styles.detailValue}>1 day ago</span>
                          </div>
                        </div>
                        
                        <div className={styles.applicantFooter}>
                          <div className={styles.applicantSkills}>
                            <div className={styles.skillTag}>Figma</div>
                            <div className={styles.skillTag}>UI Design</div>
                            <div className={styles.skillTag}>Prototyping</div>
                            <div className={styles.skillTag}>Adobe XD</div>
                          </div>
                          
                          <button 
                            className={styles.viewProfileButton}
                            onClick={() => handleViewApplicant('example-2')}
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles.applicantListItem} ${styles.loaded}`}>
                        <div className={styles.applicantHeader}>
                          <img 
                            className={styles.applicantAvatar} 
                            src="/img/fotogabo.jpg" 
                            alt="Example applicant avatar"
                          />
                        </div>
                        
                        <div className={styles.applicantInfo}>
                          <h3 className={styles.applicantName}>Sarah Miller</h3>
                          <p className={styles.applicantRole}>UI/UX Designer</p>
                        </div>
                        
                        <div className={styles.applicantDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-briefcase"></i> Experience
                            </span>
                            <span className={styles.detailValue}>6 years</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-folder"></i> Project
                            </span>
                            <span className={styles.detailValue}>Visual Redesign</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-clock"></i> Last active
                            </span>
                            <span className={styles.detailValue}>1 day ago</span>
                          </div>
                        </div>
                        
                        <div className={styles.applicantFooter}>
                          <div className={styles.applicantSkills}>
                            <div className={styles.skillTag}>Figma</div>
                            <div className={styles.skillTag}>UI Design</div>
                            <div className={styles.skillTag}>+2</div>
                          </div>
                          
                          <button 
                            className={styles.viewProfileButton}
                            onClick={() => handleViewApplicant('example-2')}
                          >
                            View Profile
                          </button>
                        </div>
                        
                        {showCompatibility && (
                          <div className={styles.compatibilityCircle}>
                            <ProgressCircle 
                              value={94}
                              size={60} 
                              strokeWidth={6}
                              title="Match"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? styles.applicantsGrid : styles.applicantsList}>
                {filteredApplicants.map((applicant, index) => {
                  // Calculate match percentage
                  const matchPercentage = calculateMatchPercentage(applicant, projectFilter);
                  
                  // Calculate delay for staggered animation
                  const staggerDelay = `${50 + (index * 80)}ms`;
                  
                  // Common content for both views
                  const applicantContent = (
                    <>
                      {/* Show match percentage when enabled */}
                      {showCompatibility && (
                        <div className={styles.compatibilityCircle}>
                          <ProgressCircle 
                            value={matchPercentage}
                            size={60} 
                            strokeWidth={6}
                            title="Match"
                          />
                        </div>
                      )}
                      
                      <div className={styles.applicantHeader}>
                        <img 
                          className={styles.applicantAvatar} 
                          src={applicant.avatar} 
                          alt={`${applicant.name} avatar`}
                        />
                        <div className={styles.applicantInfo}>
                          <h3 className={styles.applicantName}>{applicant.name}</h3>
                          <p className={styles.applicantRole}>{applicant.role}</p>
                        </div>
                      </div>
                      
                      <div className={styles.applicantDetails}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            <i className="bi bi-briefcase"></i> Experience:
                          </span>
                          <span className={styles.detailValue}>{applicant.experience}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            <i className="bi bi-folder"></i> Applied for:
                          </span>
                          <span className={styles.detailValue}>{applicant.project}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            <i className="bi bi-clock"></i> Last active:
                          </span>
                          <span className={styles.detailValue}>{applicant.lastActive}</span>
                        </div>
                      </div>
                      
                      <div className={styles.applicantFooter}>
                        <div className={styles.applicantSkills}>
                          {applicant.skills.map((skill, skillIndex) => (
                            <div 
                              className={`${styles.skillTag} ${selectedSkillFilters.includes(skill.nombre) ? styles.highlightedSkill : ''}`} 
                              key={`${applicant.id}-skill-${skillIndex}`}
                            >
                              {skill.nombre}
                            </div>
                          ))}
                        </div>
                        
                        <button 
                          className={styles.viewProfileButton}
                          onClick={() => handleViewApplicant(applicant.id)}
                        >
                          View Profile
                        </button>
                      </div>
                    </>
                  );
                  
                  // Apply different styles based on view mode
                  if (viewMode === 'grid') {
                    return (
                      <div 
                        className={`${styles.applicantCard} ${isLoading ? styles.loading : styles.loaded}`}
                        key={applicant.id}
                        style={{ '--stagger-delay': staggerDelay }}
                      >
                        {applicantContent}
                      </div>
                    );
                  } else {
                    return (
                      <div 
                        className={`${styles.applicantListItem} ${isLoading ? styles.loading : styles.loaded}`}
                        key={applicant.id}
                        style={{ '--stagger-delay': staggerDelay }}
                      >
                        <div className={styles.applicantHeader}>
                          <img 
                            className={styles.applicantAvatar} 
                            src={applicant.avatar} 
                            alt={`${applicant.name} avatar`}
                          />
                        </div>
                        
                        <div className={styles.applicantInfo}>
                          <h3 className={styles.applicantName}>{applicant.name}</h3>
                          <p className={styles.applicantRole}>{applicant.role}</p>
                        </div>
                        
                        <div className={styles.applicantDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-briefcase"></i> Experience
                            </span>
                            <span className={styles.detailValue}>{applicant.experience}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-folder"></i> Project
                            </span>
                            <span className={styles.detailValue}>{applicant.project}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              <i className="bi bi-clock"></i> Last active
                            </span>
                            <span className={styles.detailValue}>{applicant.lastActive}</span>
                          </div>
                        </div>
                        
                        <div className={styles.applicantFooter}>
                          <div className={styles.applicantSkills}>
                            {applicant.skills.slice(0, 2).map((skill, skillIndex) => (
                              <div 
                                className={`${styles.skillTag} ${selectedSkillFilters.includes(skill.nombre) ? styles.highlightedSkill : ''}`} 
                                key={`${applicant.id}-skill-${skillIndex}`}
                              >
                                {skill.nombre}
                              </div>
                            ))}
                            {applicant.skills.length > 2 && (
                              <div className={styles.skillTag}>+{applicant.skills.length - 2}</div>
                            )}
                          </div>
                          
                          <button 
                            className={styles.viewProfileButton}
                            onClick={() => handleViewApplicant(applicant.id)}
                          >
                            View Profile
                          </button>
                        </div>
                        
                        {showCompatibility && (
                          <div className={styles.compatibilityCircle}>
                            <ProgressCircle 
                              value={matchPercentage}
                              size={60} 
                              strokeWidth={6}
                              title="Match"
                            />
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </CustomScrollbar>
        </div>
      </div>
      
      {/* Project filter modal would be implemented here */}
      {projectFilterModalOpen && (
        <div className={styles.modalBackdrop} onClick={toggleProjectFilterModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={toggleProjectFilterModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className={styles.modalHeader}>
              <h3 className={styles.title}>Select Project</h3>
              <p className={styles.subtitle}>Choose a project to filter applicants</p>
            </div>
            
            <div className={styles.controls}>
              <div className={styles.searchBox}>
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search projects..."
                />
              </div>
            </div>
            
            <div className={styles.projectsContainer}>
              <div className={styles.projectOption}>
                <button 
                  className={`${styles.projectButton} ${projectFilter === 'All Projects' ? styles.active : ''}`}
                  onClick={() => handleSelectProject('All Projects')}
                >
                  All Projects
                </button>
              </div>
              {/* Use dummy data - would be replaced with data_projects */}
              {['Project 1', 'Project 2', 'Project 3', 'Project 4'].map(project => (
                <div key={project} className={styles.projectOption}>
                  <button 
                    className={`${styles.projectButton} ${projectFilter === project ? styles.active : ''}`}
                    onClick={() => handleSelectProject(project)}
                  >
                    {project}
                  </button>
                </div>
              ))}
            </div>
            
            <div className={styles.buttonGroup}>
              <button className={styles.cancelButton} onClick={toggleProjectFilterModal}>
                Cancel
              </button>
              <button 
                className={styles.saveButton} 
                onClick={toggleProjectFilterModal}
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
    </div>
  );
};