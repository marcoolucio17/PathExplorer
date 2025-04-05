import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './EmpleadoPerfil.css'; // Make sure this points to the updated CSS file

/**
 * Componente dashboard para usuarios con rol de Empleado
 * @returns
 */
export const EmpleadoPerfil = () => {
  return (
    // Main flex container (row direction)
    <div className="contenedor-Dashboard">
      {/* Wrapper for the left column */}
      <div className="left-column-wrapper">
        {/* "My Profile" Title Section */}
        <div className='top-Part'>
          <div className="titulo-Dashboard profile-title-container">
            <h1 style={{color: 'white'}}>My Profile</h1>
            {/* Container for the action buttons */}
            <div className="profile-actions">
              <button className="action-button view-button">
                <i className="bi bi-eye-fill"></i> {/* Eye icon */}
              </button>
              <button className="action-button edit-button">
                <i className="bi bi-pencil-fill"></i> {/* Edit icon */}
              </button>
            </div> {/* End of profile-actions */}
          </div> {/* End of titulo-Dashboard */}
        </div> {/* End of top-Part */}

        {/* New container for the lighter grey employee info */}
        <div className="employee-info-section">
          {/* Wrapper for left side (image, details) */}
          <div className="employee-details-left">
            {/* User Image */}
            <div className='user-image profile-image-section'>
              <img src="/imagesUser/Sammy.png" alt="User Profile" />
            </div>
            {/* User Name and Title */}
          <div className="user-details">
            <h2 style={{ fontWeight: '400', color: 'white', fontSize: '2rem' }}>Sammy Garcy</h2>
            <h2 style={{ fontWeight: 'normal', fontSize: '1.2rem' }}>Sr. Software Engineer @ Accenture</h2>
            {/* <div style={{ height: '4px' }}></div> */}
              <h2 style={{ color: 'gray', fontWeight: 'lighter', fontSize: '1.2rem' }}><i className="bi bi-geo-alt-fill"></i> Monterrey, Nuevo León, México</h2> {/* Fixed class attribute */}
            </div>
          </div> {/* End of employee-details-left */}

          {/* Project Info Header (Right side) */}
          <div className="project-info-header">
            <img src="/imagesUser/golf-logo.png" alt="Project Logo" className="project-header-logo" /> {/* Placeholder logo */}
            <div className="project-header-text">
              <h4>Project Golf</h4>
              <p>by Dad</p>
            </div>
          </div>
        </div> {/* End of employee-info-section */}

        {/* Profile Navigation Tabs */}
        <div className="profile-nav-tabs">
          <span className="nav-tab">Contact Information</span>
          <span className="nav-tab active">Experience</span>
          <span className="nav-tab">Objectives</span>
        </div>

        {/* Experience Section (remains here, but remove h3) */}
        <div className="experience-section">
          {/* <h3 style={{ textAlign: 'left' }}>Experience</h3>  Removed heading */}
          <div className="experience-list">
            {/* Experience Item 1 */}
              <div className="experience-item">
                <div className="experience-date">Jun 2019-Present</div> {/* Added Date */}
                <div className="experience-content"> {/* Wrapper for icon, text, line */}
                  <div className="experience-icon">
                     <img src="/imagesUser/golf-logo.png" alt="Project Logo"/> {/* Placeholder Icon */}
                  </div>
                  <div className="experience-text">
                    <h4 style={{ textAlign: 'left' }}>Sr. Software Engineer on Project Golf</h4> {/* Updated Title */}
                    <p style={{ textAlign: 'left' }}>Worked as a senior software engineer on project golf. During his stay, Sammy developed and supervised more than 10000 features that are currently in production and generating around 1 quintillion dollars in value.</p> {/* Updated Text */}
                  </div>
                   <div className="experience-timeline-line"></div> {/* Vertical Line - Moved inside */}
                </div> {/* End of experience-content */}
              </div> {/* End of experience-item */}
              {/* Experience Item 2 (Example - adjust content as needed) */}
              <div className="experience-item">
                 <div className="experience-date">Jan 2018-May 2019</div> {/* Added Date */}
                 <div className="experience-content"> {/* Wrapper for icon, text, line */}
                  <div className="experience-icon">
                     <img src="/imagesUser/trump.png" alt="Project Logo"/> {/* Placeholder Icon */}
                  </div>
                  <div className="experience-text">
                    <h4 style={{ textAlign: 'left' }}>Project Stargate</h4>
                    <p style={{ textAlign: 'left' }}>Worked as lead architect on Project Stargate, a top-secret initiative rumored to work on a combination of frontend and backend - they call it "frontback". Sammy personally deployed over 42,000 features</p>
                  </div>
                   <div className="experience-timeline-line"></div> {/* Vertical Line - Moved inside */}
                </div> {/* End of experience-content */}
              </div> {/* End of experience-item */}
            </div>
          </div> {/* End of experience-section */}
           {/* Search bar could go here if needed, maybe move it? */}

      </div> {/* End of left-column-wrapper */}


      {/* Right sidebar remains the same */}
      <div className="proyectos-Dashboard">
        {/* ... (keep all the content of the right sidebar exactly as it was) ... */}
        <div className="Certificates">
          <div className="d-flex justify-content-between align-items-center">
            <h2>My certificates</h2>
            <div className="certificate-add-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
        <div className="projects-list">
            {/* Certificate items */}
            <div className="project-container">
                {/* JS Cert */}
                 <div className="project-image">
                    <img src="/imagesUser/JavaScript-logo.png" alt="JavaScript Certificate" />
                </div>
                <div className="proyecto">
                    <div className="text-content">
                    <h1 style={{ fontWeight: 'normal' }}>JavaScript Connoisseur</h1>
                    <p style={{ fontStyle: 'italic' }}>by Accenture</p>
                    </div>
                </div>
            </div>
             <div className="project-container">
                 {/* Python Cert */}
                 <div className="project-image">
                    <img src="/imagesUser/Python-logo.png" alt="Python Certificate" />
                 </div>
                <div className="proyecto">
                    <div className="text-content">
                      <h1 style={{ fontWeight: 'normal' }}>Python Expert</h1>
                      <p style={{ fontStyle: 'italic' }}>by Python Software Foundation</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="Certificates">
          <div className="d-flex justify-content-between align-items-center">
            <h2>My Skills</h2>
             <div className="certificate-add-button">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
        <div className="projects-list">
            {/* skill items */}
            <div className="project-container2">
                 {/* hard skills */}
                 <div className="proyecto2">
                    <div className=".grayscale">
                        <i className="bi bi-tools grayscale"></i>
                    </div>
                    <div className="text-content" style={{ paddingLeft: '10px' }}>
                        <h1 style={{ fontWeight: 'normal' }}>Hard Skills</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
             <div className="project-container2">
                 {/* soft skills */}
                 <div className="proyecto2">
                    <div className=".grayscale">
                         <i className="bi bi-puzzle grayscale"></i>
                    </div>
                    <div className="text-content" style={{ paddingLeft: '10px' }}>
                        <h1 style={{ fontWeight: 'normal' }}>Soft Skills</h1>
                    </div>
                    <div>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
            <div className="project-container2">
                {/* tools & platforms */}
                <div className="proyecto2">
                    <div className=".grayscale">
                        <i className="bi bi-box grayscale"></i>
                    </div>
                    <div className="text-content" style={{ paddingLeft: '10px' }}>
                        <h1 style={{ fontWeight: 'normal' }}>Tools & Platforms</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
        </div> {/* end of projects-list */}
      </div> {/* end of proyectos-Dashboard */}
    </div> // end of contenedor-Dashboard
  );
};
