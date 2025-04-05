import React from 'react'
import { NavLink , Outlet} from 'react-router'

import '../../../styles/EmpleadoDashboard.css'
import '../../../styles/ManagerCrearProyecto1.css'
import '../../../styles/ManagerCrearProyecto2.css'

export const ManagerCrearProyecto2 = () => { 
    return (
        <div className="contenedor-crear-proyecto">
            <div className="titulo-crear-proyecto">
                <h1>Create a new project</h1>
            </div>
            <div className="formulario-crear-proyecto">
                <div className = "seleccion-role">
                    <div className= "campo-rol roles-seleccionados">
                        <h2 className='titulo-roles-seleccionado'> Roles included:</h2>
                        <div className = "rol-registro">
                            <div className = "rol-seleccionado">
                                <h3>Scrum master X1</h3>
                            </div>
                            <div className = "rol-seleccionado-habilidades">
                                <h3>View Skills</h3>
                            </div>
                        </div>
                        <hr className="separacion"/>
                        <div className = "rol-registro">
                            <div className = "rol-seleccionado">
                                <h3>Front developer X4</h3>
                            </div>
                            <div className = "rol-seleccionado-habilidades">
                                <h3>View Skills</h3>
                            </div>
                        </div>

                    </div>
                    <div className= "campo-rol rol-seleccionar">
                        <div className = "seleccion-rol">
                            <div className = "titulo-seleccion-rol">
                                <h2 className='titulo-roles-seleccionado'>Select role</h2>
                            </div>
                            <select className='select-rol'>
                                
                            </select>
                        </div>
                        <hr className="separacion"/>
                        <div className = "seleccion-rol">
                            <div className = "titulo-seleccion-rol">
                                <h2 className='titulo-roles-seleccionado'>Quantity</h2>
                            </div>
                        </div>
                        <hr className="separacion"/>
                        <div className = "seleccion-rol">
                            <div className = "titulo-seleccion-rol">
                                <h2 className='titulo-roles-seleccionado'>Skills</h2>
                            </div>
                        </div>
                        <div className="validar-rol">
                            <h2>Add role</h2>
                        </div>
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