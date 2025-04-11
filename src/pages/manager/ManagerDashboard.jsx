import React from 'react'

import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'

import { DashboardProjectInfo } from '../../components/Dashboard/DashboardProjectInfo'
import { NavLink } from 'react-router'
/**
 * Componente Dashboard para usuarios con rol de Manager
 * @returns 
 */

export const ManagerDashboard = () => {
 
  return (
    <div className = "contenedor-Dashboard">
      <div className = "titulo-Dashboard">
        <div className = "titulo-boton">
          <h1>My Project Dashboard</h1>
          <NavLink to="" className="proyecto-crear">
            <p>Create new project</p>
            <i className="bi bi-plus-lg"></i>
          </NavLink>
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
        
        <DashboardProjectInfo role={role}/>
        
      </div>

    </div>
    
  )
}
