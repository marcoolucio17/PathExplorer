import React, { useState, useEffect } from 'react';
import styles from 'src/styles/Modals/Modal.module.css';
import ModalScrollbar from 'src/components/Modals/ModalScrollbar';
import axios from 'axios';
import usePost from 'src/hooks/usePost';

export const CVModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { triggerPost, loading, error } = usePost();

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

  //const [cvFile, setCvFile] = useState(null);
  //const [fotoFile, setFotoFile] = useState(null);

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Solo base64
      reader.onerror = reject;
    });


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

  const handleCVUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file); // adjust the key to match backend expectations
      formData.append("projectId", "1")

      try {
          triggerPost("api/upload-rfp", formData)

      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed.");
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
            <iframe 
              src="/pdfs/Gabriel Ernesto Mujica Proulx.pdf" 
              style={{
                width: '100%',
                height: '1000px',
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
            onClick={handleCVUpload} 
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