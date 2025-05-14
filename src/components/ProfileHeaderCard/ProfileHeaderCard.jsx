import React from 'react';
import GlassCard from '../shared/GlassCard/GlassCard';
import styles from './ProfileHeaderCard.module.css';

const ProfileHeaderCard = ({ user, onCVClick, onEditClick }) => {
  return (
    <GlassCard className={styles.profileHeaderCard}>
      <div className={styles.profileHeaderMain}>
        <img
          src={user.avatarUrl}
          alt={`${user.name}`}
          className={styles.avatarXl}
        />
        <div className={styles.profileMeta}>
          <h1>{user.name}</h1>
          <h2>{user.title} at {user.company}</h2>
          <p>
            <i className="bi bi-geo-alt-fill" /> {user.location}
          </p>
        </div>
        <div className={styles.profileActions}>
          <button className={styles.btnCV} onClick={onCVClick} title="View CV">
            <i className="bi bi-file-earmark-text" />
            <span className={styles.buttonText}>CV</span>
          </button>
          <button className={styles.btnEdit} onClick={onEditClick} title="Edit Profile">
            <i className="bi bi-pencil-fill" />
            <span className={styles.buttonText}>Edit</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProfileHeaderCard;