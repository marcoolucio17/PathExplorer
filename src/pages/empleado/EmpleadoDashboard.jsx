import React from "react";
import { Link } from "react-router";

import { DashboardProjectInfo } from '../../components/Dashboard/DashboardProjectInfo'

import "../../styles/EmpleadoDashboard.css";
/**
 * Componente dashboard para usuarios con rol de Empleado
 * @returns
 */
export const EmpleadoDashboard = () => {
  const {data: data_projects }= useGetFetch({rutaApi: `projects`});

  return (
    <div className="contenedor-Dashboard">
      <div className="titulo-Dashboard">
        <h1>My Project Dashboard</h1>
        <br />
        <h2>Hello Perenganit, we compiled these projects for you:</h2>
      </div>
      <div className="buscador-Dashboard">
        <input type="text" placeholder="Search by keyword"></input>
        <button className="buscar-boton">
          <i className="bi bi-search buscador"></i>
        </button>
        <div className="buscador-espacio"></div>
        <button className="filtro-boton">
          <i className="bi bi-caret-down-fill filtrador"></i>
        </button>
        <button className="filtro-boton">
          <i className="bi bi-funnel filtrador"></i>
        </button>
      </div>

      <div className="proyectos-Dashboard">
        <DashboardProjectInfo  projects={data_projects}/>
        
      </div>
    </div>
  );
};
