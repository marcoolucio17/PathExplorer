import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ProjectFilterModal.module.css';

/**
 * Modal component for filtering applicants by project
 */
const ProjectFilterModal = ({
  isOpen,
  onClose,
  currentProject = 'All Projects',
  projectOptions = [],
  onSelectProject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);
  
  // Filter projects based on search term
  const filteredProjects = searchTerm 
    ? projectOptions.filter(project => 
        project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projectOptions;
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className={styles.modalBackdrop}>
      <div ref={modalRef} className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.projectsContainer}>
          <div className={styles.projectOption}>
            <button 
              className={`${styles.projectButton} ${currentProject === 'All Projects' ? styles.active : ''}`}
              onClick={() => onSelectProject('All Projects')}
            >
              All Projects
            </button>
          </div>
          
          {filteredProjects.map((project, index) => (
            <div key={index} className={styles.projectOption}>
              <button 
                className={`${styles.projectButton} ${currentProject === project ? styles.active : ''}`}
                onClick={() => onSelectProject(project)}
              >
                {project}
              </button>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className={styles.noResults}>
              <p>No projects found</p>
            </div>
          )}
        </div>
        
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button 
            className={styles.applyButton} 
            onClick={onClose}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

ProjectFilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentProject: PropTypes.string,
  projectOptions: PropTypes.arrayOf(PropTypes.string),
  onSelectProject: PropTypes.func.isRequired
};

export default ProjectFilterModal;