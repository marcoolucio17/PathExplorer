import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomScrollbar.module.css';

const CustomScrollbar = ({ 
  children, 
  className = '', 
  maxHeight = '100%', 
  style = {}, 
  fadeBackground = '#2a2a46',
  showFade = true,
  fadeHeight = 60
}) => {
  const [isNearBottom, setIsNearBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      
      // Show fade when there's more content to scroll (not at bottom)
      setIsNearBottom(scrollBottom > 10);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();

      // Also check on resize
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(scrollContainer);

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const getFadeClassName = () => {
    if (fadeBackground === 'transparent') {
      return styles.fadeBottomTransparent;
    }
    return styles.fadeBottom;
  };

  return (
    <div 
      className={`${styles.scrollWrapper} ${className}`}
      style={{ maxHeight, ...style }}
    >
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <div className={styles.scrollContent}>
          {children}
        </div>
      </div>
      {showFade && isNearBottom && (
        <div 
          className={getFadeClassName()}
          style={{ height: fadeHeight }}
        />
      )}
    </div>
  );
};

export default CustomScrollbar;