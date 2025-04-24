import React,  { useState, useEffect } from 'react'

import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

export const DashboardProjectInfo = ({projects}) => { 
    /*Se llama el rol (pendiente si es así o el rol se debe
    de pasar desde el login)*/
   
    //Función para guardar el proyecto seleccionado cuando se de click
    // a un proyecto y se diriga a la página de información del proyecto
    const selectProject = (id) => {
        console.log(id);
        
    }
    
    return (
        /*Por cada proyecto, se manda a llamar:
            El id del proyecto
            El nombre del proyecto
            La imagen del proyecto
            El cliente del proyecto
            Uno de los roles de los proyectos
            La descripción del proyecto
            Y por cada participante (empleados):
                La imagen del participante
                El id del participante */


        projects.map((project)  => (
            <button className ="proyecto" key={project.idproyecto} onClick={() => selectProject(project.idproyecto)}>
                <div className="proyecto-titulo-informacion">
                   
                    <div className="proyecto-titulo-texto">
                        <h3>{project.pnombre}</h3>
                        
                    </div>
                </div>
                <div className="proyecto-contenido-informacion">
                   
                    <p>{project.descripcion}</p>
                </div>
                   
                    
            </button>
        ))
    
    )

}