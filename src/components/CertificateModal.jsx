import React, { useState, useEffect } from 'react';
import styles from './CertificateModal.module.css';

export const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isAnimating || !certificate) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleDownload = async () => {
    try {
      const imageUrl = certificate.certificateImage || certificate.img;
      
      // For local images or same-origin images
      if (imageUrl.startsWith('/') || imageUrl.startsWith(window.location.origin)) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${certificate.title}-Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For external images (handle CORS)
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${certificate.title}-Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
      // Fallback: open image in new tab if download fails
      window.open(certificate.certificateImage || certificate.img, '_blank');
    }
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
          <h2 className={styles.certificateTitle}>{certificate.title}</h2>
          <p className={styles.skill}>{certificate.skill}</p>
        </div>

        <div className={styles.certificateImage}>
          <img src={certificate.certificateImage || certificate.img} alt={certificate.title} />
        </div>

        <div className={styles.certificateDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Issued by:</span>
            <span className={styles.detailValue}>{certificate.issuer}</span>
          </div>
          
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Obtained Date:</span>
            <span className={styles.detailValue}>{certificate.fechaObtenido}</span>
          </div>
          
          {certificate.fechaExpirado && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Expiration Date:</span>
              <span className={styles.detailValue}>{certificate.fechaExpirado}</span>
            </div>
          )}

          {certificate.credentialId && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Credential ID:</span>
              <span className={styles.detailValue}>{certificate.credentialId}</span>
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button 
            onClick={handleDownload} 
            className={styles.downloadButton}
          >
            <i className="bi bi-download"></i>
            Download Certificate
          </button>
          
          {certificate.verifyUrl && (
            <a 
              href={certificate.verifyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.verifyButton}
            >
              <i className="bi bi-box-arrow-up-right"></i>
              Verify Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
};