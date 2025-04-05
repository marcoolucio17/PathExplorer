import React from 'react'

import './ManagerDashboard.css'
import '../empleado/EmpleadoDashboard.css'
import { NavLink } from 'react-router'
/**
 * Componente Dashboard para usuarios con rol de Manager
 * @returns 
 */

export const ManagerDashboard = () => {
 
  return (
    <div class = "contenedor-Dashboard">
      <div class = "titulo-Dashboard">
        <div class = "titulo-boton">
          <h1>My Project Dashboard</h1>
          <NavLink to="../manager/dashboard/crearproyecto1" className="proyecto-crear">
            <p>Create new project</p>
            <i class="bi bi-plus-lg"></i>
          </NavLink>
        </div> 
        <br/>
        <h2>Hello Perenganit, we compiled these projects for you:</h2>
      </div>
      <div class = "buscador-Dashboard">
        <input type="text" placeholder="Search by keyword"></input>
        <button class="buscar-boton"><i class="bi bi-search buscador"></i></button>
        <div class = "buscador-espacio"></div>
        <button class="filtro-boton"><i class="bi bi-caret-down-fill filtrador"></i></button>
        <button class="filtro-boton"><i class="bi bi-funnel filtrador"></i></button>
      </div>
      <div className = "proyectos-Dashboard">
        
        <div className ="proyecto">
          <div className="proyecto-titulo-informacion">
            <img src = "/images/Pepsi Logo.png"></img>
            <div className="proyecto-titulo-texto">
              <h3>Project Stargate</h3>
              <p>for Pepsi</p>
            </div>
          </div>
          <div className="proyecto-contenido-informacion">
            <h3>Sr. Software Engineer</h3>
            <p>Work on the latest high-end full-stack technologies and develop a revolutionary project for Pepsi.</p>
          </div>
          <div className="proyecto-participantes-informacion">
            <h3>Participants:</h3>
            <div className="proyecto-participantes-imagenes">
              <img className="circulo_ancla" src = "/images/Pepsi Logo.png"></img>
              <img className="circulo_1" src = "/images/Pepsi Logo.png"></img>
              <img className="circulo_2" src = "/images/Pepsi Logo.png"></img>
              <p>and more</p>
            </div>
          </div>
        </div>
        <div className ="proyecto">
          <div className="proyecto-titulo-informacion">
            <img src = "/images/Pepsi Logo.png"></img>
            <div className="proyecto-titulo-texto">
              <h3>Project Stargate</h3>
              <p>for Pepsi</p>
            </div>
          </div>
          <div className="proyecto-contenido-informacion">
            <h3>Sr. Software Engineer</h3>
            <p>Work on the latest high-end full-stack technologies and develop a revolutionary project for Pepsi.</p>
          </div>
          <div className="proyecto-participantes-informacion">
            <h3>Participants:</h3>
            <div className="proyecto-participantes-imagenes">
              <img className="circulo_ancla" src = "/images/Pepsi Logo.png"></img>
              <img className="circulo_1" src = "/images/3d_avatar_6.png"></img>
              <img className="circulo_2" src = "/images/Pepsi Logo.png"></img>
              <p>and more</p>
            </div>
          </div>
        </div>
        <div className ="proyecto">
          <div className="proyecto-titulo-informacion">
            <img src = "/images/Pepsi Logo.png"></img>
            <div className="proyecto-titulo-texto">
              <h3>Project Stargate</h3>
              <p>for Pepsi</p>
            </div>
          </div>
          <div className="proyecto-contenido-informacion">
            <h3>Sr. Software Engineer</h3>
            <p>Work on the latest high-end full-stack technologies and develop a revolutionary project for Pepsi.</p>
          </div>
          <div className="proyecto-participantes-informacion">
            <h3>Participants:</h3>
            <div className="proyecto-participantes-imagenes">
              <img className="circulo_ancla" src = "/images/Pepsi Logo.png"></img>
              <img className="circulo_1" src = "/images/3d_avatar_6.png"></img>
              <img className="circulo_2" src = "/images/Pepsi Logo.png"></img>
              <p>and more</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    
  )
}
