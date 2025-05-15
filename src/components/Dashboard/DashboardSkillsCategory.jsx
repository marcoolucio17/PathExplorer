import React,  { useState, useEffect } from 'react'
import { Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import '../../styles/EmpleadoDashboard.css'
import '../../styles/ManagerDashboard.css'

/*
<ModalFooter className="modal-skills-footer">
          <button className="btn btn-secondary custom-font2" onClick={toggleSkillModal}>
            Cancel
          </button>
          <button className="btn btn-secondary custom-font2" onClick={toggleSkillModal}>
            Save
          </button>
        </ModalFooter>
 */

export const DashboardSkillsCategory = ({data_skills, data_skills1,skillModalOpen, setSkillSelected, toggleSkillModal}) => {

    return (
        <Modal isOpen={skillModalOpen}  className="modal-skills-category" backdrop={false} >
        <ModalHeader   className="modal-skills-header">
          Skills Category
          <button className="btn-custom-close" onClick={toggleSkillModal}><i class="bi bi-x-lg"></i></button>
        </ModalHeader>
        <ModalBody className="modal-skills-body">
          <div className="btn btn-secondary custom-font2 skills-name" onClick={() => {setSkillSelected("Skills");toggleSkillModal();}}>
            <h2>None</h2>
          </div>
          <br/>
          <br/>
          <div className="skills-technique">
            <h2 className="title-skills-technique">Technical skills</h2>
            <div className="Technical-skills">
              {data_skills && data_skills.map((skill) => (
                <div key={skill.idhabilidad} className="btn btn-primary custom-font2 skills-name" 
                    onClick={() => {setSkillSelected(skill.nombre);toggleSkillModal();}}>
                    <h2>{skill.nombre}</h2>
                </div>
              ))}
            </div>
            
          </div>
          <br/>
          <div className="skills-no-technique">
            <h2 className="title-skills-no-technique">Softs skills</h2>
            <div className="Soft-skills">
              {data_skills && data_skills.map((skill) => (
                <div key={skill.idhabilidad} className="btn btn-primary custom-font2" 
                    onClick={() => {setSkillSelected(skill.nombre);toggleSkillModal();}}>
                    <h2>{skill.nombre}</h2>
                </div>
              ))}
              
            </div>
            
          </div>
          

        </ModalBody>
        
      </Modal>
      
    );
}

