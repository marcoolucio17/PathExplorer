import React from "react";
import styles from "./ProgressCircle.module.css";

export const ProgressCircle = ({ 
  value, 
  maxValue = 100, 
  title, 
  size = 150,
  strokeWidth = 15,
  primaryColor = "#8b5cf6",
  secondaryColor = "#3b82f6" 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / maxValue) * 100;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Calculate the text for display
  const displayText = maxValue === 100 ? `${value}%` : `${value}/${maxValue}`;
  
  return (
    <div className={styles.container}>
      <div className={styles.progressWrapper} style={{ width: size, height: size }}>
        <svg width={size} height={size} className={styles.progressSvg}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2a2a3e"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#gradient-${title})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={styles.progressCircle}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.progressText}>
          <span className={styles.progressValue}>{displayText}</span>
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};
