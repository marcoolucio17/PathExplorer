import React, { useEffect,useState } from 'react'

import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'

import { DashboardProjectInfo } from '../../components/Dashboard/DashboardProjectInfo'
import { NavLink, Link } from 'react-router'
import { useAuth } from "../../context/AuthContext";
import { useGetFetch } from '../../hooks/useGetFetch';
/**
 * Componente Dashboard para usuarios con rol de Manager
 * @returns 
 */

export const ManagerDashboard = () => {
  const authState = useAuth();
  
  const {data: data_projects }= useGetFetch({rutaApi: `projects`});

  return (
    <div className = "contenedor-Dashboard">
      <div className = "titulo-Dashboard">
        <div className = "titulo-boton">
          <h1>My Project Dashboard</h1>
          <Link to={"createproject"} className="proyecto-crear">
            <p>Create new project</p>
            <i className="bi bi-plus-lg"></i>
          </Link>
        </div> 
        <br/>
        <h2>Hello Perenganit, we compiled these projects for you:</h2>
      </div>

      <div className = "buscador-Dashboard">
        <input type="text" placeholder="Search by keyword"></input>
        <button className="buscar-boton"><i className="bi bi-search buscador"></i></button>
        <div className = "buscador-espacio"></div>
        <button className="filtro-boton"><i className="bi bi-caret-down-fill filtrador"></i></button>
        <button className="filtro-boton"><i className="bi bi-funnel filtrador"></i></button>
      </div>


    
      <div className = "proyectos-Dashboard">
        
        <DashboardProjectInfo projects={data_projects}/>
        
      </div>

    </div>
    
  )
}
