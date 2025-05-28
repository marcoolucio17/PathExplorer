import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import ModalScrollbar from 'src/components/Modals/ModalScrollbar';

export const AddCertificateModal = ({ isOpen, onClose, onAddCertificate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    skill: '',
    issuer: '',
    obtainedDate: '',
    expirationDate: '',
    credentialId: '',
    verifyUrl: '',
    certificateImage: null,
    imagePreview: null
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
        skill: '',
        issuer: '',
        obtainedDate: '',
        expirationDate: '',
        credentialId: '',
        verifyUrl: '',
        certificateImage: null,
        imagePreview: null
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
          certificateImage: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format dates to Spanish format
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                     'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
    };
    
    const newCertificate = {
      id: Date.now(), 
      img: formData.imagePreview || '/imagesUser/default-cert.png',
      alt: formData.skill || formData.title,
      title: formData.title,
      issuer: formData.issuer,
      skill: formData.skill,
      fechaObtenido: formatDate(formData.obtainedDate),
      fechaExpirado: formatDate(formData.expirationDate),
      certificateImage: formData.imagePreview || '/imagesUser/default-cert.png',
      credentialId: formData.credentialId,
      verifyUrl: formData.verifyUrl
    };

    onAddCertificate(newCertificate);
    handleClose();
  };

  const isFormValid = () => {
    return formData.title && formData.issuer && formData.obtainedDate;
  };

  return (
    <div 
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Add Certificate</h2>
          <p className={styles.subtitle}>Upload and add details for your certificate</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className={styles.modalBody}>
            <div className={styles.uploadSection}>
              <label className={styles.uploadLabel} htmlFor="certificateFile">
                {formData.imagePreview ? (
                  <img 
                    src={formData.imagePreview} 
                    alt="Certificate preview" 
                    className={styles.uploadPreview}
                  />
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <i className="bi bi-cloud-upload"></i>
                    <span>Click to upload certificate image</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="certificateFile"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Certificate Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. JavaScript Specialist"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="skill">Skill</label>
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleInputChange}
                  placeholder="e.g. JavaScript"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="issuer">Issued By *</label>
                <input
                  type="text"
                  id="issuer"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  placeholder="e.g. Accenture"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="obtainedDate">Obtained Date *</label>
                <input
                  type="date"
                  id="obtainedDate"
                  name="obtainedDate"
                  value={formData.obtainedDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="credentialId">Credential ID</label>
                <input
                  type="text"
                  id="credentialId"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleInputChange}
                  placeholder="e.g. JS-2023-1234"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="verifyUrl">Verification URL</label>
                <input
                  type="url"
                  id="verifyUrl"
                  name="verifyUrl"
                  value={formData.verifyUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/verify/..."
                />
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
              Add Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};