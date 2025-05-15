import {Modal,ModalHeader,ModalBody} from 'reactstrap';
import '../../styles/EmpleadoDashboard.css';
import '../../styles/ManagerDashboard.css';


export const DashboardRolesCategory = ({data_roles, roleModalOpen, roleSelected,setRoleSelected, toggleRoleModal}) => {

    return (
        <Modal isOpen={roleModalOpen} className="modal-roles-category" backdrop={false}>
            <ModalHeader className="modal-roles-header">
                Select a role
                <button className="btn-custom-close" onClick={toggleRoleModal}><i className="bi bi-x-lg"></i></button>
            </ModalHeader>
            <ModalBody className="modal-roles-body">
                <div className="btn btn-secondary custom-font2 roles-name" onClick={() => {setRoleSelected("Roles");toggleRoleModal();}}>
                    <h2>None</h2>
                </div>
                <br/>
                <br/>
                <div className="roles-list">
                    {data_roles && data_roles.map((role) => (
                        <div key={role.idrol} className="btn btn-primary custom-font2 roles-name" 
                            onClick={() => {setRoleSelected(role.nombre);toggleRoleModal();}}>
                            <h2>{role.nombre}</h2>
                        </div>
                    ))}
                </div>
            </ModalBody>
        </Modal>

    )
}