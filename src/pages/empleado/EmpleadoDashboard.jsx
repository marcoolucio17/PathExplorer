import React, {useState,useEffect, useRef} from "react";
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
  //Agregar el error y el loading de cada uno
  const {data: data_projects}= useGetFetch({rutaApi: `projects`});

  const {data: data_skills} = useGetFetch({rutaApi: `skills`});

  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(true);
 
  const skillSectionRef = useRef(null);
  const toggleSkillDropdown = () => {
    setIsSkillDropdownOpen(!isSkillDropdownOpen);
  };

  useEffect(() => {
    if (skillSectionRef.current) {
      if (isSkillDropdownOpen) {
        skillSectionRef.current.classList.add('dropdown-active');
        
      } else {
        skillSectionRef.current.classList.remove('dropdown-active');
      }
    }
  }, [isSkillDropdownOpen]);

  return (
    <div className="dashboard-container">
      <div className= "dashboard-header " ref={skillSectionRef}>
        <div className="nav-search-container-dashboard glass-navbarDashboard">
          <i className="bi bi-search nav-search-icon-dashboard"></i>
          <input
            type="text"
            placeholder="Search..."
            className="nav-search-dashboard"
          />
        </div>
        <div className="dashboard-header-buttons" >
          <h2 className="title-header-buttons custom-font2">Sort by:</h2>
          <div className={`dropdown-arrow btn btn-secondary custom-font2 skills_button ${isSkillDropdownOpen ? 'open' : ''}`} onClick={toggleSkillDropdown}>
            Skills
            
          </div>
          <div className="skills_button_content">
            
          </div>
          <button className="btn btn-primary custom-font2">
            Compability
          </button>
        </div>
      </div>
      <div className="dashboard-content"> 
            <DashboardProjectInfo projects={data_projects}/>
      </div>
    </div>
  );
};
