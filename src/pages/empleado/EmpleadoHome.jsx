import React, { useState, useRef, useEffect } from 'react';
import './EmpleadoHome.css';
import { useNavigate } from "react-router";


// Placeholder images
const pepsiLogo = '/img/pepsi-logo.png';
const user1 = '/img/fotogabo.jpg';
const user2 = '/img/fotogabo.jpg';
const user3 = '/img/fotogabo.jpg';

export const EmpleadoHome = () => {
    const navigate = useNavigate();

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
      {/* Title Section Above the Cards */}
      <div className="section-title-container">
        <h1 className="section-title">Welcome back, Steely Dan</h1>
        <h3 className="page-subtitle">Ready to explore your next big project?</h3>
      </div>

      <div className="proyecto-main-content">
        <div className="leftbar">
            {/* Left Column */}
            <div className="proyecto-details2">
                
            </div>
            <div className="recommend-proyecto">
                <div className="proyecto-details">
                    <h2 className="card-title2">Proyecto Pepsi</h2>
                    <h2 className="card-title2">98%</h2>
                    <div className="skills-list">
                        <span className="skill-tag user-skill">JavaScript</span>
                        <span className="skill-tag">C++</span>
                    </div>
                    <button className="btn btn-primary">
                    <i className="bi bi-check-circle-fill" style={{ marginRight: '0.5rem' }}></i>
                    Apply to Project
                    </button>
                </div>
                <div className="proyecto-details">
                    <h2 className="card-title2">Proyecto Pepsi</h2>
                    <h2 className="card-title2">98%</h2>
                    <div className="skills-list">
                        <span className="skill-tag user-skill">JavaScript</span>
                        <span className="skill-tag">C++</span>
                    </div>
                    <button className="btn btn-primary">
                    <i className="bi bi-check-circle-fill" style={{ marginRight: '0.5rem' }}></i>
                    Apply to Project
                    </button>
                </div>
                <div className="proyecto-details">
                    <h2 className="card-title2">Proyecto Pepsi</h2>
                    <h2 className="card-title2">98%</h2>
                    <div className="skills-list">
                        <span className="skill-tag user-skill">JavaScript</span>
                        <span className="skill-tag">C++</span>
                    </div>
                    <button className="btn btn-primary">
                    <i className="bi bi-check-circle-fill" style={{ marginRight: '0.5rem' }}></i>
                    Apply to Project
                    </button>
                </div>
            </div>
        </div>
        {/* Right Column */}
        <div className="proyecto-sidebar">
          {/* The ref is placed here */}
          <div className="sidebar-section people-section" ref={peopleSectionRef}>
            <h1 className="card-title">Quick Actions</h1>
            <div className="proyecto-dates">
                <div className="quick">
                    <i className="bi bi-person-fill fs-2 p-2"></i>
                    <div>
                        <span className="person-name">My Profile</span>
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/empleado/perfil`)}
                    className="btn btn-icon"
                >
                    <i className="bi bi-arrow-right-circle-fill fs-2 p-2"></i>
                </button>
            </div>
            <div className="proyecto-dates">
                <div className="quick">
                    <i className="bi bi-easel fs-2 p-2"></i>
                    <div>
                        <span className="person-name">Project Dashboard</span>
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/empleado/perfil`)}
                    className="btn btn-icon"
                >
                    <i className="bi bi-arrow-right-circle-fill fs-2 p-2"></i>
                </button>
            </div>
            <div className="proyecto-dates">
                <div className="quick">
                    <i className="bi bi-clipboard2-check-fill fs-2 p-2"></i>
                    <div>
                        <span className="person-name">My Projects</span>
                    </div>
                </div>
                <button className="btn btn-icon"><i className="bi bi-arrow-right-circle-fill fs-2 p-2"></i></button>
            </div>
          </div>

          {/* Skills Section */}
          <div className="sidebar-section people-section">
            <h1 className="card-title">Announcements</h1>
            <div className="announcement-container">
            <div className="quick">
                    <i className="bi bi-megaphone-fill fs-2 p-2"></i>
                    <div>
                        <span className="person-name2">A lot of very important announcements are being made right now!</span>
                    </div>
                </div>
            </div>
            <div className="announcement-container">
                <div className="quick">
                    <i className="bi bi-chat-dots-fill fs-2 p-2"></i>
                    <div>
                        <span className="person-name2">A la bio a la bau, a la bim bom ba, Leo, Leo, RA RA RA!! Come and celebrate Leo right now!</span>
                    </div>
                </div>
            </div>
            <div className="announcement-container">
                <div className="quick">
                    <i className="bi bi-info-circle-fill fs-2 p-2"></i>
                    <div>
                        <span className="person-name2">Look at the newest insights from our Accenture Analytics Team on the most trending skills. </span>
                    </div>
                </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};
