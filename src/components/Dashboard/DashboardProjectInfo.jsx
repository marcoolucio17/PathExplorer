import React,  { useState } from 'react'

import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

export const DashboardProjectInfo = () => { 
    /*Se llama el rol (pendiente si es así o el rol se debe
    de pasar desde el login)*/
    const role = useAuth();
    /*Datos de ejemplo temporales falta que sea con la BD*/ 
    const dataEjemplo = [
        {
            id: 1,
            nombreProyecto: "Project Stargate",
            nombreCliente: "Pepsi",
            logo: "/images/Pepsi Logo.png",
            rol: "Sr. Software Engineer",
            descripcion: "Work on the latest high-end full-stack technologies and develop a revolutionary project for Pepsi.",
            participantes: [
                {
                    id: 1,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 2,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 3,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                }
            ]
        },
        {
            id: 2,
            nombreProyecto: "Project Stargate",
            nombreCliente: "Pepsi",
            logo: "/images/Pepsi Logo.png",
            rol: "Sr. Software Engineer",
            descripcion: "Work on the latest high-end full-stack technologies and develop a revolutionary project for Pepsi.",
            participantes: [
                {
                    id: 1,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 2,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 3,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                }
            ]
        },
        {
            id: 3,
            nombreProyecto: "Project Pepito",
            nombreCliente: "Pepito",
            logo: "/images/Pepsi Logo.png",
            rol: "Jr. Front end",
            descripcion: "Design a for a simple website for Pepito.",
            participantes: [
                {
                    id: 1,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 2,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 3,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                }
            ]
        },
        {
            id: 4,
            nombreProyecto: "Project Stargate",
            nombreCliente: "Pepsi",
            logo: "/images/Pepsi Logo.png",
            rol: "Sr. Software Engineer",
            descripcion: "Work on the latest high-end full-stack technologies and develop a revolutionary project for Pepsi.",
            participantes: [
                {
                    id: 1,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 2,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                },
                {
                    id: 3,
                    nombre: "Perenganit",
                    rol: "Sr. Software Engineer",
                    imagen: "/images/Pepsi Logo.png"
                }
            ]
        }

    ];
    

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
        dataEjemplo.map((proyecto) => (
            <div className ="proyecto" key={proyecto.id}>
                <div className="proyecto-titulo-informacion">
                    <img src = {proyecto.logo}></img>
                    <div className="proyecto-titulo-texto">
                        <h3>{proyecto.nombreProyecto}</h3>
                        <p>for {proyecto.nombreCliente}</p>
                    </div>
                </div>
                <div className="proyecto-contenido-informacion">
                    <h3>
                        <Link to={"/" + role + "/proyecto"} style={{ color: "white" }}>
                            {proyecto.rol}
                        </Link>
                    </h3>
                    <p>{proyecto.descripcion}</p>
                </div>
                <div className="proyecto-participantes-informacion">
                    <h3>Participants:</h3>
                    <div className="proyecto-participantes-imagenes">
                        
                        {proyecto.participantes.map((participante) => (
                            <img key={`${proyecto.id}-${participante.id}`} src={participante.imagen}  />
                        ))}

                        <p>and more</p>
                    </div>
                </div>
            </div>
        ))
    
    )

}