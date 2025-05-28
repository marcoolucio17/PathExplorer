import React from "react";
import { GlassCard } from "../shared/GlassCard";
import CustomScrollbar from "../CustomScrollbar";
import styles from "./ProfileCertificates.module.css";

/**
 * ProfileCertificates component displaying certificates
 * @param {Array} certificates - Array of certificate objects
 * @param {Function} onCertificateClick - Function to handle certificate click
 * @param {Function} onAddCertificateClick - Function to handle add certificate button click
 * @param {Function} onRemoveCertificate - Function to handle certificate removal
 * @returns {JSX.Element}
 */
export const ProfileCertificates = ({ certificates = [], onCertificateClick, onAddCertificateClick, onRemoveCertificate }) => {
  
  const handleRemoveClick = (e, certificateId) => {
    e.stopPropagation(); 
    if (onRemoveCertificate) {
      onRemoveCertificate(certificateId);
    }
  };

  return (
    <GlassCard className={styles.certificatesCard}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My certificates</h2>
        <button className={styles.sectionAddBtn} onClick={onAddCertificateClick}>
          <i className="bi bi-plus-lg" />
        </button>
      </div>
      <div className={styles.certificatesScrollContainer}>
        <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
          <div className={styles.certificatesContent}>
            {certificates.length === 0 ? (
              <div className={styles.placeholder}>
                <i className="bi bi-award"></i>
                <p>No certificates yet</p>
                <span>Add your first certificate to showcase your achievements</span>
              </div>
            ) : (
              certificates.map(cert => (
                <article 
                  key={cert.id} 
                  className={styles.certificate}
                  onClick={() => onCertificateClick(cert)}
                >
                  <img src={cert.img} alt={cert.alt} />
                  <div>
                    <h3>{cert.title}</h3>
                    <p>by {cert.issuer}</p>
                  </div>
                  {onRemoveCertificate && (
                    <button 
                      className={styles.removeButton}
                      onClick={(e) => handleRemoveClick(e, cert.id)}
                      title="Remove certificate"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </article>
              ))
            )}
          </div>
        </CustomScrollbar>
      </div>
    </GlassCard>
  );
};

export default ProfileCertificates;