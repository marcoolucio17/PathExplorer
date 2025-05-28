import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import ModalScrollbar from 'src/components/Modals/ModalScrollbar';

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
    }, 300); 
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
      }
    };
    input.click();
  };

  return (
    <div 
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} style={{ maxWidth: '900px' }}>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Curriculum Vitae</h2>
          <p className={styles.subtitle}>Professional Resume</p>
        </div>

        <div className={styles.modalBody} style={{ 
          flex: '1',
          minHeight: '0',
          height: 'calc(100% - 200px)',
          padding: '0',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: 'min-content',
            padding: '1rem'
          }}>
            <img 
              src="/imagesUser/Computer-Science-Resume-Example.png" 
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                background: 'var(--modal-input-bg)',
                boxShadow: 'var(--shadow-card)'
              }}
              alt="Curriculum Vitae"
            />
          </div>
        </div>

        <div className={styles.buttonGroup} style={{ borderTop: '1px solid var(--border-light)', padding: '1.5rem' }}>
          <button 
            onClick={handleDownload} 
            className={styles.primaryButton}
          >
            <i className="bi bi-download"></i>
            Download CV
          </button>
          
          <button 
            onClick={handleUpload} 
            className={styles.secondaryButton}
          >
            <i className="bi bi-upload"></i>
            Upload New
          </button>
        </div>
      </div>
    </div>
  );
};