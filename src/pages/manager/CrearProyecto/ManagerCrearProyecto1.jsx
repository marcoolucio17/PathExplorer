import React from 'react'


import '../../empleado/EmpleadoDashboard.css'
import './ManagerCrearProyecto1.css'
import { NavLink } from 'react-router'

export const ManagerCrearProyecto1 = () => {
    return (
        <div className="contenedor-crear-proyecto">
            <div className="titulo-crear-proyecto">
                <h1>Create a new project</h1>
            </div>
            <div className="formulario-crear-proyecto">
                <div className="campo-crear-proyecto">
                    <div className="titulo-campo-crear-proyecto">
                        <h2>Project Name:</h2>
                    </div>

                    <input type="text" />
                </div>
                <div className="campo-crear-proyecto">
                    <div className="titulo-campo-crear-proyecto">
                        <h2>Client name:</h2>
                    </div>
                    <input type="text" />
                </div>
                <div className="campo-crear-proyecto">
                    <div className="titulo-campo-crear-proyecto">
                        <h2>Description:</h2>
                    </div>
                    <input type="text" />
                </div>
                <div className="campo-crear-proyecto">
                    <div className="titulo-campo-crear-proyecto">
                        <h2>General Requirements:</h2>
                    </div>
                    <input type="text" />
                </div>
                <div className="botones-crear-proyecto">
                    <NavLink to="../manager/dashboard" className='boton-cancelar-form '><h3 className='boton-text'>Cancel</h3></NavLink>
                    <NavLink to="../manager/dashboard/crearproyecto2" className='boton-atras-siguiente-form '><h3 className='boton-text'>Next</h3></NavLink>
                </div>
                
            </div>
        </div>
    )
}