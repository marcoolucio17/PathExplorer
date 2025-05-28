import React, { useState, useEffect } from 'react';
import modalStyles from 'src/styles/Modals/Modal.module.css';
import styles from './SkillsModal.module.css';
import { SkillChip } from "src/components/SkillChip";
import ModalScrollbar from 'src/components/Modals/ModalScrollbar';

//complete skills
const SKILLS_DATA = {
  ".NET Development": ["ASP.NET Core", "Blazor WebAssembly", "C# 12 language features", "Entity Framework Core", "LINQ mastery", "SignalR", "WPF / WinUI 3 desktop apps", ".NET MAUI (cross-platform UI)", ".NET microservices with Dapr", "Azure DevOps pipelines", "Dapper micro-ORM", "Dependency Injection (built-in container)", "gRPC for .NET", "NuGet package management", "Performance profiling (dotTrace)", "Roslyn analyzers & source generators", "Task-based async programming", "Unity / Prism MVVM frameworks", "xUnit / NUnit testing"],
  "AI / Machine Learning Engineering": ["MLOps", "fine-tuning", "model lifecycle", "responsible AI", "vector DBs"],
  "AI-Augmented Development Skills": ["AI code review", "prompt engineering", "workflow orchestration"],
  "API & Integration Design": ["GraphQL", "OpenAPI", "REST", "event streaming Kafka/Pulsar", "gRPC"],
  "AR/VR & 3-D Programming": ["Unity", "Unreal", "WebXR", "shader programming"],
  "AWS Cloud Services": ["AWS API Gateway", "AWS CDK (Cloud Development Kit)", "AWS CloudFormation", "AWS DynamoDB", "AWS ECS", "AWS EKS", "AWS Elastic Beanstalk", "AWS Fargate", "AWS Glue", "AWS IAM (Identity & Access Management)", "AWS Lambda", "AWS Step Functions", "AWS VPC design", "Amazon CloudWatch", "Amazon EC2", "Amazon Kinesis", "Amazon RDS", "Amazon S3", "Amazon SNS", "Amazon SQS"],
  "Blockchain & Smart-Contract Development": ["Hardhat/Foundry", "Solidity", "security audits"],
  "Cloud & DevOps": ["AWS/Azure/GCP", "CI/CD", "Docker", "IaC", "Kubernetes"],
  "Collaboration & Product Skills": ["Git mastery", "agile practices", "architectural writing", "code reviews", "communication"],
  "Core CS Foundations": ["algorithms", "complexity", "data structures", "memory"],
  "Data & Analytics Tools": ["Amazon Redshift", "Apache Superset", "Azure Synapse Analytics", "Google BigQuery", "Informatica PowerCenter", "Looker / Looker Studio", "Power BI", "Snowflake", "Tableau", "Talend Open Studio", "dbt (Core & Cloud)"],
  "Data Engineering & Analytics": ["Airflow", "ETL/ELT", "SQL + NoSQL tuning", "Spark/Flink", "data lakes"],
  "DevOps": ["Ansible", "Argo CD", "GitHub Actions", "GitLab CI/CD", "Helm Charts", "Jenkins", "Packer", "Site Reliability Engineering (SRE)", "Spinnaker", "Terraform Modules & Workspaces"],
  "Front-End Development": ["Angular", "Angular Material", "Next.js", "React 18", "Redux Toolkit / NgRx", "Tailwind CSS", "TypeScript", "Webpack & Vite"],
  "Java Development": ["Apache Kafka (Java client)", "GraalVM Native Image", "Gradle", "Hibernate / JPA", "JUnit & Mockito testing", "JVM GC tuning & performance", "Jakarta EE", "Java Flight Recorder", "Maven", "MicroProfile", "Micronaut", "Quarkus", "Reactive Streams (Reactor / RxJava)", "Spring Boot", "Spring Framework"],
  "Low-/No-Code & RPA": ["Appian", "Mendix", "Power Platform", "UiPath"],
  "Mobile Development": ["Android Jetpack Compose", "Android Studio", "Combine & Async/Await", "Core Data", "Cross-platform Kotlin Multiplatform", "Flutter", "Hilt & Room", "Kotlin + Jetpack Compose", "Objective-C legacy", "React Native", "SwiftUI", "iOS SwiftUI"],
  "Multi-language Fluency": ["C/C++", "Go", "Java/Kotlin", "Python", "Rust", "Swift", "TypeScript/JS"],
  "Observability & Reliability": ["OpenTelemetry", "Prometheus", "SLO/SLA", "incident command", "tracing"],
  "Performance & Scalability Engineering": ["async/reactive patterns", "caching", "load-balancing"],
  "Project Management & Agile": ["Confluence Knowledge Bases", "Jira Administration", "Kanban Flow", "OKR Road-mapping", "PMI / PMP framework", "PRINCE2", "Risk & Issue Management", "SAFe 5.0", "Scrum Mastery"],
  "Quantum & Edge Computing Basics": ["Q#", "Qiskit", "edge orchestration"],
  "SAP Solutions": ["ABAP OO", "SAP BTP (Business Technology Platform)", "SAP Fiori UX", "SAP HANA modelling", "SAP Integration Suite / PI-PO", "SAP S/4HANA Extensibility", "SAP SuccessFactors", "SAP UI5"],
  "SQL & Databases": ["Cassandra", "InfluxDB (time-series)", "Microsoft SQL Server", "MongoDB", "MySQL / MariaDB", "Neo4j", "Oracle Database", "PostgreSQL", "Redis", "SQLite"],
  "Security & DevSecOps": ["IAM", "OWASP", "SAST/DAST", "SBOM", "threat modeling", "zero-trust"],
  "Soft Skills": ["Accountability", "Active Listening", "Adaptability", "Collaboration", "Communication", "Conflict Resolution", "Creativity & Innovation", "Critical Thinking", "Cultural Awareness", "Decision-Making", "Emotional Intelligence", "Empathy", "Facilitation", "Flexibility", "Growth Mindset", "Leadership", "Mentoring & Coaching", "Negotiation", "Networking", "Presentation Skills", "Prioritization", "Problem-Solving", "Public Speaking", "Resilience", "Self-Motivation", "Stakeholder Management", "Stress Management", "Teamwork", "Technical Writing", "Time Management"],
  "Software Design & Architecture": ["DDD", "OOP", "functional", "micro-/event-driven services"],
  "Systems & Performance Programming": ["C/C++ optimization", "Rust safety", "concurrency", "eBPF", "embedded/IoT"],
  "Testing & Quality Automation": ["Playwright/Cypress", "TDD/BDD", "chaos engineering", "contract testing", "property tests"],
  "UX / UI Design": ["Accessibility (WCAG 2.2)", "Adobe XD", "Design Systems (Storybook, Material 3)", "Figma", "Interaction & Motion Design", "Responsive & Mobile-first Design", "Sketch", "Usability Testing"],
  "Web Front-End Engineering": ["PWA patterns", "React/Next.js", "Svelte", "Vue", "WebAssembly"]
};

//soft skills?
const SOFT_SKILLS_LIST = SKILLS_DATA["Soft Skills"].concat([
  "Git mastery", "agile practices", "architectural writing", "code reviews", "communication"
]);

export const SkillsModal = ({ isOpen, onClose, userSkills = [], onUpdateSkills }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState(new Set(userSkills));
  const [expandedCategories, setExpandedCategories] = useState(new Set()); // Start with all collapsed

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setSelectedSkills(new Set(userSkills));
    }
  }, [isOpen, userSkills]);

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

  const handleSave = () => {
    onUpdateSkills(Array.from(selectedSkills));
    handleClose();
  };

  const getFilteredCategories = () => {
    const filtered = {};
    
    Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
      //category filter first
      let shouldInclude = false;
      
      if (selectedCategory === 'all') {
        shouldInclude = true;
      } else if (selectedCategory === 'hard') {
        //hard skills, exclude soft skill categories
        shouldInclude = category !== 'Soft Skills' && 
                       category !== 'Collaboration & Product Skills' &&
                       category !== 'Project Management & Agile';
      } else if (selectedCategory === 'soft') {
        //soft skills, only include the relevant categories
        shouldInclude = category === 'Soft Skills' || 
                       category === 'Collaboration & Product Skills' ||
                       category === 'Project Management & Agile';
      }
      
      if (shouldInclude) {
        //filter skills by search term
        if (searchTerm) {
          const filteredSkills = skills.filter(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredSkills.length > 0) {
            filtered[category] = filteredSkills;
          }
        } else {
          //no search term, include all skills in the category
          filtered[category] = skills;
        }
      }
    });
    
    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div
      className={`${modalStyles.modalBackdrop} ${isClosing ? modalStyles.closing : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`${modalStyles.modalContent} ${isClosing ? modalStyles.closing : ''}`}
      >
        <button className={modalStyles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.title}>Manage Skills</h2>
          <p className={modalStyles.subtitle}>Add or remove skills from your profile</p>
          <p className={styles.selectedCount}>{selectedSkills.size} skills selected</p>
        
          <div className={styles.searchBox}>
            <i className={`bi bi-search ${styles.searchIcon}`}></i>
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

        <div className={modalStyles.modalBody} style={{ height: 'calc(100% - 200px)' }}>
          {Object.entries(filteredCategories).map(([category, skills]) => (
            <div key={category} className={styles.categorySection}>
              <button
                className={`${styles.categoryHeader} ${expandedCategories.has(category) ? styles.expanded : ''}`}
                onClick={() => toggleCategory(category)}
              >
                <span>{category}</span>
                <i className={`bi bi-chevron-down`}></i>
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
          ))}
        </div>

        <div className={modalStyles.buttonGroup}>
          <button onClick={handleClose} className={modalStyles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={modalStyles.saveButton}>
            <i className="bi bi-check-lg"></i>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};