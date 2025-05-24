import React, { useState, useEffect, useRef } from 'react';
import Button from '../shared/Button';
import styles from './MembersDropdown.module.css';

const MembersDropdown = ({ members, peopleSectionRef, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Add or remove dropdown-active class on the people section parent
  useEffect(() => {
    if (peopleSectionRef?.current) {
      if (isOpen) {
        peopleSectionRef.current.classList.add('dropdown-active');
      } else {
        peopleSectionRef.current.classList.remove('dropdown-active');
      }
    }
  }, [isOpen, peopleSectionRef]);

  return (
    <div className={`${styles.membersDropdown} ${isOpen ? styles.open : ''}`}>
      <Button
        type="primary"
        onClick={toggleDropdown}
        fullWidth
        className={`${styles.membersButton} ${className}`}
      >
        <div className={styles.membersTextWrapper}>
          <div className={`${styles.stackedAvatars} ${isOpen ? styles.hidden : ''}`}>
            {members.slice(0, 3).map((member, index) => (
              <img
                key={index}
                src={member.avatar}
                alt={`Member ${index + 1}`}
                className={styles.stackedAvatar}
              />
            ))}
          </div>
          <span className={styles.membersText}>Members</span>
        </div>
        <i
          className={`${styles.dropdownArrow} bi bi-caret-down-fill ${isOpen ? styles.up : ''}`}
        ></i>
      </Button>

      <div className={styles.membersDropdownContent}>
        {members.map((member) => (
          <div key={member.id} className={styles.memberItem}>
            <img src={member.avatar} alt={member.name} className={styles.memberAvatarSmall} />
            <div>
              <span className={styles.memberName}>{member.name}</span>
              <span className={styles.memberRole}>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersDropdown;