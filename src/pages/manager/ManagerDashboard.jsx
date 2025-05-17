import React, { useEffect,useState } from 'react'

import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'

import { DashboardProjectInfo } from '../../components/Dashboard/DashboardProjectInfo'
import { NavLink, Link } from 'react-router'
import { useGetFetch } from '../../hooks/useGetFetch';
/**
 * Componente Dashboard para usuarios con rol de Manager
 * @returns 
 */

export const ManagerDashboard = () => {
  const authState = localStorage.getItem("role");
  
  const {data: data_projects }= useGetFetch({rutaApi: `projects`});

  return (
    <div className = "contenedor-Dashboard">
    </div>
    
  )
}
