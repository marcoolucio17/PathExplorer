import React, { useEffect, useState } from "react";
import styles from "./ProgressCircle.module.css";

export const ProgressCircle = ({ 
  value, 
  maxValue = 100, 
  title, 
  size = 150,
  strokeWidth = 12,
  fontWeight = 'medium', // 'medium' (default) or 'light'
  fontSize // Custom font size (optional)
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // Animation effect when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (animatedValue / maxValue) * 100;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Calculate the text for display
  const displayText = maxValue === 100 ? `${value}%` : `${value}/${maxValue}`;
  
  // Calculate border opacity based on progress (higher progress = higher opacity)
  const borderOpacity = Math.min(0.1 + (percentage / 100) * 0.4, 0.5);
  
  // Generate unique IDs for gradients
  const uniqueId = `gradient-${title?.replace(/\s/g, '') || Math.random().toString(36).substr(2, 9)}`;
  
  // Determine the font weight class based on the parameter
  const fontWeightClass = fontWeight === 'light' ? styles.lightFont : styles.mediumFont;

  // Create style object for font size if provided
  const valueStyle = fontSize ? { fontSize } : {};
  
  return (
    <div className={styles.container}>
      <div className={styles.progressWrapper} style={{ width: size, height: size }}>
        <svg width={size} height={size} className={styles.progressSvg}>
          {/* Define gradients */}
          <defs>
            {/* Main gradient - cyan to dark purple (reversed direction) */}
            <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan */}
              <stop offset="100%" stopColor="#9333ea" /> {/* Purple */}
            </linearGradient>
            
            {/* Background circle gradient */}
            <linearGradient id={`${uniqueId}-bg`}>
              <stop offset="0%" stopColor="#1e1e30" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e1e30" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          
          {/* Dark background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${uniqueId}-bg)`}
            strokeWidth={strokeWidth}
            fill="none"
            className={styles.backgroundCircle}
          />
          
          {/* White border that follows the progress exactly with dynamic opacity */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={styles.whiteBorder}
            style={{
              opacity: borderOpacity,
              transition: "stroke-dashoffset 1s ease-in-out, opacity 1s ease-in-out"
            }}
          />
          
          {/* Main progress circle with gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${uniqueId})`}
            strokeWidth={strokeWidth - 2} // Slightly smaller to show white border
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={styles.progressCircle}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s ease-in-out"
            }}
          />
        </svg>
        <div className={styles.progressText}>
          <span 
            className={`${styles.progressValue} ${fontWeightClass}`}
            style={valueStyle}
          >
            {displayText}
          </span>
        </div>
      </div>
      {title && <h3 className={styles.title}>{title}</h3>}
    </div>
  );
};