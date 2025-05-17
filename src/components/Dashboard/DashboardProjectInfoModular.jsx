import React from 'react';
import styles from '../styles/DashboardProjectInfo.module.css';
import { Link } from 'react-router-dom';

export const DashboardProjectInfo = ({projects}) => { 
  const selectProject = (id) => {
    console.log(id);
  };
  
  // Check if projects is undefined or empty
  if (!projects || projects.length === 0) {
    return (
      <div className={styles.noProjects}>
        <p>No projects available</p>
      </div>
    );
  }
  
  return (
    <>
      {projects.map((project) => (
        project.proyecto_roles.map((proyecto_rol) => (
          <div 
            className="proyecto" 
            key={`${project.idproyecto}-${proyecto_rol.idrol}`} 
            onClick={() => selectProject(project.idproyecto)}
          >
            <div className="proyecto-parte-arriba">
              <img 
                className="proyecto-imagen" 
                src={project.imagen || "/images/ImagenProyectoDefault.png"} 
                alt="Imagen de logo"
              />
              <div className="proyecto-titulos-info">
                <h2 className="titulo-proyecto">{project.pnombre}</h2>
                <h2 className="cliente-proyecto">by {project.cliente.clnombre}</h2>
              </div>
            </div>
            <div className="proyecto-parte-media pp-m2">
              <h2 className="titulo-rol">{proyecto_rol.roles.nombrerol}</h2>
              <h2 className="descripcion-rol-proyecto">{proyecto_rol.roles.descripcionrol}</h2>
            </div>
            <div className="proyecto-parte-abajo">
              <div className="proyecto-skills">
                {proyecto_rol.roles.requerimientos_roles.map((req_rol) => (
                  <div 
                    className="btn btn-primary custom-font2" 
                    key={`${project.idproyecto}-${proyecto_rol.idrol}-${req_rol.requerimientos.habilidades.idhabilidad}`}
                  >
                    {req_rol.requerimientos.habilidades.nombre}
                  </div>
                ))}
              </div>
              <div className="proyecto-participantes">
                <img className="proyecto-participante" src="/img/fotogabo.jpg" alt="Empleado" />
                <img className="proyecto-participante" src="/img/fotogabo.jpg" alt="Empleado" />
                <img className="proyecto-participante" src="/img/fotogabo.jpg" alt="Empleado" />
              </div>
            </div>
          </div>
        ))
      ))}
    </>
  );
};