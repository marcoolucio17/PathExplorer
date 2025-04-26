import React,  { useState, useEffect } from 'react'
import { Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'


export const DashboardSkillsCategory = ({data_skills, skillModalOpen, setSkillSelected, toggleSkillModal}) => {

    return (
        <Modal isOpen={skillModalOpen} toggle={toggleSkillModal} className="modal-skills-category" backdrop={false}>
        <ModalHeader toggle={toggleSkillModal} className="modal-skills-header">
          Skills Category
        </ModalHeader>
        <ModalBody className="modal-skills-body">
          {data_skills && data_skills.map((skill) => (
            <div key={skill.idhabilidad} className="btn btn-primary custom-font2" 
            onClick={() => {setSkillSelected(skill.nombre);toggleSkillModal();}}>
              <h2>{skill.nombre}</h2>
            </div>
          ))}

        </ModalBody>
      
      </Modal>
    );
}

