import React from 'react';
import { GlassCard } from "../shared/GlassCard";
import styles from './ProfileHeaderCard.module.css';

const ProfileHeaderCard = ({ user }) => {
  return (
    <GlassCard className={styles.profileHeaderCard}>
      <div className={styles.profileHeaderMain}>
        <div className={styles.employeeSection}>
          <img
            src={user.avatarUrl}
            alt={`${user.name}`}
            className={styles.avatarXl}
          />
          <div className={styles.employeeMeta}>
            <h1>{user.name}</h1>
            <h2>{user.title} at {user.company}</h2>
            <p className={styles.location}>
              <i className="bi bi-geo-alt-fill" /> {user.location}
            </p>
          </div>
        </div>
        
        <div className={styles.projectSection}>
          <div className={styles.projectMeta}>
            <h3>Project Golf</h3>
            <p className={styles.projectDuration}>Jun 2019 - Present</p>
            <p className={styles.projectRole}>Sr. Software Engineer</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProfileHeaderCard;