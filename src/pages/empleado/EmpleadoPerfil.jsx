import React, { useState } from "react";
import "./EmpleadoPerfil.css";

const TABS = ["Contact Information", "Experience", "Objectives"];

export const EmpleadoPerfil = () => {
  const [activeTab, setActiveTab] = useState("Experience");
  const [objectives, setObjectives] = useState([
    { id: 1, text: "Complete Q2 performance review self-assessment", completed: false },
    { id: 2, text: "Finish the advanced React course", completed: true },
    { id: 3, text: "Mentor a junior developer on the team", completed: false },
    { id: 4, text: "Contribute to an open-source project", completed: false },
  ]);

  const handleObjectiveToggle = (id) => {
    setObjectives(
      objectives.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  };

  return (
    <div className="profile-layout">
      <div className="profile-column-left">
        <header className="profile-header-card glass-card">
          <div className="profile-header-main">
            <img
              src="/imagesUser/Sammy.png"
              alt="Sammy Garcy"
              className="avatar-xl"
            />

            <div className="profile-meta">
              <h1>Sammy Garcy</h1>
              <h2>Sr. Software Engineer at Accenture</h2>
              <p>
                <i className="bi bi-geo-alt-fill" /> Monterrey, Nuevo León, Mexico
              </p>
            </div>

            <div className="profile-actions">
              <button className="btn-view">
                <i className="bi bi-eye-fill" />
              </button>
              <button className="btn-edit">
                <i className="bi bi-pencil-fill" />
              </button>
            </div>
          </div>
        </header>

        <nav className="profile-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={activeTab === t ? "tab active" : "tab"}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        <section className="profile-tab-body">
          {activeTab === "Experience" && (
            <ul className="timeline">
              <li>
                <span className="date">Jun 2019 – Present</span>
                <div className="bullet">
                  <img src="/imagesUser/golf-logo.png" alt="Project Golf" />
                </div>
                <div className="content">
                  <h3>Sr. Software Engineer on Project Golf</h3>
                  <p>
                    Led development of 10 000+ production features that now
                    generate ≈ 1 quintillion USD in value.
                  </p>
                </div>
              </li>
              <li>
                <span className="date">Jan 2018 – May 2019</span>
                <div className="bullet">
                  <img src="/imagesUser/trump.png" alt="Project Stargate" />
                </div>
                <div className="content">
                  <h3>Lead Architect — Project Stargate</h3>
                  <p>
                    Directed the full “frontback” stack and personally deployed
                    42 000 features for a classified initiative.
                  </p>
                </div>
              </li>
            </ul>
          )}
          {activeTab === "Contact Information" && (
            <div className="contact-info-section">
              <div className="contact-item">
                <i className="bi bi-envelope-fill contact-icon"></i>
                <div>
                  <span className="contact-label">Email</span>
                  <p className="contact-value">sammy.garcy@accenture.com</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone-fill contact-icon"></i>
                <div>
                  <span className="contact-label">Phone</span>
                  <p className="contact-value">+52 81 1234 5678</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-linkedin contact-icon"></i>
                <div>
                  <span className="contact-label">LinkedIn</span>
                  <p className="contact-value">linkedin.com/in/sammygarcy</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-github contact-icon"></i>
                <div>
                  <span className="contact-label">GitHub</span>
                  <p className="contact-value">github.com/sammygarcy</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Objectives" && (
            <div className="objectives-section">
              <ul className="objectives-list">
                {objectives.map((obj) => (
                  <li key={obj.id} className={`objective-item ${obj.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      id={`objective-${obj.id}`}
                      checked={obj.completed}
                      onChange={() => handleObjectiveToggle(obj.id)}
                      className="objective-checkbox"
                    />
                    <label htmlFor={`objective-${obj.id}`} className="objective-text">
                      {obj.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <aside className="profile-sidebar">
        <div className="sidebar-section glass-card">
          <div className="section-title">
            <h2>My certificates</h2>
            <button className="btn btn-outline-light btn-sm rounded-circle section-add-btn">
              <i className="bi bi-plus-lg" />
            </button>
          </div>

          <article className="certificate">
            <img src="/imagesUser/JavaScript-logo.png" alt="JS" />
            <div>
              <h3>JavaScript Connoisseur</h3>
              <p>by Accenture</p>
            </div>
          </article>

          <article className="certificate">
            <img src="/imagesUser/Python-logo.png" alt="Python" />
            <div>
              <h3>Python Expert</h3>
              <p>by Python Software Foundation</p>
            </div>
          </article>
        </div>

        <div className="sidebar-section glass-card">
          <div className="section-title">
            <h2>My Skills</h2>
            <button className="btn btn-outline-light btn-sm rounded-circle section-add-btn">
              <i className="bi bi-plus-lg" />
            </button>
          </div>

          <div className="skill-chip-group">
            <button className="skill-chip">
              <i className="bi bi-tools" /> Hard skills
            </button>
            <button className="skill-chip">
              <i className="bi bi-puzzle" /> Soft skills
            </button>
            <button className="skill-chip">
              <i className="bi bi-box" /> Tools & Platforms
            </button>
          </div>
        </div>
      </aside>
    </div>
);
};