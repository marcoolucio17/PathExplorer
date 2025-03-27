import React from 'react'

import './EmpleadoDashboard.css'
/**
 * Componente dashboard para usuarios con rol de Empleado
 * @returns 
 */
export const EmpleadoDashboard = () => {
  return (
    <div class = "contenedor-Dashboard">
      <div class = "titulo-Dashboard">
        <h1>My Project Dashboard</h1>
        <br/>
        <h2>Hello Perenganit, we compiled these projects for you:</h2>
      </div>
      <div class = "buscador-Dashboard">
        <input type="text" placeholder="Search by keyword"></input>
        <i class="bi bi-search"></i>

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

      </div>

    </div>
    
  )
}
