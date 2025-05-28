import React from "react";
import CustomScrollbar from "../CustomScrollbar";
import styles from "./ProfileExperience.module.css";

/**
 *
 * @param {Array} experienceItems - Array of experience objects
 * @returns {JSX.Element}
 */
export const ProfileExperience = ({ experienceItems = [] }) => {
  return (
    <CustomScrollbar fadeBackground="transparent" fadeHeight={40}>
      {experienceItems.length === 0 ? (
        <div className={styles.placeholder}>
          <i className="bi bi-briefcase"></i>
          <p>No work experience added yet</p>
          <span>Add your professional experience to showcase your career journey</span>
        </div>
      ) : (
        <ul className={styles.timeline}>
          {experienceItems.map((item, index) => (
            <li 
              key={item.id}
              style={{
                '--date-top': '0.5rem',
                '--date-height': 'auto',
              }}
            >
              <span className={styles.date}>{item.dateStart} - {item.dateEnd}</span>
              <div className={styles.bullet}>
                <img src={item.logo} alt={item.alt} />
              </div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </CustomScrollbar>
  );
};

export default ProfileExperience;