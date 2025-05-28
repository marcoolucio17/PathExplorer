import React from "react";
import CustomScrollbar from "../CustomScrollbar";
import styles from "./ProfileContactInfo.module.css";

/**
 * 
 * @param {Object} userProfile - User profile object with contact info
 * @returns {JSX.Element}
 */
export const ProfileContactInfo = ({ userProfile = {} }) => {
  const contactItems = [
    {
      icon: "bi-envelope-fill",
      label: "Email",
      value: userProfile.email
    },
    {
      icon: "bi-telephone-fill",
      label: "Phone",
      value: userProfile.phone
    },
    {
      icon: "bi-linkedin",
      label: "LinkedIn",
      value: userProfile.linkedin
    },
    {
      icon: "bi-github",
      label: "GitHub",
      value: userProfile.github
    }
  ];

  //check if all contact fields are empty
  const hasNoContactInfo = contactItems.every(item => !item.value);

  return (
    <CustomScrollbar fadeBackground="transparent" fadeHeight={40} showSideFades={true} showHorizontalScroll={true}>
      <div className={styles.contactInfoSection}>
        {hasNoContactInfo ? (
          <div className={styles.placeholder}>
            <i className="bi bi-person-vcard"></i>
            <p>No contact information yet</p>
            <span>Add your email, phone, and social profiles to connect with others</span>
          </div>
        ) : (
          contactItems
            .filter(item => item.value) 
            .map((item, index) => (
              <div key={index} className={styles.contactItem}>
                <i className={`bi ${item.icon} ${styles.contactIcon}`}></i>
                <div>
                  <span className={styles.contactLabel}>{item.label}</span>
                  <p className={styles.contactValue}>{item.value}</p>
                </div>
              </div>
            ))
        )}
      </div>
    </CustomScrollbar>
  );
};

export default ProfileContactInfo;