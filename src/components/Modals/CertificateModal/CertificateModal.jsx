import React, { useState, useEffect } from "react";
import styles from "src/styles/Modals/Modal.module.css";
import ModalScrollbar from "src/components/Modals/ModalScrollbar";

import axios from "axios";

export const CertificateModal = ({
  certificate,
  isOpen,
  onClose,
  onAnimationComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [localCertificate, setLocalCertificate] = useState(null);
  const [img1, setImg] = useState("");

  useEffect(() => {
  const fetchImageUrl = async () => {
    if (!certificate?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/certificaciones/image-url/${certificate.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const imageUrl = res.data?.url;
      setImg(imageUrl);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  if (isOpen && certificate) {
    fetchImageUrl(); // ✅ call async function properly

    setLocalCertificate(certificate);
    setIsAnimating(true);
    setIsClosing(false);
  } else if (!isOpen && isAnimating) {
    setIsClosing(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsClosing(false);
      setLocalCertificate(null);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 300);
  }
}, [isOpen, certificate, isAnimating, onAnimationComplete]);


  if (!isAnimating || !localCertificate) return null;

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleDownload = async () => {
    try {
      // For local images or same-origin images
      if (
        imageUrl.startsWith("/") ||
        imageUrl.startsWith(window.location.origin)
      ) {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `${localCertificate.title}-Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For external images (handle CORS)
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${localCertificate.title}-Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
      // Fallback: open image in new tab if download fails
      window.open(
        localCertificate.certificateImage || localCertificate.img,
        "_blank"
      );
    }
  };

  return (
    <div
      className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.modalContent} ${isClosing ? styles.closing : ""}`}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.title}>{localCertificate.title}</h2>
          <p className={styles.subtitle}>{localCertificate.skill}</p>
        </div>

        <div
          className={styles.modalBody}
          style={{ height: "calc(100% - 200px)" }}
        >
          <div className={`${styles.uploadSection} ${styles.mb3}`}>
            <img
              src={img1}
              alt={localCertificate.title}
              className={styles.uploadPreview}
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </div>

          <div className={styles.mb4}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Issued by:</span>
              <span className={styles.detailValue}>
                {localCertificate.issuer}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Obtained Date:</span>
              <span className={styles.detailValue}>
                {localCertificate.fechaObtenido}
              </span>
            </div>

            {localCertificate.fechaExpirado && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Expiration Date:</span>
                <span className={styles.detailValue}>
                  {localCertificate.fechaExpirado}
                </span>
              </div>
            )}

            {localCertificate.credentialId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Credential ID:</span>
                <span className={styles.detailValue}>
                  {localCertificate.credentialId}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleDownload} className={styles.secondaryButton}>
            <i className="bi bi-download"></i>
            Download Certificate
          </button>

          {localCertificate.verifyUrl && (
            <a
              href={localCertificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
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
