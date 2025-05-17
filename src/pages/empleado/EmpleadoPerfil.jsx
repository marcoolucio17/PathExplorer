import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './EmpleadoPerfil.css';

export const EmpleadoPerfil = () => {
  return (
    <div className="pv-contenedor-Dashboard">
      <div className="pv-left-column-wrapper">

        <div className='pv-top-Part'>
          <div className="pv-profile-title-container">
            <h1 style={{color: 'white'}}>My Profile</h1>
            <div className="pv-profile-actions">
              <button className="pv-action-button pv-view-button">
                <i className="bi bi-eye-fill"></i>
              </button>
              <button className="pv-action-button pv-edit-button">
                <i className="bi bi-pencil-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="pv-employee-info-section">
          <div className="pv-employee-details-left">
            <div className='pv-profile-image-section'>
              <img src="/imagesUser/Sammy.png" alt="User Profile" />
            </div>
            <div className="pv-user-details">
              <h2 style={{ fontWeight: '400', color: 'white', fontSize: '2rem' }}>Sammy Garcy</h2>
              <h2 style={{ fontWeight: 'normal', fontSize: '1.2rem' }}>Sr. Software Engineer @ Accenture</h2>
              <h2 style={{ color: 'gray', fontWeight: 'lighter', fontSize: '1.2rem' }}><i className="bi bi-geo-alt-fill"></i> Monterrey, Nuevo León, México</h2>
            </div>
          </div>

          <div className="pv-project-info-header">
            <img src="/imagesUser/golf-logo.png" alt="Project Logo" className="pv-project-header-logo" />
            <div className="pv-project-header-text">
              <h4>Project Golf</h4>
              <p>by Dad</p>
            </div>
          </div>
        </div>

        <div className="pv-profile-nav-tabs">
          <span className="pv-nav-tab">Contact Information</span>
          <span className="pv-nav-tab pv-active">Experience</span>
          <span className="pv-nav-tab">Objectives</span>
        </div>

        <div className="pv-experience-section">
          <div className="pv-experience-list">
              <div className="pv-experience-item">
                <div className="pv-experience-date">Jun 2019-Present</div>
                <div className="pv-experience-content">
                  <div className="pv-experience-icon">
                     <img src="/imagesUser/golf-logo.png" alt="Project Logo"/>
                  </div>
                  <div className="pv-experience-text">
                    <h4 style={{ textAlign: 'left' }}>Sr. Software Engineer on Project Golf</h4>
                    <p style={{ textAlign: 'left' }}>Worked as a senior software engineer on project golf. During his stay, Sammy developed and supervised more than 10000 features that are currently in production and generating around 1 quintillion dollars in value.</p>
                  </div>
                   <div className="pv-experience-timeline-line"></div>
                </div>
              </div>
              <div className="pv-experience-item">
                 <div className="pv-experience-date">Jan 2018-May 2019</div>
                 <div className="pv-experience-content">
                  <div className="pv-experience-icon">
                     <img src="/imagesUser/trump.png" alt="Project Logo"/>
                  </div>
                  <div className="pv-experience-text">
                    <h4 style={{ textAlign: 'left' }}>Project Stargate</h4>
                    <p style={{ textAlign: 'left' }}>Worked as lead architect on Project Stargate, a top-secret initiative rumored to work on a combination of frontend and backend - they call it "frontback". Sammy personally deployed over 42,000 features</p>
                  </div>
                   <div className="pv-experience-timeline-line"></div>
                </div>
              </div>
            </div>
          </div>

      </div> {/* End of left-column-wrapper */}

      <div className="pv-sidebar-container">
        <div className="pv-certificates-section">
          <div className="d-flex justify-content-between align-items-center">
            <h2>My certificates</h2>
            <div className="pv-certificate-add-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
        <div className="pv-projects-list">
            <div className="pv-project-container">
                 <div className="pv-project-image">
                    <img src="/imagesUser/JavaScript-logo.png" alt="JavaScript Certificate" />
                </div>
                <div className="pv-project-item">
                    <div className="pv-text-content">
                    <h1 style={{ fontWeight: 'normal' }}>JavaScript Connoisseur</h1>
                    <p style={{ fontStyle: 'italic' }}>by Accenture</p>
                    </div>
                </div>
            </div>
             <div className="pv-project-container">
                 <div className="pv-project-image">
                    <img src="/imagesUser/Python-logo.png" alt="Python Certificate" />
                 </div>
                <div className="pv-project-item">
                    <div className="pv-text-content">
                      <h1 style={{ fontWeight: 'normal' }}>Python Expert</h1>
                      <p style={{ fontStyle: 'italic' }}>by Python Software Foundation</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="pv-certificates-section">
          <div className="d-flex justify-content-between align-items-center">
            <h2>My Skills</h2>
             <div className="pv-certificate-add-button">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
        <div className="pv-projects-list">
            <div className="pv-project-container-small">
                 <div className="pv-project-item-small">
                    <div>
                        <i className="bi bi-tools pv-grayscale"></i>
                    </div>
                    <div className="pv-text-content" style={{ paddingLeft: '10px' }}>
                        <h1 style={{ fontWeight: 'normal' }}>Hard Skills</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
             <div className="pv-project-container-small">
                 <div className="pv-project-item-small">
                    <div>
                         <i className="bi bi-puzzle pv-grayscale"></i>
                    </div>
                    <div className="pv-text-content" style={{ paddingLeft: '10px' }}>
                        <h1 style={{ fontWeight: 'normal' }}>Soft Skills</h1>
                    </div>
                    <div>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
            <div className="pv-project-container-small">
                <div className="pv-project-item-small">
                    <div>
                        <i className="bi bi-box pv-grayscale"></i>
                    </div>
                    <div className="pv-text-content" style={{ paddingLeft: '10px' }}>
                        <h1 style={{ fontWeight: 'normal' }}>Tools & Platforms</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};