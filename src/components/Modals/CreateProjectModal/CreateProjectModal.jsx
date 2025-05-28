import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import ModalScrollbar from 'src/components/Modals/ModalScrollbar';

export const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    skills: '',
    description: '',
    startDate: '',
    endDate: '',
    roles: '',
    clientImage: null,
    imagePreview: null,
    projectPFP: null
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
      // Reset form
      setFormData({
        title: '',
        clientName: '',
        skills: '',
        description: '',
        startDate: '',
        endDate: '',
        roles: '',
        clientImage: null,
        imagePreview: null,
        projectPFP: null
      });
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          clientImage: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //spansih format
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                     'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
    };
    
    //rpoject object
    const newProject = {
      id: Date.now(), //unique id
      img: formData.imagePreview || '/imagesUser/default-cert.png',
      alt: formData.skill || formData.title,
      title: formData.title,
      clientName: formData.clientName,
      skills: formData.skills,
      description: formData.description,
      fechaInicio: formatDate(formData.startDate),
      fechaFin: formatDate(formData.endDate),
      clientImage: formData.imagePreview || '/imagesUser/default-cert.png',
      projectoPlan: formData.projectPFP
    };

    onCreateProject(newProject);
    handleClose();
  };

  const isFormValid = () => {
    return formData.title && formData.clientName && formData.startDate;
    //Agregar checks de que End Date must be after Start Date
  };

  return (
    <div 
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} style={{ maxWidth: '1200px' }}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Create Project</h2>
          <p className={styles.subtitle}>Upload and add details for your project</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className={styles.modalBody} style={{ height: 'calc(100% - 190px)' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className={styles.uploadSection}>
                  <label className={styles.uploadLabel} htmlFor="projectoPlan">
                    {formData.imagePreview ? (
                      <img 
                        src={formData.imagePreview} 
                        alt="Project preview" 
                        className={styles.uploadPreview}
                        style={{ width: '500px', height: '500px' }}
                      />
                    ) : (
                      <div className={styles.uploadPlaceholder} style={{ width: '500px', height: '500px' }}>
                        <i className="bi bi-cloud-upload"></i>
                        <span>Click to upload project PFP</span>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="projectoPlan"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.uploadSection} style={{ marginBottom: '2rem' }}>
                  <label className={styles.uploadLabel} htmlFor="clientImage">
                    {formData.imagePreview ? (
                      <img 
                        src={formData.imagePreview} 
                        alt="Client preview" 
                        className={styles.uploadPreview}
                        style={{ width: '150px', height: '150px' }}
                      />
                    ) : (
                      <div className={styles.uploadPlaceholder} style={{ width: '150px', height: '150px' }}>
                        <i className="bi bi-cloud-upload"></i>
                        <span>Click to upload client logo</span>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="clientImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="title">Project Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Whirlpool Quality Assurance"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="clientName">Client Name *</label>
                    <input
                      type="text"
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Whirlpool"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="skills">Skills</label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="e.g. JavaScript, Project Management"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description">Description *</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="What is your project about?"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="startDate">Start Date *</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="endDate">Estimated End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="button"
              onClick={handleClose} 
              className={styles.cancelButton}
            >
              Cancel
            </button>
            
            <button 
              type="submit"
              disabled={!isFormValid()}
              className={styles.saveButton}
            >
              <i className="bi bi-plus-lg"></i>
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};