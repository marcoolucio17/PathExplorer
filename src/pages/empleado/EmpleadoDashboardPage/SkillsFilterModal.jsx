import React, { useState, useEffect } from 'react';
import styles from './SkillsFilterModal.module.css';
import SkillChip from '../../components/SkillChip';

// Sample skills data structure
const SKILLS_DATA = {
  ".NET Development": ["ASP.NET Core", "Blazor WebAssembly", "C# 12 language features", "Entity Framework Core", "LINQ mastery"],
  "AI / Machine Learning Engineering": ["MLOps", "fine-tuning", "model lifecycle", "responsible AI", "vector DBs"],
  "Front-End Development": ["Angular", "Angular Material", "Next.js", "React 18", "Redux Toolkit / NgRx", "Tailwind CSS", "TypeScript"],
  "Java Development": ["Apache Kafka (Java client)", "GraalVM Native Image", "Hibernate / JPA", "JUnit & Mockito testing", "Spring Boot"],
  "Mobile Development": ["Android Jetpack Compose", "Flutter", "Kotlin + Jetpack Compose", "React Native", "SwiftUI", "iOS SwiftUI"],
  "SQL & Databases": ["Cassandra", "InfluxDB", "Microsoft SQL Server", "MongoDB", "MySQL / MariaDB", "Neo4j", "PostgreSQL", "Redis"],
  "Security & DevSecOps": ["IAM", "OWASP", "SAST/DAST", "SBOM", "threat modeling", "zero-trust"],
  "Soft Skills": ["Communication", "Conflict Resolution", "Leadership", "Problem-Solving", "Teamwork", "Time Management"]
};

// List of soft skills for filtering
const SOFT_SKILLS_LIST = SKILLS_DATA["Soft Skills"];

export const SkillsFilterModal = ({ isOpen, onClose, onApplyFilter }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Front-End Development', 'SQL & Databases'])); // Start with some expanded

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const toggleSkill = (skill) => {
    const newSelectedSkills = new Set(selectedSkills);
    if (newSelectedSkills.has(skill)) {
      newSelectedSkills.delete(skill);
    } else {
      newSelectedSkills.add(skill);
    }
    setSelectedSkills(newSelectedSkills);
  };

  const toggleCategory = (category) => {
    const newExpandedCategories = new Set(expandedCategories);
    if (newExpandedCategories.has(category)) {
      newExpandedCategories.delete(category);
    } else {
      newExpandedCategories.add(category);
    }
    setExpandedCategories(newExpandedCategories);
  };

  const handleApplyFilter = () => {
    onApplyFilter(Array.from(selectedSkills));
    handleClose();
  };

  const getFilteredCategories = () => {
    const filtered = {};
    
    Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
      // Apply category filter first
      let shouldInclude = false;
      
      if (selectedCategory === 'all') {
        shouldInclude = true;
      } else if (selectedCategory === 'hard') {
        // For hard skills, exclude soft skill categories
        shouldInclude = category !== 'Soft Skills';
      } else if (selectedCategory === 'soft') {
        // For soft skills, only include the relevant categories
        shouldInclude = category === 'Soft Skills';
      }
      
      if (shouldInclude) {
        // Then filter skills by search term if there is one
        if (searchTerm) {
          const filteredSkills = skills.filter(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredSkills.length > 0) {
            filtered[category] = filteredSkills;
          }
        } else {
          // If no search term, include all skills in the category
          filtered[category] = skills;
        }
      }
    });
    
    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Filter by Skills</h2>
          <p className={styles.subtitle}>Select the skills you want to filter projects by</p>
          <p className={styles.selectedCount}>{selectedSkills.size} skills selected</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'hard' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('hard')}
            >
              Hard Skills
            </button>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'soft' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('soft')}
            >
              Soft Skills
            </button>
          </div>
        </div>

        <div className={styles.skillsContainer}>
          {Object.entries(filteredCategories).length === 0 ? (
            <div className={styles.emptyState}>
              <i className="bi bi-search" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
              <p>No skills found matching your search criteria</p>
            </div>
          ) : (
            Object.entries(filteredCategories).map(([category, skills]) => (
              <div key={category} className={styles.categorySection}>
                <button
                  className={styles.categoryHeader}
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category}</span>
                  <i className={`bi bi-chevron-${expandedCategories.has(category) ? 'up' : 'down'}`}></i>
                </button>
                
                {expandedCategories.has(category) && (
                  <div className={styles.skillsList}>
                    {skills.map(skill => (
                      <SkillChip
                        key={skill}
                        text={skill}
                        iconClass={selectedSkills.has(skill) ? "bi bi-check-circle-fill" : null}
                        isUserSkill={selectedSkills.has(skill)}
                        onClick={() => toggleSkill(skill)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleApplyFilter} className={styles.applyButton}>
            <i className="bi bi-filter"></i>
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};