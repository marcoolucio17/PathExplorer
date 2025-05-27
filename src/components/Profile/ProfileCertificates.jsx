import React, { useEffect, useState } from "react";
import { GlassCard } from "../shared/GlassCard";
import CustomScrollbar from "../CustomScrollbar";
import styles from "./ProfileCertificates.module.css";
import axios from "axios";

export const ProfileCertificates = ({
  certificates = [],
  onCertificateClick,
  onAddCertificateClick,
  onRemoveCertificate
}) => {
  const [certsWithImages, setCertsWithImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");

      const enriched = await Promise.all(
        certificates.map(async (cert) => {
          try {
            const res = await axios.get(
              `http://localhost:8080/api/certificaciones/image-url/${cert.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return {
              ...cert,
              img: res.data?.url || "/imagesUser/default-cert.png",
              alt: cert.title,
            };
          } catch (err) {
            console.error(`Error loading image for cert ${cert.id}:`, err);
            return {
              ...cert,
              img: "/imagesUser/default-cert.png",
              alt: cert.title,
            };
          }
        })
      );

      setCertsWithImages(enriched);
    };

    if (certificates.length > 0) fetchImages();
  }, [certificates]);

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
            {certsWithImages.length === 0 ? (
              <div className={styles.placeholder}>
                <i className="bi bi-award"></i>
                <p>No certificates yet</p>
                <span>Add your first certificate to showcase your achievements</span>
              </div>
            ) : (
              certsWithImages.map(cert => (
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
