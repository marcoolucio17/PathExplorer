import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useModalControl from "../useModalControl";
import useToggleState from "../useToggleState";

// import api shit
import { useFetch } from "src/hooks/useFetch";

function transformBackendUser(user) {
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

  if (!user) return newuser;

  // https://<tu-url>.supabase.co/storage/v1/object/public/fotos-perfil/foto-123.jpg"
  // https://nxkreheabczqsutrzafn.supabase.co
  let url =
    "https://nxkreheabczqsutrzafn.supabase.co/storage/v1/object/public/fotos-perfil/";

  newuser.name = formatName(user.nombre);
  newuser.location = user.ubicacion;
  newuser.email = user.correoelectronico;
  newuser.phone = user.telefono;
  newuser.linkedin = user.linkedin;
  newuser.github = user.github;
  newuser.title = user.puesto;
  newuser.avatarUrl =
    "https://nxkreheabczqsutrzafn.supabase.co/storage/v1/object/sign/fotos-perfil/foto-15-1748207570840.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFkNDY3ZWNhLTk2NDgtNGRjYy05YTQyLTJhMzQyNWZmM2VhMCJ9.eyJ1cmwiOiJmb3Rvcy1wZXJmaWwvZm90by0xNS0xNzQ4MjA3NTcwODQwLmpwZyIsImlhdCI6MTc0ODI5MTkyNywiZXhwIjoxNzc5ODI3OTI3fQ.gi_C6RcvsXN_fKFsLZHFZ8cAwQ065_8AjUxnZA-ecIU";

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

function transformBackendExperience(projects) {
  const res = [];

  if (!projects) return res;

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

function transformBackendCertificates(certificates) {
  let res = [];

  if (!certificates) return res;

  certificates.forEach((certificate) => {
    let url = "/imagesUser/JavaScript-logo.png"

    let temp = {
      id: certificate.certificaciones.idcertificaciones,
      img: url,
      title: certificate.certificaciones.cnombre,
      issuer: certificate.certificaciones.emitidopor,
      skill: "Python",
      fechaObtenido: formatDateToMonthYear(
        certificate.certificaciones.fechaobtenido
      ),
      fechaExpirado: formatDateToMonthYear(
        certificate.certificaciones.fechaexpiracion
      ),
      certificateImage:
        certificate.certificaciones.imagencertificado ||
        "/imagesUser/Python-logo.png",
      credentialId: "PSF-2023-5678",
      verifyUrl: "https://python.org/verify/PSF-2023-5678",
    };

    res.push(temp);
  });

  return res;
}

function transformBackendObjectives(objectives) {
  if (!objectives) return [];
  let res = [];

  let ex = [
    {
      id: 1,
      title: "Complete Q2 Performance Review",
      description:
        "Complete the self-assessment and gather feedback from peers and supervisors for the quarterly performance review.",
      targetDate: "2025-06-30",
      completed: false,
      priority: "high",
    },
  ];

  objectives.forEach((objective) => {
    let temp = {
      id: objective.idmeta,
      title: objective.meta,
      description: objective.description,
      targetDate: objective.plazo,
      completed: objective.completa,
      priority: objective.priority,
    };

    res.push(temp);
  });

  return res;
}

function transformBackendSkils(skills) {
  let res = {
    softSkills: [],
    hardSkills: [],
  };

  if (!skills) return res;

  skills.forEach((skill) => {
    if (skill.habilidades.estecnica === true) {
      res.hardSkills.push(skill.habilidades.nombre);
    } else {
      res.softSkills.push(skill.habilidades.nombre);
    }
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

/**
 * Main hook for the Profile page, combining all functionality
 *
 * @returns {Object} Complete state and functions for the Profile page
 */
export const useProfilePage = () => {
  const navigate = useNavigate();

  // api stuff needed for the page
  const { data, error, loading } = useFetch(
    "usuario/" + localStorage.getItem("id")
  );

  // Tab names for the profile page
  const tabNames = ["Contact Information", "Experience", "Objectives"];

  // Modal controls
  const { modals, openModal, closeModal, toggleModal } = useModalControl({
    certificate: false,
    cv: false,
    skills: false,
    addCertificate: false,
    editProfile: false,
    editContact: false,
    editExperience: false,
    editObjectives: false,
    editProfileDetails: false,
  });

  // Profile data states
  const [activeTab, setActiveTab] = useState("Contact Information");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

  // User profile data
  const userProfile = transformBackendUser(data.user);

  // User skills
  const userSkills = [
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
  ];

  // User certificates
  const userCertificates = transformBackendCertificates(data.certificados);

  // User experience
  const userExperience = transformBackendExperience(data.proyectos);

  // Enhanced objectives with description and target date
  const objectives = transformBackendObjectives(data.metas);

  // Categorized skills
  const categorizedSkills = transformBackendSkils(data.skills);

  // Tab counts (for notification badges)
  const tabCounts = useMemo(() => {
    return {
      "Contact Information": 4, // email, phone, linkedin, github
      Experience: userExperience.length,
      Objectives: objectives.filter((obj) => !obj.completed).length,
    };
  }, [userExperience.length, objectives]);

  // Handle objective toggle
  const handleObjectiveToggle = useCallback((id) => {
    setObjectives((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  }, []);

  // Handle certificate click
  const handleCertificateClick = useCallback(
    (certificate) => {
      setSelectedCertificate(certificate);
      openModal("certificate");
    },
    [openModal]
  );

  // Handle skills update
  const handleUpdateSkills = useCallback((newSkills) => {
    //setUserSkills(newSkills);
  }, []);

  // Handle add certificate
  const handleAddCertificate = useCallback((newCertificate) => {
    //setUserCertificates(prev => [...prev, newCertificate]);
  }, []);

  // Handle remove certificate
  const handleRemoveCertificate = useCallback((certificateId) => {
    // setUserCertificates(prev => prev.filter(cert => cert.id !== certificateId));
  }, []);

  // Modal handlers
  const handleCVClick = useCallback(() => {
    openModal("cv");
  }, [openModal]);

  const handleEditClick = useCallback(() => {
    openModal("editProfile");
  }, [openModal]);

  const handleSkillsClick = useCallback(() => {
    openModal("skills");
  }, [openModal]);

  const handleAddCertificateClick = useCallback(() => {
    openModal("addCertificate");
  }, [openModal]);

  // Close certificate modal with cleanup
  const closeCertificateModal = useCallback(() => {
    closeModal("certificate");
    // Clear selected certificate after a delay to allow modal animation
    setTimeout(() => {
      setSelectedCertificate(null);
    }, 300);
  }, [closeModal]);

  // Navigate functions
  const handleBack = useCallback(() => {
    navigate("/empleado/dashboard");
  }, [navigate]);

  return {
    // Data
    userProfile,
    userSkills,
    userCertificates,
    userExperience,
    objectives,
    categorizedSkills,

    // Tab state
    tabNames,
    activeTab,
    setActiveTab,
    tabCounts,

    // Search state
    searchTerm,
    setSearchTerm,

    // Loading state
    loading,

    // Modal state
    modals,
    openModal,
    closeModal,
    selectedCertificate,

    // Handlers
    handleObjectiveToggle,
    handleCertificateClick,
    handleUpdateSkills,
    handleAddCertificate,
    handleRemoveCertificate,
    handleCVClick,
    handleEditClick,
    handleSkillsClick,
    handleAddCertificateClick,
    closeCertificateModal,
    handleBack,
  };
};

export default useProfilePage;
