import React from 'react'

import './ManagerDashboard.css'
import '../empleado/EmpleadoDashboard.css'
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
          <button class= "proyecto-crear">
            <p>Create new project</p>
            <i class="bi bi-plus-lg"></i>
          </button>
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
      <div class = "proyectos-Dashboard">
        <div class ="proyecto">
          <img src = "/images/3d_avatar_6.png" alt = "Avatar"></img>
          <h1>Gansitos Project</h1>
          <p>Java Developer</p>
        </div>
        <div class ="proyecto" >
          <img src = "/images/3d_avatar_6.png" alt = "Avatar"></img>
          <h1>Gansitos Project</h1>
          <p>Java Developer</p>
        </div>
        <div class ="proyecto" >
         <img src = "/images/3d_avatar_6.png" alt = "Avatar"></img>
          <h1>Gansitos Project</h1>
          <p>Java Developer</p>
        </div>
        <div class ="proyecto" >
          <img src = "/images/3d_avatar_6.png" alt = "Avatar"></img>
          <h1>Gansitos Project</h1>
          <p>Java Developer</p>
        </div>
        <div class ="proyecto" >
          <img src = "/images/3d_avatar_6.png" alt = "Avatar"></img>
          <h1>Gansitos Project</h1>
          <p>Java Developer</p>
        </div>

      </div>

    </div>
    
  )
}
