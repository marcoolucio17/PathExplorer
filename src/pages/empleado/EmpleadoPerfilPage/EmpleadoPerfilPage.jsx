import React, { useEffect, useState } from "react";
// Import components
import { ProfileHeaderCard } from "../../../components/ProfileHeaderCard";
import { Tabs } from "../../../components/Tabs";
import { GlassCard } from "../../../components/shared/GlassCard";
import { SkillChip } from "../../../components/SkillChip";
import { CertificateModal } from "../../../components/Modals/CertificateModal";
import { CVModal } from "../../../components/Modals/CVModal";
import { SkillsModal } from "../../../components/Modals/SkillsModal";
import { AddCertificateModal } from "../../../components/Modals/AddCertificateModal";
import CustomScrollbar from "../../../components/CustomScrollbar";
import { GlassFade } from "../../../components/GlassFade";
// Import page-specific styles
import pageStyles from "./EmpleadoPerfilPage.module.css";
// Import styles for specific sections
import timelineStyles from "./Timeline.module.css";
import contactInfoStyles from "./ContactInfo.module.css";
import objectivesStyles from "./Objectives.module.css";
import certificateStyles from "./Certificates.module.css";
import skillsStyles from "./Skills.module.css";

// import api shit
import { useFetch } from "src/hooks/useFetch";

const TAB_OPTIONS = ["Contact Information", "Experience", "Objectives"];
const DB_URL = "https://pathexplorer-backend.onrender.com/";

// Soft skills list for categorization
const SOFT_SKILLS_LIST = [
  "Accountability",
  "Active Listening",
  "Adaptability",
  "Collaboration",
  "Communication",
  "Conflict Resolution",
  "Creativity & Innovation",
  "Critical Thinking",
  "Cultural Awareness",
  "Decision-Making",
  "Emotional Intelligence",
  "Empathy",
  "Facilitation",
  "Flexibility",
  "Growth Mindset",
  "Leadership",
  "Mentoring & Coaching",
  "Negotiation",
  "Networking",
  "Presentation Skills",
  "Prioritization",
  "Problem-Solving",
  "Public Speaking",
  "Resilience",
  "Self-Motivation",
  "Stakeholder Management",
  "Stress Management",
  "Teamwork",
  "Technical Writing",
  "Time Management",
  "Git mastery",
  "agile practices",
  "architectural writing",
  "code reviews",
];

function TransformBackendUser(user) {
  // guardo un template de lo que espera la función de carta del empleado
  const newuser = {
    name: "",
    title: "",
    company: "Accenture",
    location: "Monterrey, Nuevo León, Mexico",
    avatarUrl: "/imagesUser/Sammy.png",
    email: "sammy.garcy@accenture.com",
    phone: "+52 81 1234 5678",
    linkedin: "linkedin.com/in/sammygarcy",
    github: "github.com/sammygarcy",
  };
  console.log(user);

  newuser.name = formatName(user.nombre);
  newuser.location = user.ubicacion;
  newuser.email = user.correoelectronico;
  newuser.phone = user.telefono;
  newuser.linkedin = user.linkedin;
  newuser.github = user.github;
  newuser.title = user.puesto;

  return newuser;
}

function formatDateToMonthYear(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

function TransformBackendExperience(projects) {
  const res = [];

  projects.forEach((project) => {
    let temp = {
      id: project.idproyecto,
      dateStart: formatDateToMonthYear(project.fechainicio),
      dateEnd: formatDateToMonthYear(project.fechafin),
      logo: "/imagesUser/trump.png", // no tenemos fotos aún lolls
      alt: project.rol.nombrerol,
      title: project.rol.nombrerol,
      description: project.rol.descripcionrol,
    };

    res.push(temp);
  });

  return res;
}

function TransformBackendCertificates(certificates) {
  let res = [];

  certificates.forEach((certificate) => {
    let temp = {
      id: certificate.certificaciones.idcertificaciones,
      img: certificate.certificaciones.imagencertificado || "/imagesUser/JavaScript-logo.png",
      alt: "certificado",
      title: certificate.certificaciones.cnombre,
      issuer: certificate.certificaciones.emitidopor,
      skill: "Python",
      fechaObtenido: formatDateToMonthYear(certificate.certificaciones.fechaobtenido),
      fechaExpirado: formatDateToMonthYear(certificate.certificaciones.fechaexpiracion),
      certificateImage: certificate.certificaciones.imagencertificado || "/imagesUser/Python-logo.png",
      credentialId: "PSF-2023-5678",
      verifyUrl: "https://python.org/verify/PSF-2023-5678",
    };

    res.push(temp);
  });

  return res;
}

// the name doesn't come formatted so i need to apply this function
function formatName(name) {
  if (!name) return "";
  // Split by lowercase-to-uppercase transition or dot/underscore
  const parts = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[._]/g, " ")
    .split(" ")
    .filter(Boolean);
  // Capitalize each part
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export const EmpleadoPerfilPage = () => {
  // api stuff needed for the page
  const { data, error, loading } = useFetch(
    "usuario/" + localStorage.getItem("id")
  );

  const [activeTab, setActiveTab] = useState("Contact Information");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isAddCertificateModalOpen, setIsAddCertificateModalOpen] =
    useState(false);
  const [userSkills, setUserSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "Leadership",
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Time Management",
  ]);
  // const [userCertificates, setUserCertificates] = useState([]);
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      text: "Complete Q2 performance review self-assessment",
      completed: false,
    },
    { id: 2, text: "Finish the advanced React course", completed: true },
    { id: 3, text: "Mentor a junior developer on the team", completed: false },
    { id: 4, text: "Contribute to an open-source project", completed: false },
  ]);

  // checamos antes que nada si debemos mostrar la pantalla de loading
  if (loading || !data) {
    return <>loading...</>;
  }

  const handleObjectiveToggle = (id) => {
    setObjectives(
      objectives.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsCertificateModalOpen(true);
  };

  const closeCertificateModal = () => {
    setIsCertificateModalOpen(false);
    // Don't clear the certificate immediately - let the modal handle its own cleanup
  };

  const handleCVClick = () => {
    setIsCVModalOpen(true);
  };

  const closeCVModal = () => {
    setIsCVModalOpen(false);
  };

  const handleEditClick = () => {
    // Handle edit functionality
    console.log("Edit profile clicked");
  };

  const handleSkillsClick = () => {
    setIsSkillsModalOpen(true);
  };

  const closeSkillsModal = () => {
    setIsSkillsModalOpen(false);
  };

  const handleUpdateSkills = (newSkills) => {
    setUserSkills(newSkills);
  };

  const handleAddCertificateClick = () => {
    setIsAddCertificateModalOpen(true);
  };

  const closeAddCertificateModal = () => {
    setIsAddCertificateModalOpen(false);
  };

  // const handleAddCertificate = (newCertificate) => {
  //   setUserCertificates([...userCertificates, newCertificate]);
  // };

  const experienceItems = TransformBackendExperience(data.proyectos);
  const user = TransformBackendUser(data.user);
  const userCertificates = TransformBackendCertificates(data.certificados);

  return (
    <div className={pageStyles.profileLayout}>
      <div className={pageStyles.mainContentWrapper}>
        {/* Left Column */}
        <div className={pageStyles.profileColumnLeft}>
          <ProfileHeaderCard user={user} />

          <Tabs
            tabs={TAB_OPTIONS}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            borderStyle="tab-only"
            actionButtons={
              <>
                <button
                  className={pageStyles.actionBtn}
                  onClick={handleCVClick}
                  title="View CV"
                >
                  <i className="bi bi-file-earmark-text" />
                  <span className={pageStyles.buttonText}>CV</span>
                </button>
                <button
                  className={pageStyles.actionBtn}
                  onClick={handleEditClick}
                  title="Edit Profile"
                >
                  <i className="bi bi-pencil-fill" />
                  <span className={pageStyles.buttonText}>Edit</span>
                </button>
              </>
            }
          />

          <div className={pageStyles.tabContentContainer}>
            {activeTab === "Experience" && (
              <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
                <ul className={timelineStyles.timeline}>
                  {experienceItems.map((item, index) => (
                    <li
                      key={item.id}
                      style={{
                        "--date-top": "0.5rem",
                        "--date-height": "auto",
                      }}
                    >
                      <span className={timelineStyles.date}>
                        {item.dateStart} - {item.dateEnd}
                      </span>
                      <div className={timelineStyles.bullet}>
                        <img src={item.logo} alt={item.alt} />
                      </div>
                      <div className={timelineStyles.content}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CustomScrollbar>
            )}
            {activeTab === "Contact Information" && (
              <CustomScrollbar
                fadeBackground="transparent"
                fadeHeight={40}
                showSideFades={true}
                showHorizontalScroll={true}
              >
                <div className={contactInfoStyles.contactInfoSection}>
                  <div className={contactInfoStyles.contactItem}>
                    <i
                      className={`bi bi-envelope-fill ${contactInfoStyles.contactIcon}`}
                    ></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>
                        Email
                      </span>
                      <p className={contactInfoStyles.contactValue}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className={contactInfoStyles.contactItem}>
                    <i
                      className={`bi bi-telephone-fill ${contactInfoStyles.contactIcon}`}
                    ></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>
                        Phone
                      </span>
                      <p className={contactInfoStyles.contactValue}>
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <div className={contactInfoStyles.contactItem}>
                    <i
                      className={`bi bi-linkedin ${contactInfoStyles.contactIcon}`}
                    ></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>
                        LinkedIn
                      </span>
                      <p className={contactInfoStyles.contactValue}>
                        {user.linkedin}
                      </p>
                    </div>
                  </div>
                  <div className={contactInfoStyles.contactItem}>
                    <i
                      className={`bi bi-github ${contactInfoStyles.contactIcon}`}
                    ></i>
                    <div>
                      <span className={contactInfoStyles.contactLabel}>
                        GitHub
                      </span>
                      <p className={contactInfoStyles.contactValue}>
                        {user.github}
                      </p>
                    </div>
                  </div>
                </div>
              </CustomScrollbar>
            )}
            {activeTab === "Objectives" && (
              <div className={objectivesStyles.objectivesSection}>
                <ul className={objectivesStyles.objectivesList}>
                  {objectives.map((obj) => (
                    <li
                      key={obj.id}
                      className={`${objectivesStyles.objectiveItem} ${
                        obj.completed ? objectivesStyles.completed : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`objective-${obj.id}`}
                        checked={obj.completed}
                        onChange={() => handleObjectiveToggle(obj.id)}
                        className={objectivesStyles.objectiveCheckbox}
                      />
                      <label
                        htmlFor={`objective-${obj.id}`}
                        className={objectivesStyles.objectiveText}
                      >
                        {obj.text}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className={pageStyles.profileSidebar}>
          <GlassCard className={pageStyles.sidebarSection}>
            <div className={skillsStyles.sectionHeader}>
              <h2 className={skillsStyles.sectionTitle}>My Skills</h2>
              <button
                className={skillsStyles.sectionAddBtn}
                onClick={handleSkillsClick}
              >
                <i className="bi bi-plus-lg" />
              </button>
            </div>
            <div
              style={{
                height: "300px",
                position: "relative",
                flex: 1,
                minHeight: 0,
              }}
            >
              <GlassFade
                fadeType="glass"
                fadeBackground="glass"
                fadeHeight="auto"
                style={{ height: "100%" }}
              >
                <div className={skillsStyles.skillsContent}>
                  <div className={skillsStyles.skillCategory}>
                    <h3 className={skillsStyles.categoryHeader}>Hard Skills</h3>
                    <div className={skillsStyles.divider}></div>
                    <div className={skillsStyles.skillChipsContainer}>
                      {userSkills
                        .filter((skill) => !SOFT_SKILLS_LIST.includes(skill))
                        .map((skill, index) => (
                          <SkillChip
                            key={`hard-${skill}-${index}`}
                            text={skill}
                          />
                        ))}
                    </div>
                  </div>

                  <div className={skillsStyles.skillCategory}>
                    <h3 className={skillsStyles.categoryHeader}>Soft Skills</h3>
                    <div className={skillsStyles.divider}></div>
                    <div className={skillsStyles.skillChipsContainer}>
                      {userSkills
                        .filter((skill) => SOFT_SKILLS_LIST.includes(skill))
                        .map((skill, index) => (
                          <SkillChip
                            key={`soft-${skill}-${index}`}
                            text={skill}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </GlassFade>
            </div>
          </GlassCard>

          <GlassCard className={pageStyles.sidebarSection}>
            <div className={certificateStyles.sectionHeader}>
              <h2 className={certificateStyles.sectionTitle}>
                My certificates
              </h2>
              <button
                className={skillsStyles.sectionAddBtn}
                onClick={handleAddCertificateClick}
              >
                <i className="bi bi-plus-lg" />
              </button>
            </div>
            <div
              style={{
                height: "400px",
                position: "relative",
                flex: 1,
                minHeight: 0,
              }}
            >
              <GlassFade
                fadeType="glass"
                fadeBackground="glass"
                fadeHeight="auto"
                style={{ height: "100%" }}
              >
                {userCertificates.map((cert) => (
                  <article
                    key={cert.id}
                    className={certificateStyles.certificate}
                    onClick={() => handleCertificateClick(cert)}
                  >
                    <img src={cert.img} alt={cert.alt} />
                    <div>
                      <h3>{cert.title}</h3>
                      <p>by {cert.issuer}</p>
                    </div>
                  </article>
                ))}
              </GlassFade>
            </div>
          </GlassCard>
        </div>
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isCertificateModalOpen}
        onClose={closeCertificateModal}
        onAnimationComplete={() => setSelectedCertificate(null)}
      />

      <CVModal isOpen={isCVModalOpen} onClose={closeCVModal} />

      <SkillsModal
        isOpen={isSkillsModalOpen}
        onClose={closeSkillsModal}
        userSkills={userSkills}
        onUpdateSkills={handleUpdateSkills}
      />

      <AddCertificateModal
        isOpen={isAddCertificateModalOpen}
        onClose={closeAddCertificateModal}
        onAddCertificate={() => console.log("add certificate!")}
      />
    </div>
  );
};
