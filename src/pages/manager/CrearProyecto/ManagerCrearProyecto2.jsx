import React from 'react'

import '../../empleado/EmpleadoDashboard.css'
import './ManagerCrearProyecto1.css'
import { NavLink , Outlet} from 'react-router'
import './ManagerCrearProyecto2.css'
export const ManagerCrearProyecto2 = () => { 
    return (
        <div className="contenedor-crear-proyecto">
            <div className="titulo-crear-proyecto">
                <h1>Create a new project</h1>
            </div>
            <div className="formulario-crear-proyecto">
                <div className = "seleccion-role">
                    <div className= "roles-seleccionados">
                        <h2 className='titulo-roles-seleccionado'> Roles included:</h2>
                        <div className = "rol-registro">
                            <div className = "rol-seleccionado">
                                <h3>Scrum masterX1</h3>
                            </div>
                            
                        </div>
                    </div>
                    <div className= "rol-seleccionar">

                    </div>
                </div>
                <div className="botones-crear-proyecto">
                    <NavLink to="../manager/dashboard" className='boton-cancelar-form '><h3 className='boton-text'>Cancel</h3></NavLink> 
                    <NavLink to="../manager/dashboard/crearproyecto1" className='boton-atras-siguiente-form botones-crear-proyecto-formato'><h3 className='boton-text'>Back</h3></NavLink>
                    <NavLink to="" className='boton-atras-siguiente-form '><h3 className='boton-text'>Next</h3></NavLink>
                </div>
            </div>
        </div>
    )
}