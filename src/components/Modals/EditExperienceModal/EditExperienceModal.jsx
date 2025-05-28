import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import modalStyles from './EditExperienceModal.module.css';

export const EditExperienceModal = ({ isOpen, onClose, experiences = [], onSave }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    dateStart: '',
    dateEnd: '',
    description: '',
    logo: null,
    logoPreview: null,
    alt: ''
  });

  //
  const resetForm = () => {
    setFormData({
      title: '',
      dateStart: '',
      dateEnd: '',
      description: '',
      logo: null,
      logoPreview: null,
      alt: ''
    });
  };

  useEffect(() => {
    console.log('EditExperienceModal useEffect - isOpen:', isOpen, 'experiences:', experiences);
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setExperienceList([...experiences]);
      setEditingIndex(null);
      resetForm();
    }
  }, [isOpen, experiences]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsVisible(false);
      setIsClosing(false);
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
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (index) => {
    const experience = experienceList[index];
    setFormData({
      title: experience.title,
      dateStart: experience.dateStart,
      dateEnd: experience.dateEnd,
      description: experience.description,
      logo: null, 
      logoPreview: experience.logo, 
      alt: experience.alt
    });
    setEditingIndex(index);
  };

  const handleSaveExperience = () => {
    if (!formData.title || !formData.dateStart || !formData.description) return;

    const newExperience = {
      id: editingIndex !== null ? experienceList[editingIndex].id : Date.now(),
      title: formData.title,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      description: formData.description,
      logo: formData.logoPreview || formData.logo || '/imagesUser/default-company.png',
      alt: formData.alt || formData.title
    };

    if (editingIndex !== null) {
      const updated = [...experienceList];
      updated[editingIndex] = newExperience;
      setExperienceList(updated);
    } else {
      setExperienceList([...experienceList, newExperience]);
    }

    resetForm();
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    setExperienceList(updated);
    if (editingIndex === index) {
      resetForm();
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      if (onSave) {
        onSave(experienceList);
      }
      
      handleClose();
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const isFormValid = () => {
    return formData.title && formData.dateStart && formData.description;
  };

  return (
    <div 
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} style={{ maxWidth: '700px' }}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Edit Work Experience</h2>
          <p className={styles.subtitle}>Manage your professional experience entries</p>
        </div>

        <div className={styles.modalBody} style={{ height: 'calc(100% - 200px)' }}>
          <div className={modalStyles.experienceEditor}>
            {/* Experience List */}
            <div className={modalStyles.experienceList}>
              <h3>Current Experiences</h3>
              {experienceList.map((exp, index) => (
                <div key={exp.id} className={`${modalStyles.experienceItem} ${editingIndex === index ? modalStyles.editing : ''}`}>
                  <div className={modalStyles.experienceInfo}>
                    <h4>{exp.title}</h4>
                    <p>{exp.dateStart} - {exp.dateEnd}</p>
                  </div>
                  <div className={modalStyles.experienceActions}>
                    <button 
                      type="button"
                      onClick={() => handleEdit(index)}
                      className={modalStyles.editBtn}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDelete(index)}
                      className={modalStyles.deleteBtn}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Form */}
            <div className={modalStyles.experienceForm}>
              <h3>{editingIndex !== null ? 'Edit Experience' : 'Add New Experience'}</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="title">Job Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Sr. Software Engineer on Project Golf"
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="dateStart">Start Date *</label>
                  <input
                    type="text"
                    id="dateStart"
                    name="dateStart"
                    value={formData.dateStart}
                    onChange={handleInputChange}
                    placeholder="Jun 2019"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dateEnd">End Date *</label>
                  <input
                    type="text"
                    id="dateEnd"
                    name="dateEnd"
                    value={formData.dateEnd}
                    onChange={handleInputChange}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Led development of 10,000+ production features that now generate significant value..."
                  rows="3"
                />
              </div>

              {/* Company Logo Upload */}
              <div className={styles.formGroup}>
                <label>Company Logo</label>
                <div className={styles.uploadSection}>
                  <label className={styles.uploadLabel} htmlFor="logoFile">
                    {formData.logoPreview ? (
                      <img 
                        src={formData.logoPreview} 
                        alt="Logo preview" 
                        className={styles.uploadPreview}
                        style={{ width: '120px', height: '120px', objectFit: 'contain', borderRadius: '8px' }}
                      />
                    ) : (
                      <div className={styles.uploadPlaceholder} style={{ width: '120px', height: '120px', borderRadius: '8px' }}>
                        <i className="bi bi-building"></i>
                        <span className={styles.LogoText}>Logo</span>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="logoFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </div>
              </div>

              <div className={modalStyles.formActions}>
                {editingIndex !== null && (
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    Cancel Edit
                  </button>
                )}
                
                <button 
                  type="button"
                  onClick={handleSaveExperience}
                  disabled={!isFormValid()}
                  className={styles.primaryButton}
                >
                  <i className="bi bi-plus-lg"></i>
                  {editingIndex !== null ? 'Update' : 'Add'} Experience
                </button>
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
            <i className="bi bi-x-lg"></i>
            Cancel
          </button>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className={styles.saveButton}
          >
            <i className="bi bi-check-lg"></i>
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};