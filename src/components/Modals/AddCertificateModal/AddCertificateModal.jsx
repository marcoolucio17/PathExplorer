import React, { useState, useEffect } from "react";
import styles from "src/styles/Modals/Modal.module.css";
import ModalScrollbar from "src/components/Modals/ModalScrollbar";
import axios from "axios";

export const AddCertificateModal = ({ isOpen, onClose, onAddCertificate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    skill: "",
    issuer: "",
    obtainedDate: "",
    expirationDate: "",
    credentialId: "",
    verifyUrl: "",
    certificateImage: null,
    imagePreview: null,
  });

  const [image, setImage] = useState(null);

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
        title: "",
        skill: "",
        issuer: "",
        obtainedDate: "",
        expirationDate: "",
        credentialId: "",
        verifyUrl: "",
        certificateImage: null,
        imagePreview: null,
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    setImage(file);
    reader.onloadend = () => {
      try {
        setFormData((prev) => ({
          ...prev,
          certificateImage: "static/path/to/certificate.jpg", // ← your static string
          imagePreview: reader.result, // base64 preview
        }));
      } catch (error) {
        console.error("Error setting certificate data:", error);
      }
    };

    reader.readAsDataURL(file); // triggers onloadend
  };

  // todo : cambiar esta función para realizar el POST
  // todo : revisar si es edición o adición
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString();
    };

    // 1. Build certificate data
    const newCertificate = {
      cnombre: formData.title,
      emitidopor: formData.issuer,
      skill: formData.skill,
      fechaobtenido: formatDate(formData.obtainedDate),
      fechaexpirado: formatDate(formData.expirationDate),
      imagencertificado: null, // assigned later
    };

    try {
      // 2. POST certificate (without image for now)
      const certResponse = await axios.post(
        `http://localhost:8080/api/certificados`,
        //
        newCertificate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const createdCert = certResponse.data;
      const certId = createdCert.cert.idcertificaciones;
      const formData = new FormData();

      if (image) {
        formData.append("file", image);
      }

      const imageAssignResponse = await axios.post(
        `http://localhost:8080/api/certificaciones/upload-image/${certId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const userassign = await axios.post(
        `http://localhost:8080/api/certificados/asignar`,
        { idusuario: localStorage.getItem("id"), idcertificaciones: certId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Image assigned successfully:", userassign.data);

      handleClose();
    } catch (error) {
      console.error("Error submitting certificate:", error);
    }
  };

  const isFormValid = () => {
    return formData.title && formData.issuer && formData.obtainedDate;
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
          <h2 className={styles.title}>Add Certificate</h2>
          <p className={styles.subtitle}>
            Upload and add details for your certificate
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
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
