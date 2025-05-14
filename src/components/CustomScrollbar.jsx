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
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      
      // Show fade when there's more content to scroll (not at bottom)
      setIsNearBottom(scrollBottom > 10);
      
      // Show top fade when scrolled down
      setIsScrolled(scrollTop > 10);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      
      // Check initial state
      const checkInitialOverflow = () => {
        if (!scrollContainerRef.current) return;
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        const hasOverflow = scrollHeight > clientHeight;
        setIsNearBottom(hasOverflow);
        handleScroll();
      };
      
      // Use timeout to ensure content is rendered
      setTimeout(checkInitialOverflow, 0);

      // Also check on resize
      const resizeObserver = new ResizeObserver(() => {
        checkInitialOverflow();
      });
      resizeObserver.observe(scrollContainer);

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [children]); // Re-check when children change

  const getFadeClassName = (isTop = false) => {
    if (fadeBackground === 'transparent') {
      return isTop ? styles.fadeTopTransparent : styles.fadeBottomTransparent;
    }
    return isTop ? styles.fadeTop : styles.fadeBottom;
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
      {showFade && isScrolled && (
        <div 
          className={getFadeClassName(true)}
          style={{ height: fadeHeight * 0.7 }}
        />
      )}
      {showFade && isNearBottom && (
        <div 
          className={getFadeClassName(false)}
          style={{ height: fadeHeight }}
        />
      )}
    </div>
  );
};

export default CustomScrollbar;