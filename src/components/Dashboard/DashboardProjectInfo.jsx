import React,  { useState, useEffect } from 'react'

import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'
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
            project.proyecto_roles.map((proyecto_rol) => (
            <div className ="proyecto" key={`${project.idproyecto}-${proyecto_rol.idrol}`} onClick={() => selectProject(project.idproyecto)}>
                <div className="proyecto-parte-arriba">
                    
                    <img className="proyecto-imagen" src={project.imagen || "/images/ImagenProyectoDefault.png"} alt="Imagen de logo"></img>
                    <div className="proyecto-titulos-info">
                        <h2 className="titulo-proyecto"> {project.pnombre} </h2>
                        <h2 className="cliente-proyecto"> by {project.cliente.clnombre}</h2>
                    </div>
                </div>
                <div className="proyecto-parte-media pp-m2">
                    <h2 className="titulo-rol"> {proyecto_rol.roles.nombrerol} </h2>
                    <h2 className="descripcion-rol-proyecto"> {proyecto_rol.roles.descripcionrol} </h2>
                </div>
                <div className="proyecto-parte-abajo">
                    <div className="proyecto-skills">
                        {proyecto_rol.roles.requerimientos_roles.map((req_rol) => (
                            <div className="btn btn-primary custom-font2" key={`${project.idproyecto}-${proyecto_rol.idrol}-${req_rol.requerimientos.habilidades.idhabilidad}`}>
                                {req_rol.requerimientos.habilidades.nombre}
                            </div>
                        ))}
                    </div>
                    <div className="proyecto-participantes">
                        
                            
                            <img  className="proyecto-participante" src={"/img/fotogabo.jpg"} alt="Imagen de empleado"></img>
                            <img  className="proyecto-participante" src={"/img/fotogabo.jpg"} alt="Imagen de empleado"></img>
                            <img  className="proyecto-participante" src={"/img/fotogabo.jpg"} alt="Imagen de empleado"></img>
                                
                            
                        
                        
                    </div>


                </div>
                
            </div>
        )))
    ))

}