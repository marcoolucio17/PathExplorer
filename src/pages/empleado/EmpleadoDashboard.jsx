import React, {useState,useEffect, useRef, use} from "react";
import { Link } from "react-router";

import { DashboardProjectInfo } from '../../components/Dashboard/DashboardProjectInfo'
import { DashboardSkillsCategory } from "../../components/Dashboard/DashboardSkillsCategory";

import "../../styles/EmpleadoDashboard.css";
import "../../styles/EmpleadoDashboardFixes.css"; 

import { useGetFetch } from '../../hooks/useGetFetch';

/**
 * Componente dashboard para usuarios con rol de Empleado
 * @returns
 */
export const EmpleadoDashboard = () => {
  const authState = localStorage.getItem("role");

  const [searchProjects, setSearchProjects] = useState('');
  const [skillSelected, setSkillSelected] = useState('Skills');
  
  const {data: data_projects, error}= useGetFetch({rutaApi: `projects`,nombre: searchProjects,condicion1: 'Skills'});
  const {data: data_skills, error2}= useGetFetch({rutaApi: `skills`,nombre: '',condicion1: 'Skills'});
  const [skillModalOpen, setSkillModalOpen] = useState(false);
 
  const toggleSkillModal = () => {
    setSkillModalOpen(!skillModalOpen);
  }
 
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="nav-search-container-dashboard glass-navbarDashboard">
          <i className="bi bi-search nav-search-icon-dashboard"></i>
          <input
            type="text"
            value={searchProjects}
            name="searchDashboard"
            onChange={(e) => setSearchProjects(e.target.value)}
            placeholder="Search..."
            className="nav-search-dashboard"
          />
        </div>
        <div className="dashboard-header-buttons" >
          <h2 className="title-header-buttons custom-font2">Sort by:</h2>
          <div className={`dropdown-arrow btn btn-secondary custom-font2 skills_button`} onClick={() => toggleSkillModal()}>
            {skillSelected}
          </div>
          <button className="btn btn-primary custom-font2">
            Compability
          </button>
        </div>
      </div>
    
      <DashboardSkillsCategory 
        data_skills={data_skills} 
        skillModalOpen={skillModalOpen}
        setSkillSelected={setSkillSelected} 
        toggleSkillModal={toggleSkillModal}
      />

      <div className="dashboard-content">
        {data_projects && <DashboardProjectInfo projects={data_projects} />}
      </div>
    </div>
  );
};