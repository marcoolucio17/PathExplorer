import React from 'react';
import GlassCard from '../shared/GlassCard/GlassCard';
import styles from './ProfileHeaderCard.module.css';

const ProfileHeaderCard = ({ user }) => {
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
          <div className={styles.infoRow}>
            <p className={styles.location}>
              <i className="bi bi-geo-alt-fill" /> {user.location}
            </p>
            <p className={styles.project}>
              <i className="bi bi-diagram-3-fill" /> Project Golf
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProfileHeaderCard;