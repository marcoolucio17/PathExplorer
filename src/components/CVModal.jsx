import React, { useState, useEffect } from 'react';
import styles from './CVModal.module.css';

export const CVModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    }, 300); // Match animation duration
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/imagesUser/Computer-Science-Resume-Example.png';
    link.download = 'Sammy_Garcy_CV.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('File selected:', file.name);
        // Handle file upload logic here
      }
    };
    input.click();
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
          <h2 className={styles.title}>Curriculum Vitae</h2>
          <p className={styles.subtitle}>Professional Resume</p>
        </div>

        <div className={styles.pdfContainer}>
          <img 
            src="/imagesUser/Computer-Science-Resume-Example.png" 
            className={styles.cvImage}
            alt="Curriculum Vitae"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button 
            onClick={handleDownload} 
            className={styles.downloadButton}
          >
            <i className="bi bi-download"></i>
            Download CV
          </button>
          
          <button 
            onClick={handleUpload} 
            className={styles.uploadButton}
          >
            <i className="bi bi-upload"></i>
            Upload New
          </button>
        </div>
      </div>
    </div>
  );
};