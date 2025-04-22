import React, { useState, useRef, useEffect } from 'react';
import './EmpleadoProyecto.css';

// Placeholder images
const pepsiLogo = '/img/pepsi-logo.png';
const user1 = '/img/fotogabo.jpg';
const user2 = '/img/fotogabo.jpg';
const user3 = '/img/fotogabo.jpg';

export const EmpleadoProyecto = () => {
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);

  // Reference to the entire "People" section container
  const peopleSectionRef = useRef(null);

  const toggleMembersDropdown = () => {
    setIsMembersDropdownOpen(!isMembersDropdownOpen);
  };

  // Add or remove .dropdown-active on the .people-section parent
  useEffect(() => {
    if (peopleSectionRef.current) {
      if (isMembersDropdownOpen) {
        peopleSectionRef.current.classList.add('dropdown-active');
      } else {
        peopleSectionRef.current.classList.remove('dropdown-active');
      }
    }
  }, [isMembersDropdownOpen]);

  // Example list of members
  const members = [
    { id: 1, name: 'Gabriel Martinez', avatar: user1, role: 'Frontend Developer' },
    { id: 2, name: 'Sofia Rodriguez', avatar: user2, role: 'Backend Developer' },
    { id: 3, name: 'Carlos Hernandez', avatar: user3, role: 'UI/UX Designer' },
  ];

  return (
    <div className="empleado-proyecto-container">
      <div className="proyecto-main-content">
        {/* Left Column */}
        <div className="proyecto-details">
          <h1 className="card-title" style={{ fontSize: 35 }}>Project Pepsi</h1>
          <div className="proyecto-dates">
            <span>Start Date: 4/8/2025</span>
            <span>Est. Finish Date: 4/20/2025</span>
          </div>
          <div className="proyecto-progress">
            <div className="progress-bar-wrapper">
              <p className="progress-label">67% Complete</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="proyecto-description">
            <div className="proyecto-description-content">
              {/* Project Goal */}
              <div className="description-section">
                <div className="section-header">
                  <div className="icon-container goal-icon">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h2 className="section-title">Project Goal</h2>
                </div>
                <p className="section-text">
                  Build a mobile app that acts like a social network for Pepsi customers —
                  to share photos, connect, and stay updated.
                </p>
              </div>

              {/* Deliverables */}
              <div className="description-section">
                <div className="section-header">
                  <div className="icon-container deliverables-icon">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <h2 className="section-title">Deliverables</h2>
                </div>
                <ul className="deliverables-list">
                  <li><i className="bi bi-check-lg checkmark-icon"></i> Android & iOS mobile app</li>
                  <li><i className="bi bi-check-lg checkmark-icon"></i> Backend to manage user data & posts</li>
                  <li><i className="bi bi-check-lg checkmark-icon"></i> Secure database</li>
                  <li><i className="bi bi-check-lg checkmark-icon"></i> Admin web portal</li>
                </ul>
              </div>
            </div>
          </div>
          {/* End Description Section */}

          <div className="proyecto-actions">
            <button className="btn btn-secondary">Compatibility</button>
            <button className="btn btn-primary">
              <i className="bi bi-check-circle-fill" style={{ marginRight: '0.5rem' }}></i>
              Apply to Project
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="proyecto-sidebar">
          {/* The ref is placed here */}
          <div className="sidebar-section people-section" ref={peopleSectionRef}>
            <h2 className="card-title">People</h2>
            <div className="person">
              <img src={user1} alt="Roberto Gomez" className="person-avatar" />
              <div>
                <span className="person-name">Roberto Gomez</span>
                <span className="person-role">Creador de Proyecto</span>
              </div>
            </div>
            <div className="person">
              <img src={user2} alt="Felicia Martina" className="person-avatar" />
              <div>
                <span className="person-name">Felicia Martina</span>
                <span className="person-role">Project Manager</span>
              </div>
            </div>
            <div className="person">
              <img src={pepsiLogo} alt="Pepsi Co." className="person-avatar" />
              <div>
                <span className="person-name">Pepsi Co.</span>
                <span className="person-role">Cliente</span>
              </div>
            </div>

            {/* Members Dropdown */}
            <div
              className={`members-dropdown ${isMembersDropdownOpen ? 'open' : ''}`}
              onClick={toggleMembersDropdown}
            >
              <div className="members-dropdown-header">
                <div className="members-text-wrapper">
                  <div className={`stacked-avatars ${isMembersDropdownOpen ? 'hidden' : ''}`}>
                    <img src={user1} alt="Member 1" className="stacked-avatar" />
                    <img src={user2} alt="Member 2" className="stacked-avatar" />
                    <img src={user3} alt="Member 3" className="stacked-avatar" />
                  </div>
                  <span className="members-text">Members</span>
                </div>
                <i
                  className={`dropdown-arrow bi bi-caret-down-fill ${isMembersDropdownOpen ? 'up' : ''}`}
                ></i>
              </div>

              <div className="members-dropdown-content">
                {members.map((member) => (
                  <div key={member.id} className="member-item">
                    <img src={member.avatar} alt={member.name} className="member-avatar-small" />
                    <div>
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End Members Dropdown */}
          </div>

          {/* Skills Section */}
          <div className="sidebar-section skills-section">
            <h2 className="card-title">Skills Required</h2>
            <div className="skills-container">
              <div className="skills-list">
                <span className="skill-tag user-skill">JavaScript</span>
                <span className="skill-tag">C++</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">AI</span>
                <span className="skill-tag user-skill">Agile</span>
                <span className="skill-tag">HR</span>
                <span className="skill-tag user-skill">Figma</span>
                <span className="skill-tag">Photoshop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
