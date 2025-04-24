import React from "react";
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
          <div className="button-skills custom-font2"><h2>Skills</h2></div>
          <div className="button-certificates custom-font2">
            <h2>Certificates</h2>
          </div>
          <div className="button-compability custom-font2">
            <h2>Compability</h2>
          </div>
        </div>
      </div>
      <div className="dashboard-content"> 

      </div>
    </div>
  );
};
