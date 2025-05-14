import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomScrollbar.module.css';

const CustomScrollbar = ({ 
  children, 
  className = '', 
  maxHeight = '100%', 
  style = {}, 
  fadeBackground = '#2a2a46',
  showFade = true,
  fadeHeight = 40, // Reduced default height
  fadeIntensity = 1,
  showHorizontalScroll = false // New prop to enable horizontal scrolling
}) => {
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { 
        scrollTop, 
        scrollHeight, 
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth
      } = scrollContainerRef.current;
      
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;
      
      // Calculate scroll progress
      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? scrollTop / totalScrollable : 0;
      setScrollProgress(progress);
      
      // Show fade when there's more content to scroll
      setIsNearBottom(scrollBottom > 5);
      
      // Show top fade when scrolled down
      setIsScrolled(scrollTop > 5);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      
      // Check initial state
      const checkInitialOverflow = () => {
        if (!scrollContainerRef.current) return;
        const { scrollHeight, clientHeight, scrollWidth, clientWidth } = scrollContainerRef.current;
        const hasVerticalOverflow = scrollHeight > clientHeight;
        setIsNearBottom(hasVerticalOverflow);
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

  const getFadeClassName = (type) => {
    const suffix = fadeBackground === 'transparent' ? 'Transparent' : '';
    const typeMap = {
      'top': 'fadeTop',
      'bottom': 'fadeBottom'
    };
    
    return styles[`${typeMap[type]}${suffix}`];
  };

  // Calculate dynamic fade opacity based on scroll position
  const getBottomFadeOpacity = () => {
    if (!isNearBottom) return 0;
    // Fade out more as we approach the bottom
    return Math.min(1, (1 - scrollProgress) * fadeIntensity);
  };

  const getTopFadeOpacity = () => {
    if (!isScrolled) return 0;
    // Fade out more as we approach the top
    return Math.min(1, scrollProgress * fadeIntensity);
  };

  return (
    <div 
      className={`${styles.scrollWrapper} ${className}`}
      style={{ maxHeight, ...style }}
    >
      <div 
        className={styles.scrollContainer} 
        ref={scrollContainerRef}
        style={{
          overflowX: showHorizontalScroll ? 'auto' : 'hidden'
        }}
      >
        <div className={styles.scrollContent}>
          {children}
        </div>
      </div>
      {showFade && isScrolled && (
        <div 
          className={getFadeClassName('top')}
          style={{ 
            height: fadeHeight * 0.75,
            opacity: getTopFadeOpacity()
          }}
        />
      )}
      {showFade && isNearBottom && (
        <div 
          className={getFadeClassName('bottom')}
          style={{ 
            height: fadeHeight,
            opacity: getBottomFadeOpacity()
          }}
        />
      )}
    </div>
  );
};

export default CustomScrollbar;