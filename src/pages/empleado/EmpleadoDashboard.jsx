import React, {useState,useEffect} from "react";
import { Link } from "react-router";

import { DashboardProjectInfo } from '../../components/Dashboard/DashboardProjectInfo'

import "../../styles/EmpleadoDashboard.css";


import { useAuth } from "../../context/AuthContext";
import { useGetFetch } from '../../hooks/useGetFetch';
/**
 * Componente dashboard para usuarios con rol de Empleado
 * @returns
 */


export const EmpleadoDashboard = () => {
  const authState = useAuth();
  const {data: data_projects }= useGetFetch({rutaApi: `projects`});

  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [isCertificateDropdownOpen, setIsCertificateDropdownOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <div className= "dashboard-header ">
        <div className="nav-search-container glass-navbarDashboard">
          <i className="bi bi-search nav-search-icon"></i>
          <input
            type="text"
            placeholder="Search..."
            className="nav-search"
          />
        </div>
        <div className="dashboard-header-buttons">
          <h2 className="title-header-buttons custom-font2">Sort by:</h2>
          <button className="btn btn-secondary custom-font2">Skills</button>
          <button className="btn btn-secondary custom-font2">
            Certificates
          </button>
          <button className="btn btn-secondary custom-font2">
            Compability
          </button>
        </div>
      </div>
      <div className="dashboard-content"> 

      </div>
    </div>
  );
};
